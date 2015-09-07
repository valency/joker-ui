var cust_list = [];

$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $.get(API_SERVER + "joker/model/" + $("#select_data_set").val() + "/set/retrieve_all_id/", function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                $("#input_set_id").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
            $("#input_set_id").select2({
                dropdownAutoWidth: 'true'
            });
            if (get_url_parameter("id") != undefined) {
                $("#input_set_id").select2("val", get_url_parameter("id"));
                cust_set_search();
            }
        } else {
            bootbox.alert("No customer set found. Click OK to create.", function () {
                window.location.href = "set-create.php";
            });
        }
    });
    $(window).resize(function () {
        WaitForFinalEvent(function () {
            if (cust_list.length > 0) cust_set_draw();
        }, 500, "window-resize");
    });
});

function cust_set_search() {
    $("#canvas-hint").html("<div class='alert alert-info'>Loading...</div>");
    $.get(API_SERVER + "joker/model/1/set/search/?id=" + $("#input_set_id").val(), function (data) {
        // Clean up
        $("#canvas-hint").html("");
        // Control: title, details, and buttons
        $("#canvas-control").removeClass("hidden");
        $("#canvas-control-id").html(data.id);
        $("#canvas-control-name").html(data.name);
        $("#canvas-control-create-time").html(data.create_time.substring(0, 19).replace("T", " "));
        $("#canvas-control-cluster-time").html(data.cluster_time == null ? "-" : data.cluster_time.substring(0, 19).replace("T", " "));
        $("#canvas-control-clusters").html(data.cluster_count);
        $("#canvas-control-customers").html(data.cust.length);
        $("#canvas-control-download-set").attr("href", API_SERVER + "joker/model/1/set/csv/?id=" + $("#input_set_id").val());
        // Control: details of clusters
        $("#canvas-control-cluster-details").html("");
        var cluster_amounts = [];
        for (var i = 0; i < data.cluster_count; i++) {
            cluster_amounts.push(0);
        }
        for (i = 0; i < data.cust.length; i++) {
            cluster_amounts[data.cust[i].cluster]++;
        }
        for (i = 0; i < data.cluster_count; i++) {
            var html = "<a class='bold' style='color:" + COLOR_PALETTE[i] + ";'>Cluster " + i + "</a>: ";
            html += cluster_amounts[i] + " Customers";
            html += "<br/>";
            $("#canvas-control-cluster-details").append(html);
        }
        // Control: draw buttons
        var x_btn = $("#canvas-control-cluster-draw-x");
        var y_btn = $("#canvas-control-cluster-draw-y");
        x_btn.html("");
        y_btn.html("");
        for (i = 0; i < FEATURE_TAGS_MODEL_1.length; i++) {
            html = "<option value='" + FEATURE_TAGS_MODEL_1[i].id + "'>" + FEATURE_TAGS_MODEL_1[i].text + "</option>";
            x_btn.append(html);
            y_btn.append(html);
        }
        x_btn.select2({
            dropdownAutoWidth: 'true',
            minimumResultsForSearch: Infinity
        });
        y_btn.select2({
            dropdownAutoWidth: 'true',
            minimumResultsForSearch: Infinity
        });
        x_btn.select2("val", data["cluster_features"][0]);
        y_btn.select2("val", data["cluster_features"][1]);
        // Figure
        cust_list = [];
        for (i = 0; i < data.cust.length; i++) {
            var cust = data["cust"][i]["cust"];
            cust["cluster"] = data["cust"][i]["cluster"];
            cust_list.push(cust);
        }
        cust_set_draw();
    }).fail(function () {
        $("#canvas-hint").html("<div class='alert alert-danger'><strong>Error!</strong> Something is wrong during clustering.</div>");
    });
}

function cust_set_delete() {
    bootbox.dialog({
        title: "Delete Customer Set",
        message: "<p>The following customer set will be deleted:</p><p class='font-red'>" + $("#canvas-control-name").html() + "</p>",
        buttons: {
            Proceed: function () {
                bootbox.dialog({
                    message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
                    closeButton: false
                });
                $.get(API_SERVER + "joker/model/1/set/remove/?id=" + $("#canvas-control-id").html(), function (data) {
                    location.reload();
                });
            }
        }
    });
}


function cust_set_draw() {
    $("#canvas").html("");
    $("#canvas-control-zoom-x").prop('checked', true);
    $("#canvas-control-zoom-y").prop('checked', true);
    $.uniform.update();
    var xLabel = $("#canvas-control-cluster-draw-x").val();
    var yLabel = $("#canvas-control-cluster-draw-y").val();
    if ($.isNumeric(cust_list[0][xLabel]) && $.isNumeric(cust_list[0][yLabel])) {
        $("#canvas").html("<a href='javascript:void(0)' id='canvas_btn_reset' class='label bg-red' style='position:absolute;right:30px;top:20px;'><i class='fa fa-dot-circle-o'></i></a>");
        $("#canvas").append("<a href='javascript:void(0)' id='canvas_btn_minus' class='label bg-red' style='position:absolute;right:60px;top:20px;'><i class='fa fa-minus'></i></a>");
        $("#canvas").append("<a href='javascript:void(0)' id='canvas_btn_plus' class='label bg-red' style='position:absolute;right:90px;top:20px;'><i class='fa fa-plus'></i></a>");
    }
    draw_cust_x_y_scatter("#canvas", cust_list, xLabel, yLabel);
}

function draw_cust_x_y_scatter(container, data, xLabel, yLabel) {
    var margin = {top: 5, right: 5, bottom: 50, left: 50},
        width = $(container).width() - margin.left - margin.right,
        height = $(container).width() - margin.top - margin.bottom;
    var xMap = function (d) {
        return d[xLabel];
    };
    var yMap = function (d) {
        return d[yLabel];
    };
    var xDomain = data.map(xMap);
    var xScale = d3.scale.ordinal().domain(xDomain).rangePoints([0, width]);
    if ($.isNumeric(data[0][xLabel])) {
        xDomain = d3.extent(data, xMap);
        xScale = d3.scale.linear().range([0, width]).domain(xDomain);
    }
    var yDomain = data.map(yMap);
    var yScale = d3.scale.ordinal().domain(yDomain).rangePoints([height, 0]);
    if ($.isNumeric(data[0][yLabel])) {
        yDomain = d3.extent(data, yMap);
        yScale = d3.scale.linear().range([height, 0]).domain(yDomain);
    }
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(-height);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5).tickSize(-width);
    var zoom = d3.behavior.zoom().x(xScale).y(yScale).scaleExtent([1, 100]).on("zoom", zoomed);
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
        .attr("class", "axis-label")
        .attr("x", width - 3)
        .attr("y", height - 6)
        .style("text-anchor", "end")
        .text($("#canvas-control-cluster-draw-x option[value='" + xLabel + "']").text());
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
        .text($("#canvas-control-cluster-draw-y option[value='" + yLabel + "']").text());
    var circle = svg.selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", d3.svg.symbol().type("cross").size(20))
        .style("stroke-width", 0)
        .style("fill", function (d) {
            return COLOR_PALETTE[d["cluster"]];
        })
        .attr("transform", transform);
    d3.select(container).call(zoom);
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
    function transform(d) {
        var circle_transform = d3.transform(d3.select(this).attr("transform"));
        var xTransform = circle_transform.translate[0];
        var yTransform = circle_transform.translate[1];
        if ($("#canvas-control-zoom-x").is(':checked')) xTransform = xScale(d[xLabel]);
        if ($("#canvas-control-zoom-y").is(':checked')) yTransform = yScale(d[yLabel]);
        return "translate(" + xTransform + "," + yTransform + ")";
    }

    function zoomed() {
        //bars.attr("transform", "translate(" + d3.event.translate[0]+",0)scale(" + d3.event.scale + ",1)");


        if ($("#canvas-control-zoom-x").is(':checked')) svg.select(".x.axis").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-45)");
        if ($("#canvas-control-zoom-y").is(':checked')) svg.select(".y.axis").call(yAxis);
        circle.attr("transform", transform);
    }

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
}
