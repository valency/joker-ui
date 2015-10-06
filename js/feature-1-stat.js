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
        stat_figure_growth_rate_of_turnover(src, "Growth Rate of Turnover (PYTD)", {x: "Meeting ID", y: "Cumulative Growth Rate (%)", last_season: "Total Turnover of Last Season", this_season: "Total Turnover of This Season"}, 0.05);
        src = [];
        for (i = 0; i < PDF_GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: PDF_GROWTH_RATE_TURNOVER_COUNT[i],
                y: PDF_GROWTH_RATE_TURNOVER[i]
            });
        }
        stat_figure_bar_chart(src, "Dist. of Customers' Growth Rate of Turnover", "Customers' Growth Rate of Turnover (%)", "Probabilistic Distribution Function (%)");
        stat_figure_histogram("age", 0, "Dist. of Customers' Age", "Customers' Age", "Probabilistic Distribution Function (%)", 1, active.value, 0);
        src = [];
        for (i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_BET_TYPE[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Bet Types (PYTD)", "Bet Type", "Turnover of the Bet Type (%)");
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        stat_figure_pie_chart(src, "Turnover of Channels (PYTD)", "Channel", "Turnover of the Channel (%)");
        stat_figure_histogram("grow_prop", 0, "Dist. of Customer's Grow Score", "Customer's Grow Score", "Probabilistic Distribution Function (%)", 1, active.value, 1);
        stat_figure_histogram("decline_prop", 0, "Dist. of Customers' Decline Score", "Customers' Decline Score", "Probabilistic Distribution Function (%)", 1, active.value, 1);
        // Table
        var html = "<table class='table table-bordered table-advance table-hover'>";
        html += "<tbody class='text-center'>";
        html += "<tr><td class='bold bg-grey'></td><td class='bold bg-grey'>Racing Turnover Growth</td><td class='bold bg-grey'>Active Customers</td><td class='bold bg-grey'>Avg. Active Rate of Customers</td><td class='bold bg-grey'>Turnover per Meeting</td></tr>";
        html += "<tr class='font-red'><td class='bold bg-red text-right'>Total Growth</td><td>4.4%</td><td>-1.4%</td><td>3.3%</td><td>1.9%</td></tr>";
        html += "<tr class='font-yellow'><td class='bold bg-yellow text-right'>Top Quintile</td><td>8.3%</td><td>0.4%</td><td>3.5%</td><td>3.7%</td></tr>";
        html += "<tr class='font-yellow'><td class='bold bg-yellow text-right'>2nd Quintile</td><td>7.1%</td><td>0.4%</td><td>3.5%</td><td>2.4%</td></tr>";
        html += "<tr class='font-yellow'><td class='bold bg-yellow text-right'>3rd Quintile</td><td>4.7%</td><td>0.4%</td><td>3.6%</td><td>0.2%</td></tr>";
        html += "<tr class='font-yellow'><td class='bold bg-yellow text-right'>4th Quintile</td><td>-4.8%</td><td>0.4%</td><td>2.1%</td><td>-7.4%</td></tr>";
        html += "<tr class='font-yellow'><td class='bold bg-yellow text-right'>5th Quintile</td><td>-55.9%</td><td>-10.1%</td><td>-7.5%</td><td>-47.7%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>September</td><td>8.1%</td><td>2.9%</td><td>1.0%</td><td>4.0%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>October</td><td>5.2%</td><td>1.8%</td><td>0.2%</td><td>3.1%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>November</td><td>7.9%</td><td>1.8%</td><td>0.2%</td><td>5.8%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>December</td><td>-19.4%</td><td>0.4%</td><td>0.2%</td><td>-19.9%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>January</td><td>10.4%</td><td>1.7%</td><td>0.1%</td><td>8.5%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>February</td><td>-8.9%</td><td>0.1%</td><td>0.1%</td><td>-9.1%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>March</td><td>8.5%</td><td>0.8%</td><td>0.1%</td><td>7.6%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>April</td><td>5.2%</td><td>0.6%</td><td>0.1%</td><td>4.5%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>May</td><td>17.1%</td><td>0.5%</td><td>0.2%</td><td>16.3%</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>June</td><td>-1.5%</td><td>-1.6%</td><td>12.8%</td><td>-11.3%</td></tr>";
        html += "<tr class='font-green'><td class='bold bg-green text-right'>ST Races</td><td>9.5%</td><td>-0.4%</td><td>7.4%</td><td>2.0%</td></tr>";
        html += "<tr class='font-green'><td class='bold bg-green text-right'>HV Races</td><td>-4.2%</td><td>1.9%</td><td>-7.1%</td><td>1.8%</td></tr>";
        html += "<tr class='font-blue'><td class='bold bg-blue text-right'>Day Races</td><td>10.6%</td><td>0.6%</td><td>8.5%</td><td>2.2%</td></tr>";
        html += "<tr class='font-blue'><td class='bold bg-blue text-right'>Night Races</td><td>-4.0%</td><td>0.7%</td><td>-6.4%</td><td>1.6%</td></tr>";
        html += "<tr class='font-red'><td class='bold bg-red text-right'>Normal Bet Types</td><td>3.3%</td><td>-1.3%</td><td>3.7%</td><td>0.9%</td></tr>";
        html += "<tr class='font-red'><td class='bold bg-red text-right'>Exotic Bet Types</td><td>10.5%</td><td>-1.0%</td><td>5.4%</td><td>5.8%</td></tr>";
        html += "<tr class='font-yellow'><td class='bold bg-yellow text-right'>Normal Races</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr class='font-yellow'><td class='bold bg-yellow text-right'>Key Races</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>Bet Lines per Meeting</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr class='font-purple'><td class='bold bg-purple text-right'>Avg. Bet Size</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr class='font-green'><td class='bold bg-green text-right'>3 Days Since Last Race</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr class='font-green'><td class='bold bg-green text-right'>4 Days Since Last Race</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr class='font-green'><td class='bold bg-green text-right'>5+ Days Since Last Race</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "</tbody></table>";
        add_portlet("#figure-container", "Growth of Segment 70 & 75", html, "growth-table-70-75", 12);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}

