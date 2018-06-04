import sqlalchemy
from flask import jsonify


def commit(session):
    try:
        session.commit()
    except sqlalchemy.exc.IntegrityError:
        return jsonify({"error": "commit failed"}), 401
