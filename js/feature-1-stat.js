$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    draw_figures();
});

function draw_figures() {
    $("#figure_container").html("");
    $.get(API_SERVER + "joker/tool/env/get/?key=model_1_active_" + Cookies.get('joker_id'), function (active) {
        var src = [];
        for (var i = 0; i < GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: GROWTH_RATE_TURNOVER_COUNT[i],
                y: GROWTH_RATE_TURNOVER[i]
            });
        }
        polyline(src, "Growth Rate of Turnover (PYTD)", "X Axis: Meeting ID<br/>Y Axis: Growth Rate (%)", null, 0.05);
        src = [];
        for (i = 0; i < TURNOVER_COUNT.length; i++) {
            src.push({
                x: TURNOVER_COUNT[i],
                y1: TURNOVER_LAST_SEASON[i],
                y2: TURNOVER_THIS_SEASON[i]
            });
        }
        barset(src, "Turnover per Meeting", "X Axis: Meeting ID<br/>Y Axis: Total Turnover (million dollars)", "Last Season", "This Season");
        src = [];
        for (i = 0; i < PDF_GROWTH_RATE_TURNOVER_COUNT.length; i++) {
            src.push({
                x: PDF_GROWTH_RATE_TURNOVER_COUNT[i],
                y: PDF_GROWTH_RATE_TURNOVER[i]
            });
        }
        barchart(src, "Dist. of Customers' Growth Rate of Turnover", "X Axis: Customers' Growth Rate of Turnover (%)<br/>Y Axis: Probabilistic Distribution Function (%)");
        histogram("age", 0, "Dist. of Customers' Age", "X Axis: Customers' Age<br/>Y Axis: Probabilistic Distribution Function (%)", 1, active.value);
        src = [];
        for (i = 0; i < BET_TYPE.length; i++) {
            src.push({
                key: BET_TYPE[i],
                value: PERCENTAGE_BET_TYPE[i]
            });
        }
        piechart(src, "Turnover of Bet Types (PYTD)", "Key: Bet Type<br/>Value: Turnover of the Bet Type (%)");
        src = [];
        for (i = 0; i < MAJOR_CHANNEL_LABEL.length; i++) {
            src.push({
                key: MAJOR_CHANNEL_LABEL[i],
                value: PERCENTAGE_MAJOR_CHANNEL[i]
            });
        }
        piechart(src, "Turnover of Channels (PYTD)", "Key: Channel<br/>Value: Turnover of the Channel (%)");
        histogram("grow_prop", 0, "Dist. of Customer's Grow Score", "X Axis: Customer's Grow Score<br/>Y Axis: Probabilistic Distribution Function (%)", 1, active.value);
        histogram("decline_prop", 0, "Dist. of Customers' Decline Score", "X Axis: Customers' Decline Score<br/>Y Axis: Probabilistic Distribution Function (%)", 1, active.value);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
}

