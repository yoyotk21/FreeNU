from flask import Flask, request
import json

app = Flask(__name__)


@app.route("/")
def hello_world():
    with open("../event/events.json", "r") as f:
        return f.read()


@app.route("/events", methods=["GET", "POST", "DELETE"])
def events():
    with open("../events/events.json", "r") as f:
        data = json.loads(f.read())

    if request.method == "POST":
        # basically request.form is the data so we manually add to data dictionary and add
        # to events file
        for key in request.form:
            data[key] = request.form[key]
        with open("../events/events.json", "w") as f:
            f.write(json.dumps(data))
        return "success"
    elif request.method == "GET":
        # some checks and then return the event associated with request.args["name"]
        if "name" not in request.args:
            return "No name in get method"
        name = request.args["name"]
        if name not in data:
            return "No matching event to get"
        return data[request.args["name"]]
    elif request.method == "DELETE":
        # some checks and then delete the event associated with request.args["name"]
        if request.args["name"] not in data:
            return "No matching event to remove"
        data.pop(request.args["name"])
        with open("../events/events.json", "w") as f:
            f.write(json.dumps(data))
        return "success"

