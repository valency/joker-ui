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