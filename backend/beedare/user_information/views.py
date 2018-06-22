from flask import jsonify, request
from flask_login import login_required

from beedare import db
from beedare.models import User
from . import *


@user_info_blueprint.route('/change', methods=["POST"])
def change():
    content = request.get_json()
    try:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        result = db.session.query(User).filter_by(id=content['user_id']).first()
        result.first_name = content['first_name']
        result.last_name = content['last_name']
        result.age_cat = content['age_cat']
        result.location = content['location']
        result.image = content['images']
        result.username = content['username']
        result.email = content['email']
        return jsonify({
            "first_name": content['first_name'],
            "last_name": content['last_name'],
            "age_cat": content['age_cat'],
            "location": content['location'],
            "images": content['images'],
            "username": content['username'],
            "email": content['email']
        }), 200
    else:
        return jsonify({"error": "Password incorrect"}), 401
