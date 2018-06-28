import os
from .models import User, Dare
from neomodel import config


class Connection():
    def __init__(self):
        """Form a connection with a Neo4J database"""
        config.DATABASE_URL = os.environ.get("NEO4J_DATABASE_URL")
        # config.DATABASE_URL = 'bolt://test:test123@localhost:7687'

    def create_user(self, username):
        """Create a user in the database
        Keyword arguments:
        username -- the username of the user to create
        """
        new_user = User(username=username).save()

    def connect_users(self, username, friend_username):
        """Connect a user with another user
        Keyword arguments:
        username -- the username of the user to connect
        friend -- the username of the friend to connect to
        """
        try:
            user = User.nodes.get(username=username)
            friend = User.nodes.get(username=friend_username)
            user.friends.connect(friend)
        except User.DoesNotExist as e:
            print(e)
        except friend.DoesNotExist as e:
            print(e)

    def disconnect_users(self, username, friend_username):
        """Disconnect a user with another user
        Keyword arguments:
        username -- the username of the user to disconnect
        friend -- the username of the friend to disconnect with
        """
        try:
            user = User.nodes.get(username=username)
            friend = User.nodes.get(username=friend_username)
            user.friends.disconnect(friend)
        except User.DoesNotExist as e:
            print(e)
        except friend.DoesNotExist as e:
            print(e)

    def create_dare(self, code, score):
        """Create a dare in the database
        Keyword arguments:
        code -- the name or code of the dare to create
        """
        new_dare = Dare(code=code, score=score).save()

    def completed_dare(self, username, dare):
        """Connect a dare with a user
        Keyword arguments:
        username -- the username of the user to connect
        dare -- the dare to connect to
        """
        try:
            user = User.nodes.get(username=username)
            _dare = Dare.nodes.get(code=dare)
            user.completed_dare.connect(_dare)
        except User.DoesNotExist as e:
            print(e)
        except Dare.DoesNotExist as e:
            print(e)

    def get_completed_dares(self, username):
        """Get completed dares of a user
        Keyword arguments:
        username -- the username of the user
        """
        try:
            user = User.nodes.get(username=username)
            return user.completed_dare.all()
        except User.DoesNotExist as e:
            print(e)

    def get_users_completed(self, dare):
        """Get users who completed a dare
        Keyword arguments:
        dare -- the dare to check
        """
        try:
            _dare = Dare.nodes.get(code=dare)
            return _dare.started_dare.all()
        except Dare.DoesNotExist as e:
            print(e)

    def get_user_score(self, username):
        """Get the total score of a user
        Keyword arguments:
        username -- the username of the user
        """
        user = User.nodes.get(username=username)
        completed_dares = user.completed_dare.all()
        total = 0
        for dare in completed_dares:
            total += dare.score
        return total