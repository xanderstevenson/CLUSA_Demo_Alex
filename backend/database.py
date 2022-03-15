import motor.motor_asyncio
import os, random
from model import DemoQuestion, User, Car
from utils import get_time, get_uuid
import datetime

# export DATABASE_URL = 'mongodb://devnet:ciscopsdt@10.194.239.243:27017/'
DB_CONNECT_URL = os.getenv('DATABASE_URL')

client = motor.motor_asyncio.AsyncIOMotorClient(DB_CONNECT_URL)
database = client.DemoQuestion

async def fetch_one_question(qnumber: str):
    collection = database.question
    document = await collection.find_one({"_id": qnumber})
    return document

async def fetch_many_questions(maxQuestions):
    # Only return maxQuestions from the database in random order
    questions = []
    # Fetch all questions from DB
    collection = database.question
    cursor = collection.find({})
    async for document in cursor:
        questions.append(DemoQuestion(**document))
    # Generate a random list of maxQuestions questions from all questions in DB
    totalQuestions = len(questions)
    if (maxQuestions > 0):
        randomlist = random.sample(range(0, totalQuestions), maxQuestions )
    else:
        randomlist = random.sample(range(0, totalQuestions), totalQuestions)
    new_questions = list(map(questions.__getitem__, randomlist))

    return new_questions

# Create and register new user in DB, record startTime and return car id assigned to this user
async def create_user(email: str, first: str, last: str):
    collection = database.user
    user_in_db = await collection.find_one({"email": email.lower()})
    if( user_in_db ):
        print(f'User with email={email} already exists in database')
        return {}
    document = { "_id": get_uuid(), "email": email.lower(), "first": first, "last": last }
    result = await collection.insert_one(document)
    return { result }

async def fetch_user_by_email(email: str):
    collection = database.user
    document = await collection.find_one({"email": email.lower()})
    return document

async def fetch_all_cars():
    cars = []
    collection = database.car
    cursor = collection.find({})
    async for document in cursor:
        cars.append(Car(**document))
    return cars
    
async def find_next_car_available(email: str):
    collection = database.car
    car = await collection.find_one({"start": null})
    return car

async def update_car_info(number: int, userid: str):
    collection = database.car
    filter = { 'number': number }
    epoch = get_time()
    await collection.update_one(filter, {"$set": {"userid": userid}}) 
    await collection.update_one(filter, {"$set": {"start": epoch}})
    document = await collection.find_one(filter)
    return document