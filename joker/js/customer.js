$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    $("#search_cust_id").keyup(function (e) {
        var code = e.which;
        if (code == 13)e.preventDefault();
        if (code == 32 || code == 13 || code == 188 || code == 186) {
            cust_search();
        }
    });
    if (get_url_parameter("id") != undefined && get_url_parameter("model") != undefined) {
        $("#search_cust_id").val(get_url_parameter("id"));
        $("#select2_model").val(get_url_parameter("model"));
        cust_search();
    }
});

function cust_search() {
    var model = $("#select2_model").val();
    var cust_id = $("#search_cust_id").val();
    $("#customer_table_wrapper>div").html("");
    $.get(API_SERVER + "joker/api/cust/get/?model=" + model + "&id=" + cust_id, function (data) {
        var html = generate_cust_data(data, model);
        $("#customer_table_wrapper>div").html(html);
        if (model == 1) {
            update_cust_rank(data.id, model, "grow_prop");
            update_cust_rank(data.id, model, "decline_prop");
        } else if (model == 2) {
            update_cust_rank(data.id, model, "regular_prop");
        }
    }).fail(function () {
        $("#customer_table_wrapper>div").html("<span class='font-red'>Not Found</span>");
    });
}
