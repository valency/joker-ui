var active_set = null;

$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    init_widget();
    $.get(API_SERVER + "joker/tool/env/get/?key=model_1_active_" + Cookies.get('joker_id'), function (active) {
        active_set = active.value;
        $("#data_source_btn>span").html("<i class='fa fa-briefcase'></i> " + active_set.replace(".csv", ""));
    }).fail(function () {
        bootbox.alert("No active data set detected. Click OK to configure.", function () {
            window.location.href = "data.php";
        });
    });
});

function add_filter() {
    var msg = '<div><select class="form-control" id="filter_feature">';
    for (var i = 0; i < FEATURE_TAGS[0].length; i++) {
        msg += "<option value='" + FEATURE_TAGS[0][i]["id"] + "' filter_type='" + FEATURE_TAGS[0][i]["type"] + "'>" + FEATURE_TAGS[0][i]["text"] + "</option>";
    }
    msg += '</select></div>';
    msg += '<div style="text-align:center;margin:10px;">';
    msg += '<span id="filter_comparator" class="font-red">Loading...</span>';
    msg += '<span id="filter_input"></span>';
    msg += '</div>';
    msg += "<div id='filter_detail'></div>";
    msg += "</div>";
    bootbox.dialog({
        title: "Add Data Filter",
        message: msg,
        buttons: {
            Add: function () {
                var range = $("#filter_detail_selector").val();
                if (range != null && range != undefined && range != "") {
                    if (range.indexOf(";") > -1) range = "[" + range.replace(";", ",") + "]";
                    else range = "{" + range + "}";
                    var html = "<div class='filter_container' style='display:inline-block;margin-bottom:10px;'><span class='label bg-grey' value='" + $("#filter_feature").val() + "'>" + $("#filter_feature option:selected").html() + " ∈ " + range + "</span>";
                    html += "<a href='javascript:void(0)' class='label bg-red' onclick='$(this).parent().remove();'><i class='fa fa-times'></i></a>";
                    if ($("#filter_list").children().length > 1) html += "<a href='javascript:void(0)' class='filter_operator label bg-purple' style='margin:0 5px 0 5px;' onclick=\"$('.filter_operator').first().html()=='AND'?$('.filter_operator').html('OR'):$('.filter_operator').html('AND');\">AND</a>";
                    html += "</div>";
                    $("#filter_list").prepend(html);
                }
            }
        }
    }).on("shown.bs.modal", function () {
        $("select").select2({
            dropdownAutoWidth: 'true',
            minimumResultsForSearch: Infinity
        });
        $("#filter_feature").select2().on("change", function () {
            var filter_comparator = $("#filter_feature option:selected").attr("filter_type");
            if (filter_comparator == "range") {
                $("#filter_comparator").html("Between Range:");
		$("#filter_input").html("<input id='filter_input_min'/> - <input id='filter_input_max'/>");
                $("#filter_detail").html("Loading...");
                $.get(API_SERVER + "joker/model/" + $("#select_pred_model").val() + "/range/?source=" + active_set + "&field=" + $("#filter_feature").val(), function (data) {
                    $("#filter_detail").html("<input id='filter_detail_selector'/>");
                    $("#filter_detail_selector").ionRangeSlider({
                        min: data.min,
                        max: data.max,
                        type: 'double',
                        grid: true,
                        onChange: function (data){
			    $("#filter_input_min").val(data.from);
			    $("#filter_input_max").val(data.to);
                        }
                    });
		    $("#filter_input_min").val(data.min);
		    $("#filter_input_max").val(data.max);
		    $('#filter_input input').keypress(function(e){
		        if(e.keyCode==13){
                            $("#filter_detail_selector").data("ionRangeSlider").update({
                                from: $("#filter_input_min").val(),
                                to: $("#filter_input_max").val()
                            }); 
                        }
		    });
                });
            }
            else {
                $("#filter_comparator").html("Choose From");
                $("#filter_input").html("");
		$("#filter_detail").html("Loading...");
                $.get(API_SERVER + "joker/model/" + $("#select_pred_model").val() + "/unique/?source=" + active_set + "&field=" + $("#filter_feature").val(), function (data) {
                    $("#filter_detail").html("<input type='hidden' id='filter_detail_selector' class='form-control select2' value=''/>");
                    var filter_tags = [];
                    for (var i = 0; i < data.length; i++) {
                        filter_tags.push({
                            id: data[i].toString(),
                            text: data[i].toString()
                        });
                    }
                    $("#filter_detail_selector").select2({
                        tags: filter_tags
                    });
                });
            }
        });
        $("#filter_feature").select2("val", $("#filter_feature").first().val(), true);
    });
}

function create_set() {
    bootbox.dialog({
        message: "<img src='assets/global/img/loading-spinner-grey.gif' class='loading'><span>&nbsp;&nbsp;Processing... Please be patient!</span>",
        closeButton: false
    });
    var filter_mode = $('.filter_operator').first().html();
    if (filter_mode != undefined) filter_mode = filter_mode.toLowerCase();
    var filters = [];
    var filter_containers = $(".filter_container span:nth-child(1)");
    for (var i = 0; i < filter_containers.length; i++) {
        var filter = $(filter_containers[i]).attr("value") + ",";
        if ($(filter_containers[i]).html().indexOf("{") > -1) filter += "in,";
        else filter += "range,";
        var filter_ranges = $(filter_containers[i]).html().split("∈")[1].trim();
        filter_ranges = filter_ranges.substr(1, filter_ranges.length - 2);
        filter += filter_ranges.replace(/,/g, "~");
        filters.push(filter);
    }
    var url_options = "name=" + $("#set_title").val() + "&source=" + active_set + "&length=" + $("#no_of_records").val() + "&order=" + $("#select_pred_order").val() + "&filter=" + filters.join(":") + "&filter_mode=" + filter_mode;
    if ($("#select_shuffle_with_limit").prop('checked'))         url_options += "&shuffle_with_limit=0.2";
    $.get(API_SERVER + "joker/model/" + $("#select_pred_model").val() + "/set/create/?" + url_options, function (data) {
        window.location.href = "set-show.php?id=" + data.id;
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert(error_message("Failed to create customer set."));
    });
}
