from flask import request, redirect, url_for, session

from backend.beedare.models import User
from . import *


@auth_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None

        if not username:
            error = "No username given."
        elif not password:
            error = "No password given."
        if error is None:
            # TODO fix query
            # TODO return JSON
            result = session.query(User).filter_by(email=username).first()
            if result is not None:
                if result.password == password:
                    session.clear()
                    session['id'] = result.id
                    return redirect(url_for('/profile/user'))
                else:
                    error = "Password incorrect"
        return error
    return "Login"


@auth_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        email = request.form['email']
        password = request.form['password']
        error = None

        if not firstname:
            error = "No first name given."
        elif not lastname:
            error = "No last name given."
        elif not password:
            error = "No password given."
        elif not email:
            error = "No email given."
        if error is None:
            # TODO fix query
            # TODO return JSON
            result = session.query(User).filter_by(email=email).first()
            if result is not None:
                error = "Email already registered."
            else:
                # TODO register
                return "Register successful but not registered"
        return error

    return "Register"
