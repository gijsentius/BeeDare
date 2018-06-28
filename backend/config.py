import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'atVTnNYp4pnsJP3D'
    UPLOAD_ROOT = os.environ.get('UPLOAD_ROOT')


class Development(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') or 'sqlite:///' + \
                              os.path.join(basedir, 'data-dev.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    NEO4J_URI = os.environ.get('NEO4J_URI')


class MailConfig:
    FLASK_MAIL_SUBJECT_PREFIX = os.environ.get('FLASK_MAIL_SUBJECT_PREFIX')
    FLASK_MAIL_SENDER = os.environ.get('FLASK_MAIL_SENDER')
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = os.environ.get('MAIL_PORT')
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS')
    MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL')
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')


config = {
    'default': Development,
    'development': Development
}
