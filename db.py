import mysql.connector
from processenv import nome, senha, host

conn = mysql.connector.connect(user=nome,
                                   password=senha,
                                   database='atp',
                                   host=host,
                                   )
                                   

cursor = conn.cursor()

query = ("select * from aeronaves")

cursor.execute(query)

for i in cursor:
    print(i)

cursor.close()

conn.close()
