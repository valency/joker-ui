var feature_tags = [
    {id: "id", text: "ID"},
    {id: "segment", text: "Segment"},
    {id: "age", text: "Age"},
    {id: "gender", text: "Gender"},
    {id: "yrs_w_club", text: "Club Years"},
    {id: "is_member", text: "Member"},
    {id: "is_hrs_owner", text: "Horse Owner"},
    {id: "major_channel", text: "Major Channel"},
    {id: "mtg_num", text: "Meetings Attended"},
    {id: "inv", text: "Investment"},
    {id: "div", text: "Dividend"},
    {id: "rr", text: "Recovery Rate"},
    {id: "end_bal", text: "Balance"},
    {id: "recharge_times", text: "Recharge Times"},
    {id: "recharge_amount", text: "Recharge Amount"},
    {id: "withdraw_times", text: "Withdraw Times"},
    {id: "withdraw_amount", text: "Withdraw Amount"}
];

$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    $("#select2_features").select2({
        tags: feature_tags
    });
});

function interpret_feature_tag(tag) {
    for (var i = 0; i < feature_tags.length; i++) {
        if (feature_tags[i].id == tag) return feature_tags[i].text;
    }
    return null;
}

function cluster() {
    var feature = $("#select2_features").select2('data');
    var header = [];
    var weight = [];
    for (var i = 0; i < feature.length; i++) {
        header.push(feature[i].id);
        weight.push(1.0);
    }
    bootbox.dialog({
        message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
        closeButton: false
    });
    $.get(API_SERVER + "joker/api/cust/kmeans/?header=" + header.join(",") + "&weight=" + weight.join(",") + "&pred_label=" + $("#select2_predictions").select2('data').id + "&n_clusters=" + $("#no_of_clusters").val() + "&n_records=" + $("#no_of_records").val() + "&model=1", function (data) {
        bootbox.hideAll();
        $("#canvas").html("");
        for (var i = 0; i < header.length; i++) {
            for (var j = i + 1; j < header.length; j++) {
                var figid = "figure_" + i + "_" + j;
                $("#canvas").append("<div id='" + figid + "' style='display:inline-block;'></div>");
                scatter("#" + figid, data, header[i], header[j]);
            }
        }
    }).fail(function () {
        bootbox.hideAll();
        $("#canvas").html("<div class='alert alert-danger'><strong>Error!</strong> Something is wrong during clustering.</div>");
    });
}

function scatter(container, data, xLabel, yLabel) {
    var margin = {top: 10, right: 10, bottom: 40, left: 50},
        width = $(".row").width() / 3 - 30 - margin.left - margin.right,
        height = $(".row").width() / 3 - 30 - margin.top - margin.bottom;
    var xScale = d3.scale.ordinal().domain(data.map(function (d) {
        return d[xLabel];
    })).rangePoints([0, width]);
    if ($.isNumeric(data[0][xLabel])) {
        xScale = d3.scale.linear().range([0, width]).domain(d3.extent(data, function (d) {
            return d[xLabel];
        }));
    }
    var yScale = d3.scale.ordinal().domain(data.map(function (d) {
        return d[yLabel];
    })).rangePoints([height, 0]);
    if ($.isNumeric(data[0][yLabel])) {
        yScale = d3.scale.linear().range([height, 0]).domain(d3.extent(data, function (d) {
            return d[yLabel];
        }));
    }
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    var zoom = d3.behavior.zoom().x(xScale).y(yScale).scaleExtent([1, 30]).on("zoom", function () {
        svg.select(".x.axis").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-45)");
        svg.select(".y.axis").call(yAxis);
        circle.attr("transform", transform);
    });
    var svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 3)
        .attr("y", height - 6)
        .style("text-anchor", "end")
        .text(interpret_feature_tag(xLabel));
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x", -3)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(interpret_feature_tag(yLabel));
    var circle = svg.selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", d3.svg.symbol().type("cross").size(20))
        .style("stroke-width", 0)
        .style("fill", function (d) {
            return COLOR_PALETTE[d.cluster];
        })
        .attr("transform", transform);
    d3.select(container).call(zoom);
    function transform(d) {
        return "translate(" + xScale(d[xLabel]) + "," + yScale(d[yLabel]) + ")";
    }
}






// PLOT.JS
function plot() {
    $("#canvas").html("Loading...");
    var filter_mode = $('.filter_operator').first().html();
    if (filter_mode != undefined) filter_mode = filter_mode.toLowerCase();
    var filters = [];
    var filter_containers = $(".filter_container span:nth-child(1)");
    for (var i = 0; i < filter_containers.length; i++) {
        var filter = $(filter_containers[i]).attr("value") + ",";
        if ($(filter_containers[i]).html().indexOf("{") > -1) filter += "in,";
        else filter += "range,";
        filter += $(filter_containers[i]).html().split(" ")[2].substr(1, $(filter_containers[i]).html().split(" ")[2].length - 2).replace(/,/g, "~");
        filters.push(filter);
    }
    $.get(API_SERVER + "joker/model/" + $("#select_pred_model").val() + "/kmeans/?model=&length=" + $("#no_of_records").val() + "&order=-" + $("#select_pred_order").val() + "&filter=" + filters.join(":") + "&filter_mode=" + filter_mode, function (data) {
        scatter_data = data;
        $("#canvas").html("<a href='javascript:void(0)' id='canvas_btn_reset' class='font-red' style='position:absolute;right:40px;top:20px;'><i class='fa fa-dot-circle-o'></i></a>");
        $("#canvas").append("<a href='javascript:void(0)' id='canvas_btn_minus' class='font-red' style='position:absolute;right:70px;top:20px;'><i class='fa fa-minus'></i></a>");
        $("#canvas").append("<a href='javascript:void(0)' id='canvas_btn_plus' class='font-red' style='position:absolute;right:100px;top:20px;'><i class='fa fa-plus'></i></a>");
        scatter(scatter_data, $("#select_feature_1").val(), $("#select_feature_2").val());
    }).fail(function () {
        $("#canvas").html("<span class='text-danger'>Loading data failed.</span>");
    });
}

function scale() {
    $("#canvas").html("");
    scatter(scatter_data, $("#select_feature_1").val(), $("#select_feature_2").val(), [$("#plot_x_min").val(), $("#plot_x_max").val()], [$("#plot_y_min").val(), $("#plot_y_max").val()]);
}

function scatter(data, xLabel, yLabel) {
    var margin = {top: 10, right: 10, bottom: 50, left: 50},
        width = $("#canvas").width() - margin.left - margin.right,
        height = $("#canvas").height() - margin.top - margin.bottom;
    var xDomain = data.map(function (d) {
        return d[xLabel];
    });
    var xScale = d3.scale.ordinal().domain(xDomain).rangePoints([0, width]);
    if ($.isNumeric(data[0][xLabel])) {
        xDomain = d3.extent(data, function (d) {
            return d[xLabel];
        });
        xScale = d3.scale.linear().range([0, width]).domain(xDomain);
    }
    var yDomain = data.map(function (d) {
        return d[yLabel];
    });
    var yScale = d3.scale.ordinal().domain(yDomain).rangePoints([height, 0]);
    if ($.isNumeric(data[0][yLabel])) {
        yDomain = d3.extent(data, function (d) {
            return d[yLabel];
        });
        yScale = d3.scale.linear().range([height, 0]).domain(yDomain);
    }
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(-height);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5).tickSize(-width);
    var zoom = d3.behavior.zoom().x(xScale).y(yScale).scaleExtent([1, 20]).on("zoom", zoomed);
    var svg = d3.select("#canvas").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 3)
        .attr("y", height - 6)
        .style("text-anchor", "end")
        .text(xLabel);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("x", -3)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yLabel);
    var circle = svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("r", 2.5)
        .style("fill", d3.scale.category10())
        .attr("transform", transform);
    d3.select("#canvas").call(zoom);
    d3.select("#canvas_btn_reset").on("click", function () {
        d3.transition().duration(750).tween("zoom", function () {
            var ix = d3.interpolate(xScale.domain(), xDomain),
                iy = d3.interpolate(yScale.domain(), yDomain);
            return function (t) {
                zoom.x(xScale.domain(ix(t))).y(yScale.domain(iy(t)));
                zoomed();
            };
        });
    });
    d3.select("#canvas_btn_plus").on("click", function () {
        zoom_button("plus");
    });
    d3.select("#canvas_btn_minus").on("click", function () {
        zoom_button("minus");
    });

    function zoom_button(mode) {
        d3.event.preventDefault();
        var center = [width / 2, height / 2],
            scale = zoom.scale(),
            extent = zoom.scaleExtent(),
            translate = zoom.translate(),
            x = translate[0], y = translate[1],
            factor = (mode === 'plus') ? 1.2 : 0.8,
            target_scale = scale * factor;
        if (target_scale === extent[0] || target_scale === extent[1]) {
            return false;
        }
        var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
        if (clamped_target_scale != target_scale) {
            target_scale = clamped_target_scale;
            factor = target_scale / scale;
        }
        x = (x - center[0]) * factor + center[0];
        y = (y - center[1]) * factor + center[1];
        d3.transition().duration(350).tween("zoom", function () {
            var interpolate_scale = d3.interpolate(scale, target_scale),
                interpolate_trans = d3.interpolate(translate, [x, y]);
            return function (t) {
                zoom.scale(interpolate_scale(t)).translate(interpolate_trans(t));
                zoomed();
            };
        });
    }

    function zoomed() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
        circle.attr("transform", transform);
    }

    function transform(d) {
        return "translate(" + xScale(d[xLabel]) + "," + yScale(d[yLabel]) + ")";
    }
}
