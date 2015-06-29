var DT_CONF = {
    stateSave: true,
    searching: false,
    ordering: true,
    processing: true,
    serverSide: true,
    deferRender: true,
    lengthMenu: [10, 50, 100, 500],
    ajax: API_SERVER + "joker/api/cust/get_all/",
    columns: [
        {
            data: "id",
            render: function (data, type, full, meta) {
                return "<span class='label bg-blue'>" + data + "</span>";
            }
        },
        {
            data: "cust_code",
            render: function (data, type, full, meta) {
                return "<span class='label bg-purple'><i class='fa fa-group'></i> " + data + "</span>";
            }
        },
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
        aButtons: []
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

function add_portlet(target, title, body) {
    var content = '<div class="col-md-4">';
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
    if ($(target + ">.row").length <= 0 || $(target + ">.row:last>.col-md-4").length >= 3) {
        $(target).append('<div class="row"></div>');
    }
    $(target + ">.row:last").append(content);
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
            size: "large",
            message: html,
            title: "CUST_ID: " + data.id + " <a href='customer.php?id=" + data.id + "' target='_blank' class='fa fa-share'></a>"
        });
    });
    $(".tabletools-btn-group").append("<a class='btn btn-sm purple' id='cust_code_filter'><span>Segment Filter</span></a>");
    $("#cust_code_filter").click(function () {
        var cust_code_filter_label = $("#cust_code_filter>span");
        bootbox.dialog({
            title: "Filter by Segment:",
            message: "<input type='hidden' id='select2_segment' class='form-control select2' value=''/>",
            buttons: {
                OK: function () {
                    var selected = $("#select2_segment").select2('data');
                    if (selected.length > 0) {
                        var cust_code_set = [];
                        for (var i = 0; i < selected.length; i++) {
                            cust_code_set.push(selected[i].id);
                        }
                        cust_code_filter_label.html("<i class='fa fa-group'></i> " + cust_code_set.join(" & "));
                        table.ajax.url(API_SERVER + "joker/api/cust/get_all/?cust_code=" + cust_code_set.join(",")).load();
                    } else {
                        cust_code_filter_label.html("<span>Segment Filter</span>");
                        table.ajax.url(API_SERVER + "joker/api/cust/get_all/").load();
                    }
                }
            }
        });
        $.get(API_SERVER + "joker/api/cust/dist/?column=cust_code", function (data) {
            var segment_tags = [];
            for (var i = 0; i < data.length; i++) {
                segment_tags.push({
                    id: data[i].cust_code,
                    text: "#" + data[i].cust_code + "(" + data[i].total + ")"
                });
            }
            $("#select2_segment").select2({
                tags: segment_tags
            });
            if (!cust_code_filter_label.html().includes("Filter")) $("#select2_segment").select2("val", cust_code_filter_label.html().replace(/<(.*)>/g, "").replace(/ /g, "").split("&amp;"));
        });
    });
    $(".tabletools-btn-group").append("<a class='btn btn-sm green' id='cust_export'><span>Export</span></a>");
    $("#cust_export").click(function () {
        var url = table.ajax.url() + (table.ajax.url().includes("?") ? "&" : "?") + "csv=true&" + $.param(table.ajax.params());
        window.open(url);
    });
    $('#customer_table_wrapper').find('.dataTables_length select').select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    return table;
}

function generate_cust_data(data) {
    var html = "<div>";
    html += "<span class='label bg-purple'><i class='fa fa-group'></i> " + data.cust_code + "</span> ";
    html += "<span class='label bg-" + interpret_gender_color(data.gender) + "'>" + interpret_gender_name(data.gender) + "</span> ";
    html += "<span class='label bg-green'>" + data.age + " y/o</span> ";
    html += "<span class='label bg-" + (data.is_member ? "yellow" : "grey") + "'>" + (data.is_member ? "Member" : "Non-Member") + "</span> ";
    html += "<span class='label bg-" + (data.is_hrs_owner ? "yellow" : "grey") + "'>" + (data.is_hrs_owner ? "Horse Owner" : "Not Horse Owner") + "</span> ";
    html += "</div><hr/><div class='row'>";
    html += "<div class='col-md-6'>";
    html += "<span class='font-green'>Club Years: </span><span>" + data.yrs_w_club + "</span><br/>";
    html += "<span class='font-green'>Major Channel: </span><span>" + data.major_channel + "</span><br/>";
    html += "<span class='font-green'>Meetings Attended in Last Season: </span><span>" + data.mtg_num + "</span><br/>";
    html += "<span class='font-green'>Total Investment: </span><span>" + data.inv + "</span><br/>";
    html += "<span class='font-green'>Total Investment in Beginning of Season: </span><span>" + data.inv_seg_1 + "</span><br/>";
    html += "<span class='font-green'>Total Investment in Middle of Season: </span><span>" + data.inv_seg_2 + "</span><br/>";
    html += "<span class='font-green'>Total Investment in Ending of Season: </span><span>" + data.inv_seg_3 + "</span><br/>";
    html += "</div><div class='col-md-6'>";
    html += "<span class='font-green'>Dividend: </span><span>" + data.div + "</span><br/>";
    html += "<span class='font-green'>Recovery Rate: </span><span>" + data.rr + "</span><br/>";
    html += "<span class='font-green'>Balance: </span><span>" + data.end_bal + "</span><br/>";
    html += "<span class='font-green'>Recharge Times: </span><span>" + data.recharge_times + "</span><br/>";
    html += "<span class='font-green'>Recharge Amount: </span><span>" + data.recharge_amount + "</span><br/>";
    html += "<span class='font-green'>Withdraw Times: </span><span>" + data.withdraw_times + "</span><br/>";
    html += "<span class='font-green'>Withdraw Amount: </span><span>" + data.withdraw_amount + "</span>";
    html += "</div>";
    html += "</div><hr/><div class='row'>";
    var pred = find_prediction_type(data.prediction, "Grow");
    if (pred != null) {
        html += "<div class='col-md-6'>";
        html += "<div class='thumbnail' style='height:100px;width:100px;vertical-align:bottom;display:inline-block;'>";
        html += "<div class='thumbnail bg-grey' style='width:100%;height:100%;text-align:center;'>";
        html += "<p class='bold font-red' style='font-size:35px;margin:0;'>" + pred.prob.toFixed(1) + "</p>";
        html += "<p style='font-size:10px;'><span class='font-red'>GROW</span><br/>PROPENSITY</p>";
        html += "</div>";
        html += "</div>";
        html += "<div class='thumbnail' style='height:100px;width:200px;display:inline-block;padding:12px;'>";
        html += "<p><i class='fa fa-arrow-up'></i> " + pred.reason_code_1 + "</p>";
        html += "<p><i class='fa fa-arrow-up'></i> " + pred.reason_code_2 + "</p>";
        html += "<p><i class='fa fa-arrow-up'></i> " + pred.reason_code_3 + "</p>";
        html += "</div>";
        html += "</div>";
    }
    pred = find_prediction_type(data.prediction, "Lapse");
    if (pred != null) {
        html += "<div class='col-md-6'>";
        html += "<div class='thumbnail' style='height:100px;width:100px;vertical-align:bottom;display:inline-block;'>";
        html += "<div class='thumbnail bg-grey' style='width:100%;height:100%;text-align:center;'>";
        html += "<p class='bold font-green' style='font-size:35px;margin:0;'>" + pred.prob.toFixed(1) + "</p>";
        html += "<p style='font-size:10px;'><span class='font-green'>DECLINE</span><br/>PROPENSITY</p>";
        html += "</div>";
        html += "</div>";
        html += "<div class='thumbnail' style='height:100px;width:200px;display:inline-block;padding:12px;'>";
        html += "<p><i class='fa fa-arrow-down'></i> " + pred.reason_code_1 + "</p>";
        html += "<p><i class='fa fa-arrow-down'></i> " + pred.reason_code_2 + "</p>";
        html += "<p><i class='fa fa-arrow-down'></i> " + pred.reason_code_3 + "</p>";
        html += "</div>";
        html += "</div>";
    }
    pred = find_prediction_type(data.prediction, "Growth");
    if (pred != null) {
        html += "<div class='col-md-12'>";
        html += "<div class='thumbnail' style='height:100px;width:100px;vertical-align:bottom;display:inline-block;'>";
        html += "<div class='thumbnail bg-grey' style='width:100%;height:100%;text-align:center;'>";
        html += "<p class='bold font-yellow' style='font-size:35px;margin:0;'>" + (pred.prob * 100.0).toFixed(1) + "</p>";
        html += "<p style='font-size:10px;'><span class='font-yellow'>CHANCE</span><br/>TO BE REGULAR</p>";
        html += "</div>";
        html += "</div>";
        html += "<div class='thumbnail' style='height:100px;width:200px;display:inline-block;padding:12px;'>";
        html += "<p><i class='fa fa-rocket'></i> " + pred.reason_code_1 + "</p>";
        html += "<p><i class='fa fa-rocket'></i> " + pred.reason_code_2 + "</p>";
        html += "<p><i class='fa fa-rocket'></i> " + pred.reason_code_3 + "</p>";
        html += "</div>";
        html += "</div>";
    }
    html += "</div>";
    html += "</div>";
    return html;
}

function piechart(src, table_title, table_desc) {
    var figid = guid();
    var container = "<div style='display:inline-block;text-align:center;'>";
    container += "<span class='bold'>" + table_title + "</span><br/>";
    container += "<span>" + table_desc + "</span><br/>";
    container += "<div id='figure_container_" + figid + "'></div>";
    container += "</div>";
    add_portlet("#figure_container", table_title, container);
    var width = $(".portlet-body:first").width() - 5,
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

function polyline(src, table_title, table_desc, width, kpi) {
    var figid = guid();
    var container = "<div style='display:inline-block;text-align:center;'>";
    container += "<span class='bold'>" + table_title + "</span><br/>";
    container += "<span>" + table_desc + "</span><br/>";
    container += "<div id='figure_container_" + figid + "'></div>";
    container += "</div>";
    add_portlet("#figure_container", table_title, container);
    render_polyline(figid, src, width == null ? $(".portlet-body:first").width() : width, kpi);
}

function render_polyline(figid, src, container_width, kpi) {
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = container_width - 5 - margin.left - margin.right,
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
    var container = "<div style='display:inline-block;text-align:center;'>";
    container += "<span class='bold'>" + table_title + "</span><br/>";
    container += "<span>" + table_desc + "</span><br/>";
    container += "<div id='figure_container_" + figid + "'></div>";
    container += "</div>";
    add_portlet("#figure_container", table_title, container);
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = $(".portlet-body:first").width() - 5 - margin.left - margin.right,
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
    var container = "<div style='display:inline-block;text-align:center;'>";
    container += "<span class='bold'>" + table_title + "</span><br/>";
    container += "<span>" + table_desc + "</span><br/>";
    container += "<div id='figure_container_" + figid + "'></div>";
    container += "</div>";
    add_portlet("#figure_container", table_title, container);
    var margin = {top: 20, right: 10, bottom: 70, left: 50},
        width = $(".portlet-body:first").width() - 5 - margin.left - margin.right,
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
    var figid = guid();
    var container = "<div style='display:inline-block;text-align:center;'>";
    container += "<span class='bold'>" + table_title + "</span><br/>";
    container += "<span>" + table_desc + "</span><br/>";
    container += "<div id='figure_container_" + figid + "'></div>";
    container += "</div>";
    add_portlet("#figure_container", table_title, container);
    $.get(API_SERVER + "joker/api/cust/histogram/?column=" + column + "&categorical=" + categorical, function (data) {
        var src = [];
        for (var i = 0; i < data.hist.length; i++) {
            src.push({
                "hist": data.hist[i],
                "bin_edges": Number(data.bin_edges[i]) === data.bin_edges[i] ? data.bin_edges[i].toFixed(2) : data.bin_edges[i]
            });
        }
        var margin = {top: 20, right: 10, bottom: 70, left: 50},
            width = $(".portlet-body:first").width() - 5 - margin.left - margin.right,
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
    }).fail(function () {
        $("#figure_container_" + figid).html("Loading schema '" + column + "' failed.<br/>Error message: " + data.content);
    });
}