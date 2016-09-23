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

