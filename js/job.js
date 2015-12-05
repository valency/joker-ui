$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    // Init modules
    Metronic.blockUI({boxed: true});
    $.get(API_SERVER + "joker/connector/list-modules/", function (r) {
        for (var i = 0; i < r.length; i++) {
            var module = r[i];
            $("#module-list>ul").append("<li><a href='#module-tab-" + module + "' data-toggle='tab' onclick=\"list_profiles('" + module + "');\">" + module + "</a></li>");
            $("#profile-list").append("<div class='tab-pane fade in' id='module-tab-" + module + "'>Loading...</div>");
            if (i == 0) list_profiles(module);
        }
        $("#module-list>ul>li").first().addClass("active");
        $("#profile-list>div").first().addClass("active");
    }).fail(function () {
        bootbox.alert(error_message("Cannot communicate with the core service server for listing modules!"));
    });
    init_widget();
    Metronic.unblockUI();
});

function list_profiles(module) {
    $.get(API_SERVER + "joker/connector/list-profiles/?module=" + module, function (r) {
        var html = "<ul class='list-group'>";
        for (var i = 0; i < r["profiles"].length; i++) {
            var profile = r["profiles"][i];
            html += "<a href='javascript:void(0)' class='list-group-item' onclick=\"show_profile_detail('" + module + "','" + profile + "');\">";
            html += profile;
            html += "</a>";
        }
        html += "</ul>";
        $("#module-tab-" + module).html(html);
    }).fail(function () {
        bootbox.alert(error_message("Cannot communicate with the core service server for listing profiles!"));
    });
}

function show_profile_detail(module, profile) {
    $.get(API_SERVER + "joker/connector/job-profile/?module=" + module + "&profile=" + profile, function (r) {
        bootbox.dialog({
            message: "<pre>" + r["content"] + "</pre>",
            title: module + ": " + profile,
            buttons: {
                "Process Job": function () {
                    bootbox.hideAll();
                    bootbox.alert(warning_message("Not implemented yet."));
                }
            }
        });
    }).fail(function () {
        bootbox.alert(error_message("Cannot communicate with the core service server for showing the contents of profiles!"));
    });
}