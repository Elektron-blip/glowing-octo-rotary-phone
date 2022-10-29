from os import getenv

from fastapi import FastAPI, Query
from starlette.middleware.cors import CORSMiddleware
from psycopg import connect
from psycopg.conninfo import conninfo_to_dict
from psycopg.types.json import Jsonb

app: FastAPI = FastAPI()
db = connect(**conninfo_to_dict(getenv("DATABASE_URL")),autocommit=True) #type: ignore
cursor = db.cursor()

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Hello World"}


@app.get("/finance/select")
async def select_finance(username: str):
    try:
        cursor.execute("SELECT * FROM finance WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchone()}
    except:
        return {"state": "Failed"}


@app.put(
    "/finance/insert"
)
async def insert_finance(username: str, data: str):
    try:
        cursor.execute(
            "INSERT INTO finance (username, data) VALUES (%s, %s)",
            (username, Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]])))
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch(
    "/finance/update"
)
async def update_finance(username: str, data: str):
    try:
        cursor.execute(
            "UPDATE finance SET data = %s WHERE username = %s",
            (Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]])), username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("/finance/delete")
async def delete_finance(username: str):
    try:
        cursor.execute(
            "DELETE FROM finance WHERE username = %s",
            (username,),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("/alarms/select")
async def select_alarms(username: str):
    try:
        cursor.execute("SELECT * FROM alarms WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchone()}
    except:
        return {"state": "Failed"}


@app.put("/alarms/insert")
async def insert_alarms(username: str, alarms: list[str]=Query()):
    try:
        cursor.execute(
            "INSERT INTO alarms (username, alarms) VALUES (%s, %s)",
            (username, alarms),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch("/alarms/update")
async def update_alarms(username: str, alarms: list[str]=Query()):
    try:
        cursor.execute("UPDATE alarms SET alarms = %s WHERE username = %s",
                       (alarms, username))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("/alarms/delete")
async def delete_alarms(username: str):
    try:
        cursor.execute("DELETE FROM alarms WHERE username = %s", (username, ))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("/medicines/select")
async def select_medicines(username: str):
    try:
        cursor.execute("SELECT * FROM medicines WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchall()}
    except:
        return {"state": "Failed"}


@app.put(
    "/medicines/insert"
)
async def insert_medicines(username: str, data:str):
    try:
        #cursor.execute(
        #    "INSERT INTO medicines (username, medicines, dose, time, inventory) VALUES (%s, %s, %s, %s, %s)",
        #    (username, medicine, dose, time, inventory),
        #)
        cursor.execute("INSERT INTO medicines (username, data) VALUES (%s, %s)", (username, Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]]))))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch(
    "/medicines/update"
)
async def update_medicines(username: str, data: str):
    try:
        cursor.execute(
            "UPDATE medicines SET data = %s WHERE username = %s",
            (Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]])), username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("/medicines/delete")
async def delete_medicines(username: str):
    try:
        cursor.execute(
            "DELETE FROM medicines WHERE username = %s",
            (username),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("/emergency/select")
async def select_emergency(username: str):
    try:
        cursor.execute("SELECT * FROM emergency WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchall()}
    except:
        return {"state": "Failed"}


@app.put("/emergency/insert")
async def insert_emergency(username: str, numbers: list[int]=Query()):
    try:
        cursor.execute(
            "INSERT INTO emergency (username, numbers) VALUES (%s, %s)",
            (username, numbers),
        )
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.patch("/emergency/update")
async def update_emergency(username: str, numbers: list[int]= Query()):
    try:
        cursor.execute("UPDATE emergency SET numbers = %s WHERE username = %s",
                       (numbers, username))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.delete("/emergency/delete")
async def delete_emergency(username: str):
    try:
        cursor.execute("DELETE FROM emergency WHERE username = %s",
                       (username, ))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}


@app.get("/birthdays/select")
async def select_birthdays(username: str):
    try:
        cursor.execute("SELECT * FROM birthdays WHERE username = %s",
                       (username, ))
        return {"state": "Success", "data": cursor.fetchone()}
    except:
        return {"state": "Failed"}


@app.put("/birthdays/insert")
async def insert_birthdays(username: str, data: str):
    try:
        cursor.execute(
            "INSERT INTO birthdays (username, data) VALUES (%s, %s)",
            (username, Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]]))),
        )
        return {"state": "Success"}
    except BaseException as e:
        print(e)
        return {"state": "Failed"}


@app.patch("/birthdays/update")
async def update_birthdays(username: str, data: str):
    try:
        cursor.execute("UPDATE birthdays SET data = %s WHERE username = %s",
                       (Jsonb(dict([(i[0][1:-1], i[1][1:-1]) for i in [j.split(":") for j in data.replace(" ","")[1:-1].split(",")]])), username))
        return {"state": "Success"}
    except Exception as e:
        print(e)
        return {"state": "Failed"}


@app.delete("/birthdays/delete")
async def delete_birthdays(username: str):
    try:
        cursor.execute("DELETE FROM birthdays WHERE username = %s",
                       (username, ))
        return {"state": "Success"}
    except:
        return {"state": "Failed"}
