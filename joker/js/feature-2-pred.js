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
    oConf = DT_CONF;
    $.get(API_SERVER + "joker/tool/env/get/?key=model_2_active_" + Cookies.get('joker_id'), function (active) {
        oConf.jokerSource = active.value;
        oConf.ajax = API_SERVER + "joker/model/2/get_all/?source=" + active.value;
        oConf.columns.splice(2, 0, {
            data: "regular_prop",
            name: "regular_prop",
            render: function (data, type, full, meta) {
                var prefix = "<span class='label bg-red'>";
                var postfix = " %</span>";
                return prefix + data.toFixed(1) + postfix;
            }
        });
        oConf.order = [[2, "desc"]];
        oTable = load_data("customer_table", oConf, 2);
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
});
