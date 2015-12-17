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
    $.get(API_SERVER + "tool/env/get/?key=model_4_active_" + Cookies.get('joker_id'), function (active) {
        var score_hp_preference = FEATURE_TAGS_PROP.findKeyValue("id", "score_hp_preference", "text");
        stat_figure_histogram("score_hp_preference", 0, "Distribution of " + score_hp_preference, "Distribution of " + score_hp_preference, {
            x: score_hp_preference,
            y: "Probabilistic Distribution Function (%)"
        }, 4, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
        var score_hp_participation = FEATURE_TAGS_PROP.findKeyValue("id", "score_hp_participation", "text");
        stat_figure_histogram("score_hp_participation", 0, "Distribution of " + score_hp_participation, "Distribution of " + score_hp_participation, {
            x: score_hp_participation,
            y: "Probabilistic Distribution Function (%)"
        }, 4, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
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
        bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
            window.location.href = "data.php";
        });
    });
}