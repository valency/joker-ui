$(document).ready(function () {
    Metronic.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init(); // init quick sidebar
    $("button[data-toggle='confirmation']").on('confirmed.bs.confirmation', function () {
        $.get("data/delete.php?f=" + $(this).attr("filename"), function (r) {
            if (r != "1") bootbox.alert("<span class='font-red'><i class='fa fa-warning'></i> Something is wrong while deleting the file!</span>");
            else location.reload();
        });
    });
});