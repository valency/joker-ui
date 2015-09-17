$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    draw_figures();
});

function draw_figures() {
    $("#figure_container").html("");
    $.get(API_SERVER + "joker/tool/env/get/?key=model_2_active_" + Cookies.get('joker_id'), function (active) {
        var src = [];
        for (var i = 0; i < GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: GROWTH_RATE_TURNOVER_COUNT[i],
                y: ACCUMULATIVE_AVERAGE_ACTIVE_RATE[i]
            });
        }
        polyline(src, "Avg. Active Rate (PYTD)", "X Axis: Meeting ID<br/>Y Axis: Avg. Active Rate (%)", null, 0.34);
        src = [];
        for (i = 0; i < TURNOVER_COUNT.length; i++) {
            src.push({
                x: TURNOVER_COUNT[i],
                y1: ACTIVE_CUSTOMERS_LAST_SEASON[i],
                y2: ACTIVE_CUSTOMERS_THIS_SEASON[i]
            });
        }
        barset(src, "# of Active Custs. per Meeting", "X Axis: Meeting ID<br/>Y Axis: # of Active Custs.", "Last Season", "This Season");
        src = [];
        for (i = 0; i < PDF_ACTIVE_RATE_COUNT.length; i++) {
            src.push({
                x: PDF_ACTIVE_RATE_COUNT[i],
                y: PDF_ACTIVE_RATE[i]
            });
        }
        barchart(src, "Dist. of New Custs.' Active Rate", "X Axis: New Custs.' Active Rate (%)<br/>Y Axis: Probabilistic Distribution Function (%)");
        src = [];
        for (i = 0; i < PDF_GROWTH_RATE_ACTIVE_RATE_COUNT.length; i++) {
            src.push({
                x: PDF_GROWTH_RATE_ACTIVE_RATE_COUNT[i],
                y: PDF_GROWTH_RATE_ACTIVE_RATE[i]
            });
        }
        barchart(src, "Dist. of Avg. Active Rate of New Custs.", "X Axis: Avg. Active Rate of New Custs. (%)<br/>Y Axis: Probabilistic Distribution Function (%)");
        histogram("age", 0, "Dist. of New Custs.' Age", "X Axis: New Custs.' Age<br/>Y Axis: Probabilistic Distribution Function (%)", 2, active.value);
        src = [];
        for (i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_NEW_BET_TYPE[i]
            });
        }
        piechart(src, "New Custs.' Turnover of Bet Types (PYTD)", "Key: Bet Type<br/>Value: New Custs.' Turnover of the Bet Type (%)");
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        piechart(src, "New Custs.' Turnover of Channels (PYTD)", "Key: Channel<br/>Value: New Custs.' Turnover of the Channel (%)");
        histogram("chance_to_be_regular", 0, "Dist. of New Custs.' Regular Score", "X Axis: New Custs.' Regular Score<br/>Y Axis: Probabilistic Distribution Function (%)", 2, active.value);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}