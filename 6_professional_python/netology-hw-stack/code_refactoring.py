import email
import smtplib
import imaplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.message import Message


class GmailMailer:

    GMAIL_SMTP_DATA = ("smtp.gmail.com", 587)
    GMAIL_IMAP = "imap.gmail.com"

    def __init__(self, email_address: str, pswd: str) -> None:
        self.__user_email = email_address
        self.__user_password = pswd

    def send_email(self, addressees: list[str],
                   subject: str,
                   text: str = "") -> None:
        message = self._create_message(addressees, subject, text)
        with smtplib.SMTP(*self.GMAIL_SMTP_DATA) as srv:
            srv.starttls()
            srv.login(self.__user_email, self.__user_password)
            srv.sendmail(self.__user_email, addressees, message.as_string())

    def receive_email(self, header: str | None) -> Message:
        with imaplib.IMAP4_SSL(self.GMAIL_IMAP) as mail:
            mail.login(self.__user_email, self.__user_password)
            mail.list()
            mail.select("inbox")
            criterion = '(HEADER Subject "%s")' % header if header else 'ALL'
            result, data = mail.uid('search', None, criterion)
            assert data[0], 'There are no letters with current header'
            latest_email_uid = data[0].split()[-1]
            result, data = mail.uid('fetch', latest_email_uid, '(RFC822)')
            raw_email = data[0][1]
            email_message = email.message_from_string(raw_email)
        return email_message

    def _create_message(self, addressees: list[str],
                        subject: str,
                        text: str = "") -> MIMEMultipart:
        message = MIMEMultipart()
        message["From"] = self.__user_email
        message["To"] = ', '.join(addressees)
        message["Subject"] = subject
        message.attach(MIMEText(text))
        return message


if __name__ == '__main__':
    log = 'login@gmail.com'
    password = 'qwerty'
    subject = 'Subject'
    recipients = ['vasya@email.com', 'petya@email.com']
    message = 'Message'
    header = None
    
    mailer = GmailMailer(log, password)
    mailer.send_email(recipients, subject, message)
    result = mailer.receive_email(header)
