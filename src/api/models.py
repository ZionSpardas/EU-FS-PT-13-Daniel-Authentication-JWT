from flask_sqlalchemy import SQLAlchemy
from hmac import compare_digest

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    confirm_password = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)

    def __repr__(self):
        return f'User {self.email}'

    def check_password(self, password):
        return compare_digest(password, self.password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
            # do not serialize the password, it's a security breach
        }