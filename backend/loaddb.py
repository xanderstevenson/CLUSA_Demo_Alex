# Preload DemoQuestion DB with all questions from ./questions directory

from pymongo import MongoClient
import os, json

DB_CONNECT_URL = 'mongodb://devnet:ciscopsdt@10.194.239.243:27017/'    # sjds-ubuntu-2  DB server
#DB_CONNECT_URL = 'mongodb://davidn:ciscopsdt@10.0.0.57:27017/'        # Raspberry Pi 3 from Pis cluster

client = MongoClient(DB_CONNECT_URL)
database = client.DemoQuestion

PATH = './questions'
META = 'meta.json'

os.chdir(PATH)
# Read all meta data for the questions.
with open(META) as f:
    data = json.load(f)

for i in data['questions']:
    filename = i['_id'] + '.png'
    with open(filename, 'rb') as f:
        data = f.read()
    i['data'] = data        # This is the image that representing a question.
    print(f'inserting -> Question#{i["_id"]} with image {filename}')
    database.question.insert_one(i)
