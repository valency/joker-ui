var oTable = null;
var oConf = null;
$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    $("select").select2({dropdownAutoWidth: 'true'});
    oConf = DT_CONF;
    oConf.columns.push({
        data: "prediction",
        name: "prediction.Growth",
        render: function (data, type, full, meta) {
            var prefix = "<span class='label bg-red'>";
            var postfix = " %</span>";
            var r = find_prediction_type(data, "Growth");
            if (r != null) return prefix + (r.prob * 100.0).toFixed(1) + postfix;
            else return "-";
        }
    });
    oConf.order = [[16, "desc"]];
    oTable = load_data("customer_table", oConf);
});
