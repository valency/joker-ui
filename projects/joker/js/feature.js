var DT_CONF = {
    stateSave: true,
    searching: false,
    ordering: true,
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: API_SERVER + "joker/api/cust/get_all/",
    columns: [
        {data: "id"},
        {data: "age"},
        {data: "gender"},
        {data: "yrs_w_club"},
        {
            data: "is_member",
            render: function (data, type, full, meta) {
                return data ? "Yes" : "No";
            }
        },
        {
            data: "is_hrs_owner",
            render: function (data, type, full, meta) {
                return data ? "Yes" : "No";
            }
        },
        {data: "major_channel"},
        {data: "mtg_num"},
        {data: "inv"},
        {data: "div"},
        {data: "rr"},
        {data: "end_bal"},
        {data: "recharge_times"},
        {data: "recharge_amount"},
        {data: "withdraw_times"},
        {data: "withdraw_amount"}
    ],
    dom: "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
    tableTools: {
        sSwfPath: "assets/global/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
        aButtons: [{
            sExtends: "pdf",
            sButtonText: "PDF"
        }, {
            sExtends: "csv",
            sButtonText: "CSV"
        }, {
            sExtends: "xls",
            sButtonText: "Excel"
        }, {
            sExtends: "copy",
            sButtonText: "Copy"
        }]
    },
    fnInitComplete: function (oSettings, json) {
        var table_tools = $("#customer_table_wrapper>.row:first>div").first().first();
        table_tools.appendTo("#customer_table_wrapper>.row:nth-child(2)");
        table_tools.switchClass("col-md-12", "col-md-6 col-sm-12", 0);
    }
};

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

function load_data(div_id, conf) {
    $.extend(true, $.fn.DataTable.TableTools.classes, {
        "container": "btn-group tabletools-btn-group pull-right",
        "buttons": {
            "normal": "btn btn-sm default",
            "disabled": "btn btn-sm default disabled"
        }
    });
    var table = $('#' + div_id).DataTable(conf);
    $("#" + div_id + " tbody").on('click', 'tr', function () {
        var data = table.row(this).data();
        var html = generate_cust_data(data);
        bootbox.dialog({
            message: html,
            title: "CUST_ID: " + data.id + " <a href='customer.php?id=51' target='_blank' class='fa fa-share'></a>"
        });
    });
    $('#customer_table_wrapper').find('.dataTables_length select').select2();
    return table;
}

function generate_cust_data(data) {
    var html = "<div>";
    html += "<span class='label bg-" + interpret_gender_color(data.gender) + "'>" + interpret_gender_name(data.gender) + "</span> ";
    html += "<span class='label bg-" + (data.is_member ? "green" : "grey") + "'>" + (data.is_member ? "Member" : "Non-Member") + "</span> ";
    html += "<span class='label bg-" + (data.is_hrs_owner ? "yellow" : "grey") + "'>" + (data.is_hrs_owner ? "Horse Owner" : "Not Horse Owner") + "</span> ";
    html += "</div><hr/><div class='row'>";
    html += "<div class='col-md-5'>";
    var pred = find_prediction_type(data.prediction, "Grow");
    if (pred == null) pred = {
        prob: "-",
        reason_code_1: "N/A",
        reason_code_2: "N/A",
        reason_code_3: "N/A"
    };
    html += "<span class='bold font-red'><i class='fa fa-arrow-up'></i> Grow Propensity: </span>" + (pred.prob * 100.0).toFixed(1) + " %<br/>";
    html += "<span class='bold'><i class='fa'></i> Reason Code: </span><ul>";
    html += "<li>" + pred.reason_code_1 + "</li>";
    html += "<li>" + pred.reason_code_2 + "</li>";
    html += "<li>" + pred.reason_code_3 + "</li>";
    html += "</ul>";
    pred = find_prediction_type(data.prediction, "Lapse");
    if (pred == null) pred = {
        prob: "-",
        reason_code_1: "N/A",
        reason_code_2: "N/A",
        reason_code_3: "N/A"
    };
    html += "<span class='bold font-green'><i class='fa fa-arrow-down'></i> Lapse Propensity: </span>" + (pred.prob * 100.0).toFixed(1) + " %<br/>";
    html += "<span class='bold'><i class='fa'></i> Reason Code: </span><ul>";
    html += "<li>" + pred.reason_code_1 + "</li>";
    html += "<li>" + pred.reason_code_2 + "</li>";
    html += "<li>" + pred.reason_code_3 + "</li>";
    html += "</ul>";
    html += "</div>";
    html += "<div class='col-md-7'>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Age: </span>" + data.age + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Club Years: </span>" + data.yrs_w_club + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Major Channel: </span>" + data.major_channel + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Meetings Attended in Last Season: </span>" + data.mtg_num + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Total Investment: </span>" + data.inv + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Total Investment in Beginning of Season: </span>" + data.inv_seg_1 + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Total Investment in Middle of Season: </span>" + data.inv_seg_2 + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Total Investment in Ending of Season: </span>" + data.inv_seg_3 + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Dividend: </span>" + data.div + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Recovery Rate: </span>" + data.rr + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Balance: </span>" + data.end_bal + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Recharge Times: </span>" + data.recharge_times + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Recharge Amount: </span>" + data.recharge_amount + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Withdraw Times: </span>" + data.withdraw_times + "<br/>";
    html += "<span class='bold font-blue-madison'><i class='fa fa-angle-right'></i> Withdraw Amount: </span>" + data.withdraw_amount;
    html += "</div></div>";
    return html;
}

function piechart(src, table_title, table_desc) {
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var width = 300,
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
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = 300 - margin.left - margin.right,
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
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = 300 - margin.left - margin.right,
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
    var figid = guid();
    $("#figure_container").append("<div style='display:inline-block;text-align:center;'><span class='bold'>" + table_title + "</span><br/><span>" + table_desc + "</span><div id='figure_container_" + figid + "'></div></div>");
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = 300 - margin.left - margin.right,
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

function histogram(column, categorical, table_title, table_desc, DATA_SRC) {
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
                width = 300 - margin.left - margin.right,
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