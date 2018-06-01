from flask import jsonify

from . import *


@main.route('/')
def index():
    return jsonify({}), 200

