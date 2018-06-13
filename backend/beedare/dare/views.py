@dares_blueprint.route('/', methods=["GET"])
def show_dares():
    return jsonify({}), 200