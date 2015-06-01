var DATA_SRC = "feature_and_result_1";
var BODY_WIDTH = -1;

var table = null;
var records = null;

$(document).ready(function () {
    BODY_WIDTH = Math.floor($("body").width() / 4) - 4;
    update_sort_mode_label();
    load_count();
    show_figures();
});

function show_figures() {
    $("#figure_container").show();
    $("#canvas_container").hide();
    $("#show_stat_btn").hide();
    draw_figures();
}

function load_count() {
    $.get("python/api.py?CTL=106&SCHEMA=" + DATA_SRC, function (data) {
        data = eval("(" + data + ")");
        $("#data_count").html(data.content);
    });
}

function load_data() {
    if (table != null) table.destroy();
    $("#figure_container").hide();
    $("#canvas_container").show();
    $("#show_stat_btn").show();
    $("#canvas").hide();
    $("#canvas_loading").html("Loading...");
    $("#canvas_loading").show();
    $.get("python/api.py?CTL=104&SCHEMA=" + DATA_SRC + "&COLUMN=*, RANK() OVER (ORDER BY \"" + get_label_name() + "\" DESC) AS RANK&SORT=" + $("#sort_mode").val().replace(/'/g, "\"") + "&ORDER=" + $("#order_mode").val() + "&LIMIT=" + $("#limit_size").val(), function (data) {
        data = eval("(" + data + ")");
        if (data.status != 200) $("#canvas_loading").html("Loading schema header failed.<br/>Error message: " + data.content);
        else {
            records = data.content;
            $("#canvas_loading").hide();
            $("#canvas").show();
            $("#canvas_tbody").html("");
            for (var i = 0; i < records.length; i++) {
                var tr = "<tr class='pointer_tr' onclick='show_detail(" + i + ");'>";
                tr += "<td>" + records[i].CUST_ID + "</td>";
                tr += "<td>" + records[i].AGE + "</td>";
                tr += "<td>" + records[i].GENDER + "</td>";
                tr += "<td>" + records[i].YRS_W_CLUB + "</td>";
                tr += "<td>" + records[i].IS_MEMBER + "</td>";
                tr += "<td>" + records[i].IS_HRS_OWNER + "</td>";
                tr += "<td>" + records[i].MAJOR_CHANNEL + "</td>";
                tr += "<td>" + records[i].MTG_NUM + "</td>";
                tr += "<td>" + records[i].INV + "</td>";
                tr += "<td>" + records[i].DIV + "</td>";
                tr += "<td>" + records[i].RR + "</td>";
                tr += "<td>" + records[i].END_BAL + "</td>";
                tr += "<td>" + records[i].RECHARGE_TIMES + "</td>";
                tr += "<td>" + records[i].WITHDRAW_AMOUNT + "</td>";
                tr += "<td>" + (records[i][get_label_name()] * 100).toFixed(1) + " %</td>";
                tr += "</tr>";
                $("#canvas_tbody").append(tr);
            }
            table = $("#canvas").DataTable({
                "iDisplayLength": 25,
                "aaSorting": [[interpret_sort_mode(), $("#order_mode").val()]],
                "dom": 'CT<"clear">lfrtip',
                "tableTools": {
                    "sSwfPath": "/lib/datatables-1.10.6/extensions/TableTools/swf/copy_csv_xls_pdf.swf"
                }
            });
            $("#canvas>thead>tr>th:eq(" + interpret_sort_mode() + ")").switchClass("sorting", "sorting_" + $("#order_mode").val().toLowerCase());
        }
    });
}

function interpret_sort_mode() {
    switch ($("#sort_mode").val().replace(/'/g, "")) {
        case "CUST_ID":
            return 0;
            break;
        case "AGE":
            return 1;
            break;
        case "GENDER":
            return 2;
            break;
        case "YRS_W_CLUB":
            return 3;
            break;
        case "IS_MEMBER":
            return 4;
            break;
        case "IS_HRS_OWNER":
            return 5;
            break;
        case "MAJOR_CHANNEL":
            return 6;
            break;
        case "MTG_NUM":
            return 7;
            break;
        case "INV":
        case "INV_SEG1":
        case "INV_SEG2":
        case "INV_SEG3":
            return 8;
            break;
        case "DIV":
            return 9;
            break;
        case "RR":
            return 10;
            break;
        case "END_BAL":
            return 11;
            break;
        case "RECHARGE_TIMES":
            return 12;
            break;
        case "WITHDRAW_AMOUNT":
            return 13;
            break;
        default:
            return 14;
    }
}

function draw_figures() {
    $("#figure_container").html("");
    var src = [];
    for (var i = 0; i < GROWTH_RATE_TURNOVER_COUNT.length; i++) {
        src.push({
            x: GROWTH_RATE_TURNOVER_COUNT[i],
            y: GROWTH_RATE_TURNOVER[i]
        });
    }
    polyline(src, "Growth Rate of Turnover (PYTD)", "X Axis: Meeting ID<br/>Y Axis: Growth Rate (%)", 0.05);
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
    histogram("AGE", 0, "Dist. of Customers' Age", "X Axis: Customers' Age<br/>Y Axis: Probabilistic Distribution Function (%)");
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
    histogram("LABEL_GROW_YEARLY_PRED_PROB", 0, "Dist. of Customer's Grow Score", "X Axis: Customer's Grow Score<br/>Y Axis: Probabilistic Distribution Function (%)");
    histogram("LABEL_LAPSE_YEARLY_PRED_PROB", 0, "Dist. of Customers' Lapse Score", "X Axis: Customers' Lapse Score<br/>Y Axis: Probabilistic Distribution Function (%)");
}

function update_sort_mode_label() {
    $("#sort_mode_label").html(get_label_name());
    $("#sort_mode_label").val("'" + get_label_name() + "'");
}

function get_label_name() {
    return "LABEL_" + $("#work_mode").val() + "_" + $("#time_period").val() + "_PRED_PROB";
}

function get_detail_label_name() {
    return "LABEL_" + $("#detail_work_mode").html().toUpperCase() + "_" + $("#detail_time_period").html() + "_PRED_PROB";
}

function get_detail_reason_code() {
    return "LABEL_" + $("#detail_work_mode").html().toUpperCase() + "_" + $("#detail_time_period").html() + "_REASON_CODE_";
}

function interpret_gender_name(gender) {
    if (gender == "F") return "Female";
    else if (gender == "M") return "Male";
    else return "N/A";
}

function interpret_gender_color(gender) {
    if (gender == "F") return "red";
    else if (gender == "M") return "blue";
    else return "grey";
}

function interpret_work_mode_color(work_mode) {
    if (work_mode == "GROW") return "red";
    else if (work_mode == "LAPSE") return "green";
    else return "grey";
}

function update_detail_score() {
    var seq = $("#dialog-message").attr("seq");
    $("#detail_work_mode").html(toTitleCase($("#work_mode").val()));
    $("#detail_score").html((records[seq][get_detail_label_name()] * 100.0).toFixed(1));
    $("#detail_score_color").attr("class", "alert-" + interpret_work_mode_color($("#detail_work_mode").html().toUpperCase()));
    $("#detail_rank").html(records[seq].rank + " / " + $("#data_count").html());
    $("#detail_reason_code_1").html(records[seq][get_detail_reason_code() + "1"]);
    $("#detail_reason_code_2").html(records[seq][get_detail_reason_code() + "2"]);
    $("#detail_reason_code_3").html(records[seq][get_detail_reason_code() + "3"]);
}

function show_detail(id) {
    $("#dialog-message").attr("title", "CUST_ID: " + records[id].CUST_ID);
    $("#dialog-message").attr("seq", id);
    var html = "<p>";
    html += "<span class='label label-" + interpret_gender_color(records[id].GENDER) + "'>" + interpret_gender_name(records[id].GENDER) + "</span>";
    html += "<span class='label label-" + (records[id].IS_MEMBER ? "green" : "grey") + "'>" + (records[id].IS_MEMBER ? "Member" : "Non-Member") + "</span>";
    html += "<span class='label label-" + (records[id].IS_HRS_OWNER ? "yellow" : "grey") + "'>" + (records[id].IS_HRS_OWNER ? "Horse Owner" : "Not Horse Owner") + "</span>";
    html += "</p><hr/><p>";
    html += "<div id='detail_score_color' class='alert-yellow' style='float:right;text-align:center;'>";
    html += "<span id='detail_score' style='font-size:32px;font-weight:bold;'>Loading...</span> %<hr/>";
    html += "<span style='color:grey;'>Prop. to </span>";
    html += "<span id='detail_work_mode' style='color:grey;'>Grow</span>";
    html += "<span id='detail_time_period' style='display:none;'>YEARLY</span><hr/>";
    html += "<span id='detail_rank' style='color:grey;'>Loading...</span>";
    html += "</div>";
    html += "<span class='bold'>Age: </span>" + records[id].AGE + "<br/>";
    html += "<span class='bold'>Years w/ Club: </span>" + records[id].YRS_W_CLUB + "<br/>";
    html += "<span class='bold'>Major Channel: </span>" + records[id].MAJOR_CHANNEL + "<br/>";
    html += "<span class='bold'>Meetings Attend Last Season: </span>" + records[id].MTG_NUM + "<br/>";
    html += "<span class='bold'>Total Investment: </span>" + records[id].INV + "<br/>";
    html += "<span class='bold'>Total Investment in Beginning of Season: </span>" + records[id].INV_SEG1 + "<br/>";
    html += "<span class='bold'>Total Investment in Middle of Season: </span>" + records[id].INV_SEG2 + "<br/>";
    html += "<span class='bold'>Total Investment in Ending of Season: </span>" + records[id].INV_SEG3 + "<br/>";
    html += "<span class='bold'>Dividend: </span>" + records[id].DIV + "<br/>";
    html += "<span class='bold'>Recovery Rate: </span>" + records[id].RR + "<br/>";
    html += "<span class='bold'>Balance: </span>" + records[id].END_BAL + "<br/>";
    html += "<span class='bold'>Recharge Times: </span>" + records[id].RECHARGE_TIMES + "<br/>";
    html += "<span class='bold'>Withdraw Amount: </span>" + records[id].WITHDRAW_AMOUNT;
    html += "</p><hr/><p><span class='bold'>Reason Code: </span><ul>";
    html += "<li id='detail_reason_code_1'>Loading...</li>";
    html += "<li id='detail_reason_code_2'>Loading...</li>";
    html += "<li id='detail_reason_code_3'>Loading...</li>";
    html += "</ul></p>";
    $("#dialog-message").html(html);
    $("#dialog-message").dialog({
        minWidth: 475,
        modal: true,
        position: {
            my: "top",
            at: "top",
            of: window
        },
        buttons: {
            OK: function () {
                $(this).dialog("close");
                $(this).dialog("destroy");
            }
        },
        close: function (event, ui) {
            $(this).dialog("destroy");
        }
    });
    update_detail_score();
}