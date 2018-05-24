from . import *


@landing.route('/')
def sign():
    return "Landing"


@login.route('/signIn')
def sign():
    return "Login"


@login.route('/register')
def register():
    return "Register"


@profile.route('/user')
def userpage():
    return "User"


@profile.route('/hive')
def hivepage():
    return "Hive"


@profile.route('/newsFeed')
def news():
    return "News feed"


@search.route('/search')
def search():
    return 'Search'


@col.route('/friends')
def friends():
    return 'Friends'


@col.route('/hives')
def friends():
    return 'Hives'


@col.route('/challenges')
def friends():
    return 'Challenges'
