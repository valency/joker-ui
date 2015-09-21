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
    $.get(API_SERVER + "joker/tool/env/get/?key=model_1_active_" + Cookies.get('joker_id'), function (active) {
        var src = [];
        for (var i = 0; i < GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: GROWTH_RATE_TURNOVER_COUNT[i],
                y: GROWTH_RATE_TURNOVER[i],
                last_season: TURNOVER_LAST_SEASON[i],
                this_season: TURNOVER_THIS_SEASON[i]
            });
        }
        stat_figure_growth_rate_of_turnover(src, "Growth Rate of Turnover (PYTD)", {x: "Meeting ID", y: "Cumulative Growth Rate (%)", last_season: "Total Turnover of Last Season", this_season: "Total Turnover of This Season"}, 0.05);
        src = [];
        for (i = 0; i < PDF_GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: PDF_GROWTH_RATE_TURNOVER_COUNT[i],
                y: PDF_GROWTH_RATE_TURNOVER[i]
            });
        }
        stat_figure_bar_chart(src, "Dist. of Customers' Growth Rate of Turnover", "Customers' Growth Rate of Turnover (%)", "Probabilistic Distribution Function (%)");
        stat_figure_histogram("age", 0, "Dist. of Customers' Age", "Customers' Age", "Probabilistic Distribution Function (%)", 1, active.value);
        src = [];
        for (i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_BET_TYPE[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Bet Types (PYTD)", "Bet Type", "Turnover of the Bet Type (%)");
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Channels (PYTD)", "Channel", "Turnover of the Channel (%)");
        stat_figure_histogram("grow_prop", 0, "Dist. of Customer's Grow Score", "Customer's Grow Score", "Probabilistic Distribution Function (%)", 1, active.value);
        stat_figure_histogram("decline_prop", 0, "Dist. of Customers' Decline Score", "Customers' Decline Score", "Probabilistic Distribution Function (%)", 1, active.value);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}

