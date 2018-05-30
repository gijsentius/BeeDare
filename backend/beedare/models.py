import datetime

from backend.beedare import db


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
    status = db.Column(db.String(50))
    username = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(500))
    # PASSWORD MOET NOG AANGEPAST WORDEN ZODAT HET BEVEILIGD IS
    email = db.Column(db.String(120), unique=True)
    title = db.Column(db.String(500))
    rank = db.Column(db.String(500))

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
class Message(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.now())
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comments = db.relationship('Comment', backref='post', lazy='dynamic') # lazy??? backref???


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    body = db.Column(db.Text)
    body_html = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.now())
    disabled = db.Column(db.Boolean)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))


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


