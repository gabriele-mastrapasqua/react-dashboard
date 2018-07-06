import csv, sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE dataset (device_id int, lat DECIMAL, lng DECIMAL, timestamp TIMESTAMP);")

with open('../data/dataset.csv','r') as f:
    dr = csv.DictReader(f)
    to_db = [(i['device_id'], i['lat'], i['lng'], i['timestamp']) for i in dr]

cur.executemany("INSERT INTO t (device_id, lat, lng, timestamp) VALUES (?, ?, ?, ?);", to_db)
con.commit()
con.close()


