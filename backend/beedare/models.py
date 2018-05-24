import datetime

from sqlalchemy import Column, Integer, String
from backend.beedare.database import db


class Follow(db.Model):
    __tablename__ = 'follows'
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())


class User(db.model):
    __tablename__ = 'users'
    id = db.column(db.String(50), primary_key=True, unique=True)  #ID is de primary_key
    first_name = db.column(db.String(30), unique=True)  # 30 character genoeg?
    last_name = db.column(db.String(40), unique=True)
    age_cat = db.column(db.String(50))  # ageCat staat voor ageCategory. Bijvoorbeeld 5-10 15-20 etc...
    location = db.column(db.String(120))
    image = db.column(db.String(500))  # 500??
    score = db.column(db.Integer)
    status = db.column(db.String(50))
    username = db.column(db.String(120), unique=True)
    password = db.column(db.String(500))
    # PASSWORD MOET NOG AANGEPAST WORDEN ZODAT HET BEVEILIGD IS
    email = db.column(db.String(120), unique=True)
    title = db.column(db.String(500))
    rank = db.column(db.String(500))

    def __init__(self, name=None, email=None):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<User %r>' % (self.name)


# source: https://github.com/miguelgrinberg/flasky/blob/master/app/models.py
class Message(db.model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.now())
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comments = db.relationship('Comment', backref='post', lazy='dynamic') #lazy??? backref???


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.now())
    disabled = db.Column(db.Boolean)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))


class Dare(db.model):
    __tablename__ = 'dares'
    id = db.Column(db.Integer, primary_key=True)
    image = db.column(db.String(500))
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    id = db.Column(db.Integer)


