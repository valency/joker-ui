$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    Metronic.blockUI({boxed: true});
    add_deco_badge(1, function () {
        add_deco_badge(2, function () {
            add_deco_badge(4, function () {
                $("#file_list_table_wrapper table").dataTable({searching: false});
                $("#file_list_table_wrapper .dataTables_wrapper .row .col-md-6:nth-child(2)").append("<button class='btn red pull-right btn-admin' onclick=\"$('#file_upload').click();\"><i class='fa fa-plus'></i> Upload</button>");
                init_widget();
                auth_check();
                Metronic.unblockUI();
            });
        });
    });
    $('#file_upload').fileupload({
        dataType: 'json',
        acceptFileTypes: '/(\.|\/)(csv|gz)$/i',
        done: function (e, data) {
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        },
        submit: function (e, data) {
            bootbox.dialog({
                message: "<div class='progress' style='margin-bottom:0;'><div class='progress-bar' style='width:0;'></div></div>",
                closeButton: false
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(".progress-bar").css('width', progress + '%');
        }
    });
});

function auth_check() {
    if (Cookies.get('joker_username') != "admin") {
        $(".btn-admin").remove();
    }
}

function add_deco_badge(model, callback) {
    $.get(API_SERVER + "joker/tool/env/get/?key=model_" + model + "_active_" + Cookies.get('joker_id')).always(function (active) {
        $.get(API_SERVER + "joker/model/" + model + "/source/", function (r) {
            for (var i = 0; i < r.length; i++) {
                var found = false;
                var clear_db_btn = "<button onclick=\"clear_db(" + model + ",'" + r[i] + "')\" class='btn default btn-xs black btn-admin'><i class='fa fa-trash-o'></i> Clear DB</button>";
                var active_btn = "<button onclick=\"set_active(" + model + ",'" + r[i] + "')\" class='btn default btn-xs red'><i class='fa fa-star'></i> Activate</button>";
                $(".file-entry").each(function () {
                    if (r[i] == $(this).attr("href").replace("data/", "")) {
                        found = true;
                        var badge_color = "grey";
                        if ($(this).attr("href").replace("data/", "") == active.value) badge_color = "red";
                        else $(this).parent().next().next().next().prepend(active_btn);
                        $(this).parent().append("<span class='pull-right badge bg-" + badge_color + "'> M" + model + " </span>");
                        $(this).parent().next().next().next().append(clear_db_btn);
                    }
                });
                if (!found) {
                    var html = "<tr><td>";
                    html += "<span class='file-entry' href='data/" + r[i] + "'><i class='fa fa-file-text-o'></i> " + r[i] + "</span>";
                    var badge_color = "grey";
                    if (r[i] == active.value) badge_color = "red";
                    html += "<span class='pull-right badge bg-" + badge_color + "'> M" + model + " </span>";
                    html += "</td><td>-</td><td>-</td><td style='white-space:nowrap;'>";
                    if (r[i] != active.value) html += active_btn;
                    html += clear_db_btn + "</td>";
                    html += "</tr>";
                    $("#file_list_table_wrapper table tbody").append(html);
                }
            }
            callback();
        });
    });
}

function set_active(model, source) {
    $.get(API_SERVER + "joker/tool/env/set/?key=model_" + model + "_active_" + Cookies.get('joker_id') + "&value=" + source, function (r) {
        window.location.reload();
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while activating data set!</span>");
    });
}

function clear_db(model, source) {
    bootbox.dialog({
        message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
        closeButton: false
    });
    $.get(API_SERVER + "joker/model/" + model + "/delete_all/?source=" + source, function (r) {
        window.location.reload();
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while cleaning database!</span>");
    });
}

function interpret_data_type_desc(data_type) {
    var data_type_desc = {
        model_1: [
            "CUST_ID", "SEGMENT", "AGE", "GENDER", "YRS_W_CLUB", "IS_MEMBER", "IS_HRS_OWNER", "MAJOR_CHANNEL",
            "MTG_NUM", "INV", "DIV", "RR", "END_BAL", "RECHARGE_TIMES", "RECHARGE_AMOUNT", "WITHDRAW_TIMES", "WITHDRAW_AMOUNT",
            "ACTIVE_RATE_PREVIOUS_83", "TO_PER_MTG", "BETLINE_PER_MTG", "AVG_BET_SIZE",
            "TO_YTD_GROWTH", "TO_RECENT_GROWTH", "TO_PER_MTG_YTD_GROWTH", "TO_PER_MTG_RECENT_GROWTH",
            "BETLINE_PER_MTG_YTD_GROWTH", "BETLINE_PER_MTG_RECENT_GROWTH", "AVG_BET_SIZE_YTD_GROWTH", "AVG_BET_SIZE_RECENT_GROWTH",
            "ACTIVE_RATE_YTD_GROWTH", "ACTIVE_RATE_RECENT_GROWTH",
            "GROW_PROPENSITY", "DECLINE_PROPENSITY", "GROW_REASON_CODE_(1-4)", "DECLINE_REASON_CODE_(1-4)", "INV(1-83)"
        ], model_2: [
            "CUST_ID", "SEGMENT", "AGE", "GENDER", "YRS_W_CLUB", "IS_MEMBER", "IS_HRS_OWNER", "MAJOR_CHANNEL",
            "MTG_NUM", "INV", "DIV", "RR", "ACTIVE_RATE_PREVIOUS_83",
            "CHANCE_TO_BE_REGULAR", "REASON_CODE_(1-4)", "INV(1-83)"
        ], model_4: [
            "CUST_ID", "SEGMENT", "AGE", "GENDER", "YRS_W_CLUB", "IS_MEMBER", "IS_HRS_OWNER", "MAJOR_CHANNEL",
            "INV_STANDARD", "DIV_STANDARD", "RR_STANDARD", "AR", "INV_EXOTIC", "DIV_EXOTIC", "RR_EXOTIC", "AR_EXOTIC", "BETLINE_STANDARD", "BETLINE_EXOTIC", "MTG_NUM", "MTG_NUM_EXOTIC", "END_BAL",
            "RECHARGE_TIMES", "RECHARGE_AMOUNT", "WITHDRAW_TIMES", "WITHDRAW_AMOUNT",
            "BETLINE_EXOTIC(1-83)", "BETLINE_STANDARD(1-83)",
            "BETLINE_1_HALF", "BETLINE_2_HALF", "BETLINE_RECENT", "BETLINE_EXOTIC_RECENT",
            "EXOTIC_HALF_INCREASE", "EXOTIC_HALF_INCREASE_RATIO", "EXOTIC_PERCENT_1_HALF", "EXOTIC_PERCENT_2_HALF", "EXOTIC_PERCENT_HALF_INCREASE", "EXOTIC_BETLINE_PERCENT",
            "SCORE_HP_PREFERENCE", "SCORE_HP_PARTICIPATION",
            "HP_PREFERENCE_REASON_CODE_1", "HP_PREFERENCE_REASON_CODE_2", "HP_PREFERENCE_REASON_CODE_3", "HP_PREFERENCE_REASON_CODE_4",
            "HP_PARTICIPATION_REASON_CODE_1", "HP_PARTICIPATION_REASON_CODE_2", "HP_PARTICIPATION_REASON_CODE_3", "HP_PARTICIPATION_REASON_CODE_4"]
    };
    var html = "";
    for (var i = 0; i < data_type_desc[data_type].length; i++) {
        if (i > 0)html += ", ";
        html += "<span class='font-green'>" + data_type_desc[data_type][i] + "</span>";
    }
    return html;
}

function datafile_extract(file) {
    bootbox.dialog({
        message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
        closeButton: false
    });
    $.get(API_SERVER + "joker/tool/extract_gzip/?src=" + file, function (r) {
        location.reload();
    });
}

function datafile_import(file) {
    var msg = "<p>The following file will be imported:</p><p class='font-red'>" + file + "</p>";
    msg += "<p>Please specify the type of the data:</p>";
    msg += "<p><select id='select2_data_type' class='form-control select2'>";
    msg += "<option value='model_1'>Model 1</option>";
    msg += "<option value='model_2'>Model 2</option>";
    msg += "<option value='model_4'>Model 4</option>";
    msg += "</select></p>";
    msg += "<div id='data_type_desc'></div>";
    bootbox.dialog({
        title: "Import Data",
        message: msg,
        buttons: {
            Proceed: function () {
                bootbox.dialog({
                    message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
                    closeButton: false
                });
                var data_type = $("#select2_data_type").val().replace("model_", "");
                $.get(API_SERVER + "joker/model/" + data_type + "/delete_all/?source=" + file, function (r) {
                    $.get(API_SERVER + "joker/model/" + data_type + "/add_cust_from_csv/?src=" + file, function (r) {
                        var import_status = eval(r);
                        $.get(API_SERVER + "joker/tool/env/set/?key=last_success_import&value=" + file, function (r) {
                            var msg = "<p>" + import_status.processed + " entries have been processed.</p><p>" + import_status.success + " entries have been imported.</p><p>" + import_status.fail + " entries are failed to import.</p>";
                            bootbox.hideAll();
                            bootbox.alert(msg, function () {
                                location.reload();
                            });
                        }).fail(function () {
                            bootbox.hideAll();
                            bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while processing the file!</span>");
                        });
                    }).fail(function () {
                        bootbox.hideAll();
                        bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while processing the file!</span>");
                    });
                }).fail(function () {
                    bootbox.hideAll();
                    bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while cleaning database!</span>");
                });
            }
        }
    });
    $("#select2_data_type").select2();
    $("#select2_data_type").on("change", function (e) {
        $("#data_type_desc").html("<p>Required headers:</p><p>" + interpret_data_type_desc($("#select2_data_type").val()) + "</p>");
    });
    $("#select2_data_type").change();
}

