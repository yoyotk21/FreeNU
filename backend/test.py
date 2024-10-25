import requests

url = "http://127.0.0.1:5000/events"

requests.post(url, {"another event": "event description"})
print(requests.get(url, params={"name": "another event"}).text)
requests.delete(url, params={"name": "another event"})
