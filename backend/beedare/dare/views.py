from . import *

@dares_blueprint.route('/', methods=["GET"])
def show_dares():
    try:
        result = db.session.query(User).all()
    except KeyError as e:
        return jsonify({"error": str(e) + " not given or invalid"}), 401
    if result is not None:
        return jsonify({
            "result": [[item.name, item.image, item.body, item.body_html, item.value] for item in result]
        }), 200
    return jsonify({}), 401