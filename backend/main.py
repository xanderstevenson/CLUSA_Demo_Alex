from fastapi import FastAPI, HTTPException
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from model import DemoQuestion
import os

from database import (
    fetch_one_question,
    fetch_all_questions,
    update_question,
    remove_question,
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

templates = Jinja2Templates(directory="templates")


# Added to create path to static files for all question images
app.mount("/static", StaticFiles(directory="questions"),name="static")

app.mount("/templates", StaticFiles(directory="templates"),name="templates")

app.mount("/media", StaticFiles(directory="media"),name="media")

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api")
async def get__all_questions():
    response = await fetch_all_questions()
    return response

@app.get("/api/{id}}", response_model=DemoQuestion)
async def get_question_by_id(id):
    response = await fetch_one_question(id)
    if response:
        return response
    raise HTTPException(404, f"There is no question with number {id}")

@app.put("/api/{id}", response_model=DemoQuestion)
async def modify_question(id: int, order: int, answer: str):
    response = await update_question(id, answer)
    if response:
        return response
    raise HTTPException(404, f"There is no question with number {id}")

@app.delete("/api/{id}")
async def delete_question(id):
    response = await remove_question(id)
    if response:
        return "Successfully deleted question"
    raise HTTPException(404, f"There is no question with number {id}")