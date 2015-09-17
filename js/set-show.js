$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
    $("#select_features").select2({
        tags: FEATURE_TAGS_MODEL_1
    });
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

function cluster() {
    var feature = $("#select_features").select2('data');
    var header = [];
    var weight = [];
    for (var i = 0; i < feature.length; i++) {
        header.push(feature[i].id);
        weight.push(1.0);
    }
    bootbox.dialog({
        message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
        closeButton: false
    });
    $.get(API_SERVER + "joker/model/" + $("#select_data_set").val() + "/set/kmeans/?header=" + header.join(",") + "&n_clusters=" + $("#input_clusters").val() + "&set_id=" + $("#input_set_id").val(), function (data) {
        window.location.href = "set-review.php?id=" + $("#input_set_id").val();
    }).fail(function () {
        bootbox.hideAll();
        $("#canvas").html("<div class='alert alert-danger'><strong>Error!</strong> Something is wrong during clustering.</div>");
    });
}
