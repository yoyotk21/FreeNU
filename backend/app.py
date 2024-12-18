from flask import Flask, request
from helpers import remove_expired_events, is_past_time
import json
import time

app = Flask(__name__)


@app.route("/")
def hello_world():
    with open("../frontend/index.html", "r") as f:
        return f.read()

@app.route("/app.js")
def get_js():
    with open("../frontend/app.js", "r") as f:
        return f.read()

@app.route("/get-events", methods=["GET"])
def get_events():
    remove_expired_events()
    with open("../events/events.json", "r") as f:
        return f.read()

@app.route("/modify-events", methods=["POST", "DELETE"])
def modify_events():
    with open("../events/events.json", "r") as f:
        data = json.loads(f.read())

    if request.method == "POST":
        # basically request.form is the data so we manually add to data dictionary and add
        # to events file
        new_data = json.loads(request.data)
        data.append(new_data)
        with open("../events/events.json", "w") as f:
            f.write(json.dumps(data))
        return "success"
    elif request.method == "DELETE":
        # some checks and then delete the event associated with request.args["name"]
        data.remove(request.data)
        return "success"


