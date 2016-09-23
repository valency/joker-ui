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
    $.get(API_SERVER + "tool/env/get/?key=model_4_active_" + Cookies.get('joker_id'), function (active) {
        // Valency
        var score_hp_preference = FEATURE_TAGS_PROP.findKeyValue("id", "score_hp_preference", "text");
        stat_figure_histogram("score_hp_preference", 0, "Distribution of " + score_hp_preference, "Distribution of " + score_hp_preference, {
            x: score_hp_preference,
            y: "Probabilistic Distribution Function (%)"
        }, 4, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], (input.length > 0 ? "&segment=" + segment.join(",") : ""));
        var score_hp_participation = FEATURE_TAGS_PROP.findKeyValue("id", "score_hp_participation", "text");
        stat_figure_histogram("score_hp_participation", 0, "Distribution of " + score_hp_participation, "Distribution of " + score_hp_participation, {
            x: score_hp_participation,
            y: "Probabilistic Distribution Function (%)"
        }, 4, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], (input.length > 0 ? "&segment=" + segment.join(",") : ""));
        // TODO: Bob
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
        // Bob
        stat_figure_year_on_year_growth("Growth Rate of Standard / Exotic Turnover (YTD vs PYTD)", "Growth Rate of Standard / Exotic Turnover (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Cumulative Growth Rate of Total Turnover (YTD vs. PYTD)",
            keys: ["Turnover (Previous Season)", "Turnover (This Season)", "Total Turnover (PYTD)", "Total Turnover (YTD)"]
        }, "turnover", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_year_on_year_growth("Growth Rate of Standard / Exotic Betline (YTD vs PYTD)", "Growth Rate of Standard / Exotic Betline (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Cumulative Growth Rate of Total Betline (YTD vs. PYTD)",
            keys: ["Betline (Previous Season)", "Betline (This Season)", "Total Betline (PYTD)", "Total Betline (YTD)"]
        }, "betline", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_active_rate_year("Active Rate (YTD vs PYTD)", "Active Rate (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Active Rate (YTD vs. PYTD)"
        }, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_stacked("Bet Type - Channel Shares", "Bet Type - Channel Shares", {
            x: "Turnover Type",
            y: "Channel Share Ratio"
        }, 2015, (input.length > 0 ? segment.join(",") : null));
        stat_figure_wakeup_rate("Wake-Up Rate (YTD vs PYTD)", "Wake-Up Rate (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Wake-Up Rate (YTD vs. PYTD)"
        }, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_tree("Year on Year Growth Analysis", "Year on Year Growth Analysis", {
            x: "Season",
            y: "Growth in Detail"
        }, 2015, (input.length > 0 ? segment.join(",") : null));
        stat_figure_month_on_month_growth("Month on Month Growth Rate of Standard / Exotic Turnover", "Month on Month Growth Rate of Standard / Exotic Turnover", {
            x: "Meeting ID",
            y: "Growth Rate of Total Turnover",
            keys: ["Turnover (Previous Meeting)", "Turnover (This Meeting)", "Previous Meeting ID", "This Meeting ID"]
        }, "turnover", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_month_on_month_growth("Month on Month Growth Rate of Standard / Exotic Betline", "Month on Month Growth Rate of Standard / Exotic Betline", {
            x: "Meeting ID",
            y: "Growth Rate of Total Betline",
            keys: ["Betline (Previous Meeting)", "Betline (This Meeting)", "Previous Meeting ID", "This Meeting ID"]
        }, "betline", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_active_rate_month("Month on Month Active Rate", "Month on Month Active Rate", {
            x: "Meeting ID Current Month",
            y: "Active Rate",
            keys: ["Meeting ID Last Month"]
        }, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_active_analysis("Number of Early Wakeup Customers (YTD vs PYTD)", "Number of Early Wake-Up Customers (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Number of Customers (YTD vs. PYTD)"
        }, "early_wakeup", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_active_analysis("Number of Reactivate Customers (YTD vs PYTD)", "Number of Reactivate Customers (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Number of Customers (YTD vs. PYTD)"
        }, "reactive", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_active_analysis("Number of Inactive Customers (YTD vs PYTD)", "Number of Inactive Customers (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Number of Customers (YTD vs. PYTD)"
        }, "inactive", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    }).fail(function () {
        bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
            window.location.href = "data.php";
        });
    });
    stat_figure_year_on_year_growth("Growth Rate of Standard / Exotic Turnover (YTD vs PYTD)", "Growth Rate of Standard / Exotic Turnover (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Cumulative Growth Rate of Total Turnover (YTD vs. PYTD)",
        keys: ["Turnover (Previous Season)", "Turnover (This Season)", "Total Turnover (PYTD)", "Total Turnover (YTD)"]
    }, "turnover", true, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_year_on_year_growth("Growth Rate of Standard / Exotic Betline (YTD vs PYTD)", "Growth Rate of Standard / Exotic Betline (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Cumulative Growth Rate of Total Betline (YTD vs. PYTD)",
        keys: ["Betline (Previous Season)", "Betline (This Season)", "Total Betline (PYTD)", "Total Betline (YTD)"]
    }, "betline", true, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_active_rate_year("Active Rate (YTD vs PYTD)", "Active Rate (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Active Rate (YTD vs. PYTD)"
    }, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_bet_share("Bet Type - Channel Shares", "Bet Type - Channel Shares", {
        x: "Turnover Type",
        y: "Channel Share Ratio"
    }, true, 2015, (input.length > 0 ? segment.join(",") : null));
    stat_figure_wakeup_rate("Wake-Up Rate (YTD vs PYTD)", "Wake-Up Rate (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Wake-Up Rate (YTD vs. PYTD)"
    }, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_tree("Year on Year Growth Analysis", "Year on Year Growth Analysis", {
        x: "Season",
        y: "Growth in Detail"
    }, 2015, (input.length > 0 ? segment.join(",") : null));
    stat_figure_month_on_month_growth("Month on Month Growth Rate of Standard / Exotic Turnover", "Month on Month Growth Rate of Standard / Exotic Turnover", {
        x: "Meeting ID",
        y: "Growth Rate of Total Turnover",
        keys: ["Turnover (Previous Meeting)", "Turnover (This Meeting)", "Previous Meeting ID", "This Meeting ID"]
    }, "turnover", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_month_on_month_growth("Month on Month Growth Rate of Standard / Exotic Betline", "Month on Month Growth Rate of Standard / Exotic Betline", {
        x: "Meeting ID",
        y: "Growth Rate of Total Betline",
        keys: ["Betline (Previous Meeting)", "Betline (This Meeting)", "Previous Meeting ID", "This Meeting ID"]
    }, "betline", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_active_rate_month("Month on Month Active Rate", "Month on Month Active Rate", {
        x: "Meeting ID Current Month",
        y: "Active Rate",
        keys: ["Meeting ID Last Month"]
    }, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_active_analysis("Number of Early Wakeup Customers (YTD vs PYTD)", "Number of Early Wake-Up Customers (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Number of Customers (YTD vs. PYTD)"
    }, "early_wakeup", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_active_analysis("Number of Reactivate Customers (YTD vs PYTD)", "Number of Reactivate Customers (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Number of Customers (YTD vs. PYTD)"
    }, "reactive", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
    stat_figure_active_analysis("Number of Inactive Customers (YTD vs PYTD)", "Number of Inactive Customers (YTD vs PYTD)", {
        x: "Meeting ID",
        y: "Number of Customers (YTD vs. PYTD)"
    }, "inactive", 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
}

