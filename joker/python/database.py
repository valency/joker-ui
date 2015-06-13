import sys
import uuid
import csv

import numpy
from statsmodels.tools import categorical
import psycopg2

import common
from capsule import Capsule


class Database:
    def __init__(self, host, dbname, user, password):
        self.host = host
        self.dbname = dbname
        self.user = user
        self.password = password

    def connect(self):
        conn_string = "host='" + self.host + "' dbname='" + self.dbname + "' user='" + self.user + "' password='" + self.password + "'"
        conn = psycopg2.connect(conn_string)
        return conn

    def export(self, schema, header, weight, limit):
        try:
            header_array = header.replace("\"", "").split(",")
            conn = self.connect()
            cursor = conn.cursor()
            cursor.execute("SELECT " + header + " FROM " + schema + " LIMIT " + str(limit) + " OFFSET 0;")
            data = cursor.fetchall()
            cursor.execute("SELECT column_name,data_type FROM information_schema.columns WHERE table_name='" + schema + "';")
            meta = cursor.fetchall()
            reshaped = numpy.array([])
            for record in meta:
                if str(record[0]) in header_array:
                    header_index = header_array.index(str(record[0]))
                    if header_index >= 0:
                        column = numpy.array([d[header_index] for d in data])
                        if "character" in record[1]:
                            column = categorical(column, drop=True).argmax(1)
                        if reshaped.size == 0:
                            reshaped = column
                        else:
                            reshaped = numpy.column_stack((reshaped, column))
            norm = common.scale_linear_bycolumn(reshaped)
            weighted_norm = numpy.nan_to_num(numpy.multiply(norm, numpy.array([numpy.fromstring(weight, sep=','), ] * limit)))
            fn = str(uuid.uuid1())
            fp = open("../data/" + fn + ".csv", "w")
            f = csv.writer(fp)
            f.writerows(weighted_norm)
            fp.close()
            fp = open("../data/" + fn + ".src.csv", "w")
            fp.write(header.replace("\"", "") + "\n")
            fp.close()
            fp = open("../data/" + fn + ".src.csv", "a")
            f = csv.writer(fp)
            f.writerows(data)
            fp.close()
            return Capsule.tojson(200, fn)
        except:
            return Capsule.tojson(500, str(sys.exc_info()))

    def header(self, schema):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT column_name,data_type FROM information_schema.columns WHERE table_name='" + schema + "';")
        records = cursor.fetchall()
        column_name = [record[0] for record in records]
        return Capsule.tojson(200, column_name)

    def select(self, schema, column, sort, order, limit):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT " + column + " FROM " + schema + " ORDER BY " + sort + " " + order + " LIMIT " + limit + ";")
        return Capsule.tojson(200, [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()])

    def select_as_array(self, schema, column):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT \"" + column + "\" FROM " + schema + ";")
        return numpy.array([d[0] for d in cursor.fetchall()])

    def count(self, schema):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM " + schema + ";")
        return Capsule.tojson(200, cursor.fetchall()[0][0])


db = Database("120.25.209.91", "postgres", "postgres", "33b5dadd-c299-4f1c-92ab-e18d02a5a2e2")
print db.count("feature_and_result_1")