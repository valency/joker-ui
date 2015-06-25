var oTable = null;
var oConf = null;
$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    oConf = DT_CONF;
    oConf.columns.splice(2, 0, {
        data: "prediction",
        name: "prediction.Grow",
        render: function (data, type, full, meta) {
            var prefix = "<span class='label bg-red'>";
            var postfix = " %</span>";
            var r = find_prediction_type(data, "Grow");
            if (r != null) return prefix + (r.prob * 100.0).toFixed(1) + postfix;
            else return "-";
        }
    });
    oConf.columns.splice(3, 0, {
        data: "prediction",
        name: "prediction.Lapse",
        render: function (data, type, full, meta) {
            var prefix = "<span class='label bg-green'>";
            var postfix = " %</span>";
            var r = find_prediction_type(data, "Lapse");
            if (r != null) return prefix + (r.prob * 100.0).toFixed(1) + postfix;
            else return "-";
        }
    });
    oTable = load_data("customer_table", oConf);
});
