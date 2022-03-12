# Preload DemoQuestion DB with all questions from 'backend/questions' directory
# No error checking, drop existing collection from DB before running

from pymongo import MongoClient
import os, json

DB_CONNECT_URL = os.getenv('DATABASE_URL')        # Raspberry Pi 3 from Pis cluster
LOCAL_FILE_URL_PREFIX = 'http://localhost:8000/static/'

client = MongoClient(DB_CONNECT_URL)
database = client.DemoQuestion

# Read all meta data for the questions.
META = './questions/meta.json'
with open(META) as f:
    data = json.load(f)

for i in data['questions']:
    i['filename'] = LOCAL_FILE_URL_PREFIX + i['filename']
    print(f'inserting -> Question#{i["_id"]} with image {i["filename"]}')
    database.question.insert_one(i)
