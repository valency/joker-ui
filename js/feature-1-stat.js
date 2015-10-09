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
        stat_figure_growth_rate_of_turnover(src, "Growth Rate of Turnover (YTD)", {x: "Meeting ID", y: "Cumulative Growth Rate (%)", last_season: "Total Turnover of Last Season", this_season: "Total Turnover of This Season"}, 0.05);
        src = [];
        for (i = 0; i < PDF_GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: PDF_GROWTH_RATE_TURNOVER_COUNT[i],
                y: PDF_GROWTH_RATE_TURNOVER[i]
            });
        }
        stat_figure_bar_chart(src, "Distribution of Customers' Growth Rate of Turnover of the Last 14 Meetings", "Customers' Growth Rate of Turnover (%)", "Probabilistic Distribution Function (%)");
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
        html += "<option value='70_75'>70 & 75</option>";
        html += "</select>";
        html += "</div><div style='margin-top:10px;'>";
        html += "<table class='table table-bordered table-advance table-hover table-condensed'>";
        html += "<tbody class='text-center'>";
        html += "<tr><td class='bold bg-grey'></td><td class='bold bg-grey'>Racing Turnover Growth</td><td class='bold bg-grey'>Active Customers</td><td class='bold bg-grey'>Avg. Active Rate of Customers</td><td class='bold bg-grey'>Turnover per Meeting</td></tr>";
        for (var group = 0; group < GROWTH_SEG_70_75.length; group++) {
            if (group == 1) html += "<tr><td class='' colspan='5'><hr style='margin:0;'/></td></tr>";
            for (var key in GROWTH_SEG_70_75[group]) {
                if (GROWTH_SEG_70_75[group].hasOwnProperty(key)) {
                    var color = COLOR_PALETTE[group];
                    html += "<tr style='color:" + color + ";'><td class='bold text-right' style='background-color:" + color + ";color:white;'>" + key + "</td>";
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

