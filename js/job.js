$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    auth_check();
    Metronic.blockUI({boxed: true});
    $.get(API_SERVER + "connector/list-modules/", function (r) {
        for (var i = 0; i < r.length; i++) {
            var module = r[i];
            $("#module-list>ul").append("<li><a href='#module-tab-" + module + "' data-toggle='tab' onclick=\"list_profiles('" + module + "');\">" + module + "</a></li>");
            var html = "<div class='tab-pane fade in' id='module-tab-" + module + "'></div>";
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
    $('#upload-module').fileupload({
        dataType: 'json',
        acceptFileTypes: '/(\.|\/)(gz)$/i',
        done: function (e, data) {
            setTimeout(function () {
                bootbox.hideAll();
                bootbox.dialog({
                    message: loading_message("Installing module... Please be patient!"),
                    closeButton: false
                });
                $.get(API_SERVER + "connector/job-module-install/?src=" + data["result"]["files"][0]["name"], function (r) {
                    bootbox.hideAll();
                    bootbox.alert("<p>" + success_message("Successfully sent the installation operation of the requested module to the core service server. You can refer to job management for more details." + "</p><p>Job ID: " + r + "</p>"), function () {
                        window.location.href = "job-monitor.php?id=" + r;
                    });
                }).fail(function () {
                    bootbox.hideAll();
                    bootbox.alert(error_message("Cannot communicate with the core service server for installing the requested module!"));
                });
            }, 1000);
        },
        submit: function (e, data) {
            bootbox.dialog({
                message: "<div class='progress' style='margin-bottom:0;'><div class='progress-bar' style='width:0;'></div></div>",
                closeButton: false
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(".progress-bar").css('width', progress + '%');
        }
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

function add_profile(module, profile, content, overwrite) {
    if (overwrite == undefined || overwrite == null) overwrite = false;
    bootbox.dialog({
        title: "Create Profile for Module: " + module,
        message: add_profile_generate_content_from_cache(profile, content),
        buttons: {
            Save: function (event) {
                var profile = $("#add-profile-name").val();
                var content = $("#add-profile-content").val();
                if (profile == null || profile == "") {
                    bootbox.alert(error_message("No profile name is provided or the profile name is illegal!"), function () {
                        add_profile(module, profile, content, overwrite);
                    });
                } else if (content == null || content == "") {
                    bootbox.alert(error_message("No contents are provided or the contents are illegal!"), function () {
                        add_profile(module, profile, content, overwrite);
                    });
                } else {
                    bootbox.hideAll();
                    bootbox.dialog({
                        message: loading_message("Saving profile... Please be patient!"),
                        closeButton: false
                    });
                    $.post(API_SERVER + "connector/job-profile-push/", {
                        module: module,
                        profile: profile,
                        content: content,
                        overwrite: overwrite
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
    }).on('shown.bs.modal', function () {
        if (overwrite) $("#add-profile-name").prop('disabled', true);
    });
}

function list_profiles(module) {
    Metronic.blockUI({boxed: true});
    var html = "<div id='profile-table-wrapper-" + module + "'>";
    html += "<table class='table table-striped table-bordered table-advance table-hover'>";
    html += "<thead><tr class='heading'>";
    html += "<th><i class='fa fa-suitcase'></i> Profile Name</th>";
    html += "<th>Status</th>";
    html += "<th>Cached</th>";
    html += "<th><i class='fa fa-cubes'></i> Management</th>";
    html += "</tr></thead>";
    html += "<tbody></tbody>";
    html += "</table>";
    html += "</div>";
    $("#module-tab-" + module + "").html(html);
    $.get(API_SERVER + "connector/list-profiles/?module=" + module, function (r) {
        for (var i = 0; i < r["profile_names"].length; i++) {
            var target = r["target_infos"][module + "@" + r["profile_names"][i]];
            var html = "<tr>";
            html += "<td><a href='javascript:void(0)' onclick=\"show_profile_detail('" + module + "','" + r["profile_names"][i] + "');\"><i class='fa fa-file-text-o'></i> " + r["profile_names"][i] + "</a></td>";
            html += "<td>" + target["is_cached"] + "</td>";
            html += "<td><span class='label bg-" + STATE_CODE[target["status"]]["color"] + "'>" + STATE_CODE[target["status"]]["text"] + "</span></td>";
            html += "<td>";
            html += "<button onclick=\"profile_process('" + module + "','" + r["profile_names"][i] + "');\" class='btn btn-xs blue'><i class='fa fa-play'></i> Process</button>";
            html += "<button onclick=\"profile_edit('" + module + "','" + r["profile_names"][i] + "');\" class='btn btn-xs green'><i class='fa fa-pencil-square-o'></i> Edit</button>";
            html += "<button onclick=\"profile_remove('" + module + "','" + r["profile_names"][i] + "');\" class='btn btn-xs remove'><i class='fa fa-trash-o'></i> Remove</button>";
            html += "</td>";
            html += "</tr>";
            $("#profile-table-wrapper-" + module + ">table>tbody").append(html);
        }
        $("#profile-table-wrapper-" + module + ">table").dataTable({searching: false});
        $("#profile-table-wrapper-" + module + " .dataTables_wrapper .row .col-md-6:nth-child(2)").append("<button class='btn blue pull-right' onclick=\"add_profile('" + module + "');\"><i class='fa fa-plus'></i> Create Profile</button>");
        init_widget();
        Metronic.unblockUI();
    }).fail(function () {
        bootbox.alert(error_message("Cannot communicate with the core service server for listing profiles!"));
    });
}

function profile_edit(module, profile) {
    $.get(API_SERVER + "connector/job-profile/?module=" + module + "&profile=" + profile, function (r) {
        add_profile(module, profile, r["content"], true);
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert(error_message("Cannot communicate with the core service server for showing the contents of profiles!"));
    });
}

function profile_process(module, profile) {
    $.get(API_SERVER + "connector/job-profile/?module=" + module + "&profile=" + profile, function (r) {
        bootbox.dialog({
            title: "Process Profile",
            message: "<p>" + module + "@" + profile + "</p><pre>" + r["content"] + "</pre>",
            buttons: {
                Proceed: function () {
                    bootbox.hideAll();
                    bootbox.dialog({
                        message: loading_message("Processing... Please be patient!"),
                        closeButton: false
                    });
                    $.get(API_SERVER + "connector/job-submit/?module=" + module + "&profile=" + profile, function (r) {
                        bootbox.hideAll();
                        bootbox.alert("<p>" + success_message("Successfully submitted the requested job.") + "</p><p>Job ID: " + r["id"] + "</p>");
                    }).fail(function () {
                        bootbox.hideAll();
                        bootbox.alert(error_message("Cannot communicate with the core service server for submitting the requested job!"));
                    });
                }
            }
        });
    });
}

function profile_remove(module, profile) {
    bootbox.confirm("Are your sure you would like to remove this profile? This action cannot be undone.", function (confirmed) {
        if (confirmed) {
            bootbox.hideAll();
            bootbox.dialog({
                message: loading_message("Processing... Please be patient!"),
                closeButton: false
            });
            $.get(API_SERVER + "connector/job-profile-remove/?module=" + module + "&profile=" + profile, function (r) {
                bootbox.hideAll();
                bootbox.alert(success_message("Successfully removed the requested profile."), function () {
                    window.location.reload();
                });
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert(error_message("Cannot communicate with the core service server for removing the requested profile!"));
            });
        }
    });
}

function show_profile_detail(module, profile) {
    $.get(API_SERVER + "connector/job-profile/?module=" + module + "&profile=" + profile, function (r) {
        bootbox.alert({
            title: module + "@" + profile,
            message: "<pre>" + r["content"] + "</pre>"
        });
    }).fail(function () {
        bootbox.hideAll();
        bootbox.alert(error_message("Cannot communicate with the core service server for showing the contents of profiles!"));
    });
}

function uninstall_module() {
    bootbox.confirm("Are your sure you would like to uninstall this module? This action cannot be undone.", function (confirmed) {
        if (confirmed) {
            bootbox.hideAll();
            bootbox.dialog({
                message: loading_message("Uninstalling module... Please be patient!"),
                closeButton: false
            });
            var module = $("#module-list>ul>li.active>a").html();
            $.get(API_SERVER + "connector/job-module-uninstall/?module=" + module, function (r) {
                bootbox.hideAll();
                bootbox.alert(success_message("Successfully uninstalled the requested module."), function () {
                    window.location.reload();
                });
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert(error_message("Cannot communicate with the core service server for uninstalling the requested module!"));
            });
        }
    });
}