import requests

url = "http://127.0.0.1:5000/events"

requests.post(url, {"new event": "event description"})
requests.delete(url, params={"name": "new event"})