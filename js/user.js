$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    auth_check();
    Metronic.blockUI({boxed: true});
    var t = (new Date()).getTime();
    $.get(API_SERVER + "auth/list-users/?_c=" + CryptoJS.MD5("SmartCube-" + t) + "&_t=" + t, function (r) {
        for (var i = 0; i < r.length; i++) {
            var html = "<tr>";
            html += "<td><span class='label bg-blue'>" + r[i]["id"] + "</span></td>";
            html += "<td>" + r[i]["user"]["username"] + "</td>";
            html += "<td>" + (new Date(r[i]["last_log_in"])).YYYYMMDDHHMMSS() + "</td>";
            html += "<td>" + (new Date(r[i]["last_change_of_password"])).YYYYMMDDHHMMSS() + "</td>";
            html += "<td>";
            html += "<button onclick=\"user_reset_password('" + r[i]["id"] + "');\" class='btn default btn-xs red'><i class='fa fa-edit'></i> Reset Password</button>";
            html += "<button onclick=\"user_remove('" + r[i]["id"] + "');\" class='btn default btn-xs grey'><i class='fa fa-trash-o'></i> Remove</button>";
            html += "</td>";
            html += "</tr>";
            $("#user-list-table-wrapper tbody").append(html);
        }
        $("#user-list-table-wrapper table").dataTable({searching: false});
        $("#user-list-table-wrapper .dataTables_wrapper .row .col-md-6:nth-child(2)").append("<button class='btn blue pull-right' onclick='add_user();'><i class='fa fa-plus'></i> Register</button>");
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

function add_user() {
    bootbox.dialog({
        title: "Register",
        message: "<input type='text' id='register_username' class='form-control' placeholder='User Name'/>",
        buttons: {
            Proceed: function () {
                var t = (new Date()).getTime();
                var username = $("#register_username").val();
                var password = CryptoJS.MD5("SmartCube-" + t).toString();
                var html = "<p><pre><span class='bold'>USERNAME:</span> " + username + "<br/><span class='bold'>PASSWORD:</span> " + password + "</pre></p>";
                $.post(API_SERVER + "auth/register/", {
                    username: username,
                    password: CryptoJS.MD5(password).toString()
                }, function (data) {
                    bootbox.alert(success_message("Successfully registered.") + html, function () {
                        window.location.reload();
                    });
                }, "json").fail(function () {
                    bootbox.alert(error_message("Cannot register. Maybe the username is already registered."));
                });
            }
        }
    });
}

function user_remove(id) {
    bootbox.confirm("Are your sure you would like to remove this user? This action cannot be undone.", function (confirmed) {
        if (confirmed) {
            bootbox.hideAll();
            bootbox.dialog({
                message: loading_message("Processing... Please be patient!"),
                closeButton: false
            });
            var t = (new Date()).getTime();
            $.get(API_SERVER + "auth/remove-user/?id=" + id + "&_c=" + CryptoJS.MD5("SmartCube-" + t) + "&_t=" + t, function (r) {
                bootbox.hideAll();
                bootbox.alert(success_message("Successfully removed the requested user."), function () {
                    window.location.reload();
                });
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert(error_message("Failed to remove the requested user!"));
            });
        }
    });
}

function user_reset_password(id) {
    bootbox.confirm("Are your sure you would like to reset the password of this user? This action cannot be undone.", function (confirmed) {
        if (confirmed) {
            bootbox.hideAll();
            bootbox.dialog({
                message: loading_message("Processing... Please be patient!"),
                closeButton: false
            });
            var t = (new Date()).getTime();
            var c = CryptoJS.MD5("SmartCube-" + t);
            $.get(API_SERVER + "auth/reset-password/?id=" + id + "&_c=" + c + "&_t=" + t, function (r) {
                var html = "<p><pre><span class='bold'>USERNAME:</span> " + r.username + "<br/><span class='bold'>PASSWORD:</span> " + r.password + "</pre></p>";
                bootbox.hideAll();
                bootbox.alert(success_message("Password of the requested user has been reset successfully.") + html, function () {
                    window.location.reload();
                });
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert(error_message("Failed to reset the password of the requested user!"));
            });
        }
    });
}
