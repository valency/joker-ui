$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    auth_check();
    Metronic.blockUI({boxed: true});
    $.get(API_SERVER + "joker/connector/list-modules/", function (r) {
        for (var i = 0; i < r.length; i++) {
            var module = r[i];
            $("#module-list>ul").append("<li><a href='#module-tab-" + module + "' data-toggle='tab' onclick=\"list_profiles('" + module + "');\">" + module + "</a></li>");
            var html = "<div class='tab-pane fade in' id='module-tab-" + module + "'>";
            html += "<div id='profile-list'>Loading...</div><hr/>";
            html += "<div><button class='btn red pull-right' onclick=\"add_profile('" + module + "');\"><i class='fa fa-plus'></i> Create Profile</button></div>";
            html += "</div>";
            $("#profile-list").append(html);
            if (i == 0) list_profiles(module);
        }
        $("#module-list>ul>li").first().addClass("active");
        $("#profile-list>div").first().addClass("active");
        init_widget();
        Metronic.unblockUI();
    }).fail(function () {
        bootbox.alert(error_message("Cannot communicate with the core service server for listing modules!"));
    });
});

function auth_check() {
    if (Cookies.get('joker_username') != "admin") {
        bootbox.alert(warning_message("Sorry, only admin is allowed to visit this page."), function () {
            window.location.href = "dashboard.php";
        });
    }
}

function add_profile_generate_content_from_cache(profile, content) {
    if (profile == undefined || profile == null) profile = "";
    if (content == undefined || content == null) content = "";
    var html = "<p><input class='form-control' id='add-profile-name' placeholder='Profile Name' value='" + profile + "'/></p>";
    html += "<p><textarea class='form-control code-input' style='height:300px;' id='add-profile-content'>" + content + "</textarea></p>";
    return html;
}

function add_profile(module, profile, content) {
    bootbox.dialog({
        title: "Create Profile for Module: " + module,
        message: add_profile_generate_content_from_cache(profile, content),
        buttons: {
            Save: function (event) {
                var profile = $("#add-profile-name").val();
                var content = $("#add-profile-content").val();
                if (profile == null || profile == "") {
                    bootbox.alert(error_message("No profile name is provided or the profile name is illegal!"), function () {
                        add_profile(module, profile, content);
                    });
                } else if (content == null || content == "") {
                    bootbox.alert(error_message("No contents are provided or the contents are illegal!"), function () {
                        add_profile(module, profile, content);
                    });
                } else {
                    bootbox.hideAll();
                    bootbox.dialog({
                        message: loading_message("Saving profile... Please be patient!"),
                        closeButton: false
                    });
                    $.post(API_SERVER + "joker/connector/job-profile-push/", {
                        module: module,
                        profile: profile,
                        content: content
                    }, function (r) {
                        bootbox.hideAll();
                        bootbox.alert(success_message("Successfully created the requested profile."), function () {
                            window.location.reload();
                        });
                    }).fail(function () {
                        bootbox.hideAll();
                        bootbox.alert(error_message("Cannot communicate with the core service server for creating the requested profile!"));
                    });
                }
            }
        }
    });
}

function list_profiles(module) {
    $.get(API_SERVER + "joker/connector/list-profiles/?module=" + module, function (r) {
        var html = "<ul class='list-group'>";
        for (var i = 0; i < r["profile_names"].length; i++) {
            var target = r["target_infos"][module + "@" + r["profile_names"][i]];
            html += "<a href='javascript:void(0)' class='list-group-item' onclick=\"show_profile_detail('" + module + "','" + r["profile_names"][i] + "');\">";
            html += r["profile_names"][i];
            html += "<span class='label bg-" + STATE_CODE[target["status"]]["color"] + " pull-right'>" + STATE_CODE[target["status"]]["text"] + "</span>";
            html += "</a>";
        }
        html += "</ul>";
        $("#module-tab-" + module + ">#profile-list").html(html);
    }).fail(function () {
        bootbox.alert(error_message("Cannot communicate with the core service server for listing profiles!"));
    });
}

function show_profile_detail(module, profile) {
    $.get(API_SERVER + "joker/connector/job-profile/?module=" + module + "&profile=" + profile, function (r) {
        bootbox.dialog({
            message: "<pre>" + r["content"] + "</pre>",
            title: module + "@" + profile,
            buttons: {
                Process: {
                    className: "btn-primary",
                    callback: function () {
                        bootbox.hideAll();
                        bootbox.dialog({
                            message: loading_message("Processing... Please be patient!"),
                            closeButton: false
                        });
                        $.get(API_SERVER + "joker/connector/job-submit/?module=" + module + "&profile=" + profile, function (r) {
                            bootbox.hideAll();
                            bootbox.alert("<p>" + success_message("Successfully submitted the requested job.") + "</p><p>Job ID: " + r["id"] + "</p>");
                        }).fail(function () {
                            bootbox.hideAll();
                            bootbox.alert(error_message("Cannot communicate with the core service server for submitting the requested job!"));
                        });
                    }
                },
                Remove: {
                    className: "btn-grey",
                    callback: function () {
                        bootbox.hideAll();
                        bootbox.dialog({
                            message: loading_message("Processing... Please be patient!"),
                            closeButton: false
                        });
                        $.get(API_SERVER + "joker/connector/job-profile-remove/?module=" + module + "&profile=" + profile, function (r) {
                            bootbox.hideAll();
                            bootbox.alert(success_message("Successfully removed the requested profile."), function () {
                                window.location.reload();
                            });
                        }).fail(function () {
                            bootbox.hideAll();
                            bootbox.alert(error_message("Cannot communicate with the core service server for removing the requested profile!"));
                        });
                    }
                }
            }
        });
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert(error_message("Cannot communicate with the core service server for showing the contents of profiles!"));
    });
}