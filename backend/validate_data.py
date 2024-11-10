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
                'end_time': str,
                'latitude': And(float, lambda x: 42.3200 <= float(x) <= 42.3500),
                'longitude': And(float, lambda x: -72.0000 <= float(x) <= -71.0000),
                'location': And(str, lambda n: 1 <= len(n) <= 100)
            }
        )
    
    def is_valid_event(self, event_data):
        try:
            valid = self.eventSchema.validate(event_data)
            return valid
        except Exception as e:
            print(event_data)
            raise InvalidDataError("Data is bad")
    
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
    "end_time": "09:22",
    "longitude": 32.34,
    "latitude": 42.33701720166709,
    "location": "west f"
}
