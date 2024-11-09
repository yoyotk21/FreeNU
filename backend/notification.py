import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from collections import defaultdict


class SafeDict(dict):
    def __missing__(self, key):
        return '{' + key + '}'

class FreeNUEmailer:
    def __init__(self):
        self.mailServer = smtplib.SMTP('smtp.gmail.com', 587)
        self.address = "freenortheastern@gmail.com"

    def genMessage(self, event):
        msg = EmailMessage()
        msg["Subject"] = f"FreeNU: {event["title"]} at {event["location"]}!"
        msg["From"] = self.address 
        bodyText = self.generate_event_email(event)
        htmlBody = MIMEText(bodyText, 'html')
        msg.set_content(htmlBody)
        return msg

    def generate_event_email(self, event):
        with open('/Users/henry/Desktop/FreeNU/FreeNU/backend/emailTemplate.txt', 'r') as file:
            html_template = file.read()
        return html_template.format(            
            event_name = event["title"],
            event_description = event["description"],
            event_end_time = event["end time"],
            event_location = event["location"])
    
    def massSend(self, event, emails):
        self.mailServer.starttls()
        self.mailServer.login("freenortheastern", "ltfq fjln jytd yuyv")
        message = self.genMessage(event)
        for address in emails:
            self.sendMessage(message, address)
        self.mailServer.quit()

    def sendMessage(self, message, recipient):
        try:
        # Convert event to message
            del message["TO"]
            message["TO"] = recipient
            self.mailServer.send_message(message)
        except SMTPException:
            print(f"Problem with SMTP Server, could not send {mesage["Subhect"]} message to {recipient}")


