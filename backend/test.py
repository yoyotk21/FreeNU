import requests

url = "http://127.0.0.1:5000/modify-events"

print(requests.get("http://127.0.0.1:5000/modify-events", {"name": "new event"}).text)
