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
        list = []
        for item in result:
            list.append(
            {
                "name": item.name,
                "image": item.image,
                "body": item.body,
                "body_html": item.body_html,
                "value": item.value

            })
        return jsonify(
            list
        ), 200
    return jsonify({}), 401