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
                values: [TURNOVER_PREV_SEASON[i], TURNOVER_THIS_SEASON[i], TOTAL_TURNOVER_PYTD[i], TOTAL_TURNOVER_YTD[i]]
            });
        }
        stat_figure_growth_rate_of_turnover(src, "Growth Rate of Turnover (YTD vs. PYTD)", "Growth Rate of Turnover (YTD vs. PYTD)", {
            x: "Meeting ID",
            y: "Cumulative Growth Rate of Total Turnover (YTD vs. PYTD)",
            keys: ["Turnover (Previous Season)", "Turnover (This Season)", "Total Turnover (PYTD)", "Total Turnover (YTD)"]
        }, 0.05);
        stat_figure_histogram("to_recent_growth", false, "Last 14 Meetings", "Turnover Growth Rate of Last 14 Meetings", {
            x: "Customers' Growth Rate of Turnover",
            y: "Probabilistic Distribution Function"
        }, 1, active.value, 1, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]);
        stat_figure_histogram("age", false, "Age", "Distribution of Customers' Age", {
            x: "Customers' Age",
            y: "Probabilistic Distribution Function"
        }, 1, active.value, 0, [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]);
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        stat_figure_pie_chart(src, "Channel", "Turnover of Channels (YTD)", {
            x: "Channel",
            y: "Turnover of the Channel"
        });
        stat_figure_histogram("grow_prop", false, "Grow Score", "Distribution of Customer's Grow Score", {
            x: "Customer's Grow Score",
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
        header = [
            {text: "", hint: ""},
            {text: "Racing Turnover Growth", hint: ""},
            {text: "Active Customers", hint: ""},
            {text: "Avg. Active Meetings of Customers", hint: ""},
            {text: "Turnover per Meeting", hint: ""}
        ];
        stat_table("stat-quintiles-reactivation", "Statistics of Quintiles and Reactivation (YTD vs. PYTD)", STAT_QUINTILE_REACTIVE, header, "", null, function (v) {
            if (v.constructor === Array) return v[0] + "% (" + v[1] + "%)";
            else if (is_numeric(v)) return v + "%";
            else return v;
        });
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}

