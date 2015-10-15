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
        stat_figure_growth_rate_of_turnover(src, "Growth Rate of Turnover (YTD)", {
            x: "Meeting ID",
            y: "Cumulative Growth Rate of Total Turnover (%)",
            keys: ["Turnover (Previous Season)", "Turnover (This Season)", "Total Turnover (PYTD)", "Total Turnover (YTD)"]
        }, 0.05);
        stat_figure_histogram("recent_growth_rate", 0, "Distribution of Customers' Growth Rate of Turnover of the Last 14 Meetings", "Customers' Growth Rate of Turnover (%)", "Probabilistic Distribution Function (%)", 1, active.value, 0);
        stat_figure_histogram("age", 0, "Distribution of Customers' Age", "Customers' Age", "Probabilistic Distribution Function (%)", 1, active.value, 0);
        src = [];
        for (i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_BET_TYPE[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Bet Types (YTD)", "Bet Type", "Turnover of the Bet Type (%)");
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Channels (YTD)", "Channel", "Turnover of the Channel (%)");
        stat_figure_histogram("grow_prop", 0, "Distribution of Customer's Grow Score", "Customer's Grow Score", "Probabilistic Distribution Function (%)", 1, active.value, 1);
        stat_figure_histogram("decline_prop", 0, "Distribution of Customers' Decline Score", "Customers' Decline Score", "Probabilistic Distribution Function (%)", 1, active.value, 1);
        // Table
        var html = "";
        html += "<div class='input-group'>";
        html += "<span class='input-group-addon'>Segment</span>";
        html += "<select id='growth_table_segment' class='form-control'>";
        // -- Options --
        html += "<option value='70_75'>70 & 75 (MV &ge; 45 YO)</option>";
        // -- End of Options --
        html += "</select>";
        html += "</div><div style='margin-top:10px;'>";
        html += "<table class='table table-bordered table-advance table-hover table-condensed table-striped'>";
        html += "<tbody class='text-center'>";
        html += "<tr><td class='bold bg-grey'></td>";
        html += "<td class='bold bg-grey' title='Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting'>Racing Turnover Growth</td>";
        html += "<td class='bold bg-grey' title='Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting'>Active Customers</td>";
        html += "<td class='bold bg-grey' title='Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting'>Avg. Active Rate of Customers</td>";
        html += "<td class='bold bg-grey' title='Racing Turnover Growth = Active Customers * Avg. Active Rate of Customers * Turnover per Meeting'>Turnover per Meeting</td></tr>";
        for (var group = 0; group < GROWTH_SEG_70_75.length; group++) {
            if (group == 1) html += "<tr><td class='' colspan='5'><hr style='margin:0;'/></td></tr>";
            for (var key in GROWTH_SEG_70_75[group]) {
                if (GROWTH_SEG_70_75[group].hasOwnProperty(key)) {
                    var color = COLOR_PALETTE[group];
                    html += "<tr><td class='bold text-right' style='background-color:" + color + ";color:white;'>" + key + "</td>";
                    for (i = 0; i < 4; i++) {
                        var value = "-";
                        if (GROWTH_SEG_70_75[group][key][i]) value = GROWTH_SEG_70_75[group][key][i] + " %";
                        html += "<td>" + value + "</td>";
                    }
                    html += "</tr>";
                }
            }
        }
        html += "</tbody></table></div>";
        add_portlet("#figure-container", "Year-on-Year Growth Analysis (YTD vs. PYTD)", html, "growth-table", 12);
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

