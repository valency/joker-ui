$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    init_widget();
    draw_figures();
});

function draw_figures() {
    $("#figure_container").html("");
    $.get(API_SERVER + "joker/tool/env/get/?key=model_4_active_" + Cookies.get('joker_id'), function (active) {
        stat_figure_histogram("score", 0, "Dist. of Score", "Score", "Probabilistic Distribution Function (%)", 4, active.value);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}