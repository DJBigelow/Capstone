
from fastapi import FastAPI, Request, HTTPException, exceptions, responses, encoders

from src.directory.routers import (
    change_detection_router,
    employee_router,
    buildings_router,
    departments_router,
    pending_change_router
)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(change_detection_router.router)
app.include_router(employee_router.router)
app.include_router(buildings_router.router)
app.include_router(departments_router.router)
app.include_router(pending_change_router.router)