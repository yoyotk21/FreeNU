from notification import FreeNUEmailer

EMAILER = FreeNUEmailer()

event_test = {"title": "diddy party", "description": "fweh!", "location": "westf", "end time": "3:30"}

EMAILER.massSend(event_test, ["bednarzhenry@gmail.com"])

