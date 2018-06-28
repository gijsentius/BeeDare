if __name__ == 'main':
    from .handlers import Connection
    conn = Connection()
    print(conn)
    conn.create_user('gijs')
    conn.create_dare('test')
    conn.completed_dare('gijs', 'test')
    for dare in conn.get_completed_dares('gijs'):
        print("dare: " + dare)