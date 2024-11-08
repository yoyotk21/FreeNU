import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText

class FreeNUEmailer:
    def __init__(self):
        self.mailServer = smtplib.SMTP('smtp.gmail.com', 587)
        self.address = "freenortheastern@gmail.com"
        self.mailServer.starttls()
        self.mailServer.login("freenortheastern", "fortniteballs")

    def genMessage(event):
        msg = EmailMessage()
        msg["Subject"] = f"FreeNU: {event["title"]} at {event["location"]}!"
        msg["From"] = self.address 
        bodyText = f"""<pre>New Event has been posted!"
        {event["title"]}
        Description:{event["description"]}
        End Time: {event["end time"]}
        Location: {event["location"]}
        
        View it now on <a href="https://freenudomain.com">FreeNU</a<</pre>"""
        htmlBody = MIMEText(bodyText, 'html')
        msg.set_content(htmlBody)
        return msg

    # title, description, end time, location, lat, long
    def massSend(self, event, emails):
        message = self.genMessage(event)
        for address in emails:
            self.sendMessage(message, address)

    def sendMessage(self, message, recipient):
        # Convert event to message
        message["TO"] = recipient
        self.mailServer.sendmail(self.address, recipient)

