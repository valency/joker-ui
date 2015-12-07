$(document).ready(function () {
    Metronic.init();
    Layout.init();
    QuickSidebar.init();
    check_login();
    auth_check();
    Metronic.blockUI({boxed: true});
    $.get(API_SERVER + "joker/connector/job-status/", function (r) {
        $("#slot-info").html(r["slot_occupied"] + " / " + r["slot_total"]);
        for (var i in r["jobs"]) {
            if (r["jobs"].hasOwnProperty(i)) {
                var job = r["jobs"][i];
                var state_code = job["state"] + (job["state"] == "finished" ? "_" + ( job["returncode"] == 0) : "");
                var html = "<tr onclick=\"show_job_detail('" + i + "');\">";
                html += "<td><span class='label bg-green'><i class='fa fa-sort'></i> " + job["seqno"] + "</span></td>";
                html += "<td><span class='label bg-blue'>" + job["id"] + "</span></td>";
                html += "<td>" + job["name"] + "</td>";
                html += "<td>" + job["times"]["real"] + "</td>";
                html += "<td>" + job["times"]["user"] + "</td>";
                html += "<td>" + job["times"]["system"] + "</td>";
                html += "<td><span class='font-" + STATE_CODE[state_code]["color"] + "'>" + STATE_CODE[state_code]["text"] + "</span></td>";
                html += "<td>" + job["returncode"] + "</td>";
                html += "</tr>";
                $("#job-table-wrapper>table>tbody").append(html);
            }
        }
        $("#job-table-wrapper>table").dataTable();
        init_widget();
        Metronic.unblockUI();
    }).fail(function () {
        bootbox.alert(error_message("Cannot communicate with the core service server for listing status of jobs!"));
    });
});

function auth_check() {
    if (Cookies.get('joker_username') != "admin") {
        bootbox.alert(warning_message("Sorry, only admin is allowed to visit this page."), function () {
            window.location.href = "dashboard.php";
        });
    }
}

function refresh_job_detail_output(id) {
    $.get(API_SERVER + "joker/connector/job-status/?id=" + id, function (r) {
        $("#job-detail-output").html(r["output"]);
        $("#job-detail-output").scrollTop($('#job-detail-output').prop("scrollHeight"));
    });
}

function show_job_detail(id) {
    $.get(API_SERVER + "joker/connector/job-status/?id=" + id, function (r) {
        var job = r;
        var state_code = job["state"] + (job["state"] == "finished" ? "_" + ( job["returncode"] == 0) : "");
        var html = "<p>";
        html += "<span class='label bg-green'><i class='fa fa-sort'></i> " + job["seqno"] + "</span> ";
        html += "<span class='label bg-" + STATE_CODE[state_code]["color"] + "'>" + STATE_CODE[state_code]["text"] + "</span> ";
        html += "<span class='label bg-grey'>" + job["returncode"] + "</span>";
        html += "<span class='pull-right'>" + job["times"]["real"] + " / " + job["times"]["user"] + " / " + job["times"]["system"] + "</span>";
        html += "</p><hr/>";
        html += "<p>Command:</p><pre style='max-height:200px;'>" + job["command"] + "</pre>";
        html += "<p><a href='javascript:void(0)' class='pull-right' onclick=\"refresh_job_detail_output('" + id + "');\"><i class='fa fa-refresh'></i></a> Output:</p>";
        html += "<pre id='job-detail-output' style='max-height:200px;'>" + job["output"] + "</pre>";
        html += "<p>Extra Information:</p><pre style='max-height:200px;'>" + job["extra"] + "</pre><hr/>";
        var buttons = {};
        if (job["state"] == "queued") buttons["Top"] = {
            className: "btn-primary",
            callback: function () {
                bootbox.hideAll();
                bootbox.dialog({
                    message: loading_message("Processing... Please be patient!"),
                    closeButton: false
                });
                $.get(API_SERVER + "joker/connector/job-top/?id=" + job["id"], function (r) {
                    window.location.reload();
                }).fail(function (r) {
                    var resp = r["responseText"].replace(/<.*?>/gi, "").replace(/[<>"]/gi, "");
                    resp = resp.substring(1, resp.length - 1);
                    bootbox.hideAll();
                    bootbox.alert("<p>" + error_message("Putting job to the top of the queue is failed due to the following reason(s):") + "</p><p>" + resp + "</p>");
                });
            }
        };
        if (job["state"] == "running") {
            buttons["Kill"] = {
                className: "btn-danger",
                callback: function () {
                    bootbox.hideAll();
                    bootbox.dialog({
                        message: loading_message("Processing... Please be patient!"),
                        closeButton: false
                    });
                    $.get(API_SERVER + "joker/connector/job-kill/?id=" + job["id"], function (r) {
                        window.location.reload();
                    }).fail(function (r) {
                        var resp = r["responseText"].replace(/<.*?>/gi, "").replace(/[<>"]/gi, "");
                        resp = resp.substring(1, resp.length - 1);
                        bootbox.hideAll();
                        bootbox.alert("<p>" + error_message("Killing job is failed due to the following reason(s):") + "</p><p>" + resp + "</p>");
                    });
                }
            };
        } else {
            buttons["Remove"] = {
                className: "btn-grey",
                callback: function () {
                    bootbox.hideAll();
                    bootbox.dialog({
                        message: loading_message("Processing... Please be patient!"),
                        closeButton: false
                    });
                    $.get(API_SERVER + "joker/connector/job-remove/?id=" + job["id"], function (r) {
                        window.location.reload();
                    }).fail(function (r) {
                        var resp = r["responseText"].replace(/<.*?>/gi, "").replace(/[<>"]/gi, "");
                        resp = resp.substring(1, resp.length - 1);
                        bootbox.hideAll();
                        bootbox.alert("<p>" + error_message("Removing job is failed due to the following reason(s):") + "</p><p>" + resp + "</p>");
                    });
                }
            };
        }
        bootbox.dialog({
            title: "<span class='label bg-blue'>" + job["id"] + "</span> " + job["name"],
            message: html,
            buttons: buttons
        }).on("shown.bs.modal", function () {
            $("#job-detail-output").animate({scrollTop: $('#job-detail-output').prop("scrollHeight")}, 100);
        });
    });
}

function clear_job_list() {
    bootbox.confirm("Are your sure you would like to clear the job list? This action cannot be undone.", function (result) {
        if (result) {
            bootbox.hideAll();
            bootbox.dialog({
                message: loading_message("Processing... Please be patient!"),
                closeButton: false
            });
            $.get(API_SERVER + "joker/connector/job-clear/", function (r) {
                window.location.reload();
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert(error_message("Cannot communicate with the core service server for clearing the job list!"));
            });
        }
    });
}

function reset_job_tracker() {
    bootbox.confirm("Are your sure you would like to reset the job tracker? All jobs will be killed and cleared after resetting. This action cannot be undone.", function (result) {
        if (result) {
            bootbox.hideAll();
            bootbox.dialog({
                message: loading_message("Processing... Please be patient!"),
                closeButton: false
            });
            $.get(API_SERVER + "joker/connector/job-reset/", function (r) {
                window.location.reload();
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert(error_message("Cannot communicate with the core service server for resetting the job tracker!"));
            });
        }
    });
}

function set_num_slots() {
    bootbox.prompt("How many job slots would like to set?", function (result) {
        if (parseInt(result)) {
            bootbox.hideAll();
            bootbox.dialog({
                message: loading_message("Processing... Please be patient!"),
                closeButton: false
            });
            $.get(API_SERVER + "joker/connector/job-set-num-slots/?slots=" + parseInt(result), function (r) {
                window.location.reload();
            }).fail(function () {
                bootbox.hideAll();
                bootbox.alert(error_message("Cannot communicate with the core service server for setting # of job slots!"));
            });
        } else if (result != null) {
            bootbox.hideAll();
            bootbox.alert(error_message("The given number is illegal! Please try again."));
        }
    });
}