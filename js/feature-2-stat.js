$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    init_widget();
    init_column_filter();
    draw_figures();
});

function draw_figures() {
    $("#figure-container").html("");
    var input = $("#select-segments").select2('data');
    var segment = [];
    if (input.length > 0) {
        for (var i = 0; i < input.length; i++) {
            segment.push(input[i].id);
        }
    }
    $.get(API_SERVER + "tool/env/get/?key=model_2_active_" + Cookies.get('joker_id'), function (active) {
        stat_figure_active_rate_new("Growth Rate of Avg. Active Rate of New Customers (PYTD vs. YTD)", "Growth Rate of Avg. Active Rate of New Customers (PYTD vs. YTD)", {
            x: "Meeting ID",
            y: "Cumulative Growth Rate of Active Rate (PYTD vs. YTD)",
            keys: ["Avg. Active Rate (PYTD)", "Avg. Active Rate (YTD)", "# of Active Customers (Prev. Season)", "# of Active Customers (This Season)", "# of New Customers by Prev. Season (in 5 Years)", "# of New Customers by This Season (in 5 Years)"]
        }, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_histogram("active_rate_previous_83", false, "Active Rate (Recent 83 Meetings)", "Active Rate of New Customers (Recent 83 Meetings)", {
            x: "New Customers' Active Rate",
            y: "Probabilistic Distribution Function"
        }, 2, active.value, 1, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], (input.length > 0 ? "&segment=" + segment.join(",") : ""));
        stat_figure_histogram("age", false, "Age", "Distribution of New Customers' Age", {
            x: "New Customers' Age",
            y: "Probabilistic Distribution Function"
        }, 2, active.value, 0, [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100], (input.length > 0 ? "&segment=" + segment.join(",") : ""));
        stat_figure_histogram("chance_to_be_regular", false, "Probability of Active Rate > 0.6 (Next 83 Meetings)", "Distribution of Probabilities", {
            x: "New Customers' Probability of Active Rate > 0.6 (Next 83 Meetings)",
            y: "Probabilistic Distribution Function"
        }, 2, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], (input.length > 0 ? "&segment=" + segment.join(",") : ""));
        stat_figure_active_rate_latest(false, "Active Rate (YTD)", "Active Rate of All Customers", {
            x: "Active Rate",
            y: "Probabilistic Distribution Function"
        }, 2015, 1, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], (input.length > 0 ? segment.join(",") : null));
        var header = [
            {text: "Racing Season", hint: ""},
            {text: "# of New Customers", hint: ""},
            {text: "1st Year", hint: ""},
            {text: "2nd Year", hint: ""},
            {text: "3rd Year", hint: ""},
            {text: "4th Year", hint: ""},
            {text: "5th Year", hint: ""},
            {text: "6th Year", hint: ""},
            {text: "7th Year", hint: ""},
            {text: "8th Year", hint: ""},
            {text: "9th Year", hint: ""},
            {text: "10th Year", hint: ""}
        ];
        stat_table("stat-avg-active-rate-table", "Statistics of Avg. Active Rate by Joining Season", STAT_AVG_ACTIVE_RATE, header, "");
        stat_table("stat-avg-turnover-table", "Statistics of Avg. Turnover by Joining Season", STAT_AVG_TURNOVER, header, "");
        stat_table("stat-inactive-cust-table", "Statistics of Inactive Customers by Joining Season", STAT_INACTIVE_CUST, header, "");
        stat_table("stat-active-over-0.6", "Statistics of Customers over 0.6 Active Rate by Joining Season", STAT_CUST_ACTIVE_OVER_60, header, "");
        stat_table("prev-83-becoming-over-0.6", "Active Rate Comparison (Previous 83 vs. Next 83)", STAT_ACTIVE_BECOMING_OVER_60, [
            {text: "Active Rate of S1314", hint: ""},
            {text: "# of Customers", hint: ""},
            {text: "Active Rate > 0.6 in S1415 (#)", hint: ""},
            {text: "Active Rate > 0.6 in S1415 (%)", hint: ""}
        ], "");
    }).fail(function () {
        bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
            window.location.href = "data.php";
        });
    });
}