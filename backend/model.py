
import inspect
from typing import Dict, Type, TypeVar, Protocol, Generic, NewType, Optional
from pydantic import BaseModel
from fastapi import Form

    
def as_form(cls: Type[BaseModel]):
    """
    Adds an as_form class method to decorated models. The as_form class method
    can be used with FastAPI endpoints
    """
    new_params = [
        inspect.Parameter(
            field.alias,
            inspect.Parameter.POSITIONAL_ONLY,
            default=(Form(field.default) if not field.required else Form(...)),
        )
        for field in cls.__fields__.values()
    ]

    async def _as_form(**data):
        try:
            return cls(**data)
        except pydantic.ValidationError as e:
            raise fastapi.exceptions.RequestValidationError(e.raw_errors)

    sig = inspect.signature(_as_form)
    sig = sig.replace(parameters=new_params)
    _as_form.__signature__ = sig
    setattr(cls, "as_form", _as_form)
    return cls
    
@as_form
class DemoQuestion(BaseModel):
    _id: str
    order: int
    answer: str
    prompt: Optional[str]
    weight: Optional[int]
    filename: str
