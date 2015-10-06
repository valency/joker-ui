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
    $.get(API_SERVER + "joker/tool/env/get/?key=model_2_active_" + Cookies.get('joker_id'), function (active) {
        var src = [];
        for (var i = 0; i < GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: GROWTH_RATE_TURNOVER_COUNT[i],
                y: ACCUMULATIVE_AVERAGE_ACTIVE_RATE[i],
                last_season: ACTIVE_CUSTOMERS_LAST_SEASON[i],
                this_season: ACTIVE_CUSTOMERS_THIS_SEASON[i]
            });
        }
        stat_figure_growth_rate_of_turnover(src, "Avg. Active Rate (PYTD)", {x: "Meeting ID", y: "Avg. Active Rate (%)", last_season: "# of Active Custs. of Last Season", this_season: "# of Active Custs. of This Season"}, 0.34);
        stat_figure_histogram("active_rate_previous_83", 0, "Dist. of New Custs.' Active Rate (Prev. 83)", "New Custs.' Active Rate (Prev. 83)", "Probabilistic Distribution Function (%)", 2, active.value, 2);
        stat_figure_histogram("age", 0, "Dist. of New Custs.' Age", "New Custs.' Age", "Probabilistic Distribution Function (%)", 2, active.value, 0);
        src = [];
        for (i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_NEW_BET_TYPE[i]
            });
        }
        stat_figure_pie_chart(src, "New Custs.' Turnover of Bet Types (PYTD)", "Bet Type", "New Custs.' Turnover of the Bet Type (%)");
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        stat_figure_pie_chart(src, "New Custs.' Turnover of Channels (PYTD)", "Channel", "New Custs.' Turnover of the Channel (%)");
        stat_figure_histogram("chance_to_be_regular", 0, "Dist. of New Custs.' Regular Score", "New Custs.' Regular Score", "Probabilistic Distribution Function (%)", 2, active.value, 1);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}