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
        stat_figure_growth_rate_of_turnover(src, "Growth Rate of Turnover (YTD vs. PYTD)", {
            x: "Meeting ID",
            y: "Cumulative Growth Rate of Total Turnover (YTD vs. PYTD)",
            keys: ["Turnover (Previous Season)", "Turnover (This Season)", "Total Turnover (PYTD)", "Total Turnover (YTD)"]
        }, 0.05);
        stat_figure_histogram("recent_growth_rate", 0, "Distribution of Customers' Growth Rate of Turnover of the Last 14 Meetings", "Customers' Growth Rate of Turnover", "Probabilistic Distribution Function", 1, active.value, 1, "-1,-0.8,-0.6,-0.4,-0.2,0,0.2,0.4,0.6,0.8,1");
        stat_figure_histogram("age", 0, "Distribution of Customers' Age", "Customers' Age", "Probabilistic Distribution Function", 1, active.value, 0, "15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100");
        src = [];
        for (i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_BET_TYPE[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Bet Types (YTD)", "Bet Type", "Turnover of the Bet Type");
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Channels (YTD)", "Channel", "Turnover of the Channel");
        stat_figure_histogram("grow_prop", 0, "Distribution of Customer's Grow Score", "Customer's Grow Score", "Probabilistic Distribution Function", 1, active.value, 0, "0,10,20,30,40,50,60,70,80,90,100");
        stat_figure_histogram("decline_prop", 0, "Distribution of Customers' Decline Score", "Customers' Decline Score", "Probabilistic Distribution Function", 1, active.value, 0, "0,10,20,30,40,50,60,70,80,90,100");
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
        stat_color_table("growth-table", "Year-on-Year Growth Analysis (YTD vs. PYTD)", GROWTH_SEG_70_75, header, prefix_content);
        $("#growth_table_segment").select2({
            dropdownAutoWidth: 'true',
            minimumResultsForSearch: Infinity
        });
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}

