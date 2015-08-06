scatter_data = null;

$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    $("#canvas").height($(".page-content").height() - 200);
});

function add_filter() {
    var msg = '<div><select class="form-control" id="filter_feature">';
    msg += '<option value="id" filter_type="range">ID</option>';
    msg += '<option value="segment" filter_type="in">Segment</option>';
    msg += '<option value="age" filter_type="range">Age</option>';
    msg += '<option value="gender" filter_type="in">Gender</option>';
    msg += '<option value="yrs_w_club" filter_type="range">Club Years</option>';
    msg += '<option value="is_member" filter_type="in">Member</option>';
    msg += '<option value="is_hrs_owner" filter_type="in">Horse Owner</option>';
    msg += '<option value="major_channel" filter_type="in">Major Channel</option>';
    msg += '<option value="mtg_num" filter_type="range">Meetings Attended</option>';
    msg += '<option value="inv" filter_type="range">Investment</option>';
    msg += '<option value="div" filter_type="range">Dividend</option>';
    msg += '<option value="rr" filter_type="range">Recovery Rate</option>';
    msg += '<option value="end_bal" filter_type="range">Balance</option>';
    msg += '<option value="recharge_times" filter_type="range">Recharge Times</option>';
    msg += '<option value="recharge_amount" filter_type="range">Recharge Amount</option>';
    msg += '<option value="withdraw_times" filter_type="range">Withdraw Times</option>';
    msg += '<option value="withdraw_amount" filter_type="range">Withdraw Amount</option>';
    msg += '</select></div>';
    msg += '<div style="text-align:center;margin:10px;"><span id="filter_comparator" class="font-red">Loading...</span></div>';
    msg += "<div id='filter_detail'></div>";
    msg += "</div>";
    var dialog = bootbox.dialog({
        title: "Add Data Filter",
        message: msg,
        buttons: {
            Add: function () {
                var range = $("#filter_detail_selector").val();
                if (range != null && range != undefined && range != "") {
                    if (range.indexOf(";") > -1) range = "[" + range.replace(";", ",") + "]";
                    else range = "{" + range + "}";
                    var html = "<div class='filter_container' style='display:inline-block;'><span class='label bg-grey' value='" + $("#filter_feature").val() + "'>" + $("#filter_feature option:selected").html() + " ∈ " + range + "</span>";
                    html += "<a href='javascript:void(0)' class='label bg-red' onclick='$(this).parent().remove();'><i class='fa fa-times'></i></a>";
                    if ($("#filter_list").children().length > 1) html += "<a href='javascript:void(0)' class='filter_operator label bg-blue' style='margin:0 5px 0 5px;' onclick=\"$('.filter_operator').first().html()=='AND'?$('.filter_operator').html('OR'):$('.filter_operator').html('AND');\">AND</a>";
                    html += "</div>";
                    $("#filter_list").prepend(html);
                }
            }
        },
        show: false
    });
    dialog.on("shown.bs.modal", function () {
        $("select").select2({
            dropdownAutoWidth: 'true',
            minimumResultsForSearch: Infinity
        });
        $("#filter_feature").select2().on("change", function () {
            var filter_comparator = $("#filter_feature option:selected").attr("filter_type");
            if (filter_comparator == "range") {
                $("#filter_comparator").html("Between Range");
                $("#filter_detail").html("Loading...");
                $.get(API_SERVER + "joker/api/cust/range/?model=" + $("#select_pred_model").val() + "&field=" + $("#filter_feature").val(), function (data) {
                    $("#filter_detail").html("<input type='text' id='filter_detail_selector' value=''/>");
                    $("#filter_detail_selector").ionRangeSlider({
                        min: data.min,
                        max: data.max,
                        type: 'double',
                        prettify: false,
                        hasGrid: true
                    });
                });
            }
            else {
                $("#filter_comparator").html("Choose From");
                $("#filter_detail").html("Loading...");
                $.get(API_SERVER + "joker/api/cust/unique/?model=" + $("#select_pred_model").val() + "&field=" + $("#filter_feature").val(), function (data) {
                    $("#filter_detail").html("<input type='hidden' id='filter_detail_selector' class='form-control select2' value=''/>");
                    var filter_tags = [];
                    for (var i = 0; i < data.length; i++) {
                        filter_tags.push({
                            id: data[i].toString(),
                            text: data[i].toString()
                        });
                    }
                    $("#filter_detail_selector").select2({
                        tags: filter_tags
                    });
                });
            }
        });
        $("#filter_feature").select2("val", $("#filter_feature").first().val(), true);
    });
    dialog.modal('show');
}

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
    $.get(API_SERVER + "joker/api/cust/search/?model=" + $("#select_pred_model").val() + "&length=" + $("#no_of_records").val() + "&order=-" + $("#select_pred_order").val() + "&filter=" + filters.join(":") + "&filter_mode=" + filter_mode, function (data) {
        scatter_data = data;
        $("#canvas").html("<a href='javascript:void(0)' id='canvas_btn_reset' style='position:absolute;right:30px;top:10px;'>Reset</a>");
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

    function zoomed() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
        circle.attr("transform", transform);
    }

    function transform(d) {
        return "translate(" + xScale(d[xLabel]) + "," + yScale(d[yLabel]) + ")";
    }
}
