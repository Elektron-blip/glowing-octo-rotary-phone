from fastapi import FastAPI
from psycopg import connect

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.post("/finance/update?username={username}&account={account}&amount={amount}&branch={branch}")
async def update_finance(username: str, account: str, amount: int, branch: str):
    return {"message": "Finance Updated"}