$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $.get(API_SERVER + "joker/tool/env/get/?key=last_success_import", function (r) {
        $(".file-entry").each(function () {
            if ($(this).attr("href") == "data/" + r.value) {
                $(this).append("<span class='pull-right badge badge-danger'> latest </span>");
            }
        });
    });
});

function interpret_data_type_desc(data_type) {
    var data_type_desc = {
        model_1: ["CUST_ID", "SEGMENT", "AGE", "GENDER", "YRS_W_CLUB", "IS_MEMBER", "IS_HRS_OWNER", "MAJOR_CHANNEL", "MTG_NUM", "INV", "DIV", "RR", "END_BAL", "RECHARGE_TIMES", "RECHARGE_AMOUNT", "WITHDRAW_TIMES", "WITHDRAW_AMOUNT", "GROW_PROPENSITY", "DECLINE_PROPENSITY", "REASON_CODE_1", "REASON_CODE_2", "REASON_CODE_3"],
        model_2: ["CUST_ID", "SEGMENT", "AGE", "GENDER", "YRS_W_CLUB", "IS_MEMBER", "IS_HRS_OWNER", "MAJOR_CHANNEL", "MTG_NUM", "INV", "DIV", "RR", "REGULAR_PROPENSITY", "REASON_CODE_1", "REASON_CODE_2", "REASON_CODE_3"]
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
                $.get(API_SERVER + "joker/model/" + data_type + "/delete_all/", function (r) {
                    $.get(API_SERVER + "joker/model/" + data_type + "/add_cust_from_csv/?src=" + file, function (r) {
                        var import_status = eval(r);
                        $.get(API_SERVER + "joker/tool/env/set/?key=last_success_import&value=" + file, function (r) {
                            var msg = "<p>" + import_status.processed + " entries have been processed.</p><p>" + import_status.success + " entries have been imported.</p><p>" + import_status.fail + " entries are failed to import.</p>";
                            bootbox.hideAll();
                            bootbox.alert(msg);
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

function datafile_delete(file) {
    bootbox.dialog({
        title: "Delete Data",
        message: "<p>The following file(s) will be deleted:</p><p class='font-red'>" + file + "</p>",
        buttons: {
            Proceed: function () {
                $.get("data/delete.php?f=" + file, function (r) {
                    location.reload();
                });
            }
        }
    });
}