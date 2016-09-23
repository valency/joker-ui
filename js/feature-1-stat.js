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
    $.get(API_SERVER + "tool/env/get/?key=model_1_active_" + Cookies.get('joker_id'), function (active) {
        var src = [];
        for (var i = 0; i < GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: GROWTH_RATE_TURNOVER_COUNT[i],
                y: GROWTH_RATE_TURNOVER[i],
                values: [TURNOVER_PREV_SEASON[i], TURNOVER_THIS_SEASON[i], TOTAL_TURNOVER_PYTD[i], TOTAL_TURNOVER_YTD[i]]
            });
        }
        stat_figure_year_on_year_growth("Growth Rate of Turnover (YTD vs PYTD)", "Growth Rate of Turnover (YTD vs PYTD)", {
            x: "Meeting ID",
            y: "Cumulative Growth Rate of Total Turnover (YTD vs. PYTD)",
            keys: ["Turnover (Previous Season)", "Turnover (This Season)", "Total Turnover (PYTD)", "Total Turnover (YTD)"]
        }, "turnover", false, 2015, (input.length > 0 ? segment.join(",") : null), 0.05);
        stat_figure_histogram("to_recent_growth", false, "Last 14 Meetings", "Turnover Growth Rate of Last 14 Meetings", {
            x: "Customers' Growth Rate of Turnover",
            y: "Probabilistic Distribution Function"
        }, 1, active.value, 1, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]);
        stat_figure_histogram("age", false, "Age", "Distribution of Customers' Age", {
            x: "Customers' Age",
            y: "Probabilistic Distribution Function"
        }, 1, active.value, 0, [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]);
        stat_figure_bet_share("Bet Type - Channel Shares", "Bet Type - Channel Shares", {
            x: "Turnover Type",
            y: "Channel Share Ratio"
        }, false, 2015, (input.length > 0 ? segment.join(",") : null));
        stat_figure_histogram("grow_prop", false, "Growth Score", "Distribution of Customer's Growth Score", {
            x: "Customer's Growth Score",
            y: "Probabilistic Distribution Function"
        }, 1, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
        stat_figure_histogram("decline_prop", false, "Decline Score", "Distribution of Customers' Decline Score", {
            x: "Customers' Decline Score",
            y: "Probabilistic Distribution Function"
        }, 1, active.value, 0, [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
        // Table
        var prefix_content = "<div class='input-group'>";
        prefix_content += "<span class='input-group-addon'>Segment</span>";
        prefix_content += "<select id='growth_table_segment' class='form-control'>";
        // -- Options --
        prefix_content += "<option value='70_75'>70 & 75 (MV &ge; 45 YO)</option>";
        // -- End of Options --
        prefix_content += "</select>";
        prefix_content += "</div><div style='margin-top:10px;'>";
        var header = [
            {text: "Racing Turnover Growth", hint: "Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting"},
            {text: "Active Customers", hint: "Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting"},
            {text: "Avg. Active Rate of Customers", hint: "Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting"},
            {text: "Turnover per Meeting", hint: "Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting"}
        ];
        var hints = {
            "Total Growth": "Total Growth of All Customers Belonging to the Segment",
            "Bet Lines per Meeting": "Turnover per Meeting = Bet Lines per Meeting * Avg. Bet Size",
            "Avg. Bet Size": "Turnover per Meeting = Bet Lines per Meeting * Avg. Bet Size",
            "ST Races": "ST Races YTD vs. ST Races PYTD",
            "HV Races": "HV Races YTD vs. HV Races PYTD",
            "Day Races": "Day Races YTD vs. Day Races PYTD",
            "Night Races": "Night Races YTD vs. Night Races PYTD",
            "Normal Bet Types": "Turnover of Normal Bet Types Counted",
            "Exotic Bet Types": "Turnover of Exotic Bet Types Counted",
            "3 Days Since Last Race": "Meetings of 3 Days Since Last Race Counted",
            "4 Days Since Last Race": "Meetings of 4 Days Since Last Race Counted",
            "5+ Days Since Last Race": "Meetings of 5+ Days Since Last Race Counted"
        };
        stat_color_table("growth-table", "Year-on-Year Growth Analysis (YTD vs. PYTD)", GROWTH_SEG_70_75, header, prefix_content, hints);
        $("#growth_table_segment").select2({
            dropdownAutoWidth: 'true',
            minimumResultsForSearch: Infinity
        });
        prefix_content = "<p>These are customers who are active both YTD and PYTD.<br/>";
        prefix_content += "# of Active Customers (PYTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[0] + "<br/>";
        prefix_content += "# of Active Customers (YTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[1] + " (" + STAT_ACTIVE_CUST_PYTD_YTD[2] + "%)</p>";
        stat_table("stat-quintile", "Breakdown of Turnover Growth of Active Customers (YTD vs. PYTD) " + generate_help_button(prefix_content), STAT_QUINTILE, [
            {text: "", hint: ""},
            {text: "Racing Turnover Growth", hint: ""},
            {text: "Avg. Active Meetings of Customers", hint: ""},
            {text: "Turnover per Meeting", hint: ""}
        ], "", null, function (v) {
            if (v.constructor === Array) return v[0] + "% (" + v[1] + "%)";
            else if (is_numeric(v)) return v + "%";
            else return v;
        });
        prefix_content = "<p>These are customers who are active YTD, inactive PYTD, and active in previous season.<br/>";
        prefix_content += "# of Active Customers (PYTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[0] + "<br/>";
        prefix_content += "# of Active Customers (YTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[1] + " (" + STAT_ACTIVE_CUST_PYTD_YTD[2] + "%)<br/>";
        prefix_content += "Total YTD Turnover of Early Wake Up Customers = $ " + STAT_TURNOVER_SUM_YTD[0] + "</p>";
        stat_table("stat-early-wakeup-pytd-ytd", "Early Wake Up Customers (YTD vs. PYTD) " + generate_help_button(prefix_content), STAT_EARLY_WAKEUP_PYTD_YTD, [
            {text: "# of Early Wake Up Customers (PYTD)", hint: ""},
            {text: "# of Early Wake Up Customers (YTD)", hint: ""},
            {text: "Increase (%)", hint: ""}
        ], "", null);
        prefix_content = "<p>These are customers who are active YTD, but inactive in previous season.<br/>";
        prefix_content += "# of Active Customers (PYTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[0] + "<br/>";
        prefix_content += "# of Active Customers (YTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[1] + " (" + STAT_ACTIVE_CUST_PYTD_YTD[2] + "%)<br/>";
        prefix_content += "Total YTD Turnover of Reactivated Customers = $ " + STAT_TURNOVER_SUM_YTD[1] + "</p>";
        stat_table("stat-reactive-pytd-ytd", "Reactivated Customers (YTD vs. PYTD) " + generate_help_button(prefix_content), STAT_REACTIVE_PYTD_YTD, [
            {text: "# of Reactivated Customers (PYTD)", hint: ""},
            {text: "# of Reactivated Customers (YTD)", hint: ""},
            {text: "Increase (%)", hint: ""}
        ], "", null);
        prefix_content = "<p>These are customers who are inactive YTD, but active in previous season.<br/>";
        prefix_content += "# of Active Customers (PYTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[0] + "<br/>";
        prefix_content += "# of Active Customers (YTD) = " + STAT_ACTIVE_CUST_PYTD_YTD[1] + " (" + STAT_ACTIVE_CUST_PYTD_YTD[2] + "%)<br/>";
        prefix_content += "Total PYTD Turnover of Inactive Customers = $ " + STAT_TURNOVER_SUM_YTD[2] + "</p>";
        stat_table("stat-inactive-pytd-ytd", "Inactive Customers (YTD vs. PYTD) " + generate_help_button(prefix_content), STAT_INACTIVE_PYTD_YTD, [
            {text: "# of Inactive Customers (PYTD)", hint: ""},
            {text: "# of Inactive Customers (YTD)", hint: ""},
            {text: "Increase (%)", hint: ""}
        ], "", null);
    }).fail(function () {
        bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
            window.location.href = "data.php";
        });
    });
}

function generate_help_button(c) {
    return "<a href='javascript:void(0)' onclick=\"bootbox.alert('" + c + "');\"><i class='fa fa-question-circle'></i></a>";
}
