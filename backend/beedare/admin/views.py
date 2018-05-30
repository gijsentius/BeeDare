from flask import jsonify

from . import *


@admin.route('/')
def index():
    return jsonify({}), 200
