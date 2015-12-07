var DT_CONF = {
    jokerSource: null,
    stateSave: true,
    searching: false,
    ordering: true,
    processing: true,
    serverSide: true,
    deferRender: true,
    lengthMenu: [10, 50, 100, 500],
    ajax: null,
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

function show_cust_detail(model, source, data) {
    var html = generate_cust_data(data, model);
    bootbox.alert({
        title: "CUST_ID: " + data.id + " <a href='customer.php?model=" + model + "&id=" + data.id + "' target='_blank' class='fa fa-share'></a>",
        message: html
    }).on('shown.bs.modal', function (e) {
        if (model == 4) {
            generate_cust_turnover_barchart("#cust_detail_betline_standard_barchart", data["betline_standard_part"], {x: "", y: "Betline (Standard)"});
            generate_cust_turnover_barchart("#cust_detail_betline_exotic_barchart", data["betline_exotic_part"], {x: "", y: "Betline (Exotic)"});
        } else {
            generate_cust_turnover_barchart("#cust_detail_turnover_barchart", data["inv_part"], {x: "", y: "Turnover"});
        }
    });
    if (model == 1) {
        update_cust_rank(data.id, model, "grow_prop", source);
        update_cust_rank(data.id, model, "decline_prop", source);
    } else if (model == 2) {
        update_cust_rank(data.id, model, "chance_to_be_regular", source);
    } else if (model == 4) {
        update_cust_rank(data.id, model, "score_hp_preference", source);
        update_cust_rank(data.id, model, "score_hp_participation", source);
    }
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
        show_cust_detail(model, conf.jokerSource, data);
    });
    add_dataset_badge(table, model);
    add_segment_filter(table, model);
    if (model == 2) add_active_rate_prev_83_filter(table, model);
    add_column_filter_and_export_btn(table, model);
    $('#customer_table_wrapper').find('.dataTables_length select').select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    return table;
}

function add_dataset_badge(table, model) {
    $(".tabletools-btn-group").append("<a title='" + DT_CONF.jokerSource.replace(".csv", "") + "' href='data.php' class='btn red' style='width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'><span><i class='fa fa-briefcase'></i> " + DT_CONF.jokerSource.replace(".csv", "") + "</span></a>");
}

function add_segment_filter(table, model) {
    $(".tabletools-btn-group").append("<a class='btn purple' id='segment_filter'><i class='fa fa-group'></i> <span>All</span></a>");
    $("#segment_filter").click(function () {
        var segment_filter_label = $("#segment_filter>span");
        bootbox.dialog({
            title: "Filter by Segment",
            message: "<input type='hidden' id='select2_segment' class='form-control select2' value=''/>",
            buttons: {
                OK: function () {
                    var selected = $("#select2_segment").select2('data');
                    if (selected.length > 0) {
                        var segment_set = [];
                        for (var i = 0; i < selected.length; i++) {
                            segment_set.push(selected[i].id);
                        }
                        segment_filter_label.html(segment_set.join(" & "));
                        table.ajax.url(table.ajax.url().replace(/segment=.*?&/, "").replace("&_r=", "&segment=" + segment_set.join(",") + "&_r=")).load();
                    } else {
                        segment_filter_label.html("All");
                        table.ajax.url(table.ajax.url().replace(/segment=.*?&/, "")).load();
                    }
                }
            }
        }).on("shown.bs.modal", function () {
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
                if (!segment_filter_label.html().includes("All")) $("#select2_segment").select2("val", segment_filter_label.html().replace(/<(.*)>/g, "").replace(/ /g, "").split("&amp;"));
            });
        });
    });
}

function add_active_rate_prev_83_filter(table, model) {
    $(".tabletools-btn-group").append("<a class='btn purple' id='active_rate_prev_83_filter'><i class='fa fa-magic'></i> <span>All</span></a>");
    $("#active_rate_prev_83_filter").click(function () {
        var active_rate_prev_83_filter_label = $("#active_rate_prev_83_filter>span");
        var html = "<select id='select2_active_rate_prev_83' class='form-control'>";
        html += "<option value=''>All</option>";
        html += "<option value='0.0,0.2'>0 - 20 %</option>";
        html += "<option value='0.2,0.4'>20 - 40 %</option>";
        html += "<option value='0.4,0.6'>40 - 60 %</option>";
        html += "<option value='0.6,0.8'>60 - 80 %</option>";
        html += "<option value='0.8,1.0'>80 - 100 %</option>";
        html += "</select>";
        bootbox.dialog({
            title: "Filter by Active Rate (Prev. 83)",
            message: html,
            buttons: {
                OK: function () {
                    active_rate_prev_83_filter_label.html($("#select2_active_rate_prev_83 option:selected").text());
                    table.ajax.url(table.ajax.url().replace(/active_rate_prev_83=.*?&/, "").replace("&_r=", "&active_rate_prev_83=" + $("#select2_active_rate_prev_83").val() + "&_r=")).load();
                }
            }
        }).on("shown.bs.modal", function () {
            if (!active_rate_prev_83_filter_label.html().includes("All")) {
                $('#select2_active_rate_prev_83 option').filter(function () {
                    return $(this).html() == active_rate_prev_83_filter_label.html();
                }).attr("selected", true);
            }
            $("#select2_active_rate_prev_83").select2({
                dropdownAutoWidth: 'true',
                minimumResultsForSearch: Infinity
            });
        });
    });
}

function add_column_filter_and_export_btn(table, model) {
    var html = "<div class='btn-group' style='margin-right:5px;'>";
    html += "<button type='button' class='btn blue dropdown-toggle' data-toggle='dropdown'><i class='fa fa-cog'></i> Options <i class='fa fa-angle-down'></i></button>";
    html += "<ul class='dropdown-menu pull-right' role='menu'>";
    html += "<li><a href='javascript:void(0)' id='column_filter'><i class='fa fa-columns'></i> Display of Columns</a></li>";
    html += "<li><a href='javascript:void(0)' id='cust_export_csv'><i class='fa fa-file-text-o'></i> Export to CSV</a></li>";
    html += "</ul>";
    html += "</div>";
    $(".tabletools-btn-group").append(html);
    $("#column_filter").click(function () {
        var msg = "<div class='row form-group'>";
        var flag = 0;
        for (var i = 2; i < FEATURE_TAGS[model - 1].length; i++) {
            if (FEATURE_TAGS[model - 1][i]["show_in_pred_table"] == null || FEATURE_TAGS[model - 1][i]["show_in_pred_table"] == true) {
                var key = FEATURE_TAGS[model - 1][i].id;
                var column = table.column(key + ":name");
                msg += "<div class='col-md-6'><label><input class='column-filter-checkbox' type='checkbox' value='" + key + "' " + (column.visible() ? "checked" : "") + ">" + FEATURE_TAGS[model - 1][i].text + "</label></div>";
            }
        }
        msg += "</div>";
        bootbox.dialog({
            title: "Display of Columns",
            message: msg,
            buttons: {
                OK: function () {
                    $(".column-filter-checkbox").each(function () {
                        var column = table.column($(this).val() + ":name");
                        if (this.checked) column.visible(true);
                        else column.visible(false);
                    })
                }
            }
        });
        Metronic.init();
    });
    $("#cust_export_csv").click(function () {
        var url = table.ajax.url() + "&csv=true&" + $.param(table.ajax.params());
        window.open(url);
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
    //html += "<p class='' style='line-height:16px;'>";
    html += "<p class='bold font-" + color + "' id='cust_rank_" + prop_attr_name + "'>Loading...</p>";
    var reason_code_prefix = "";
    if (model == 1)reason_code_prefix = prop_attr_name.replace("prop", "");
    if (model == 4)reason_code_prefix = prop_attr_name.replace("score_", "") + "_";
    html += "<p>- " + data[reason_code_prefix + "reason_code_1"] + "</p>";
    html += "<p>- " + data[reason_code_prefix + "reason_code_2"] + "</p>";
    html += "<p>- " + data[reason_code_prefix + "reason_code_3"] + "</p>";
    html += "<p>- " + data[reason_code_prefix + "reason_code_4"] + "</p>";
    //html += "</p>";
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
    for (var i = 0; i < FEATURE_TAGS[model - 1].length; i++) {
        var show_in_detail_table = FEATURE_TAGS[model - 1][i]["show_in_detail_table"];
        if (show_in_detail_table == null || show_in_detail_table == true) {
            html += "<div class='col-md-6'><span class='font-green' title='" + FEATURE_TAGS[model - 1][i]["hint"] + "'>" + FEATURE_TAGS[model - 1][i]["text"] + ": </span><span>" + data[FEATURE_TAGS[model - 1][i]["id"]] + "</span></div>";
        }
    }
    html += "</div><hr/>";
    if (model == 4) {
        html += "<div class='row'><div class='col-md-12'><div id='cust_detail_betline_standard_barchart'></div></div></div><hr/>";
        html += "<div class='row'><div class='col-md-12'><div id='cust_detail_betline_exotic_barchart'></div></div></div><hr/>";
    } else {
        html += "<div class='row'><div class='col-md-12'><div id='cust_detail_turnover_barchart'></div></div></div><hr/>";
    }
    if (data.grow_prop != null) html += generate_cust_prop(data, model, "grow_prop", ["GROW", "PROPENSITY"], "red");
    if (data.decline_prop != null) html += generate_cust_prop(data, model, "decline_prop", ["DECLINE", "PROPENSITY"], "green");
    if (data.chance_to_be_regular != null) html += generate_cust_prop(data, model, "chance_to_be_regular", ["CHANCE", "TO BE REGULAR"], "yellow");
    if (data.score_hp_preference != null) html += generate_cust_prop(data, model, "score_hp_preference", ["PREFERENCE", "POTENTIAL"], "red");
    if (data.score_hp_participation != null) html += generate_cust_prop(data, model, "score_hp_participation", ["PARTICIPATION", "POTENTIAL"], "green");
    html += "</div>";
    return html;
}

function generate_cust_turnover_barchart(container, src, axis_label) {
    var data = [];
    var max_y = null;
    for (var i = 0; i < src.length; i++) {
        var y = parseFloat(src[i]);
        data.push({x: src.length - i, y: y});
        if (max_y == null || y > max_y) max_y = y;
    }
    data.reverse();
    $(container).append("<span id='num-length-test' class='axis'>" + max_y.toLocaleString() + "</span>");
    var margin_left = $("#num-length-test").width();
    $("#num-length-test").remove();
    console.log(max_y);
    figure_bar_chart(data, container, {top: 10, bottom: 20, left: 15 + margin_left, right: 10, width: $(container).width(), height: 200}, {x: axis_label["x"], y: axis_label["y"]}, {x: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 83], y: null});
}
