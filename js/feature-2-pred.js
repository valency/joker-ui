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
    for (var i = 2; i < FEATURE_TAGS[1].length; i++) {
        table_header_div.append("<th>" + FEATURE_TAGS[1][i]["text"].splitMiddle().join("<br/>") + "</th>");
        oConf.columns.push({data: FEATURE_TAGS[1][i]["id"], name: FEATURE_TAGS[1][i]["id"]});
    }
    // Add hint for table header
    $("#customer_table>thead>tr>th").each(function () {
        var th_text = $(this).html().replace("<br>", " ");
        var th_hint = FEATURE_TAGS[1].findKeyValue("text", th_text, "hint");
        if (th_hint == null) th_hint = FEATURE_TAGS_PROP.findKeyValue("text", th_text, "hint");
        $(this).attr("title", th_hint);
    });
    // Draw table
    $.get(API_SERVER + "joker/tool/env/get/?key=model_2_active_" + Cookies.get('joker_id'), function (active) {
        oConf.jokerSource = active.value;
        oConf.ajax = API_SERVER + "joker/model/2/get_all/?source=" + active.value + "&_r=" + Math.random();
        oConf.columns.splice(2, 0, {
            data: "chance_to_be_regular",
            name: "chance_to_be_regular",
            render: function (data, type, full, meta) {
                var prefix = "<span class='label bg-red'>";
                var postfix = " %</span>";
                return prefix + data.toFixed(1) + postfix;
            }
        });
        oConf.order = [[2, "desc"]];
        oTable = load_data("customer_table", oConf, 2);
    }).fail(function () {
        bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
            window.location.href = "data.php";
        });
    });
});
