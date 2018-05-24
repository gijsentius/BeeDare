from . import *


@auth_blueprint.route('/login')
def login():
    return "Login"


@auth_blueprint.route('/register')
def register():
    return "Register"
