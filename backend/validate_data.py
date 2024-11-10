from schema import Schema, And, Use, Optional, SchemaError
import datetime
import re

class InvalidDataError(Exception):
    def __init__(self, message, data=None):
        self.message = message
        self.data = data  # Optional attribute to store the data causing the error
        super().__init__(self.message)



class DataValidator():
    def __init__(self):
        self.eventSchema = Schema(
            {
                "title": And(str, lambda n: 1 <= len(n) <= 100),
                "description": And(str, lambda n: 1 <= len(n) <= 200),
                'end_time': And(self.validate_end_time, error="End time must be within 24 hours from now."),
                'longitude': And(float, lambda x: 32.3200 <= x <= 32.3500),
                'latitude': And(float, lambda x: -71.0700 <= x <= -71.0100),
                'location': And(str, lambda n: 1 <= len(n) <= 100)
            }
        )
    
    def is_valid_event(self, event_data):
        try:
            valid = self.eventSchema.validate(event_data)
            return valid
        except Exception as e:
            print("Invalid data", e)
    
    def validate_end_time(self, end_time):
        now = datetime.datetime.now()
        in_24_hours = now + datetime.timedelta(hours=24)
        return now <= end_time <= in_24_hours


def is_valid_email(email):
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(email_regex, email))

testEvent = {
    "title": "Birthday Party", 
    "description": "Fun and cake",
    "end_time": datetime.datetime.now() + datetime.timedelta(hours=1),
    "longitude": 32.34,
    "latitude": -71.05,
    "location": "west f"
}

print(validate_end_time(datetime.datetime.now() + datetime.timedelta(hours=1)))

print(eventSchema.validate(testEvent))