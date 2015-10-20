var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

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
    var margin = {top: 20, right: 10, bottom: 30, left: 50};
    var width = $("#figure-portlet-" + fig_id + ">div>.portlet-body").width() - 10 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().tickFormat(d3.format("d")).scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");
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
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
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
            html += "<span class='bold'>" + label.y + ":</span> " + (100.0 * d.y).toFixed(2) + "%<br/>";
            for (var i = 0; i < label.keys.length; i++) {
                html += "<span class='bold'>" + label.keys[i] + ":</span> " + n_formatter(d.values[i]) + "<br/>";
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
            d3.select(this).style("fill", "grey");
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(d.data.key + ": " + (100.0 * d.data.value).toFixed(2) + "%").style("left", (d3.event.pageX + 15) + "px").style("top", (d3.event.pageY - 15) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", function (d) {
                return color(d.data.key);
            });
            tooltip.transition().duration(200).style("opacity", 0);
        });
}

function stat_figure_bar_chart(src, title, xLabel, yLabel) {
    // Prepare figure container
    var fig_id = guid();
    var container_html = "<div style='display:inline-block;text-align:center;'>";
    container_html += "<div id='figure-title-" + fig_id + "' class='font-purple bold' style='width:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>" + title + "</div>";
    container_html += "<div><span class='bold'>X Axis:</span> " + xLabel + "</div>";
    container_html += "<div><span class='bold'>Y Axis:</span> " + yLabel + "</div>";
    container_html += "<div id='figure-div-" + fig_id + "'></div>";
    container_html += "</div>";
    add_portlet("#figure-container", title, container_html, fig_id, 4);
    $("#figure-title-" + fig_id).css("width", $("#figure-title-" + fig_id).parent().parent().width() + "px");
    // Render figure
    render_bar_chart(src, fig_id);
}

function render_bar_chart(src, fig_id) {
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
        return d.x;
    }));
    y.domain([d3.min(src, function (d) {
        return d.y;
    }), d3.max(src, function (d) {
        return d.y;
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
            return x(d.x);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.y);
        })
        .attr("height", function (d) {
            return height - y(d.y);
        })
        .on("mousemove", function (d) {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html((100.0 * d.y).toFixed(2) + "%").style("left", (d3.event.pageX + 15) + "px").style("top", (d3.event.pageY - 15) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition().duration(200).style("opacity", 0);
        });
}

function stat_figure_histogram(column, categorical, title, xLabel, yLabel, model, data_source, data_digits, bins) {
    // Prepare figure container
    var fig_id = guid();
    var container_html = "<div style='display:inline-block;text-align:center;'>";
    container_html += "<div id='figure-title-" + fig_id + "' class='font-purple bold' style='width:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>" + title + "</div>";
    container_html += "<div><span class='bold'>X Axis:</span> " + xLabel + "</div>";
    container_html += "<div><span class='bold'>Y Axis:</span> " + yLabel + "</div>";
    container_html += "<div id='figure-div-" + fig_id + "'></div>";
    container_html += "</div>";
    add_portlet("#figure-container", title, container_html, fig_id, 4);
    $("#figure-title-" + fig_id).css("width", $("#figure-title-" + fig_id).parent().parent().width() + "px");
    // Render figure
    $.get(API_SERVER + "joker/model/" + model + "/histogram/?source=" + data_source + "&field=" + column + "&categorical=" + categorical + (bins ? "&bins=" + bins : ""), function (data) {
        var src = [];
        for (var i = 0; i < data.hist.length; i++) {
            src.push({
                y: data.hist[i],
                x: Number(data.bin_edges[i + 1]) === data.bin_edges[i + 1] ? data.bin_edges[i].toFixed(data_digits) + "-" + data.bin_edges[i + 1].toFixed(data_digits) : data.bin_edges[i + 1]
            });
        }
        render_bar_chart(src, fig_id);
    }).fail(function () {
        $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + column + "' failed!</span>");
    });
}

function stat_color_table(id, title, src, header, prefix_content) {
    var html = prefix_content;
    html += "<table class='table table-bordered table-advance table-hover table-condensed table-striped'>";
    html += "<tbody class='text-center'>";
    html += "<tr><td class='bold bg-grey'></td>";
    for (var i = 0; i < header.length; i++) {
        html += "<td class='bold bg-grey' title='" + header[i]["hint"] + "'>" + header[i]["text"] + "</td>";
    }
    for (var group = 0; group < src.length; group++) {
        if (group == 1) html += "<tr><td class='' colspan='5'><hr style='margin:0;'/></td></tr>";
        for (var key in src[group]) {
            if (src[group].hasOwnProperty(key)) {
                var color = COLOR_PALETTE[group];
                html += "<tr><td class='bold text-right' style='background-color:" + color + ";color:white;'>" + key + "</td>";
                for (i = 0; i < header.length; i++) {
                    var value = "-";
                    if (src[group][key][i]) value = src[group][key][i] + " %";
                    html += "<td>" + value + "</td>";
                }
                html += "</tr>";
            }
        }
    }
    html += "</tbody></table></div>";
    add_portlet("#figure-container", title, html, id, 12);
}

function stat_table(id, title, src, header, prefix_content) {
    var html = prefix_content;
    html += "<table class='table table-bordered table-advance table-hover table-condensed table-striped'>";
    html += "<tbody class='text-center'>";
    html += "<tr>";
    for (var i = 0; i < header.length; i++) {
        html += "<td class='bold bg-grey' title='" + header[i]["hint"] + "'>" + header[i]["text"] + "</td>";
    }
    for (i = 0; i < src.length; i++) {
        html += "<tr>";
        for (var j = 0; j < src[i].length; j++) {
            html += "<td>" + (src[i][j] ? src[i][j] : "-") + "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody></table></div>";
    add_portlet("#figure-container", title, html, id, 12);
}