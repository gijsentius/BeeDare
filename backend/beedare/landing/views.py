from flask import jsonify

from . import *


@landing.route('/')
def landing():
    return jsonify({}), 200
