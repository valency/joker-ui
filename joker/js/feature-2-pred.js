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
    oConf.ajax = API_SERVER + "joker/api/cust/get_all/?model=2";
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
});
