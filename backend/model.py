from typing import Optional
from datetime import datetime
from uuid import uuid4
from pydantic import BaseModel, Field
from utils import get_time, get_uuid
from time import time
    
class DemoQuestion(BaseModel):
    _id: str
    answer: str
    prompt: Optional[str]
    weight: Optional[int]
    filename: str

class User(BaseModel):
    email: str
    first: str
    last: str

    
class Car(BaseModel):
    _id: str
    number: int
    ip: str
    position: int
    start: Optional[int]
    end: Optional[int]
    userid: Optional[str]
    