import mysql.connector

conn = mysql.connector.connect(user='caio',
                                   password='mevina11',
                                   database='atp',
                                   host='20.197.176.175',
                                   )
                                   

cursor = conn.cursor()

query = ("select * from aeronaves")

cursor.execute(query)

for i in cursor:
    print(i)

cursor.close()

conn.close()
