import os
from dotenv import load_dotenv

from backend.beedare.models import User

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from backend.beedare import create_app
from backend.beedare import db
# from backend.beedare.models import User

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)  # Migrate instance used for migrating the database
manager = Manager(app)  # Manager instance
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    test = User(first_name="JeWeet", last_name="Zelf")
    db.session.add(test)
    db.session.commit()


if __name__ == "__main__":
    manager.run()
