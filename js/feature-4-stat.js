$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    init_widget();
    init_column_filter();
    draw_figures();
});

function init_column_filter() {
    var column_values = [];
    $.get(API_SERVER + "summary/retrieve-segment-values/", function (data) {
        for (var i = 0; i < data.length; i++) {
            var segment = data[i]["segment_code"];
            if (segment != null) {
                column_values.push({id: segment, text: segment});
            }
        }
    });
    $("#select-segments").select2({
        tags: column_values
    });
}

function draw_figures() {
    $("#figure-container").html("");
    // $.get(API_SERVER + "tool/env/get/?key=model_4_active_" + Cookies.get('joker_id'), function (active) {
    //     var score_hp_preference = FEATURE_TAGS_PROP.findKeyValue("id", "score_hp_preference", "text");
    //     stat_figure_histogram("score_hp_preference", 0, "Distribution of " + score_hp_preference, "Distribution of " + score_hp_preference, {
    //         x: score_hp_preference,
    //         y: "Probabilistic Distribution Function (%)"
    //     }, 4, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    //     var score_hp_participation = FEATURE_TAGS_PROP.findKeyValue("id", "score_hp_participation", "text");
    //     stat_figure_histogram("score_hp_participation", 0, "Distribution of " + score_hp_participation, "Distribution of " + score_hp_participation, {
    //         x: score_hp_participation,
    //         y: "Probabilistic Distribution Function (%)"
    //     }, 4, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    //     var src = [];
    //     for (var i = 0; i < BET_TYPE.length; i++) {
    //         src.push({
    //             key: BET_TYPE[i],
    //             value: PERCENTAGE_BET_TYPE[i]
    //         });
    //     }
    //     stat_figure_pie_chart(src, "Bet Type", "Turnover of Bet Types (YTD)", {
    //         x: "Bet Type",
    //         y: "Turnover of the Bet Type"
    //     });
    // }).fail(function () {
    //     bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
    //         window.location.href = "data.php";
    //     });
    // });
    stat_figure_year_on_year_growth("Grwoth Rate of Standard / Exotic Turnover (YTD vs PYTD)", "Growth Rate of Standard / Exotic Turnover (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Cumulative Growth Rate of Total Turnover (YTD vs. PYTD)",
        keys: ["Turnover (Previous Season)", "Turnover (This Season)", "Total Turnover (PYTD)", "Total Turnover (YTD)"]
    }, "turnover", 2015, null, 0.05);
    // stat_figure_year_on_year_growth("Grwoth Rate of Standard/Exotic Betline (YTD vs PYTD)", "Grwoth Rate of Standard/Exotic Beline (YTD vs PYTD)", {
    //     x: "Meeting ID",
    //     y: "Cumulative Growth Rate of Total Betline (YTD vs. PYTD)",
    //     keys: ["Betline (Previous Season)", "Betline (This Season)", "Total Betline (PYTD)", "Total Betline (YTD)"]
    // }, "betline", 2015, null, 0.05);
    // stat_figure_active_rate_year("Active Rate (YTD vs PYTD)", "Active Rate (YTD vs PYTD)", {
    //     x: "Meeting ID",
    //     y: "Active Rate (YTD vs. PYTD)"
    // }, 2015, null, 0.05);
    // stat_figure_stacked("Bet Type - Channel Shares", "Bet Type - Channel Shares", {
    //     x: "Turnover Type",
    //     y: "Channel Share Ratio"
    // }, 2015, null);
    // stat_figure_wakeup_rate("Wakeup Rate (YTD vs PYTD)", "Wakeup Rate (YTD vs PYTD)", {
    //     x: "Meeting ID",
    //     y: "Wakeup Rate (YTD vs. PYTD)"
    // }, 2015, null, 0.05);
    // stat_figure_tree("Year on Year Growth Analysis", "Year on Year Growth Analysis", {
    //     x: "Season",
    //     y: "Growth in Detail"
    // }, 2015, null);
    // stat_figure_month_on_month_growth("Month on Month Grwoth Rate of Standard/Exotic Turnover", "Month on Month Growth Rate of Standard/Exotic Turnover", {
    //     x: "Meeting ID",
    //     y: "Growth Rate of Total Turnover",
    //     keys: ["Turnover (Previous Meeting)", "Turnover (This Meeting)", "Previous Meeting ID", "This Meeting ID"]
    // }, "turnover", 2015, null, 0.05);
    // stat_figure_month_on_month_growth("Month on Month Grwoth Rate of Standard/Exotic Betline", "Month on Month Grwoth Rate of Standard/Exotic Beline", {
    //     x: "Meeting ID",
    //     y: "Growth Rate of Total Betline",
    //     keys: ["Betline (Previous Meeting)", "Betline (This Meeting)", "Previous Meeting ID", "This Meeting ID"]
    // }, "betline", 2015, null, 0.05);
    // stat_figure_active_rate_month("Month on Month Active Rate", "Month on Month Active Rate", {
    //     x: "Meeting ID Currnt Month",
    //     y: "Active Rate",
    //     keys: ["Meeting ID Last Month"]
    // }, 2015, null, 0.05);
    // stat_figure_active_analysis("Number of Early Wakeup Customers (YTD vs PYTD)", "Number of Early Wakeup Customers (YTD vs PYTD)", {
    //     x: "Meeting ID",
    //     y: "Number of Customers (YTD vs. PYTD)"
    // }, "early_wakeup", 2015, null, 0.05);
    // stat_figure_active_analysis("Number of Reactivate Customers (YTD vs PYTD)", "Number of Reactivate Customers (YTD vs PYTD)", {
    //     x: "Meeting ID",
    //     y: "Number of Customers (YTD vs. PYTD)"
    // }, "reactive", 2015, null, 0.05);
    // stat_figure_active_analysis("Number of Inactive Customers (YTD vs PYTD)", "Number of Inactive Customers (YTD vs PYTD)", {
    //     x: "Meeting ID",
    //     y: "Number of Customers (YTD vs. PYTD)"
    // }, "inactive", 2015, null, 0.05);
}

