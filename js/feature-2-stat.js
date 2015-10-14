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
        stat_figure_growth_rate_of_turnover(src, "Growth Rate of Avg. Active Rate of New Customers (YTD)", {x: "Meeting ID", y: "Cumulative Growth Rate of Active Rate (%)", last_season: "Avg. Active Rate (PYTD)", this_season: "Avg. Active Rate (YTD)"}, 0.34);
        stat_figure_histogram("active_rate_previous_83", 0, "Distribution of New Customers' Active Rate of the Previous 83 Meetings", "New Customers' Active Rate", "Probabilistic Distribution Function (%)", 2, active.value, 2);
        stat_figure_histogram("age", 0, "Distribution of New Customers' Age", "New Customers' Age", "Probabilistic Distribution Function (%)", 2, active.value, 0);
        stat_figure_histogram("chance_to_be_regular", 0, "Distribution of New Customers' Regular Score", "New Customers' Regular Score", "Probabilistic Distribution Function (%)", 2, active.value, 1);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}