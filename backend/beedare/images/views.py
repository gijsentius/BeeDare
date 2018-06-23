import os

import flask
import sqlalchemy
from flask import jsonify, request, send_from_directory

from beedare import db
from beedare.models import User, Dare, Hive, ColonyMembers
from . import *

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def allowed_image_format(image):
    return '.' in image and \
           image.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@image_blueprint.route('', methods=["POST"])
def store():
    from manage import app

    image = request.files.get('image', '')
    name = request.form.get('name')
    folder = request.form.get('folder')
    if name is not None and type(image) is not str:
        try:
            if image.filename != '' and allowed_image_format(image.filename):
                newImage = name.lower() + '.' + image.filename.rsplit('.', 1)[1].lower()
                image.save(os.path.join(app.config["UPLOAD_ROOT"], 'images/' + folder, newImage))
                user = db.session.query(User).filter_by(username=name).first()
                user.image = newImage
                db.session.add(user)
                db.session.commit()
                return jsonify({
                    "image_name": image.filename,
                    "success": True
                }), 200
        except KeyError as e:
            return jsonify({"error": str(e) + " not given or invalid"}), 401
        except sqlalchemy.exc.IntegrityError:
            return jsonify({"error": "commit failed"}), 401
    return jsonify({"error": "'user' not given or invalid"}), 401


@image_blueprint.route('/<imageName>/<folder>', methods=["GET"])
def retrieve(imageName, folder):
    from manage import app

    try:
        return send_from_directory(os.path.join(app.config['UPLOAD_ROOT'], 'images/' + folder), imageName), 200
    except Exception as e:
        return jsonify({"error": "Image could not be found"}), 410
