from flask_script import Manager
from backend.beedare import app

manager = Manager(app)


@manager.command
def test():
    print("Hello World")


if __name__ == "__main__":
    manager.run()
