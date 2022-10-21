from fastapi import FastAPI
import psycopg

app = FastAPI()
db = psycopg.connect(dbname="oldies", user="postgres", password="postgres")
cursor = db.cursor()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.put("/finance/insert?username={username}&account={account}&amount={amount}&branch={branch}")
async def insert_finance(username: str, account: str, amount: int, branch: str):
    try:
        cursor.execute("INSERT INTO finance (username, account, amount, branch) VALUES (%s, %s, %s, %s) WHERE username = %s", (username, account, amount, branch, username))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}

@app.patch("/finance/update?username={username}&account={account}&amount={amount}&branch={branch}")
async def update_finance(username: str, account: str, amount: int, branch: str):
    try:
        cursor.execute("UPDATE finance SET account = %s, amount = %s, branch = %s WHERE username = %s", (account, amount, branch, username))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}

@app.delete("/finance/delete?username={username}&account={account}")
async def delete_finance(username: str, account: str):
    try:
        cursor.execute("DELETE FROM finance WHERE username = %s AND account = %s", (username, account))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}

@app.get("/finance/select?username={username}")
async def select_finance(username: str):
    try:
        cursor.execute("SELECT * FROM finance WHERE username = %s", (username,))
        return {"state":"Success", "data":cursor.fetchall()}
    except:
        return {"state": "Failed"}

