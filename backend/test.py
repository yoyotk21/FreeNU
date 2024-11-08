from notification import FreeNUEmailer

EMAILER = FreeNUEmailer()

event_test = {"title": "diddy party", "description": "hehehheha", "location": "diddy mansion", "end time": "4:40"}

EMAILER.massSend(event_test, ["sambaldwin2005@gmail.com", "yoyotk21@gmail.com"])

