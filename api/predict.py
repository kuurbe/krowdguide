from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor

app = FastAPI()

# Load your data
df = pd.read_csv("data/your_data.csv")
features = ["hour", "weather_score", "event_score"]
target = "foot_traffic"

X = df[features]
y = df[target]
model = RandomForestRegressor()
model.fit(X, y)

class Input(BaseModel):
    hour: int
    weather_score: float
    event_score: float

@app.post("/")
def predict(data: Input):
    pred = model.predict([[data.hour, data.weather_score, data.event_score]])
    return {"predicted_foot_traffic": int(pred[0])}