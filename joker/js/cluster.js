var feature_tags = [
    {id: "cust_code", text: "Customer Code"},
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
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    $("#select2_features").select2({
        tags: feature_tags
    });
});

function select_all_features() {
    var tags = [];
    for (var i = 0; i < feature_tags.length; i++) {
        tags.push(feature_tags[i].id);
    }
    $("#select2_features").select2("val", tags);
}

function remove_all_features() {
    $("#select2_features").select2("val", []);
}

function interpret_feature_tag(tag) {
    for (var i = 0; i < feature_tags.length; i++) {
        if (feature_tags[i].id == tag)return feature_tags[i].text;
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
    $.get(API_SERVER + "joker/api/cust/kmeans/?header=" + header.join(",") + "&weight=" + weight.join(",") + "&pred_label=" + $("#select2_predictions").select2('data').id + "&n_clusters=" + $("#no_of_clusters").val() + "&n_records=" + $("#no_of_records").val(), function (data) {
        bootbox.hideAll();
        $("#canvas").html("");
        for (var i = 0; i < header.length; i++) {
            for (var j = i + 1; j < header.length; j++) {
                scatter(data, header[i], header[j]);
            }
        }
    }).fail(function () {
        bootbox.hideAll();
        $("#canvas").html("<div class='alert alert-danger'><strong>Error!</strong> Something is wrong during clustering.</div>");
    });
}

function scatter(data, xLabel, yLabel) {
    var margin = {top: 10, right: 10, bottom: 30, left: 30},
        width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
    var xScale = d3.scale.linear().range([0, width]).domain(d3.extent(data, function (d) {
        return d[xLabel];
    }));
    var yScale = d3.scale.linear().range([height, 0]).domain(d3.extent(data, function (d) {
        return d[yLabel];
    }));
    var xMap = function (d) {
            return xScale(d[xLabel]);
        },
        xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
        yMap = function (d) {
            return yScale(d[yLabel]);
        },
        yAxis = d3.svg.axis().scale(yScale).orient("left");
    var color = d3.scale.category10();
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    var svg = d3.select("#canvas").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(interpret_feature_tag(xLabel));
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(interpret_feature_tag(yLabel));
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function (d) {
            return COLOR_PALETTE[d.cluster];
        });
}