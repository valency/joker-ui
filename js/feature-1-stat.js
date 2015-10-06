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
        stat_figure_histogram("age", 0, "Dist. of Customers' Age", "Customers' Age", "Probabilistic Distribution Function (%)", 1, active.value);
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
        stat_figure_histogram("grow_prop", 0, "Dist. of Customer's Grow Score", "Customer's Grow Score", "Probabilistic Distribution Function (%)", 1, active.value);
        stat_figure_histogram("decline_prop", 0, "Dist. of Customers' Decline Score", "Customers' Decline Score", "Probabilistic Distribution Function (%)", 1, active.value);
        // Table
        var html = "<table class='table table-bordered table-advance table-hover'>";
        html += "<tbody class='text-center'>";
        html += "<tr><td class='bold bg-grey'></td><td class='bold bg-grey'>Racing Turnover Growth</td><td class='bold bg-grey'>Active Customers</td><td class='bold bg-grey'>Avg. Active Rate of Customers</td><td class='bold bg-grey'>Turnover per Meeting</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Total Growth</td><td>0.044048342</td><td>-0.014324109</td><td>0.033149002</td><td>0.01901411</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Top Quintile</td><td>0.083071652</td><td>0.004298412</td><td>0.034956485</td><td>0.036851986</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>2nd Quintile</td><td>0.071429276</td><td>0.003932707</td><td>0.035204791</td><td>0.024464465</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>3rd Quintile</td><td>0.047488712</td><td>0.0037865</td><td>0.035789945</td><td>0.001728228</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>4th Quintile</td><td>-0.04779668</td><td>0.004444768</td><td>0.021007769</td><td>-0.074082029</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>5th Quintile</td><td>-0.558794333</td><td>-0.100966886</td><td>-0.074910785</td><td>-0.476955173</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>September</td><td>0.080607677</td><td>0.029134694</td><td>0.009565793</td><td>0.040066725</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>October</td><td>0.051713036</td><td>0.017733256</td><td>0.002017683</td><td>0.031306857</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>November</td><td>0.079188106</td><td>0.018219331</td><td>0.001797638</td><td>0.057975983</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>December</td><td>-0.194326436</td><td>0.004011821</td><td>0.002183587</td><td>-0.19929415</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>January</td><td>0.104217132</td><td>0.017131046</td><td>0.000726026</td><td>0.084831722</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>February</td><td>-0.089031628</td><td>0.001158106</td><td>0.000672834</td><td>-0.090697215</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>March</td><td>0.085313715</td><td>0.007794973</td><td>0.001151083</td><td>0.075680962</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>April</td><td>0.051907608</td><td>0.006017922</td><td>0.001015667</td><td>0.044554258</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>May</td><td>0.170783553</td><td>0.005328038</td><td>0.001521536</td><td>0.162809377</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>June</td><td>-0.01547574</td><td>-0.015829793</td><td>0.127564343</td><td>-0.112813603</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>ST Races</td><td>0.094812932</td><td>-0.003777485</td><td>0.074007421</td><td>0.020407875</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>HV Races</td><td>-0.042400853</td><td>0.018589995</td><td>-0.071188932</td><td>0.018240793</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Day Races</td><td>0.105801422</td><td>0.006444581</td><td>0.085108213</td><td>0.021857775</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Night Races</td><td>-0.040413604</td><td>0.007307819</td><td>-0.064153718</td><td>0.016123769</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Normal Bet Types</td><td>0.032753465</td><td>-0.013350872</td><td>0.037071781</td><td>0.009311234</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Exotic Bet Types</td><td>0.104627886</td><td>-0.00971508</td><td>0.05405687</td><td>0.058258569</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Normal Races</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Key Races</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Bet Lines per Meeting</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>Avg. Bet Size</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>3 Days Since Last Race</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>4 Days Since Last Race</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "<tr><td class='bold bg-grey text-right'>5+ Days Since Last Race</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>";
        html += "</tbody></table>";
        add_portlet("#figure-container", "Growth of Segment 70 & 75", html, "growth-table-70-75", 12);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}

