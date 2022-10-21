from os import getenv

from fastapi import FastAPI
from psycopg import connect
from psycopg.types.json import Jsonb

app: FastAPI = FastAPI()
db = connect(
    dbname=getenv("DB_NAME"),
    user=getenv("DB_USER"),
    password=getenv("DB_PASS"),
    host=getenv("DB_HOST"),
    port=int(getenv("DB_PORT")), # type:ignore
)
cursor = db.cursor()


@app.get("/")
async def read_root():
    return {"message": "Hello World"}


@app.get("/finance/select?username={username}")
async def select_finance(username: str):
    try:
        cursor.execute("SELECT * FROM finance WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchall()}
    except:
        return {"state": "Failed"}


@app.put(
    "/finance/insert?username={username}&account={account}&amount={amount}&branch={branch}"
)
async def insert_finance(username: str, account: str, amount: int,
                         branch: str):
    try:
        cursor.execute(
            "INSERT INTO finance (username, account, amount, branch) VALUES (%s, %s, %s, %s) WHERE username = %s",
            (username, account, amount, branch, username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch(
    "/finance/update?username={username}&account={account}&amount={amount}&branch={branch}"
)
async def update_finance(username: str, account: str, amount: int,
                         branch: str):
    try:
        cursor.execute(
            "UPDATE finance SET account = %s, amount = %s, branch = %s WHERE username = %s",
            (account, amount, branch, username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("/finance/delete?username={username}&account={account}")
async def delete_finance(username: str, account: str):
    try:
        cursor.execute(
            "DELETE FROM finance WHERE username = %s AND account = %s",
            (username, account),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("/alarms/select?username={username}")
async def select_alarms(username: str):
    try:
        cursor.execute("SELECT * FROM alarms WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchall()}
    except:
        return {"state": "Failed"}


@app.put("/alarms/insert?username={username}&alarms={alarm}")
async def insert_alarms(username: str, alarm: str):
    alarms: "list[str]" = alarm[1:-1].split(",")
    try:
        cursor.execute(
            "INSERT INTO alarms (username, alarms) VALUES (%s, %s) WHERE username = %s",
            (username, alarms, username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch("/alarms/update?username={username}&alarms={alarm}")
async def update_alarms(username: str, alarm: str):
    alarms: "list[str]" = alarm[1:-1].split(",")
    try:
        cursor.execute("UPDATE alarms SET alarms = %s WHERE username = %s",
                       (alarms, username))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("/alarms/delete?username={username}")
async def delete_alarms(username: str):
    try:
        cursor.execute("DELETE FROM alarms WHERE username = %s", (username, ))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("/medicines/select?username={username}")
async def select_medicines(username: str):
    try:
        cursor.execute("SELECT * FROM medicines WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchall()}
    except:
        return {"state": "Failed"}


@app.put(
    "/medicines/insert?username={username}&medicines={medicine}&dose={dose}&time={time}&inventory={inventory}"
)
async def insert_medicines(username: str, medicine: str, dose: str, time: str,
                           inventory: int):
    try:
        cursor.execute(
            "INSERT INTO medicines (username, medicines, dose, time, inventory) VALUES (%s, %s, %s, %s, %s) WHERE username = %s",
            (username, medicine, dose, time, inventory, username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch(
    "/medicines/update?username={username}&medicines={medicine}&dose={dose}&time={time}&inventory={inventory}"
)
async def update_medicines(username: str, medicine: str, dose: str, time: str,
                           inventory: int):
    try:
        cursor.execute(
            "UPDATE medicines SET medicines = %s, dose = %s, time = %s, inventory = %s WHERE username = %s",
            (medicine, dose, time, inventory, username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("/medicines/delete?username={username}&medicines={medicine}")
async def delete_medicines(username: str, medicine: str):
    try:
        cursor.execute(
            "DELETE FROM medicines WHERE username = %s AND medicines = %s",
            (username, medicine),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("/emergency/select?username={username}")
async def select_emergency(username: str):
    try:
        cursor.execute("SELECT * FROM emergency WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchall()}
    except:
        return {"state": "Failed"}


@app.put("emergency/insert?username={username}&number={number}")
async def insert_emergency(username: str, number: str):
    try:
        cursor.execute(
            "INSERT INTO emergency (username, number) VALUES (%s, %s) WHERE username = %s",
            (username, number, username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch("emergency/update?username={username}&number={number}")
async def update_emergency(username: str, number: str):
    try:
        cursor.execute("UPDATE emergency SET number = %s WHERE username = %s",
                       (number, username))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("emergency/delete?username={username}")
async def delete_emergency(username: str):
    try:
        cursor.execute("DELETE FROM emergency WHERE username = %s",
                       (username, ))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("birthdays/select?username={username}")
async def select_birthdays(username: str):
    try:
        cursor.execute("SELECT * FROM birthdays WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchone()}
    except:
        return {"state": "Failed"}


@app.put("birthdays/insert?username={username}&data={data}")
async def insert_birthdays(username: str, data: str):
    try:
        cursor.execute(
            "INSERT INTO birthdays (username, data) VALUES (%s, %s) WHERE username = %s",
            (username, Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]])), username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch("birthdays/update?username={username}&data={data}")
async def update_birthdays(username: str, data: str):
    try:
        cursor.execute("UPDATE birthdays SET data = %s WHERE username = %s",
                       (Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]])), username))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("birthdays/delete?username={username}")
async def delete_birthdays(username: str):
    try:
        cursor.execute("DELETE FROM birthdays WHERE username = %s",
                       (username, ))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}
