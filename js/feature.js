var DT_CONF = {
    jokerSource: null,
    stateSave: true,
    searching: false,
    ordering: true,
    processing: true,
    serverSide: true,
    deferRender: true,
    lengthMenu: [10, 50, 100, 500],
    ajax: API_SERVER + "joker/model/0/get_all/?source=",
    columns: [
        {
            data: "id",
            name: "id",
            render: function (data, type, full, meta) {
                return "<span class='label bg-blue'>" + data + "</span>";
            }
        },
        {
            data: "segment",
            name: "segment",
            render: function (data, type, full, meta) {
                return "<span class='label bg-purple'><i class='fa fa-group'></i> " + data + "</span>";
            }
        }
    ],
    dom: "R<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
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

function load_data(div_id, conf, model) {
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
        var html = generate_cust_data(data, model);
        bootbox.dialog({
            message: html,
            title: "CUST_ID: " + data.id + " <a href='customer.php?model=" + model + "&id=" + data.id + "' target='_blank' class='fa fa-share'></a>"
        }).on('shown.bs.modal', function (e) {
            generate_cust_turnover_barchart("#cust_detail_turnover_barchart", data.inv_part);
        });
        if (model == 1) {
            update_cust_rank(data.id, model, "grow_prop", conf.jokerSource);
            update_cust_rank(data.id, model, "decline_prop", conf.jokerSource);
        } else if (model == 2) {
            update_cust_rank(data.id, model, "chance_to_be_regular", conf.jokerSource);
        }
    });
    add_dataset_badge(table, model);
    add_segment_filter(table, model);
    add_column_filter(table, model);
    add_export_btn(table, model);
    $('#customer_table_wrapper').find('.dataTables_length select').select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    return table;
}

function add_dataset_badge(table, model) {
    $(".tabletools-btn-group").append("<a href='data.php' class='btn btn-sm red'><span><i class='fa fa-briefcase'></i> " + DT_CONF.jokerSource.replace(".csv", "") + "</span></a>");
}

function add_segment_filter(table, model) {
    $(".tabletools-btn-group").append("<a class='btn btn-sm purple' id='segment_filter'><span>Segment Filter</span></a>");
    $("#segment_filter").click(function () {
        var segment_filter_label = $("#segment_filter>span");
        bootbox.dialog({
            title: "Filter by Segment:",
            message: "<input type='hidden' id='select2_segment' class='form-control select2' value=''/>",
            buttons: {
                OK: function () {
                    var selected = $("#select2_segment").select2('data');
                    if (selected.length > 0) {
                        var segment_set = [];
                        for (var i = 0; i < selected.length; i++) {
                            segment_set.push(selected[i].id);
                        }
                        segment_filter_label.html("<i class='fa fa-group'></i> " + segment_set.join(" & "));
                        table.ajax.url(API_SERVER + "joker/model/" + model + "/get_all/?source=" + DT_CONF.jokerSource + "&segment=" + segment_set.join(",")).load();
                    } else {
                        segment_filter_label.html("<span>Segment Filter</span>");
                        table.ajax.url(API_SERVER + "joker/model/" + model + "/get_all/?source=" + DT_CONF.jokerSource).load();
                    }
                }
            }
        });
        $.get(API_SERVER + "joker/model/" + model + "/dist/?source=" + DT_CONF.jokerSource + "&field=segment", function (data) {
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
            if (!segment_filter_label.html().includes("Filter")) $("#select2_segment").select2("val", segment_filter_label.html().replace(/<(.*)>/g, "").replace(/ /g, "").split("&amp;"));
        });
    });
}

function add_export_btn(table, model) {
    $(".tabletools-btn-group").append("<a class='btn btn-sm green' id='cust_export_csv'><span>Export</span></a>");
    $("#cust_export_csv").click(function () {
        var url = table.ajax.url() + (table.ajax.url().includes("?") ? "&" : "?") + "csv=true&" + $.param(table.ajax.params());
        window.open(url);
    });
}

function add_column_filter(table, model) {
    $(".tabletools-btn-group").append("<a class='btn btn-sm blue' id='column_filter'><span>Column Filter</span></a>");
    $("#column_filter").click(function () {
        var msg = "";
        var flag = 0;
        for (var i = 0; i < (model == 1 ? FEATURE_TAGS[model - 1].length - 4 : FEATURE_TAGS[model - 1].length); i++) {
            var key = FEATURE_TAGS[model - 1][i].id;
            var column = table.column(key + ":name");
            flag += 1;
            if (flag % 3 == 1) msg += "<div class='row'>";
            msg += "<div class='col-md-4'><input type='checkbox' class='column_filter_checkbox' column='" + key + "' " + (column.visible() ? "checked" : "") + "/> <label>" + FEATURE_TAGS[model - 1][i].text + "</label></div>";
            if (flag % 3 == 0) msg += "</div>";
        }
        bootbox.dialog({
            title: "Filter by Column:",
            message: msg,
            buttons: {
                OK: function () {
                    $(".column_filter_checkbox").each(function () {
                        var column = table.column($(this).attr("column") + ":name");
                        if (this.checked) column.visible(true);
                        else column.visible(false);
                    })
                }
            }
        });
        $(".make-switch").bootstrapSwitch();
    });
}

function generate_cust_prop(data, model, prop_attr_name, prop_name, color) {
    var html = "<div class='row' style='margin-bottom:10px;'><div class='col-md-12'>";
    html += "<div style='border:1px solid #ddd;overflow:hidden;height:102px;'>";
    html += "<div class='thumbnail no-border' style='height:100px;width:100px;display:inline-block;'>";
    html += "<div class='thumbnail bg-grey' style='width:100%;height:100%;text-align:center;' title='" + FEATURE_TAGS_PROP.findKeyValue("id", prop_attr_name, "hint") + "'>";
    html += "<p class='bold font-" + color + "' style='font-size:35px;margin:0;'>" + data[prop_attr_name].toFixed(1) + "</p>";
    html += "<p style='font-size:9.5px;'><span class='font-" + color + "'>" + prop_name[0] + "</span><br/>" + prop_name[1] + "</p>";
    html += "</div>";
    html += "</div>";
    html += "<div class='thumbnail no-border' style='height:100px;width:auto;display:inline-block;'>";
    html += "<p class='' style='line-height:16px;'>";
    html += "<span class='bold font-" + color + "' id='cust_rank_" + prop_attr_name + "'>Loading...</span><br/>";
    var reason_code_prefix = prop_attr_name.replace("prop", "");
    if (data[reason_code_prefix + "reason_code_1"] == null) reason_code_prefix = "";
    html += data[reason_code_prefix + "reason_code_1"] + "<br/>";
    html += data[reason_code_prefix + "reason_code_2"] + "<br/>";
    html += data[reason_code_prefix + "reason_code_3"] + "<br/>";
    html += data[reason_code_prefix + "reason_code_4"];
    html += "</p>";
    html += "</div>";
    html += "</div>";
    html += "</div></div>";
    return html;
}

function update_cust_rank(id, model, column, source) {
    $.get(API_SERVER + "joker/model/" + model + "/rank/?source=" + source + "&id=" + id + "&field=" + column, function (data) {
        $("#cust_rank_" + column).html("<i class='fa fa-star'></i> " + (data.rank + 1) + " (" + (100 * (data.rank + 1) / data.total).toFixed(0) + " %)");
    });
}

function generate_cust_data(data, model) {
    var html = "<div>";
    html += "<span class='label bg-purple' title='" + FEATURE_TAGS[model - 1].findKeyValue("id", "segment", "hint") + "'><i class='fa fa-group'></i> " + data.segment + "</span> ";
    html += "<span class='label bg-" + interpret_gender_color(data.gender) + "' title='" + FEATURE_TAGS[model - 1].findKeyValue("id", "gender", "hint") + "'>" + interpret_gender_name(data.gender) + "</span> ";
    html += "<span class='label bg-" + (data.is_member ? "yellow" : "grey") + "' title='" + FEATURE_TAGS[model - 1].findKeyValue("id", "is_member", "hint") + "'>" + (data.is_member ? "Member" : "Non-Member") + "</span> ";
    html += "<span class='label bg-" + (data.is_hrs_owner ? "yellow" : "grey") + "' title='" + FEATURE_TAGS[model - 1].findKeyValue("id", "is_hrs_owner", "hint") + "'>" + (data.is_hrs_owner ? "Horse Owner" : "Not Horse Owner") + "</span> ";
    html += "</div><hr/><div class='row'>";
    for (var i = 2; i < FEATURE_TAGS[model - 1].length; i++) {
        var tag_id = FEATURE_TAGS[model - 1][i]["id"];
        if (tag_id != "gender" && tag_id != "is_hrs_owner" && tag_id != "is_member") {
            html += "<div class='col-md-6'><span class='font-green' title='" + FEATURE_TAGS[model - 1][i]["hint"] + "'>" + FEATURE_TAGS[model - 1][i]["text"] + ": </span><span>" + data[tag_id] + "</span></div>";
        }
    }
    html += "</div><hr/><div class='row'>";
    html += "<div class='col-md-12'><div id='cust_detail_turnover_barchart'>";
    html += "</div></div>";
    html += "</div><hr/>";
    if (data.grow_prop != null) html += generate_cust_prop(data, model, "grow_prop", ["GROW", "PROPENSITY"], "red");
    if (data.decline_prop != null) html += generate_cust_prop(data, model, "decline_prop", ["DECLINE", "PROPENSITY"], "green");
    if (data.chance_to_be_regular != null) html += generate_cust_prop(data, model, "chance_to_be_regular", ["CHANCE", "TO BE REGULAR"], "yellow");
    html += "</div>";
    return html;
}

function generate_cust_turnover_barchart(container, inv_part) {
    var data = [];
    for (var i = 0; i < inv_part.length; i++) {
        data.push({x: inv_part.length - i, y: inv_part[i]});
    }
    data.reverse();
    figure_bar_chart(data, container, {top: 10, bottom: 20, left: 50, right: 10, width: $(container).width(), height: 200}, {x: "", y: "Turnover"}, {x: [1, 10, 20, 30, 40, 50, 60, 70, 80], y: null});
}
