import json, time

def remove_expired_events():
    with open("../events/events.json", "r") as f1:
        data = json.loads(f1.read())
    with open("../events/events_archive.json", "r") as f2:
        archive = json.loads(f2.read())

    for event in data:
        print(event)
        if is_past_time(event["endTime"]):
            data.remove(event)
            archive.append(event)

    with open("../events/events.json", "w") as f1:
        f1.write(json.dumps(data))
    with open("../events/events_archive.json", "w") as f2:
        f2.write(json.dumps(archive))


def is_past_time(timeStr):
    now = time.localtime()
    eTime = time.strptime(timeStr, "%H:%M")
    return (now.tm_hour > eTime.tm_hour or (now.tm_hour == eTime.tm_hour and now.tm_min > eTime.tm_min))
