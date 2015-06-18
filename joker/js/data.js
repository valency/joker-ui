$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    $("button[data-toggle='confirmation']").on('confirmed.bs.confirmation', function () {
        if ($(this).attr("op") == "delete") {
            $.get("data/delete.php?f=" + $(this).attr("filename"), function (r) {
                if (r != "1") bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while deleting the file!</span>");
                else location.reload();
            });
        } else if ($(this).attr("op") == "feature") {
            bootbox.dialog({
                message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
                closeButton: false
            });
            $.get(API_SERVER + "joker/api/cust/add_cust_from_csv/?src=" + $(this).attr("filename"), function (r) {
                r = eval(r);
                var msg = "<p>" + r.processed + " entries have been processed.</p><p>" + r.success + " entries have been imported.</p><p>" + r.fail + " entries are failed to import.</p>";
                bootbox.hideAll();
                bootbox.alert(msg);
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while processing the file!</span>");
            });
        } else if ($(this).attr("op") == "prediction") {
            bootbox.dialog({
                message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
                closeButton: false
            });
            $.get(API_SERVER + "joker/api/cust/assign_pred_from_csv/?src=" + $(this).attr("filename") + "&label=" + $(this).attr("as"), function (r) {
                r = eval(r);
                var msg = "<p>" + r.processed + " entries have been processed.</p><p>" + r.success + " entries have been imported.</p><p>" + r.fail + " entries are failed to import.</p>";
                bootbox.hideAll();
                bootbox.alert(msg);
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while processing the file!</span>");
            });
        }
    });
});