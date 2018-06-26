from neomodel import (config, StructuredNode, StringProperty, IntegerProperty,
    UniqueIdProperty, Relationship, Relationship)


class Dare(StructuredNode):
    code = StringProperty(unique_index=True, required=True)

    # traverse incoming IS_FROM relation, inflate to Person objects
    completed_dare = Relationship('User', 'Finished')
    started_dare = Relationship('User', 'Started')
 

class User(StructuredNode):
    uid = UniqueIdProperty()
    username = StringProperty(unique_index=True)

    # traverse outgoing IS_FROM relations, inflate to Country objects
    completed_dare = Relationship('Dare', 'Finished')
    started_dare = Relationship('Dare', 'Started')