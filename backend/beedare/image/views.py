import os

import flask
import sqlalchemy
from flask import jsonify, request

from beedare import db
from beedare.models import User, Dare, Hive, ColonyMembers
from . import *


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def allowed_image_format(image):
    return '.' in image and \
           image.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@image_blueprint.route('/store', methods=["POST"])
def store():
    content = request.form.get('user_id')
    image = flask.request.files.get('image', '')
    name = request.form.get('name')
    try:
        result = db.session.query(User).filter_by(id=content).first()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None and name is not None and type(image) is not str:
        try:
            if image.filename != '' and allowed_image_format(image.filename):
                image.save(os.path.join(app.config["UPLOAD_FOLDER"], name + '.' + image.filename.rsplit('.', 1)[1].lower()))
                return jsonify({
                    "image_name": image.filename,
                    "success": True
                }), 200
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
    return jsonify({"error": "'user' not given or invalid"}), 401
