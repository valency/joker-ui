var oTable = null;
var oConf = null;
$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    init_widget();
    oConf = DT_CONF;
    // Configure table header
    var table_header_div = $("#customer_table>thead>tr");
    for (var i = 2; i < FEATURE_TAGS[0].length; i++) {
        if (FEATURE_TAGS[0][i]["show_in_pred_table"]) {
            table_header_div.append("<th>" + FEATURE_TAGS[0][i]["text"].splitMiddle().join("<br/>") + "</th>");
            oConf.columns.push({data: FEATURE_TAGS[0][i]["id"], name: FEATURE_TAGS[0][i]["id"]});
        }
    }
    // Add hint for table header
    $("#customer_table>thead>tr>th").each(function () {
        var th_text = $(this).html().replace("<br>", " ");
        var th_hint = FEATURE_TAGS[0].findKeyValue("text", th_text, "hint");
        if (th_hint == null) th_hint = FEATURE_TAGS_PROP.findKeyValue("text", th_text, "hint");
        $(this).attr("title", th_hint);
    });
    // Draw table
    $.get(API_SERVER + "tool/env/get/?key=model_1_active_" + Cookies.get('joker_id'), function (active) {
        oConf.jokerSource = active.value;
        oConf.ajax = API_SERVER + "model/1/get_all/?source=" + active.value + "&_r=" + Math.random();
        oConf.columns.splice(2, 0, {
            data: "grow_prop",
            name: "grow_prop",
            render: function (data, type, full, meta) {
                var prefix = "<span class='label bg-red'>";
                var postfix = " %</span>";
                return prefix + data.toFixed(1) + postfix;
            }
        });
        oConf.columns.splice(3, 0, {
            data: "decline_prop",
            name: "decline_prop",
            render: function (data, type, full, meta) {
                var prefix = "<span class='label bg-green'>";
                var postfix = " %</span>";
                return prefix + data.toFixed(1) + postfix;
            }
        });
        oTable = load_data("customer_table", oConf, 1);
    }).fail(function () {
        bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
            window.location.href = "data.php";
        });
    });
});
