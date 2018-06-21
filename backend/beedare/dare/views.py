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
        list = []
        for item in result:
            list.append(
            {
                "name": item.name,
                "id": item.id,
                "images": item.image,
                "body": item.body,
                "body_html": item.body_html,
                "value": item.value

            })
        return jsonify(
            list
        ), 200
    return jsonify({}), 401

@dares_blueprint.route('/delete/<dareid>')
def delete_dare(dareid):
    try:
        dare = Dare.query.filter_by(id=dareid).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if dare is not None:
        db.session.delete(dare)
        db.session.commit()
        return jsonify(
            {"result": "It worked! Dare is deleted"}
        ), 200
    return jsonify({}), 401