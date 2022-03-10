from base64 import b64encode
import motor.motor_asyncio
from model import DemoQuestion

#DB_CONNECT_URL = 'mongodb://davidn:ciscopsdt@10.0.0.57:27017/'
DB_CONNECT_URL = 'mongodb://devnet:ciscopsdt@10.194.239.243:27017/'

client = motor.motor_asyncio.AsyncIOMotorClient(DB_CONNECT_URL)
database = client.DemoQuestion
collection = database.question


async def update_question(qnumber: str, order: int, answer: str, ):
    await collection.update_one({"_id": qnumber}, {"$set": {"order": order}}, {"$set": {"answer": answer}})
    document = await collection.find_one({"_id": qnumber})
    return document

async def remove_question(qnumber: str):
    await collection.delete_one({"_id": qnumber})
    return True

async def fetch_one_question(qnumber: str):
    document = await collection.find_one({"_id": qnumber})
    pict64 = b64encode(document['data']).decode("utf-8")
    document['data'] = pict64

    return document

async def fetch_all_questions():
    questions = []
    cursor = collection.find({})
    async for document in cursor:
       pict64 = b64encode(document['data']).decode("utf-8")
       document['data'] = pict64
       questions.append(DemoQuestion(**document))
    return questions