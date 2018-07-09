import json
import pymongo
import itertools

MAP_FILENAME = "./map.json";

from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client.analytics

maps = db.maps
maps.remove({}) # rm all

js = json.loads( open(MAP_FILENAME, "r").read() )
#print ("got js ", js)

print("map regions len: ", len(js["features"]))
#raise "exit"

for i in  range(0, len( js["features"])): 
    #print("map data ", js["features"][i] )
    print("inserting i:", i)
    
    '''
    # check datas
    if js["features"][i]["geometry"]["type"] ==  "MultiPolygon":
        coords = js["features"][i]["geometry"]["coordinates"]
        print("coords ", len(coords))
        for c in coords:
            #print("c ", c)
            # removing duplicated vertices
            for l in c:
                for s in l:
                    print("multipoly" , s )
                    # check if lat lng are valid:
                    if not (s[0] >= -180 and s[0] <= 180):
                        raise ("invalid coordinate lng " + s + "lat" + s[0])
                    if not (s[1] >= -90 and s[1] <= 90):
                        raise ("invalid coordinate lat " + s + "lat" + s[1])
                #raise "a"
        print("re-coords ", len(js["features"][i]["geometry"]["coordinates"] ))
        #raise "exit"
    '''
    
    db.maps.insert_one(js["features"][i])
    
print ("finished importing map data ")

res = db.maps.ensure_index([("geometry", pymongo.GEOSPHERE)])

print ("finished indexing map data ")
