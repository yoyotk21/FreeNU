from flask import Flask, request
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<h1>Nate's going to the diddy party</h1>"

@app.route("/events", methods = ["GET", "POST"])
def events():
    with open("../events/events.json", "r") as f:
        data = json.loads(f.read())

    if request.method == "GET":

        return data[request.args["event"]]
    elif request.method == "POST":
        with open("../events/events.json", "w") as f:
            data[request.args["event"]] = "new data"

            f.write(json.dumps(data))
        return "success"


