from collections import Counter

import numpy


def histogram(data, bin_size):
    hist, bin_edges = numpy.histogram(data, bin_size)
    return numpy.divide(hist, float(len(data))).tolist(), bin_edges.tolist()


def categorical(d):
    return numpy.divide(Counter(d).values(), float(len(d))).tolist(), Counter(d).keys()

