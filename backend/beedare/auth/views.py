from flask import request, redirect, url_for

from backend.beedare import db
from backend.beedare.models import User
from . import *


@auth_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # TODO is this good?
        username = request.form['username']
        password = request.form['password']
        error = None

        if not username:
            error = "No username given."
        elif not password:
            error = "No password given."
        if error is None:
            result = db.session.query(User).filter_by(username=username).first()
            if result is not None:
                if result.password == password:
                    # TODO is this right?
                    db.session.clear()
                    db.session['id'] = result.id
                    # TODO return JSON
                    return redirect(url_for('/profile/user'))
                else:
                    error = "Password incorrect"
        return error
    return "Login"


@auth_blueprint.route('/register/<firstname>/<lastname>/<email>/<password>/<username>', methods=['GET', 'POST'])
def register(firstname, lastname, email, password, username):
    if request.method == 'POST':
        error = None

        if not firstname:
            error = "No first name given."
        elif not lastname:
            error = "No last name given."
        elif not password:
            error = "No password given."
        elif not email:
            error = "No email given."
        elif not username:
            error = "No uername given."
        if error is None:
            result = db.session.query(User).filter_by(email=email).first()
            if result is not None:
                error = "Email already registered."
            else:
                user = User()
                user.first_name = firstname
                user.last_name = lastname
                user.password = password
                user.email = email
                user.username = username
                db.session.add(user)
                db.session.commit()
                # TODO return JSON
                return "Register successful"
        return error

    return "Register"


@auth_blueprint.route('/logout')
def logout():
    db.session.clear()
    redirect(url_for('/login'))
