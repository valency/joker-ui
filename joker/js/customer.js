var oTable = null;
var filter_cust_code = null;
$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    if (get_url_parameter("id") != undefined) {
        $("#customer_table_wrapper").html("");
        $(".page-title").first().html("CUST_ID: " + get_url_parameter("id"));
        $.get(API_SERVER + "joker/api/cust/get/?id=" + get_url_parameter("id"), function (data) {
            var html = generate_cust_data(data);
            $("#customer_table_wrapper").html(html);
        }).fail(function () {
            $("#customer_table_wrapper").html("<span class='font-red'>Not Found</span>");
        });
    } else {
        oTable = load_data("customer_table", DT_CONF);
    }
});
