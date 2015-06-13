import numpy


def scale_linear_bycolumn(rawpoints, high=1.0, low=0.0):
    mins = numpy.min(rawpoints, axis=0)
    maxs = numpy.max(rawpoints, axis=0)
    rng = maxs - mins
    return high - (((high - low) * (maxs - rawpoints)) / rng)
