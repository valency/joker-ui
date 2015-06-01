#!/usr/bin/python

import cgi
import sys

import kmeans
import statistics
from database import Database
from capsule import Capsule


def dbconn():
    return Database("120.25.209.91", "postgres", "postgres", "33b5dadd-c299-4f1c-92ab-e18d02a5a2e2")


if __name__ == "__main__":
    print "Content-Type:text/plain;charset=utf-8"
    print
    try:
        args = cgi.FieldStorage()
        if "CTL" in args:
            ctl = int(args["CTL"].value)
            if ctl == 101:
                if "SCHEMA" in args:
                    db = dbconn()
                    print db.header(args["SCHEMA"].value)
                else:
                    print Capsule.tojson(404, "incorrect parameters (101)")
            elif ctl == 102:
                if "SCHEMA" in args and "HEADER" in args and "WEIGHT" in args and "LIMIT" in args:
                    db = dbconn()
                    print db.export(args["SCHEMA"].value, args["HEADER"].value, args["WEIGHT"].value, int(args["LIMIT"].value))
                else:
                    print Capsule.tojson(404, "incorrect parameters (102)")
            elif ctl == 103:
                if "ID" in args and "N" in args:
                    kmeans.kmeans(args["ID"].value, int(args["N"].value))
                    print Capsule.tojson(200, "ok")
                else:
                    print Capsule.tojson(404, "incorrect parameters (103)")
            elif ctl == 104:
                if "SCHEMA" in args and "COLUMN" in args and "SORT" in args and "ORDER" in args and "LIMIT" in args:
                    db = dbconn()
                    print db.select(args["SCHEMA"].value, args["COLUMN"].value, args["SORT"].value, args["ORDER"].value, args["LIMIT"].value)
                else:
                    print Capsule.tojson(404, "incorrect parameters (104)")
            elif ctl == 105:
                if "SCHEMA" in args and "COLUMN" in args and "CATEGORICAL" in args:
                    db = dbconn()
                    data = db.select_as_array(args["SCHEMA"].value, args["COLUMN"].value)
                    if int(args["CATEGORICAL"].value) == 1:
                        hist, bin_edges = statistics.categorical(data)
                    else:
                        hist, bin_edges = statistics.histogram(data, 10)
                    print Capsule.tojson(200, {
                        "hist": hist,
                        "bin_edges": bin_edges
                    })
                else:
                    print Capsule.tojson(404, "incorrect parameters (105)")
            elif ctl == 106:
                if "SCHEMA" in args:
                    db = dbconn()
                    print db.count(args["SCHEMA"].value)
                else:
                    print Capsule.tojson(404, "incorrect parameters (105)")
            else:
                print Capsule.tojson(404, "ctl illegal")
        else:
            print Capsule.tojson(404, "ctl not specified")
    except:
        print Capsule.tojson(500, str(sys.exc_info()))



