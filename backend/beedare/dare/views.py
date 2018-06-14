from beedare.dare import dares_blueprint

from flask import jsonify
from . import *
from beedare.models import Dare
from beedare import db
import sqlalchemy

@dares_blueprint.route('/', methods=["GET"])
def show_dares():
    try:
        result = db.session.query(Dare).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "body": [[item.body] for item in result],
            "value": [[item.value] for item in result],
            "images": [[item.image] for item in result]
        }), 200