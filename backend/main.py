from urllib import response
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi import status as statuscode
from fastapi.staticfiles import StaticFiles
from model import DemoQuestion, User, Car
import os

from database import (
    fetch_one_question,
    fetch_many_questions,
    create_user,
    fetch_user_by_email,
    fetch_all_cars,
    find_next_car_available,
    update_car_info,
)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Added to create path to static files for all question images
app.mount("/static", StaticFiles(directory="questions"),name="static")

@app.get("/")
async def read_root():
    return {"Hello": "World"}

# Maximum number of questions fetch from all questions in the DB, 0 will fetch all.
MAX_NUMBER_OF_QUESTIONS = 3

@app.get("/questions")
async def get_many_questions():
    response = await fetch_many_questions(MAX_NUMBER_OF_QUESTIONS)
    return response

@app.get("/questions/{id}}", response_model=DemoQuestion)
async def get_question_by_id(id):
    response = await fetch_one_question(id)
    if response:
        return response
    raise HTTPException(404, f"There is no question with number {id}")


@app.post("/user",
          description="Create a new user",
          response_model=User,
          status_code=statuscode.HTTP_201_CREATED
          )
async def register_a_user(email: str, first: str, last: str):
    response = await create_user(email, first, last)

@app.get("/user/{email}", 
         description="Query a user by email address",
         response_model=User)
async def get_user_by_email(email: str):
    response = await fetch_user_by_email(email)
    if ( response ):
        print(f'Name = {response["first"]} {response["last"]}')
        print(response["_id"])
    else:
        print("No user registered with email ",email)
    return response

@app.get("/cars")
async def get_all_cars():
    response = await fetch_all_cars()
    return response

@app.get("/cars/{email}",
         response_model=Car,
         description="Get the first car available for this user")
async def get_next_car_available(email: str):
    response = await fetch_all_cars()
    for item in response:
        car = item.__dict__
        if( car["start"] is None):
           print(f'Car id= {car["number"]} available')
           return car
    return {}

@app.put("/car/{number}",
         response_model=Car,
         description="Update car info with car number")
async def modify_car(number: int, userid: str ):
    response = await update_car_info(number,userid)
    if response:
        return response
    raise HTTPException(404, f"Can't update car info for car# {id}")
         