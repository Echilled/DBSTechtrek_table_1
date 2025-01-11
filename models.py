
from uuid import uuid4



def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    email = db.Column(db.String(345), unique=True)
    companyid = db.Column(db.Strng(300), unique=True)
    password = db.Column(db.Text, nullable=False)