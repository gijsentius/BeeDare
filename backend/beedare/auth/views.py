from . import *


@auth.route('/login')
def sign():
    return "Login"


@auth.route('/register')
def register():
    return "Register"
