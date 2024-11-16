from notification import FreeNUEmailer

EMAILER = FreeNUEmailer()
db_file = "events.db"
event_test = {"title": "diddy party", "description": "fweh!", "location": "westf", "end time": "3:30"}

EMAILER.massSend(event_test)

