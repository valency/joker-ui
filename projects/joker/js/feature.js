function interpret_gender_name(gender) {
    if (gender == "F") return "Female";
    else if (gender == "M") return "Male";
    else return "N/A";
}

function interpret_gender_color(gender) {
    if (gender == "F") return "red";
    else if (gender == "M") return "blue";
    else return "grey";
}

function find_prediction_type(data, label) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].label == label) return data[i];
    }
    return null;
}

var DATA_SRC = "feature_and_result_1";

function piechart(src, table_title, table_desc) {
    BODY_WIDTH = Math.floor($("body").width() / 4) - 4;
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var width = BODY_WIDTH,
        height = 300,
        radius = Math.min(width, height) / 2;
    var color = d3.scale.ordinal().range(COLOR_PALETTE);
    var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);
    var pie = d3.layout.pie().sort(null).value(function (d) {
        return d.value;
    });
    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    var svg = d3.select("#figure_container_" + figid).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var g = svg.selectAll(".arc")
        .data(pie(src))
        .enter().append("g")
        .attr("class", "arc")
        .append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.data.key);
        })
        .on("mousemove", function (d) {
            d3.select(this).transition().duration(200).attr("r", 10);
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(d.data.key).style("left", (d3.event.pageX + 15) + "px").style("top", (d3.event.pageY - 15) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).transition().duration(200).attr("r", 5);
            tooltip.transition().duration(200).style("opacity", 0);
        });
}

function polyline(src, table_title, table_desc, kpi) {
    BODY_WIDTH = Math.floor($("body").width() / 4) - 4;
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = BODY_WIDTH - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
    var svg = d3.select("#figure_container_" + figid).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(d3.extent(src, function (d) {
        return d.x;
    }));
    y.domain([d3.min(src, function (d) {
        return d.y;
    }), d3.max(src, function (d) {
        return d.y;
    })]);
    var v = d3.svg.line()
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y(d.y);
        });
    svg.append("path")
        .attr("class", "line")
        .attr("d", v(src))
        .attr("transform", "translate(0,0)");
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    if (kpi != null && kpi != undefined) {
        svg.append("path")
            .attr("class", "dashed")
            .attr("d", v([{
                x: d3.min(src, function (d) {
                    return d.x;
                }), y: kpi
            }, {
                x: d3.max(src, function (d) {
                    return d.x;
                }), y: kpi
            }]))
            .attr("transform", "translate(0,0)");
    }
}

function barchart(src, table_title, table_desc) {
    BODY_WIDTH = Math.floor($("body").width() / 4) - 4;
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = BODY_WIDTH - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format(".2%"));
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
    var svg = d3.select("#figure_container_" + figid).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(src.map(function (d) {
        return d.x;
    }));
    var y_max = d3.max(src, function (d) {
        return d.y
    });
    var y_min = d3.min(src, function (d) {
        return d.y;
    });
    y.domain([y_min - (y_max - y_min) / 9, y_max]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.3em")
        .attr("transform", function (d) {
            return "rotate(-65)";
        });
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    svg.selectAll(".bar")
        .data(src)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.y);
        })
        .attr("height", function (d) {
            return height - y(d.y);
        });
}

function barset(src, table_title, table_desc, label1, label2) {
    BODY_WIDTH = Math.floor($("body").width() / 4) - 4;
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = BODY_WIDTH - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);
    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    var svg = d3.select("#figure_container_" + figid).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(src.map(function (d) {
        return d.x;
    }));
    var y_max = d3.max(src, function (d) {
        return d.y1 > d.y2 ? d.y1 : d.y2;
    });
    var y_min = d3.min(src, function (d) {
        return d.y1 < d.y2 ? d.y1 : d.y2;
    });
    y.domain([y_min - (y_max - y_min) / 9, y_max]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    svg.selectAll(".bar")
        .data(src)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("width", x.rangeBand() / 2.0)
        .attr("y", function (d) {
            return y(d.y1);
        })
        .attr("height", function (d) {
            return height - y(d.y1);
        })
        .on("mouseover", function (d) {
            d3.select(this).transition().duration(200).attr("r", 10);
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(label1).style("left", (d3.event.pageX + 15) + "px").style("top", (d3.event.pageY - 15) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).transition().duration(200).attr("r", 5);
            tooltip.transition().duration(500).style("opacity", 0);
        });
    svg.selectAll(".bar_red")
        .data(src)
        .enter().append("rect")
        .attr("class", "bar_red")
        .attr("x", function (d) {
            return x(d.x) + x.rangeBand() / 2.0;
        })
        .attr("width", x.rangeBand() / 2.0)
        .attr("y", function (d) {
            return y(d.y2);
        })
        .attr("height", function (d) {
            return height - y(d.y2);
        })
        .on("mouseover", function (d) {
            d3.select(this).transition().duration(200).attr("r", 10);
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(label2).style("left", (d3.event.pageX + 15) + "px").style("top", (d3.event.pageY - 15) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).transition().duration(200).attr("r", 5);
            tooltip.transition().duration(500).style("opacity", 0);
        });
}

function histogram(column, categorical, table_title, table_desc) {
    BODY_WIDTH = Math.floor($("body").width() / 4) - 4;
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    $.get("python/api.py?CTL=105&SCHEMA=" + DATA_SRC + "&COLUMN=" + column + "&CATEGORICAL=" + categorical, function (data) {
        data = eval("(" + data + ")");
        if (data.status != 200) $("#figure_container_" + figid).html("Loading schema '" + column + "' failed.<br/>Error message: " + data.content);
        else {
            data = data.content;
            var src = [];
            for (var i = 0; i < data.hist.length; i++) {
                src.push({
                    "hist": data.hist[i],
                    "bin_edges": Number(data.bin_edges[i]) === data.bin_edges[i] ? data.bin_edges[i].toFixed(2) : data.bin_edges[i]
                });
            }
            var margin = {top: 20, right: 10, bottom: 70, left: 50},
                width = BODY_WIDTH - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
            var y = d3.scale.linear().range([height, 0]);
            var xAxis = d3.svg.axis().scale(x).orient("bottom");
            var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
            var svg = d3.select("#figure_container_" + figid).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            x.domain(src.map(function (d) {
                return d.bin_edges;
            }));
            y.domain([d3.min(src, function (d) {
                return d.hist;
            }), d3.max(src, function (d) {
                return d.hist;
            })]);
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.3em")
                .attr("transform", function (d) {
                    return "rotate(-65)";
                });
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)");
            svg.selectAll(".bar")
                .data(src)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.bin_edges);
                })
                .attr("width", x.rangeBand())
                .attr("y", function (d) {
                    return y(d.hist);
                })
                .attr("height", function (d) {
                    return height - y(d.hist);
                });
        }
    });
}