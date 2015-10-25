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
        stat_figure_histogram("score", 0, "Distribution of Score", "Distribution of Score", {
            x: "Score",
            y: "Probabilistic Distribution Function (%)"
        }, 4, active.value);
        var src = [];
        for (var i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_BET_TYPE[i]
            });
        }
        stat_figure_pie_chart(src, "Bet Type", "Turnover of Bet Types (YTD)", {
            x: "Bet Type",
            y: "Turnover of the Bet Type"
        });
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}