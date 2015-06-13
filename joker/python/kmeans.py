#!/usr/bin/python

import numpy
from sklearn.cluster import KMeans


def kmeans(fn, n_clusters):
    data = numpy.genfromtxt("../data/" + fn + ".csv", delimiter=",")
    k_means = KMeans(init="k-means++", n_clusters=n_clusters)
    k_means.fit(data)
    result = numpy.column_stack((data, k_means.labels_))
    with open("../data/" + fn + ".src.csv", "r") as f:
        header = f.readline()
    with open("../data/" + fn + ".kmeans.csv", "w") as f:
        f.writelines(header.rstrip() + ",GROUP\n")
    with open("../data/" + fn + ".kmeans.csv", "a") as f:
        numpy.savetxt(f, result, delimiter=",")

