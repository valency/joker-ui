$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $.get(API_SERVER + "joker/model/" + $("#select_data_set").val() + "/set/retrieve_all_id/", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#input_set_id").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
        }
        $("#input_set_id").select2({
            dropdownAutoWidth: 'true'
        });
        if (get_url_parameter("id") != undefined) {
            $("#input_set_id").select2("val", get_url_parameter("id"));
        }
    });
});

function cust_set_search() {
    $("#canvas").html("<div class='alert alert-info'>Loading...</div>");
    $.get(API_SERVER + "joker/model/1/set/search/?id=" + $("#input_set_id").val(), function (data) {
        $("#canvas").html("lol");
    }).fail(function () {
        $("#canvas").html("<div class='alert alert-danger'><strong>Error!</strong> Something is wrong during clustering.</div>");
    });
}
