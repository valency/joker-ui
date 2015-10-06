function add_portlet(target, title, body, fig_id, md) {
    var content = "<div class='col-md-" + md + "' id='figure-portlet-" + fig_id + "'>";
    content += '<div class="portlet purple box">';
    content += '<div class="portlet-title">';
    content += '<div class="caption"><i class="fa fa-cogs"></i>' + title + '</div>';
    content += '<div class="tools">';
    content += '<a href="javascript:void(0);" class="collapse"></a>';
    content += '<a href="javascript:void(0);" class="fullscreen"></a>';
    content += '<a href="javascript:void(0);" class="remove"></a>';
    content += '</div>';
    content += '</div>';
    content += '<div class="portlet-body">' + body + '</div>';
    content += '</div>';
    content += '</div>';
    if ($(target + ">.row").length <= 0) $(target).append('<div class="row"></div>');
    $(target + ">.row:last").append(content);
}

function stat_figure_growth_rate_of_turnover(src, title, label, kpi) {
    // Prepare figure container
    var fig_id = guid();
    var container_html = "<div style='display:inline-block;text-align:center;'>";
    container_html += "<div class='font-purple bold'>" + title + "</div>";
    container_html += "<div><span class='bold'>X Axis:</span> " + label.x + "</div>";
    container_html += "<div><span class='bold'>Y Axis:</span> " + label.y + "</div>";
    container_html += "<div id='figure-div-" + fig_id + "'></div>";
    container_html += "</div>";
    add_portlet("#figure-container", title, container_html, fig_id, 8);
    // Render figure
    var margin = {top: 20, right: 10, bottom: 50, left: 50};
    var width = $("#figure-portlet-" + fig_id + ">div>.portlet-body").width() - 10 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    var svg = d3.select("#figure-div-" + fig_id).append("svg")
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
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width)
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
        .attr("x", 0)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(label.y);
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
    svg.selectAll(".dot")
        .data(src)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function (d) {
            return x(d.x);
        })
        .attr("cy", function (d) {
            return y(d.y);
        })
        .style("fill", "#ff9900")
        .on("mouseover", function (d) {
            var html = "";
            html += "<span class='bold'>" + label.x + ":</span> " + d.x + "<br/>";
            html += "<span class='bold'>" + label.y + ":</span> " + d.y * 100 + " %<br/>";
            html += "<span class='bold'>" + label.last_season + ":</span> " + d.last_season + "<br/>";
            html += "<span class='bold'>" + label.this_season + ":</span> " + d.this_season;
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(html)
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

function stat_figure_bar_chart(src, title, xLabel, yLabel) {
    // Prepare figure container
    var fig_id = guid();
    var container_html = "<div style='display:inline-block;text-align:center;'>";
    container_html += "<div class='font-purple bold'>" + title + "</div>";
    container_html += "<div><span class='bold'>X Axis:</span> " + xLabel + "</div>";
    container_html += "<div><span class='bold'>Y Axis:</span> " + yLabel + "</div>";
    container_html += "<div id='figure-div-" + fig_id + "'></div>";
    container_html += "</div>";
    add_portlet("#figure-container", title, container_html, fig_id, 4);
    // Render figure
    var margin = {top: 20, right: 10, bottom: 50, left: 50};
    var width = $("#figure-portlet-" + fig_id + ">div>.portlet-body").width() - 5 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format(".0%"));
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
    var svg = d3.select("#figure-div-" + fig_id).append("svg")
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
    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x", 0)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yLabel);
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

function stat_figure_pie_chart(src, title, xLabel, yLabel) {
    // Prepare figure container
    var fig_id = guid();
    var container_html = "<div style='display:inline-block;text-align:center;'>";
    container_html += "<div class='font-purple bold'>" + title + "</div>";
    container_html += "<div><span class='bold'>Key:</span> " + xLabel + "</div>";
    container_html += "<div><span class='bold'>Value:</span> " + yLabel + "</div>";
    container_html += "<div id='figure-div-" + fig_id + "'></div>";
    container_html += "</div>";
    add_portlet("#figure-container", title, container_html, fig_id, 4);
    // Render figure
    var margin = {top: 20, right: 10, bottom: 50, left: 50};
    var width = $("#figure-portlet-" + fig_id + ">div>.portlet-body").width(),
        height = 300,
        radius = Math.min(width, height) / 2;
    var color = d3.scale.ordinal().range(COLOR_PALETTE);
    var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);
    var pie = d3.layout.pie().sort(null).value(function (d) {
        return d.value;
    });
    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    var svg = d3.select("#figure-div-" + fig_id).append("svg")
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

function stat_figure_histogram(column, categorical, title, xLabel, yLabel, model, data_source, data_digits) {
    // Prepare figure container
    var fig_id = guid();
    var container_html = "<div style='display:inline-block;text-align:center;'>";
    container_html += "<div class='font-purple bold'>" + title + "</div>";
    container_html += "<div><span class='bold'>X Axis:</span> " + xLabel + "</div>";
    container_html += "<div><span class='bold'>Y Axis:</span> " + yLabel + "</div>";
    container_html += "<div id='figure-div-" + fig_id + "'></div>";
    container_html += "</div>";
    add_portlet("#figure-container", title, container_html, fig_id, 4);
    // Render figure
    $.get(API_SERVER + "joker/model/" + model + "/histogram/?source=" + data_source + "&field=" + column + "&categorical=" + categorical, function (data) {
        var src = [];
        for (var i = 0; i < data.hist.length; i++) {
            src.push({
                "hist": data.hist[i],
                "bin_edges": Number(data.bin_edges[i]) === data.bin_edges[i] ? data.bin_edges[i].toFixed(data_digits) : data.bin_edges[i]
            });
        }
        var margin = {top: 20, right: 10, bottom: 50, left: 50};
        var width = $("#figure-portlet-" + fig_id + ">div>.portlet-body").width() - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height, 0]);
        var xAxis = d3.svg.axis().scale(x).orient("bottom");
        var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
        var svg = d3.select("#figure-div-" + fig_id).append("svg")
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
        svg.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("x", 0)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(yLabel);
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
    }).fail(function () {
        $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + column + "' failed!</span>");
    });
}