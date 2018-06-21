from flask import Flask
from flask_admin import Admin
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import config, MailConfig
from flask_admin.contrib.sqla import ModelView


db = SQLAlchemy()  # Database instance used for SQLAlchemy
login_manager = LoginManager()
cors = CORS()


def create_admin(app, database):
    from beedare.models import User, Message, Comment, Dare, UserDares, Hive, ColonyMembers, Friend

    admin = Admin(app, name='beedare', template_mode='bootstrap3')
    admin.add_view(ModelView(User, database.session))
    admin.add_view(ModelView(Message, database.session))
    admin.add_view(ModelView(Comment, database.session))
    admin.add_view(ModelView(Dare, database.session))
    admin.add_view(ModelView(UserDares, database.session))
    admin.add_view(ModelView(Hive, database.session, endpoint='hive_date'))
    admin.add_view(ModelView(ColonyMembers, database.session))
    admin.add_view(ModelView(Friend, database.session))
    
    return admin


def create_app(config_type):
    app = Flask(__name__)
    app.config.from_object(config[config_type])
    app.config.from_object(MailConfig)
    
    db.init_app(app)
    login_manager.init_app(app)

    from beedare.auth import auth_blueprint
    from beedare.coll import coll_blueprint
    from beedare.landing import landing
    from beedare.main import main
    from beedare.search import search_blueprint
    from beedare.user import profile_blueprint
    from beedare.delete import delete_blueprint
    from beedare.hive import hive_blueprint
    from beedare.score import score_blueprint
    from beedare.submit import submit_blueprint
    from beedare.image import image_blueprint
    from beedare.user_information import user_info_blueprint
    from beedare.dare import dares_blueprint

    app.register_blueprint(main, url_prefix='/')
    app.register_blueprint(landing, url_prefix='/landing')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(coll_blueprint, url_prefix='/coll')
    app.register_blueprint(search_blueprint, url_prefix='/search')
    app.register_blueprint(profile_blueprint, url_prefix='/profile')
    app.register_blueprint(delete_blueprint, url_prefix='/delete')
    app.register_blueprint(hive_blueprint, url_prefix='/hive')
    app.register_blueprint(score_blueprint, url_prefix='/score')
    app.register_blueprint(user_info_blueprint, url_prefix='/info')
    app.register_blueprint(submit_blueprint, url_prefix='/submit')
    app.register_blueprint(dares_blueprint, url_prefix='/dares')
    app.register_blueprint(image_blueprint, url_prefix='/image')

    cors.init_app(app)
    return app
