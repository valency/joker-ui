var tooltip = d3.select(".page-container").append("div").attr("class", "tooltip").style("opacity", 0);

function init_column_filter() {
    var column_values = [];
    $.get(API_SERVER + "summary/retrieve-segment-values/", function (data) {
        for (var i = 0; i < data.length; i++) {
            var segment = data[i]["segment_code"];
            if (segment != null) {
                column_values.push({id: segment, text: segment});
            }
        }
    });
    $("#select-segments").select2({
        tags: column_values
    });
}

function add_portlet(target, title, body, fig_id, md, redraw_callback) {
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
    if (redraw_callback) {
        $("#figure-portlet-" + fig_id + " .tools .fullscreen").click(redraw_callback);
        redraw_callback();
    }
}

function generate_portlet_meta(fig_id, title, label, label_type) {
    var html = "<div style='display:inline-block;text-align:center;'>";
    html += "<div id='figure-meta-" + fig_id + "'>";
    html += "<div id='figure-title-" + fig_id + "' class='font-purple bold limit-title'>" + title + "</div>";
    html += "<div class='limit-title'><span class='bold'>" + label_type["x"] + ":</span> " + label["x"] + "</div>";
    html += "<div class='limit-title'><span class='bold'>" + label_type["y"] + ":</span> " + label["y"] + "</div>";
    html += "<hr style='margin-bottom:0;'/></div>";
    html += "<div id='figure-div-" + fig_id + "'></div>";
    html += "</div>";
    return html;
}

function stat_figure_growth_rate_of_turnover(src, title, fig_title, label, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 8, function () {
        setTimeout(function () {
            $("#figure-div-" + fig_id).html("");
            stat_figure_growth_rate_of_turnover_draw(fig_id, src, title, label, kpi);
        }, 100);
    });
}

function stat_figure_growth_rate_of_turnover_draw(fig_id, src, title, label, kpi) {
    var fig_title_container = $("#figure-title-" + fig_id);
    var fig_portlet_body_container = $("#figure-portlet-" + fig_id + ">div>.portlet-body");
    var fig_portlet_meta_container = $("#figure-meta-" + fig_id);
    fig_title_container.css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().next().css("width", fig_portlet_body_container.width() + "px");
    $(".tooltip").css("z-index", $("#figure-portlet-" + fig_id + " .portlet").css("z-index") + 1);
    var margin = {top: 20, right: 10, bottom: 50, left: 50};
    var width = fig_portlet_body_container.width() - 10 - margin.left - margin.right;
    var height = (fig_portlet_body_container.height() < 300 ? 300 : fig_portlet_body_container.height() - fig_portlet_meta_container.height()) - margin.top - margin.bottom;
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
        .style("fill", "orange")
        .on("mouseover", function (d) {
            var html = "";
            html += "<span class='bold'>" + label["x"] + ":</span> " + d.x + "<br/>";
            html += "<span class='bold'>" + label["y"] + ":</span> " + (100.0 * d.y).toFixed(2) + "%<br/>";
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

function stat_figure_pie_chart(src, title, fig_title, label) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "Key",
        y: "Value"
    }), fig_id, 4, function () {
        setTimeout(function () {
            $("#figure-div-" + fig_id).html("");
            stat_figure_pie_chart_draw(fig_id, src, title, label);
        }, 100);
    });

}
function stat_figure_pie_chart_draw(fig_id, src, title, label) {
    var fig_title_container = $("#figure-title-" + fig_id);
    var fig_portlet_body_container = $("#figure-portlet-" + fig_id + ">div>.portlet-body");
    var fig_portlet_meta_container = $("#figure-meta-" + fig_id);
    fig_title_container.css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().next().css("width", fig_portlet_body_container.width() + "px");
    $(".tooltip").css("z-index", $("#figure-portlet-" + fig_id + " .portlet").css("z-index") + 1);
    var margin = {top: 20, right: 10, bottom: 50, left: 50};
    var width = fig_portlet_body_container.width();
    var height = fig_portlet_body_container.height() < 300 ? 300 : fig_portlet_body_container.height() - fig_portlet_meta_container.height();
    var radius = Math.min(width, height) / 2;
    var color = d3.scale.ordinal().range(generate_color(-1));
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
            d3.select(this).style("fill", "black");
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

function stat_figure_bar_chart(src, title, fig_title, label) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 4, function () {
        setTimeout(function () {
            $("#figure-div-" + fig_id).html("");
            stat_figure_bar_chart_draw(fig_id, src, title, label);
        }, 100);
    });
}

function stat_figure_bar_chart_draw(fig_id, src, title, label) {
    var fig_title_container = $("#figure-title-" + fig_id);
    var fig_portlet_body_container = $("#figure-portlet-" + fig_id + ">div>.portlet-body");
    var fig_portlet_meta_container = $("#figure-meta-" + fig_id);
    fig_title_container.css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().next().css("width", fig_portlet_body_container.width() + "px");
    $(".tooltip").css("z-index", $("#figure-portlet-" + fig_id + " .portlet").css("z-index") + 1);
    var margin = {top: 20, right: 10, bottom: 50, left: 50};
    var width = fig_portlet_body_container.width() - 10 - margin.left - margin.right;
    var height = (fig_portlet_body_container.height() < 300 ? 300 : fig_portlet_body_container.height() - fig_portlet_meta_container.height()) - margin.top - margin.bottom;
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

function stat_figure_histogram(column, categorical, title, fig_title, label, model, data_source, data_digits, bins, segment) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 4, function () {
        $.get(API_SERVER + "model/" + model + "/histogram/?source=" + data_source + "&field=" + column + "&categorical=" + categorical + (bins ? "&bins=" + bins.join() : "") + segment, function (data) {
            var src = [];
            for (var i = 0; i < data["hist"].length; i++) {
                src.push({
                    y: data["hist"][i],
                    x: Number(data["bin_edges"][i + 1]) === data["bin_edges"][i + 1] ? data["bin_edges"][i].toFixed(data_digits) + "-" + data["bin_edges"][i + 1].toFixed(data_digits) : data["bin_edges"][i + 1]
                });
            }
            $("#figure-div-" + fig_id).html("");
            stat_figure_bar_chart_draw(fig_id, src, title, label);
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + column + "' failed!</span>");
        });
    });
}

function stat_color_table(id, title, src, header, prefix_content, hints) {
    var html = prefix_content;
    html += "<table class='table table-bordered table-advance table-hover table-condensed table-striped'>";
    html += "<tbody class='text-center'>";
    html += "<tr><td class='bold bg-grey'></td>";
    for (var i = 0; i < header.length; i++) {
        html += "<td class='bold bg-grey' title='" + header[i]["hint"] + "'>" + header[i]["text"] + "</td>";
    }
    for (var group = 0; group < src.length; group++) {
        if (src[group]) for (var key in src[group]) {
            if (src[group].hasOwnProperty(key)) {
                var color = generate_color(group);
                var hint = "";
                if (hints.hasOwnProperty(key)) hint = hints[key];
                html += "<tr><td class='bold text-right' style='background-color:" + color + ";color:white;' title='" + hint + "'>" + key + "</td>";
                for (i = 0; i < header.length; i++) {
                    var value = "-";
                    var value_color = "";
                    if (src[group][key][i] != null) {
                        if (Array.isArray(src[group][key][i])) {
                            value = src[group][key][i][0] + "% (";
                            if (src[group][key][i][1] > 0) value += "+";
                            value += src[group][key][i][1] + "%)";
                            if (src[group][key][i][1] > 0) value_color = "font-green-jungle";
                            if (src[group][key][i][1] < 0) value_color = "font-red-flamingo";
                        } else {
                            value = src[group][key][i] + "%";
                        }
                    }
                    html += "<td class='" + value_color + "'>" + value + "</td>";
                }
                html += "</tr>";
            }
        } else html += "<tr><td class='' colspan='5'><hr style='margin:0;'/></td></tr>";
    }
    html += "</tbody></table></div>";
    add_portlet("#figure-container", title, html, id, 12);
}

function stat_table(id, title, src, header, prefix_content, hints, formatter) {
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
            var text = "-";
            if (src[i][j]) {
                if (formatter) text = formatter(src[i][j]);
                else text = src[i][j];
            }
            html += "<td>" + text + "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody></table></div>";
    add_portlet("#figure-container", title, html, id, 12);
}

function stat_figure_year_on_year_growth(title, fig_title, label, field, seperate, season, segment, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 12, function () {
        $.get(API_SERVER + "summary/year-on-year-growth/?field=" + field + "&season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src1 = [];
            for (var i = 0; i < data["standard_" + field]["cumulative_growth_rate_of_total_standard_" + field].length; i++) {
                if (seperate) {
                    src1.push({
                        type: "standard_" + field,
                        y: data["standard_" + field]["cumulative_growth_rate_of_total_standard_" + field][i],
                        x: i + 1,
                        values: [data["standard_" + field]["standard_" + field + "_previous_season"][i], data["standard_" + field]["standard_" + field + "_this_season"][i], data["standard_" + field]["total_standard_" + field + "_pytd"][i], data["standard_" + field]["total_standard_" + field + "_ytd"][i]]
                    });
                    src1.push({
                        type: "exotic_" + field,
                        y: data["exotic_" + field]["cumulative_growth_rate_of_total_exotic_" + field][i],
                        x: i + 1,
                        values: [data["exotic_" + field]["exotic_" + field + "_previous_season"][i], data["exotic_" + field]["exotic_" + field + "_this_season"][i], data["exotic_" + field]["total_exotic_" + field + "_pytd"][i], data["exotic_" + field]["total_exotic_" + field + "_ytd"][i]]
                    });
                } else {
                    src1.push({
                        type: field,
                        y: data["standard_" + field]["cumulative_growth_rate_of_total_standard_" + field][i] + data["exotic_" + field]["cumulative_growth_rate_of_total_exotic_" + field][i],
                        x: i + 1,
                        values: [data["standard_" + field]["standard_" + field + "_previous_season"][i] + data["exotic_" + field]["exotic_" + field + "_previous_season"][i], data["standard_" + field]["standard_" + field + "_this_season"][i] + data["exotic_" + field]["exotic_" + field + "_this_season"][i], data["standard_" + field]["total_standard_" + field + "_pytd"][i] + data["exotic_" + field]["total_exotic_" + field + "_pytd"][i], data["standard_" + field]["total_standard_" + field + "_ytd"][i] + data["exotic_" + field]["total_exotic_" + field + "_ytd"][i]]
                    });
                }
            }
            var src = d3.nest()
                .key(function (d) {
                    return d.type;
                })
                .entries(src1);
            $("#figure-div-" + fig_id).html("");
            stat_figure_multiline_draw(fig_id, src, title, label, kpi, {
                y_format: "%"
            });
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + season + "' failed!</span>");
        });
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
    var color = d3.scale.category10();
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

function stat_figure_active_rate_year(title, fig_title, label, season, segment, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 12, function () {
        $.get(API_SERVER + "summary/active-rate/?type=year&season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = [];
            var src1 = [];
            for (var i = 0; i < data["active_rate_last"].length; i++) {
                src1.push({
                    type: "previous_season",
                    y: data["active_rate_last"][i],
                    x: i + 1
                });
                src1.push({
                    type: "current_season",
                    y: data["active_rate"][i],
                    x: i + 1
                });
            }
            src = d3.nest()
                .key(function (d) {
                    return d.type;
                }).entries(src1);
            $("#figure-div-" + fig_id).html("");
            stat_figure_multiline_draw(fig_id, src, title, label, kpi, {
                y_format: "%"
            });
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + season + "' failed!</span>");
        });
    });
}

function stat_figure_bet_share(title, fig_title, label, seperate, season, segment) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: seperate ? "X Axis" : "Key",
        y: seperate ? "Y Axis" : "Value"
    }), fig_id, 4, function () {
        $.get(API_SERVER + "summary/channel-shares/?season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            if (seperate) {
                var src = [{
                    types: ['Standard Turnover', 'Exotic Turnover']
                }];
                for (var i = 0; i < data["major_channel"].length; i++) {
                    src[0][data["major_channel"][i]] = [data["standard_turnover_ytd"][i], data["exotic_turnover_ytd"][i]];
                }
                $("#figure-div-" + fig_id).html("");
                stat_figure_stacked_bar_chart_draw(fig_id, src, title, label, {
                    gap: .35,
                    xKey: "types",
                    yKey: data["major_channel"],
                    y_format: "%",
                    y_digit: 2,
                    x_rotate: false
                });
            } else {
                var src = [];
                for (var i = 0; i < data["major_channel"].length; i++) {
                    src.push({
                        key: data["major_channel"][i],
                        value: data["standard_turnover_ytd"][i] + data["exotic_turnover_ytd"][i]
                    });
                }
                setTimeout(function () {
                    $("#figure-div-" + fig_id).html("");
                    stat_figure_pie_chart_draw(fig_id, src, title, label);
                }, 100);
            }
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + column + "' failed!</span>");
        });
    });
}

function stat_figure_stacked_bar_chart_draw(fig_id, src, title, label, params) {
    var fig_title_container = $("#figure-title-" + fig_id);
    var fig_portlet_body_container = $("#figure-portlet-" + fig_id + ">div>.portlet-body");
    var fig_portlet_meta_container = $("#figure-meta-" + fig_id);
    fig_title_container.css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().next().css("width", fig_portlet_body_container.width() + "px");
    $(".tooltip").css("z-index", $("#figure-portlet-" + fig_id + " .portlet").css("z-index") + 1);
    var margin = (("margin" in params) ? params["margin"] : {top: 20, right: 20, bottom: 50, left: 50});
    var color = d3.scale.category10();
    var width = fig_portlet_body_container.width() - margin.left - margin.right;
    var height = (fig_portlet_body_container.height() < 300 ? 300 : fig_portlet_body_container.height() - fig_portlet_meta_container.height()) - margin.top - margin.bottom;
    var x = d3.scale.ordinal().rangeRoundBands([0, width], (("gap" in params) ? params["gap"] : .1));
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks((("y_segment" in params) ? params["y_segment"] : 10), (("y_format" in params) ? params["y_format"] : ""));
    var svg = d3.select("#figure-div-" + fig_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    if (("xKey" in params) && ("yKey" in params)) {
        var dataIntermediate = params["yKey"].map(function (c) {
            return src[0][params["xKey"]].map(function (d) {
                return {x: d, y: src[0][c][src[0][params["xKey"]].indexOf(d)]};
            });
        });
        var stackLayout = d3.layout.stack()(dataIntermediate);
        x.domain(stackLayout[0].map(function (d) {
            return d.x;
        }));
        var y_min_stat = 0;
        var y_max_stat = d3.max(stackLayout[stackLayout.length - 1], function (d) {
            return d.y0 + d.y;
        });
    }
    else {
        x.domain(src.map(function (d) {
            return d.x;
        }));
        y_min_stat = d3.min(src, function (d) {
            return d.y;
        });
        y_max_stat = d3.max(src, function (d) {
            return d.y;
        });
    }
    y.domain((("y_relax" in params) && params["y_relax"]) ? [(y_min_stat - (y_max_stat - y_min_stat) * 0.5), (y_max_stat + (y_max_stat - y_min_stat) * 0.5)] : [y_min_stat, y_max_stat]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.3em")
        .attr("transform", function (d) {
            return (("x_rotate" in params) && params["x_rotate"]) ? "rotate(-65)" : "translate(" + (x.rangeBand() / 2) + "," + 10 + ")";
        });
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)");
    var layer = svg.selectAll(".stack")
        .data(stackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return color(i);
        });
    var v = d3.svg.line()
        .x(function (d, i) {
            return x(d.x) + x.rangeBand() * (1 - i);
        })
        .y(function (d) {
            return y(d.y + d.y0);
        });
    for (i = 0; i < stackLayout.length - 1; i++) {
        for (j = 0; j < stackLayout[i].length - 1; j++) {
            svg.append("path")
                .attr("class", "line")
                .style("stroke", "black")
                .style("stroke-width", 0.5)
                .attr("d", v([stackLayout[i][j], stackLayout[i][j + 1]]))
                .attr("transform", "translate(0, 0)")
        }
    }
    // Legend Text
    for (var i = 0; i < params["yKey"].length; i++) {
        svg.append("text")
            .text("■ " + params["yKey"][i])
            .attr("x", function () {
                return i * width / params["yKey"].length + (width / params["yKey"].length - $(this).width()) / 2;
            })
            .attr("y", height + (margin.bottom / 2) + 15)
            //.attr("class", "legend") // style the legend
            .style("fill", function () {
                return color([i]);
            })
            .style("font-weight", "bold");
    }
    layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("class", "rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .on("mousemove", function (d) {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(("y_digit" in params) ? (("y_format" in params && params["y_format"] == "%") ? ((100.0 * d.y).toFixed(params["y_digit"]) + "%") : d.y.toFixed(params["y_digit"])) : d.y).style("left", (d3.event.pageX + 15) + "px").style("top", (d3.event.pageY - 15) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition().duration(200).style("opacity", 0);
        });
}

function stat_figure_wakeup_rate(title, fig_title, label, season, segment, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 8, function () {
        $.get(API_SERVER + "summary/wakeup-rate/?season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = [];
            var src1 = [];
            for (var i = 0; i < data["wakeup_rate_previous_season"].length; i++) {
                src1.push({
                    type: "previous_season",
                    y: data["wakeup_rate_previous_season"][i],
                    x: i + 1
                });
                src1.push({
                    type: "current_season",
                    y: data["wakeup_rate_this_season"][i],
                    x: i + 1
                });
            }
            src = d3.nest()
                .key(function (d) {
                    return d.type;
                })
                .entries(src1);
            $("#figure-div-" + fig_id).html("");
            stat_figure_multiline_draw(fig_id, src, title, label, kpi, {
                y_format: "%"
            });
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + season + "' failed!</span>");
        });
    });
}

function stat_figure_tree(title, fig_title, label, season, segment) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 12, function () {
        $.get(API_SERVER + "summary/growth-in-detail/?season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = {
                "Total Investment": [
                    {y: data["total_investment"][0], x: "P1"},
                    {y: data["total_investment"][1], x: "P2"}
                ],
                "Number of Customers": [
                    {y: data["number_of_customers"][0], x: "P1"},
                    {y: data["number_of_customers"][1], x: "P2"}
                ],
                "Investment per Customer": [
                    {y: data["investment_per_customer"][0], x: "P1"},
                    {y: data["investment_per_customer"][1], x: "P2"}
                ],
                "Races per Customer": [
                    {y: data["races_per_customer"][0], x: "P1"},
                    {y: data["races_per_customer"][1], x: "P2"}
                ],
                "Investment per Race": [
                    {y: data["investment_per_race"][0], x: "P1"},
                    {y: data["investment_per_race"][1], x: "P2"}
                ],
                "Meetings per Customer": [
                    {y: Number(data["meetings_per_customer"][0].toFixed(2)), x: "P1"},
                    {y: Number(data["meetings_per_customer"][1].toFixed(2)), x: "P2"}
                ],
                "Bet per Race": [
                    {y: Number(data["bet_per_race"][0].toFixed(2)), x: "P1"},
                    {y: Number(data["bet_per_race"][1].toFixed(2)), x: "P2"}
                ],
                "Investment per Bet": [
                    {y: data["investment_per_bet"][0], x: "P1"},
                    {y: data["investment_per_bet"][1], x: "P2"}
                ]
            };
            var treeData = [{
                "name": "Total Investment",
                "unit": (season - 2000 - 1) + "/" + (season - 2000) + " Indexed to " + (season - 2000 - 2) + "/" + (season - 2000 - 1),
                "parent": "null",
                "children": [{
                    "name": "Number of Customers",
                    "unit": (season - 2000 - 1) + "/" + (season - 2000) + " Indexed to " + (season - 2000 - 2) + "/" + (season - 2000 - 1),
                    "parent": "Total Investment"
                }, {
                    "name": "Investment per Customer",
                    "unit": "HKD",
                    "parent": "Total Investment",
                    "children": [{
                        "name": "Races per Customer",
                        "unit": "# of Races",
                        "parent": "Investment per Customer"
                    }, {
                        "name": "Investment per Race",
                        "unit": "HKD",
                        "parent": "Investment per Customer",
                        "children": [{
                            "name": "Bet per Race",
                            "unit": "# of Bets",
                            "parent": "Investment per Race"
                        }, {
                            "name": "Investment per Bet",
                            "unit": "HKD",
                            "parent": "Investment per Race"
                        }]
                    }]
                }]
            }, {
                "name": "Meetings per Customer",
                "unit": "# of Meetings",
                "parent": "null"
            }];
            $("#figure-div-" + fig_id).html("");
            stat_figure_tree_chart_draw(fig_id, src, treeData, title, label);
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + column + "' failed!</span>");
        });
    });
}


function stat_figure_tree_chart_draw(fig_id, src, treeData, title, label) {
    var fig_title_container = $("#figure-title-" + fig_id);
    var fig_portlet_body_container = $("#figure-portlet-" + fig_id + ">div>.portlet-body");
    var fig_portlet_meta_container = $("#figure-meta-" + fig_id);
    fig_title_container.css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().css("width", fig_portlet_body_container.width() + "px");
    fig_title_container.next().next().css("width", fig_portlet_body_container.width() + "px");
    $(".tooltip").css("z-index", $("#figure-portlet-" + fig_id + " .portlet").css("z-index") + 1);
    var margin = {top: 20, right: 20, bottom: 50, left: 50};
    var width = fig_portlet_body_container.width() - margin.left - margin.right;
    var height = (fig_portlet_body_container.height() < 600 ? 600 : fig_portlet_body_container.height() - fig_portlet_meta_container.height()) - margin.top - margin.bottom;
    var i = 0, duration = 0, rectX = 200, rectY = 150;
    var gap = {top: 20, right: 20, bottom: 20, left: 20};
    var tree = d3.layout.tree().nodeSize([rectX, rectY]);
    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.x + rectX / 2, d.y + rectY / 2];
        });
    var svg = d3.select("#figure-div-" + fig_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var root = treeData[0];
    var nodes = tree.nodes(root);
    var links = tree.links(nodes);
    var single_node = {
        depth: -1,
        id: -1,
        name: treeData[1].name,
        parent: "null",
        unit: treeData[1].unit,
        x: nodes[1].x,
        y: nodes[6].y
    };
    nodes.push(single_node);
    var minX = null, maxX = null, minY = null, maxY = null;
    nodes.forEach(function (d) {
        minX = (minX == null || d.x < minX) ? d.x : minX;
        maxX = (maxX == null || d.x > maxX) ? d.x : maxX;
        minY = (minY == null || d.y < minY) ? d.y : minY;
        maxY = (maxY == null || d.y > maxY) ? d.y : maxY;
    });
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });
    var prevPos = {};
    nodes.forEach(function (d) {
        var mapX = (d.x - minX) / (maxX - minX) * (height - rectY);
        var mapY = (d.y - minY) / (maxY - minY) * (width - rectX);
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", "translate(" + mapY + "," + mapX + ")");
        var x = d3.scale.ordinal().rangeRoundBands([gap.left, rectX - gap.right], .5);
        var y = d3.scale.linear().range([rectY - gap.top, gap.bottom]);
        var xAxis = d3.svg.axis().scale(x);
        x.domain(src[d.name].map(function (d) {
            return d.x;
        }));
        var y_min_stat = d3.min(src[d.name], function (d) {
            return d.y;
        });
        var y_max_stat = d3.max(src[d.name], function (d) {
            return d.y;
        });
        var change = (src[d.name][1].y - src[d.name][0].y) / src[d.name][0].y;
        y.domain([(y_min_stat - (y_max_stat - y_min_stat) * 10), (y_max_stat + (y_max_stat - y_min_stat) * 10)]);
        nodeEnter.append("rect")
            .attr("id", d.name)
            .attr("fill", "white")
            .attr("width", rectX)
            .attr("height", rectY)
            .attr("stroke", "black")
            .style("fill-opacity", 1)
            .attr("stroke-width", 1);
        nodeEnter.append("rect")
            .attr("fill", "steelblue")
            .attr("width", rectX)
            .attr("height", rectY * 0.35)
            .attr("stroke", "black")
            .style("fill-opacity", 1)
            .attr("stroke-width", 1);
        nodeEnter.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + 0 + "," + (rectY - gap.bottom) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.3em")
            .attr("transform", "translate(" + (x.rangeBand() / 2) + "," + 10 + ")");
        nodeEnter.selectAll(".bar").data(src[d.name]).enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.y) + rectY * 0.3;
            })
            .attr("height", function (d) {
                return rectY * 0.7 - gap.bottom - y(d.y);
            });
        nodeEnter.selectAll(".text").data(src[d.name]).enter().append("text")
            .attr("class", "text")
            //.attr("x", function (d) {
            //    return d.x;
            //})
            //.attr("y", function (d) {
            //    return d.y;
            //})
            .attr("dx", function (d) {
                return x(d.x) + (x.rangeBand() - gap.left) / 2;
            })
            .attr("dy", function (d) {
                return y(d.y) + rectY * 0.3 - 5;
            })
            .text(function (d) {
                return d.y;
            });
        nodeEnter.append("text")
            .attr("x", gap.left - 10)
            .attr("y", gap.top)
            .attr("fill", "white")
            .text(d.name);
        nodeEnter.append("text")
            .attr("x", gap.left - 10)
            .attr("y", gap.top + 20)
            .attr("fill", "white")
            .text(d.unit);
        nodeEnter.append("ellipse")
            .attr({
                cx: 100,
                cy: 75,
                rx: 30,
                ry: 15
            }).style({
            "fill": "green",
            "fill-opacity": 0.5
        });
        nodeEnter.append("text")
            .attr("x", 82)
            .attr("y", 80)
            .text(((change > 0) ? "+" : "") + (100 * change).toFixed(1) + "%");
        if (d.parent != "null") {
            var currentPos = [mapY, (mapX + rectY / 2)];
            svg.append("polyline").attr({
                points: prevPos[d.parent.name][0] + "," + prevPos[d.parent.name][1] + " " + ((prevPos[d.parent.name][0] + currentPos[0]) / 2) + "," + prevPos[d.parent.name][1] + " "
                + ((prevPos[d.parent.name][0] + currentPos[0]) / 2) + "," + currentPos[1] + " " + currentPos[0] + "," + currentPos[1]
            }).style({
                fill: "none",
                stroke: "black",
                "stroke-width": 1.5
            });
            svg.append("circle").attr({
                cx: (prevPos[d.parent.name][0] + currentPos[0]) / 2,
                cy: prevPos[d.parent.name][1],
                r: 10
            }).style({
                fill: "steelblue"
            });
            svg.append("line").attr({
                x1: (prevPos[d.parent.name][0] + currentPos[0]) / 2 - 5,
                y1: prevPos[d.parent.name][1] - 5,
                x2: (prevPos[d.parent.name][0] + currentPos[0]) / 2 + 5,
                y2: prevPos[d.parent.name][1] + 5
            }).style({
                stroke: "white",
                "stroke-width": 1.5
            });
            svg.append("line").attr({
                x1: (prevPos[d.parent.name][0] + currentPos[0]) / 2 - 5,
                y1: prevPos[d.parent.name][1] + 5,
                x2: (prevPos[d.parent.name][0] + currentPos[0]) / 2 + 5,
                y2: prevPos[d.parent.name][1] - 5
            }).style({
                stroke: "white",
                "stroke-width": 1.5
            });
        }
        prevPos[d.name] = [mapY + rectX, mapX + rectY / 2];
        //d.x = mapY;
        //d.y = mapX;
    });
    /*var link = svg.selectAll("path.link")
     .data(links, function (d) {
     return d.target.id;
     });
     var linkEnter = link.enter().insert("path", "g")
     .attr("class", "link")
     .attr("d", diagonal)
     .transition().duration(duration); */
}

function stat_figure_month_on_month_growth(title, fig_title, label, field, season, segment, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 12, function () {
        $.get(API_SERVER + "summary/month-on-month-growth/?field=" + field + "&season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = [];
            var src1 = [];
            for (var i = 0; i < data["standard_" + field]["std_growth"].length; i++) {
                src1.push({
                    type: "standard_" + field,
                    y: data["standard_" + field]["std_growth"][i],
                    x: i + 1,
                    values: [data["standard_" + field]["standard_" + field + "_last"][i], data["standard_" + field]["standard_" + field + "_current"][i], data["standard_" + field]["meeting_id_last"][i], data["standard_" + field]["meeting_id_current"][i]]
                });
                src1.push({
                    type: "exotic_" + field,
                    y: data["exotic_" + field]["exo_growth"][i],
                    x: i + 1,
                    values: [data["exotic_" + field]["exotic_" + field + "_last"][i], data["exotic_" + field]["exotic_" + field + "_current"][i], data["exotic_" + field]["meeting_id_last"][i], data["exotic_" + field]["meeting_id_current"][i]]
                });
            }
            src = d3.nest()
                .key(function (d) {
                    return d.type;
                })
                .entries(src1);
            $("#figure-div-" + fig_id).html("");
            stat_figure_multiline_draw(fig_id, src, title, label, kpi, {
                y_format: "%"
            });
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + season + "' failed!</span>");
        });
    });
}


function stat_figure_active_rate_month(title, fig_title, label, season, segment, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 6, function () {
        $.get(API_SERVER + "summary/active-rate/?type=month&season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = [];
            var src1 = [];
            for (var i = 0; i < data["active_rate_last"].length; i++) {
                src1.push({
                    type: "last_month",
                    y: data["active_rate_last"][i],
                    x: i + 1,
                    values: [data["meeting_id_last"][i]]
                });
                src1.push({
                    type: "current_month",
                    y: data["active_rate"][i],
                    x: i + 1,
                    values: [data["meeting_id_last"][i]]
                });
            }

            src = d3.nest()
                .key(function (d) {
                    return d.type;
                })
                .entries(src1);
            $("#figure-div-" + fig_id).html("");
            stat_figure_multiline_draw(fig_id, src, title, label, kpi, {
                y_format: "%"
            });
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + season + "' failed!</span>");
        });
    });
}

function stat_figure_active_analysis(title, fig_title, label, type, season, segment, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 6, function () {
        $.get(API_SERVER + "summary/active-analysis/?type=" + type + "&season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = [];
            var src1 = [];
            for (var i = 0; i < data["num_cust_previous_season"].length; i++) {
                src1.push({
                    type: "previous_season",
                    y: data["num_cust_previous_season"][i],
                    x: i + 1
                });
                src1.push({
                    type: "current_season",
                    y: data["num_cust_this_season"][i],
                    x: i + 1
                });
            }
            src = d3.nest()
                .key(function (d) {
                    return d.type;
                })
                .entries(src1);
            $("#figure-div-" + fig_id).html("");
            stat_figure_multiline_draw(fig_id, src, title, label, kpi, {});
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + season + "' failed!</span>");
        });
    });
}

function stat_figure_active_rate_latest(categorical, title, fig_title, label, season, data_digits, bins, segment) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 4, function () {
        $.get(API_SERVER + "summary/active-rate-latest/?season=" + season + (segment ? "&segment=" + segment : "") + "&categorical=" + categorical + (bins ? "&bins=" + bins.join() : ""), function (data) {
            var src = [];
            for (var i = 0; i < data["hist"].length; i++) {
                src.push({
                    y: data["hist"][i],
                    x: Number(data["bin_edges"][i + 1]) === data["bin_edges"][i + 1] ? data["bin_edges"][i].toFixed(data_digits) + "-" + data["bin_edges"][i + 1].toFixed(data_digits) : data["bin_edges"][i + 1]
                });
            }
            $("#figure-div-" + fig_id).html("");
            stat_figure_bar_chart_draw(fig_id, src, title, label);
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading latest active rate failed!</span>");
        });
    });
}

function stat_figure_bet_type(title, fig_title, label, season, segment) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "Key",
        y: "Value"
    }), fig_id, 4, function () {
        $.get(API_SERVER + "summary/bet-type/?season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = [];
            for (var i = 0; i < data["major_type"].length; i++) {
                src.push({
                    key: data["major_type"][i],
                    value: data["turnover_ytd"][i]
                });
            }
            $("#figure-div-" + fig_id).html("");
            stat_figure_pie_chart_draw(fig_id, src, title, label);
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + column + "' failed!</span>");
        });
    });
}

function stat_figure_active_rate_new(title, fig_title, label, season, segment, kpi) {
    var fig_id = guid();
    add_portlet("#figure-container", title, generate_portlet_meta(fig_id, fig_title, label, {
        x: "X Axis",
        y: "Y Axis"
    }), fig_id, 8, function () {
        $.get(API_SERVER + "summary/active-rate-new/?type=year&season=" + season + (segment ? "&segment=" + segment : ""), function (data) {
            var src = [];
            var src1 = [];
            for (var i = 0; i < data["active_rate_last"].length; i++) {
                src1.push({
                    type: "cumulative growth rate of active rate",
                    y: data["cumulative_growth_rate_of_active_rate"][i],
                    x: i + 1,
                    values: [data["active_rate_last"][i], data["active_rate"][i], data["num_cust_last"][i], data["num_cust"][i]]
                });
            }
            src = d3.nest()
                .key(function (d) {
                    return d.type;
                }).entries(src1);
            $("#figure-div-" + fig_id).html("");
            stat_figure_multiline_draw(fig_id, src, title, label, kpi, {
                y_format: "%"
            });
        }).fail(function () {
            $("#figure-div-" + fig_id).html("<span class='font-red'>Loading schema '" + season + "' failed!</span>");
        });
    });
}