from faker import Factory
from beedare import db
from beedare.models import User, Message, Comment, Dare, Hive, Friend


def addUserWithPassToDB():
    from random import randint
    import datetime

    fakeDataFactory = Factory.create('nl_NL')

    addToSession = []

    user = User(first_name=fakeDataFactory.first_name(), last_name=fakeDataFactory.last_name()
                , location=fakeDataFactory.city(), image='noneexistent', score=fakeDataFactory.random_number()
                , last_seen=fakeDataFactory.time(pattern="%H:%M:%S", end_datetime=None)
                , username=fakeDataFactory.user_name(), email=fakeDataFactory.email(), rank=fakeDataFactory.word())
    user.set_password("wachtwoord")
    addToSession.append(user)

    message = Message(body=fakeDataFactory.text(max_nb_chars=200, ext_word_list=None), author_id=randint(1, 50), timestamp=(datetime.datetime.now()+datetime.timedelta(seconds=randint(1, 50))))
    addToSession.append(message)

    comment = Comment(body=fakeDataFactory.sentence(nb_words=6, variable_nb_words=True, ext_word_list=None))
    addToSession.append(comment)

    dare = Dare(image='nonexisent', body=fakeDataFactory.text(max_nb_chars=200, ext_word_list=None),
                value=fakeDataFactory.random_number())
    addToSession.append(dare)

    hive = Hive(hive_name=fakeDataFactory.company(), image='noneexistent',
                total_score_members=fakeDataFactory.random_number())
    addToSession.append(hive)

    for j in addToSession:
        db.session.add(j)

    db.session.commit()





