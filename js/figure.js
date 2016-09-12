function figure_bar_chart(data, container, margin, label, tick) {
    // Container: jQuery / D3.js compatible selector, e.g., "#figure_container"
    // Data: [{x: 0, y: 0},...]
    // Margin: {top: 10, bottom: 30, left: 30, right: 10, width: 100, height: 100}
    // Label: {x: "xLabel", y: "yLabel"}
    var width = margin.width - margin.left - margin.right;
    var height = margin.height - margin.top - margin.bottom;
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");
    if (tick != undefined && tick != null) {
        if (tick.x != null) xAxis = xAxis.tickValues(tick.x);
        if (tick.y != null) yAxis = yAxis.tickValues(tick.y);
    }
    var svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(data.map(function (d) {
        return d.x;
    }));
    y.domain([d3.min(data, function (d) {
        return d.y;
    }), d3.max(data, function (d) {
        return d.y
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
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width - 3)
        .attr("y", height - 6)
        .style("text-anchor", "end")
        .text(label.x);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x", -3)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(label.y);
    svg.selectAll(".bar")
        .data(data)
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

function stat_figure_multiline_draw(fig_id, src, title, label, kpi, params) {
    var fig_title_container = $("#figure-title-" + fig_id);
    var fig_portlet_body_container = $("#figure-portlet-" + fig_id + ">div>.portlet-body");
    var fig_portlet_meta_container = $("#figure-meta-" + fig_id);
    fig_title_container.css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().next().css("width", fig_portlet_body_container.width() + "px");
    $(".tooltip").css("z-index", $("#figure-portlet-" + fig_id + " .portlet").css("z-index") + 1);
    var margin = {top: 20, right: 40, bottom: 50, left: 60};
    var width = fig_portlet_body_container.width() - 10 - margin.left - margin.right;
    var height = (fig_portlet_body_container.height() < 300 ? 300 : fig_portlet_body_container.height() - fig_portlet_meta_container.height()) - margin.top - margin.bottom;
    var color = d3.scale.ordinal().range(COLOR_PALETTE);
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().tickFormat(d3.format("d")).scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, (("y_format" in params) ? params["y_format"] : ""));
    var svg = d3.select("#figure-div-" + fig_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var minX = d3.min(src, function (kv) {
        return d3.min(kv.values, function (d) {
            return d.x
        })
    });
    var maxX = d3.max(src, function (kv) {
        return d3.max(kv.values, function (d) {
            return d.x
        })
    });
    var minY = d3.min(src, function (kv) {
        return d3.min(kv.values, function (d) {
            return Math.min(d.y, d.y)
        })
    });
    var maxY = d3.max(src, function (kv) {
        return d3.max(kv.values, function (d) {
            return Math.max(d.y, d.y)
        })
    });

    x.domain([minX, maxX]);
    y.domain([minY, maxY]);

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y(d.y);
        });

    color.domain(src.map(function (d) {
        return d.key;
    }));


    for (var lid = 0; lid < src.length; lid++) {

        svg.append("path")
            .attr("d", line(src[lid].values))
            .attr("id", "path-" + src[lid].key)
            .style("stroke", function (c) {
                return color(src[lid].key);
            })
            .attr("transform", "translate(0,0)");

        svg.append("g")
            .attr("id", "path-" + src[lid].key)
            .selectAll('circle')
            .data(src[lid].values)
            .enter().append('circle')
            .attr("cx", function (c, j) {
                return x(c.x);
            })
            .attr("cy", function (c, j) {
                return y(c.y);
            })
            .attr("r", 5)
            .style("fill", function (c) {
                return color(src[lid].key);
            })
            .on("mouseover", function (d) {
                var html = "";
                //html += "Growth Rate of Turnover" + "<br/>";
                html += "<span class='bold'>" + label["x"] + ":</span> " + d.x + "<br/>";
                html += "<span class='bold'>" + label["y"] + ":</span> " + (("y_format" in params && params["y_format"] == "%") ? (100.0 * d.y).toFixed(2) + "%" : d.y) + "<br/>";
                if ("keys" in label) {
                    for (i = 0; i < label["keys"].length; i++) {
                        html += "<span class='bold'>" + label["keys"][i] + ":</span> " + d.values[i] + "<br/>";
                    }
                }


                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(html)
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY - 20) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        // Legend Text
        svg.append("text")
            .text("■ " + src[lid].key)
            .attr("lid", src[lid].key)
            .attr("x", function () {
                return lid * width / src.length + (width / src.length - $(this).width()) / 2;
            })
            .attr("y", height + (margin.bottom / 2) + 15)
            .attr("class", "legend") // style the legend
            .style("fill", function () {
                return color(src[lid].key);
            })
            .style("font-weight", "bold")
            .on("click", function () {
                d3.select(this).classed("dismiss", function () {
                    return !d3.select(this).classed("dismiss");
                });
                d3.select("#figure-div-" + fig_id).selectAll("#path-" + $(this).attr("lid")).each(function () {
                    d3.select(this).classed("dismiss", function () {
                        return !d3.select(this).classed("dismiss");
                    });
                });
            });
    }

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}