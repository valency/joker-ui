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
