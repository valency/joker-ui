var oTable = null;
var oConf = null;
$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    // Configure table header
    var table_header_div = $("#customer_table>thead>tr");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "age", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "gender", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "yrs_w_club", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "is_member", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "is_hrs_owner", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "major_channel", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "mtg_num", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "inv", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "div", "text").replace(" ", "<br/>") + "</th>");
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "rr", "text").replace(" ", "<br/>") + "</th>");
    // Add hint for table header
    $("#customer_table>thead>tr>th").each(function () {
        var th_text = $(this).html().replace("<br>", " ");
        var th_hint = FEATURE_TAGS_MODEL_1.findKeyValue("text", th_text, "hint");
        if (th_hint == null) th_hint = FEATURE_TAGS_PROP.findKeyValue("text", th_text, "hint");
        $(this).attr("title", th_hint);
    });
    // Draw table
    oConf = DT_CONF;
    $.get(API_SERVER + "joker/tool/env/get/?key=model_2_active_" + Cookies.get('joker_id'), function (active) {
        oConf.jokerSource = active.value;
        oConf.ajax = API_SERVER + "joker/model/2/get_all/?source=" + active.value;
        oConf.columns.splice(2, 0, {
            data: "chance_to_be_regular",
            name: "chance_to_be_regular",
            render: function (data, type, full, meta) {
                var prefix = "<span class='label bg-red'>";
                var postfix = " %</span>";
                return prefix + data.toFixed(1) + postfix;
            }
        });
        oConf.columns.splice(-1, 1);
        oConf.order = [[2, "desc"]];
        oTable = load_data("customer_table", oConf, 2);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
});
