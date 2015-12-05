$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    for (var i = 0; i < CLUSTERING_METRICS.length; i++) {
        $("#select_metric").append("<option value='" + CLUSTERING_METRICS[i]["id"] + "'>" + CLUSTERING_METRICS[i]["text"] + "</option>");
    }
    init_widget();
    $("#select_features").select2({
        tags: FEATURE_TAGS[0]
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
        message: loading_message("Processing... Please be patient!"),
        closeButton: false
    });
    $.get(API_SERVER + "joker/model/" + $("#select_data_set").val() + "/set/kmeans/?header=" + header.join(",") + "&metric=" + $("#select_metric").val() + "&n_clusters=" + $("#input_clusters").val() + "&set_id=" + $("#input_set_id").val(), function (data) {
        window.location.href = "set-review.php?id=" + $("#input_set_id").val();
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert(error_message("Something is wrong during clustering!"));
    });
}
