from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#CORS policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, India @ Glance is running!"}

# Load events from JSON file
with open("events.json", "r") as file:
    events = json.load(file)

@app.get("/events")
def get_events():
    return events
