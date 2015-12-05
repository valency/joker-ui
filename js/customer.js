$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    init_widget();
    $("#search_cust_id").keyup(function (e) {
        var code = e.which;
        if (code == 13)e.preventDefault();
        if (code == 32 || code == 13 || code == 188 || code == 186) {
            cust_search();
        }
    });
    if (get_url_parameter("id") != undefined && get_url_parameter("model") != undefined) {
        $("#search_cust_id").val(get_url_parameter("id"));
        $("#select2_model").select2("val", get_url_parameter("model"));
        cust_search();
    }
});

function cust_search() {
    var model = $("#select2_model").val();
    var cust_id = $("#search_cust_id").val();
    $("#customer_table_wrapper>div").html("");
    $.get(API_SERVER + "joker/tool/env/get/?key=model_" + model + "_active_" + Cookies.get('joker_id'), function (active) {
        $.get(API_SERVER + "joker/model/" + model + "/get/?source=" + active.value + "&id=" + cust_id, function (data) {
            var html = generate_cust_data(data, model);
            $("#customer_table_wrapper>div").html(html);
            if (model == 4) {
                generate_cust_turnover_barchart("#cust_detail_betline_standard_barchart", data.betline_standard_part, {x: "", y: "Betline (Standard)"});
                generate_cust_turnover_barchart("#cust_detail_betline_exotic_barchart", data.betline_exotic_part, {x: "", y: "Betline (Exotic)"});
            } else {
                generate_cust_turnover_barchart("#cust_detail_turnover_barchart", data.inv_part, {x: "", y: "Turnover"});
            }
            if (model == 1) {
                update_cust_rank(data.id, model, "grow_prop", active.value);
                update_cust_rank(data.id, model, "decline_prop", active.value);
            } else if (model == 2) {
                update_cust_rank(data.id, model, "chance_to_be_regular", active.value);
            } else if (model == 4) {
                update_cust_rank(data.id, model, "score_hp_preference", active.value);
                update_cust_rank(data.id, model, "score_hp_participation", active.value);
            }
        }).fail(function () {
            $("#customer_table_wrapper>div").html("<span class='font-red'>Not Found</span>");
        });
    }).fail(function () {
        bootbox.alert(warning_message("No active data set detected. Click OK to configure."), function () {
            window.location.href = "data.php";
        });
    });
}
