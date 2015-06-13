var plot_raw_info = null;

$(document).ready(function () {

});

jQuery.fn.flip_label_selection = function () {
    if (this.hasClass("label-red-font")) {
        this.removeClass("label-red-font");
        this.addClass("label-grey-font");
    } else if (this.hasClass("label-grey-font")) {
        this.removeClass("label-grey-font");
        this.addClass("label-red-font");
    }
};

function load_header() {
    $("#canvas").html("Loading...");
    $.get("python/api.py?CTL=101&SCHEMA=" + $("#schema").val(), function (data) {
        data = eval("(" + data + ")");
        if (data.status != 200)$("#canvas").html("Loading schema header failed.<br/>Error message: " + data.content);
        else {
            var html = "<p><a href='javascript:void(0)' onclick=\"$('#canvas .label-grey-font').each(function(){$(this).click()});\">Select All</a> | ";
            html += "<a href='javascript:void(0)' onclick=\"$('#canvas .label-red-font').each(function(){$(this).click()});\">Select None</a></p>";
            $("#canvas").html(html);
            for (var i = 0; i < data.content.length; i++) {
                $("#canvas").append("<input class='no_border' value='1.00' style='width:20px;'/> x <a href='javascript:void(0)' onclick='$(this).flip_label_selection();' class='label-grey-font'>" + data.content[i] + "</a><br/>");
            }
        }
    });
}

function generate_data() {
    var header = [];
    var weight = [];
    $("#canvas .label-red-font").each(function (i) {
        header.push("\"" + $(this).html() + "\"");
        weight.push($(this).prev().val());
    });
    $("#canvas").html("Loading...");
    $.post("python/api.py", {
        CTL: 102,
        SCHEMA: $("#schema").val(),
        HEADER: header.join(),
        WEIGHT: weight.join(),
        LIMIT: $("#no_of_records").val()
    }, function (data) {
        data = eval("(" + data + ")");
        if (data.status != 200) $("#canvas").html("Generating data failed.<br/>Error message: " + data.content);
        else {
            $("#job_id").val(data.content);
            $("#canvas").html("Specified data have been successfully generated.<br/>Your job id is: " + data.content + "<br/>You can now perform clustering.");
        }
    }).fail(function () {
        $("#canvas").html("Generating data failed.<br/>Error message: server no response");
    });
}

function cluster() {
    $("#canvas").html("Loading...");
    $.get("python/api.py?CTL=103&ID=" + $("#job_id").val() + "&N=" + $("#no_of_clusters").val(), function (data) {
        data = eval("(" + data + ")");
        if (data.status != 200) $("#canvas").html("Clustering failed.<br/>Error message: " + data.content);
        else $("#canvas").html("Clustering finished successfully.<br/>You can now plot the results.");
    });
}

function plot() {
    d3.csv("data/" + $("#job_id").val() + ".src.csv", function (error, data) {
        plot_raw_info = data;
        var header = d3.keys(data[0]);
        var options = "";
        for (var i = 0; i < header.length; i++) {
            options += "<option value='" + header[i] + "'>" + header[i] + "</option>";
        }
        $("#canvas").html("<div><select id='x_axis_label'>" + options + "</select> vs. <select id='y_axis_label'>" + options + "</select> <a href='javascript:void(0)' onclick='draw_diagram();'>Plot</a></div>");
        $("#canvas").append("<div id='diagram'></div>");
    });
}

function draw_diagram() {
    console.log("%cInit...", "color:#097C95");
    $("#diagram").html("");
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var xScale = d3.scale.linear().range([0, width]),
        xMap = function (d) {
            return xScale(d[$("#x_axis_label").val()]);
        },
        xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
        yScale = d3.scale.linear().range([height, 0]),
        yMap = function (d) {
            return yScale(d[$("#y_axis_label").val()]);
        },
        yAxis = d3.svg.axis().scale(yScale).orient("left");
    var color = d3.scale.category10();
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    var svg = d3.select("#diagram").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    console.log("%cLoading data...", "color:#097C95");
    d3.csv("data/" + $("#job_id").val() + ".kmeans.csv", function (error, data) {
        console.log("%cDrawing x axis...", "color:#097C95");
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text($("#x_axis_label").val());
        console.log("%cDrawing y axis...", "color:#097C95");
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text($("#y_axis_label").val());
        console.log("%cPlotting...", "color:#097C95");
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d) {
                return color(d["GROUP"]);
            })
            .on("mouseover", function (d) {
                var html = JSON.stringify(plot_raw_info[data.indexOf(d)]).replace(/{/g, "").replace(/}/g, "").replace(/\"/g, "");
                html = html.replace(/:/g, ": <span style='color:red'>");
                html = html.replace(/,/g, "</span><br/>");
                html = html + "</span><hr/>Group: <span style='color:red'>" + parseInt(d["GROUP"]) + "</span>";
                d3.select(this).transition()
                    .duration(200)
                    .attr("r", 10);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(html)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 50) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).transition()
                    .duration(200)
                    .attr("r", 5);
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });
}