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
    table_header_div.append("<th>" + FEATURE_TAGS_MODEL_1.findKeyValue("id", "end_bal", "text").replace(" ", "<br/>") + "</th>");
    // Draw table
    oConf = DT_CONF;
    $.get(API_SERVER + "joker/tool/env/get/?key=model_1_active_" + Cookies.get('joker_id'), function (active) {
        oConf.jokerSource = active.value;
        oConf.ajax = API_SERVER + "joker/model/1/get_all/?source=" + active.value;
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
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
});
