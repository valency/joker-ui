$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
});

function interpret_data_type_desc(data_type) {
    var data_type_prediction = ["CUST_ID", "LABEL_PROB", "REASON_CODE_1", "REASON_CODE_2", "REASON_CODE_3"];
    var data_type_desc = {
        feature: ["CUST_ID", "CUST_CODE", "AGE", "GENDER", "YRS_W_CLUB", "IS_MEMBER", "IS_HRS_OWNER", "MAJOR_CHANNEL", "MTG_NUM", "INV", "INV_SEG1", "INV_SEG2", "INV_SEG3", "DIV", "RR", "END_BAL", "RECHARGE_TIMES", "WITHDRAW_AMOUNT"],
        prediction_Grow: data_type_prediction,
        prediction_Lapse: data_type_prediction,
        prediction_Growth: data_type_prediction
    };
    var html = "";
    for (var i = 0; i < data_type_desc[data_type].length; i++) {
        html += "<span class='label bg-red'>" + data_type_desc[data_type][i] + "</span> ";
    }
    return html;
}

function datafile_import(file) {
    var msg = "<p>The following file will be imported:</p><p class='font-red'>" + file + "</p>";
    msg += "<p>Please specify the type of the data:</p>";
    msg += "<p><select id='select2_data_type' class='form-control select2'>";
    msg += "<option value='feature'>Features</option>";
    msg += "<option value='prediction_Grow'>Model 1 Predictions (Grow)</option>";
    msg += "<option value='prediction_Lapse'>Model 1 Predictions (Decline)</option>";
    msg += "<option value='prediction_Growth'>Model 2 Predictions</option>";
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
                if ($("#select2_data_type").val() == "feature") {
                    $.get(API_SERVER + "joker/api/cust/add_cust_from_csv/?src=" + file, function (r) {
                        r = eval(r);
                        var msg = "<p>" + r.processed + " entries have been processed.</p><p>" + r.success + " entries have been imported.</p><p>" + r.fail + " entries are failed to import.</p>";
                        bootbox.hideAll();
                        bootbox.alert(msg);
                    }).fail(function () {
                        bootbox.hideAll();
                        bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while processing the file!</span>");
                    });
                } else {
                    $.get(API_SERVER + "joker/api/cust/assign_pred_from_csv/?src=" + file + "&label=" + $("#select2_data_type").val().split("_")[1], function (r) {
                        r = eval(r);
                        var msg = "<p>" + r.processed + " entries have been processed.</p><p>" + r.success + " entries have been imported.</p><p>" + r.fail + " entries are failed to import.</p>";
                        bootbox.hideAll();
                        bootbox.alert(msg);
                    }).fail(function () {
                        bootbox.hideAll();
                        bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while processing the file!</span>");
                    });
                }
            }
        }
    });
    $("#select2_data_type").select2();
    $("#select2_data_type").on("change", function (e) {
        $("#data_type_desc").html("<p>Required headers:</p><p style='line-height:2'>" + interpret_data_type_desc($("#select2_data_type").val()) + "</p>");
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