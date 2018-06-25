import os
from models import User, Dare
from neomodel import config


class Connection():
    def __init__(self):
        config.DATABASE_URL = os.environ.get("NEO4J_DATABASE_URL")

    def create_user(self, username):
        new_user = User(username).save()

    def create_dare(self, code):
        new_dare = Dare(code)

    def completed_dare(self, username, dare):
        try:
            user = User.nodes.get(username)
            dare = Dare.nodes.get(dare)
            user.completed_dare.connect(dare)
        except User.DoesNotExist:
            pass
        except Dare.DoesNotExist:
            pass

    def started_dare(self, username, dare):
        try:
            user = User.nodes.get(username)
            dare = Dare.nodes.get(dare)
            user.started_dare.connect(dare)
        except User.DoesNotExist:
            pass
        except Dare.DoesNotExist:
            pass

    def get_completed_dares(self, username):
        try:
            user = User.nodes.get(username)
            return user.completed_dare.all()
        except User.DoesNotExist:
            pass

    def get_started_dares(self, username):
        try:
            user = User.nodes.get(username)
            return user.started_dare.all()
        except User.DoesNotExist:
            pass

    def get_users_completed(self, dare):
        try:
            dare = Dare.nodes.get(dare)
            return dare.started_dare.all()
        except Dare.DoesNotExist:
            pass

    def get_users_started(self, dare): 
        try:
            dare = Dare.nodes.get(dare)
            return dare.completed_dare.all()
        except Dare.DoesNotExist:
            pass