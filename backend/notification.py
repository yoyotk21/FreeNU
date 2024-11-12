import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from collections import defaultdict


class FreeNUEmailer:
    def __init__(self):
        self.mailServer = smtplib.SMTP('smtp.gmail.com', 587)
        self.address = "freenortheastern@gmail.com"


    def massSend(self, event):
        self.mailServer.starttls()
        self.mailServer.login("freenortheastern", "ltfq fjln jytd yuyv")


        with sqlite3.connect(db_file) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users")
            users = [
                {"email": row[0], "id": row[1]}
                for row in cursor.fetchall()
            ]
        message = self.genMessage(event)
        for userObj in users:
            id = userObj["id"]
            email = userObj["email"]
            self.sendMessage(message, address)
        self.mailServer.quit()

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

    def sendMessage(self, message, recipient):
        try:
        # Convert event to message
            del message["TO"]
            message["TO"] = recipient
            self.mailServer.send_message(message)
        except SMTPException:
            print(f"Problem with SMTP Server, could not send {message["Subject"]} message to {recipient}")