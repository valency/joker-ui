$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    var source = get_url_parameter("src");
    var model = get_url_parameter("model");
    var segment = get_url_parameter("seg");
    if (source != undefined && model != undefined && segment != undefined) {
        $("#form").remove();
        $("#canvas").show();
        $("#canvas_label").append("<span class='label bg-blue'><i class='fa fa-file-text-o'></i> " + source + "</span> ");
        $("#canvas_label").append("<span class='label bg-green'><i class='fa fa-briefcase'></i> " + model.replace("_prop", "").toTitleCase() + " Model</span> ");
        $("#canvas_label").append("<span class='label bg-purple'><i class='fa fa-users'></i> " + (segment == "" ? "All" : segment.replace(/,/g, ' & ')) + "</span> ");
        $.get(API_SERVER + "joker/api/csv_to_json/?src=validation/" + source, function (data_csv) {
            $.get(API_SERVER + "joker/api/cust/get_all/?model=" + get_url_parameter("mode") + "&segment=" + segment + "&draw=0&columns[0][data]=" + model + "&columns[0][name]=" + model + "&order[0][column]=0&order[0][dir]=desc&start=0&length=" + data_csv.content.length, function (data_ours) {
                var hit_msg = "<span class='badge badge-danger pull-right'>Hit!</span>";
                var truth = [];
                for (i = 0; i < data_csv.content.length; i++) {
                    truth.push(parseInt(data_csv.content[i]["TRUTH"]));
                }
                for (var i = 0; i < data_csv.header.length; i++) {
                    if (data_csv.header[i] == "TRUTH") continue;
                    $("#canvas_table_header").append("<th><i class='fa fa-empire'></i> " + data_csv.header[i] + "</th>");
                }
                var hit_count_ours = 0;
                var hit_count_csv = [];
                for (i = 0; i < data_csv.header.length; i++) {
                    hit_count_csv.push(0);
                }
                for (i = 0; i < data_csv.content.length; i++) {
                    var row = "<tr><td><a href='javascript:void(0);' onclick=\"show_detail('" + data_csv.content[i]["TRUTH"] + "');\">" + data_csv.content[i]["TRUTH"] + "</a></td>";
                    var v = data_ours.data[i].id;
                    if (truth.indexOf(v) > -1) hit_count_ours++;
                    row += "<td><a href='javascript:void(0);' class='font-" + (truth.indexOf(v) > -1 ? "red" : "grey-gallery") + "' onclick=\"show_detail('" + v + "');\">" + v + (truth.indexOf(v) > -1 ? hit_msg : "") + "</a></td>";
                    for (var j = 0; j < data_csv.header.length; j++) {
                        if (data_csv.header[j] == "TRUTH") continue;
                        v = parseInt(data_csv.content[i][data_csv.header[j]]);
                        if (truth.indexOf(v) > -1) hit_count_csv[j]++;
                        row += "<td><a href='javascript:void(0);' class='font-" + (truth.indexOf(v) > -1 ? "red" : "grey-gallery") + "' onclick=\"show_detail('" + v + "');\">" + v + (truth.indexOf(v) > -1 ? hit_msg : "") + "</a></td>";
                    }
                    row += "</tr>";
                    $("#canvas_table_body").append(row);
                }
                var foot = "<tr><td class='pull-right'>Hit Rate:</td>";
                foot += "<td>" + (100.0 * hit_count_ours / data_csv.content.length) + " %</td>";
                for (i = 0; i < data_csv.header.length; i++) {
                    if (data_csv.header[i] == "TRUTH") continue;
                    foot += "<td>" + (100.0 * hit_count_csv[i] / data_csv.content.length) + " %</td>";
                }
                foot += "</tr>";
                $("#canvas_table_foot").append(foot);
            });
        });
    } else {
        $("#canvas").remove();
        $("#form").show();
        $.get(API_SERVER + "joker/api/cust/dist/?model=" + get_url_parameter("mode") + "&column=segment", function (data) {
            var segment_tags = [];
            for (var i = 0; i < data.length; i++) {
                segment_tags.push({
                    id: data[i].segment,
                    text: "#" + data[i].segment + "(" + data[i].total + ")"
                });
            }
            $("#select2_segment").select2({
                tags: segment_tags
            });
        });
        $('#file_upload').fileupload({
            dataType: 'json',
            acceptFileTypes: '/(\.|\/)(csv|txt)$/i',
            done: function (e, data) {
                window.location.reload();
            }
        });
    }
});

function validate() {
    var source = $("#select2_source").val();
    var model = $("#select2_model").val();
    if (get_url_parameter("mode") == 2) model = "regular_prop";
    var segment = $("#select2_segment").val();
    window.location.href = "validation.php?mode=" + get_url_parameter("mode") + "&src=" + source + "&model=" + model + "&seg=" + segment;
}

function show_detail(id) {
    $.get(API_SERVER + "joker/api/cust/get/?id=" + id, function (data) {
        var html = generate_cust_data(data);
        bootbox.dialog({
            size: "large",
            message: html,
            title: "CUST_ID: " + data.id + " <a href='customer.php?id=" + data.id + "' target='_blank' class='fa fa-share'></a>"
        });
    });
}
