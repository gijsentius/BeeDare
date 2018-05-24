from . import *


@auth.route('/login')
def login():
    return "Login"


@auth.route('/register')
def register():
    return "Register"
