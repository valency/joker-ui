$(document).ready(function () {
    handle_login();
    handle_register();
    $("#trust_link").attr("href", API_SERVER + "joker/auth/trust/");
});

function handle_login() {
    $('.login-form').validate({
        errorElement: 'span',
        errorClass: 'help-block',
        focusInvalid: false,
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            },
            remember: {
                required: false
            }
        },
        messages: {
            username: {
                required: "Username is required."
            },
            password: {
                required: "Password is required."
            }
        },
        invalidHandler: function (event, validator) {
            $('.alert-danger>span', $('.login-form')).html("Username or password not provided.");
            $('.alert-danger', $('.login-form')).show();
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            return false;
        }
    });
    $('.login-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('.login-form').validate().form()) {
                $('.login-form').submit();
            }
            return false;
        }
    });
}

function login() {
    if ($('.login-form').validate().form()) {
        var username = $("input[name='username']", $('.login-form')).val();
        var password = CryptoJS.MD5($("input[name='password']", $('.login-form')).val()).toString();
        $.post(API_SERVER + "joker/auth/sign-in/", {
            username: username,
            password: password
        }, function (data) {
            if ($("input[name='remember']").prop('checked')) {
                Cookies.set('joker_id', data.id, {expires: 7});
                Cookies.set('joker_username', username, {expires: 7});
                Cookies.set('joker_ticket', data.ticket, {expires: 7});
            } else {
                Cookies.set('joker_id', data.id);
                Cookies.set('joker_username', username);
                Cookies.set('joker_ticket', data.ticket);
            }
            window.location.href = "index.php";
        }, "json").fail(function () {
            $('.alert-danger>span', $('.login-form')).html("Username or password not correct.");
            $('.alert-danger', $('.login-form')).show();
        });
    }
}

function handle_register() {
    function format(state) {
        if (!state.id) return state.text;
        return "<img class='flag' src='assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
    }

    $('.register-form').validate({
        errorElement: 'span',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            fullname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            address: {
                required: true
            },
            city: {
                required: true
            },
            country: {
                required: true
            },
            username: {
                required: true
            },
            password: {
                required: true
            },
            rpassword: {
                equalTo: "#register_password"
            },
            tnc: {
                required: true
            }
        },
        messages: {
            tnc: {
                required: "Please accept TNC first."
            }
        },
        invalidHandler: function (event, validator) {
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "tnc") {
                error.insertAfter($('#register_tnc_error'));
            } else if (element.closest('.input-icon').size() === 1) {
                error.insertAfter(element.closest('.input-icon'));
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            return false;
        }
    });

    $('.register-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('.register-form').validate().form()) {
                $('.register-form').submit();
            }
            return false;
        }
    });
    $('#register-btn').click(function () {
        $('.login-form').hide();
        $('.register-form').show();
    });
    $('#register-back-btn').click(function () {
        $('.login-form').show();
        $('.register-form').hide();
    });
}

function register() {
    if ($('.register-form').validate().form()) {
        var username = $("input[name='username']", $('.register-form')).val();
        var password = CryptoJS.MD5($("input[name='password']", $('.register-form')).val()).toString();
        $.post(API_SERVER + "joker/auth/register/", {
            username: username,
            password: password
        }, function (data) {
            bootbox.dialog({
                message: "Successfully registered! Now redirecting...",
                closeButton: false
            });
            setTimeout(function () {
                window.location.href = "login.php";
            }, 3000);
        }, "json").fail(function () {
            bootbox.alert("Something is wrong during registration.<br/>Maybe the username is already registered.");
        });
    }
}