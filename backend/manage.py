import os, sys
from dotenv import load_dotenv

home_dir = basedir = os.path.abspath(os.path.dirname(__file__))
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
sys.path.append(home_dir)

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from beedare import create_app, create_admin
from beedare import db

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
admin = create_admin(app, db)
migrate = Migrate(app, db)  # Migrate instance used for migrating the database
manager = Manager(app)  # Manager instance
server = Server(host="0.0.0.0", port=80)
manager.add_command("runserver", Server())
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    from backend.beedare.models import User
    user = User(first_name="Dit is", last_name="Een Test")
    db.session.add(user)
    db.session.commit()


if __name__ == "__main__":
    manager.run()
