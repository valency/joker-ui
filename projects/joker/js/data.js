$(document).ready(function () {
    Metronic.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init(); // init quick sidebar
    $("button[data-toggle='confirmation']").on('confirmed.bs.confirmation', function () {
        if ($(this).attr("op") == "delete") {
            $.get("data/delete.php?f=" + $(this).attr("filename"), function (r) {
                if (r != "1") bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while deleting the file!</span>");
                else location.reload();
            });
        } else if ($(this).attr("op") == "feature") {
            bootbox.dialog({
                message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Loading...</span>",
                closeButton: false
            });
            $.get(API_SERVER + "cust/add_cust_from_csv/?src=" + $(this).attr("filename"), function (r) {
                bootbox.hideAll();
                bootbox.alert(r);
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while processing the file!</span>");
            });
        }
    });
});