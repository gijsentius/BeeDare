import datetime
from flask import current_app, request, url_for
from itsdangerous import TimedSerializer

from backend.beedare import db
from werkzeug.security import generate_password_hash, check_password_hash


# # Een klasse die aangeeft wat voor permissies iemand kan hebben
# class Permission:
#     FOLLOW = 1
#     COMMENT = 2
#     WRITE = 4
#     MODERATE = 8
#     ADMIN = 16


class Friends(db.Model):
    __tablename__ = 'friends'
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)  #ID is de primary_key
    first_name = db.Column(db.String(30), unique=True)  # 30 character genoeg?
    last_name = db.Column(db.String(40), unique=True)
    age_cat = db.Column(db.String(50))  # ageCat staat voor ageCategory. Bijvoorbeeld 5-10 15-20 etc...
    location = db.Column(db.String(120))
    image = db.Column(db.String(500))  # 500??
    score = db.Column(db.Integer)
    last_seen = db.Column(db.String(50))
    username = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(500))
    # password wordt als een hash opgeslagen
    email = db.Column(db.String(120), unique=True)
    confirmed = db.Column(db.Boolean, default=False)
    title = db.Column(db.String(500))
    rank = db.Column(db.String(500))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_confirmation_token(self):
        s = TimedSerializer(current_app.config['SECRET_KEY'], 'confirmation')  # Secret_key wordt nog toegevoegd in .env file
        return s.dumps(self.id)

    def check_confirmation(self, token, expiration=3600):
        s = TimedSerializer(current_app.config['SECRET_KEY'], 'confirmation')
        return s.loads(token, max_age=expiration) == self.id

    def confirm(self):
        self.confirmed = True

    def ping(self):
        self.last_seen = datetime.time
        db.session.add(self)

    def to_json(self):
        json_user = {
            'url': url_for('api.get_user', id=self.id),  # ????
            'username': self.username,
            'member_since': self.member_since,
            'last_seen': self.last_seen,
            'posts_url': url_for('api.get_user_posts', id=self.id),  # ?????
            'followed_posts_url': url_for('api.get_user_followed_posts',  # ????
                                          id=self.id),
            'post_count': self.posts.count()
        }
        return json_user

    def __init__(self, name=None, email=None):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<User %r>' % (self.first_name)


# source: https://github.com/miguelgrinberg/flasky/blob/master/app/models.py
class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.now())
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comments = db.relationship('Comment', backref='post', lazy='dynamic')  # lazy??? backref???

    def to_json(self):
        json_post = {
            'url': url_for('api.get_post', id=self.id),
            'body': self.body,
            'body_html': self.body_html,
            'timestamp': self.timestamp,
            'author_url': url_for('api.get_user', id=self.author_id),
            'comments_url': url_for('api.get_post_comments', id=self.id),
            'comment_count': self.comments.count()
        }
        return json_post


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.now())
    disabled = db.Column(db.Boolean)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    def to_json(self):
        json_post = {
            'url': url_for('api.get_post', id=self.id),
            'body': self.body,
            'body_html': self.body_html,
            'timestamp': self.timestamp,
            'author_url': url_for('api.get_user', id=self.author_id),
            'comments_url': url_for('api.get_post_comments', id=self.id),
            'comment_count': self.comments.count()
        }
        return json_post


class Dare(db.Model):
    __tablename__ = 'dares'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), unique=True)  # een Dare moet uniek zijn
    image = db.column(db.String(500))
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)


class UserDares(db.Model):
    __tablename__ = 'userdares'
    id = db.Column(db.ForeignKey('dares.id'), primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    achieved = db.Column(db.Boolean)


class Hive(db.Model):
    __tablename__ = 'hives'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    hive_name = db.Column(db.String(30), unique=True)
    image = db.Column(db.String(500))
    total_score_members = db.Column(db.Integer)
    beekeeper = db.Column(db.ForeignKey('users.id'))  # beekeeper is de hive eigenaar


class ColonyMembers(db.Model):
    __tablename__ = 'colonymembers'
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                            primary_key=True)
    hive_id = db.Column(db.Integer, db.ForeignKey('hives.id'),
                            primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())


