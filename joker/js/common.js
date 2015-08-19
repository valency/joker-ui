var API_SERVER = "https://120.25.209.91:8443/";
var COLOR_PALETTE = ["#467D97", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2", "#DECF3F", "#F15854", "#A03423"];
var FEATURE_TAGS_MODEL_1 = [
    {id: "id", text: "ID"},
    {id: "segment", text: "Segment"},
    {id: "age", text: "Age"},
    {id: "gender", text: "Gender"},
    {id: "yrs_w_club", text: "Club Years"},
    {id: "is_member", text: "Member"},
    {id: "is_hrs_owner", text: "Horse Owner"},
    {id: "major_channel", text: "Major Channel"},
    {id: "mtg_num", text: "Meetings Attended"},
    {id: "inv", text: "Investment"},
    {id: "div", text: "Dividend"},
    {id: "rr", text: "Recovery Rate"},
    {id: "end_bal", text: "Balance"},
    {id: "recharge_times", text: "Recharge Times"},
    {id: "recharge_amount", text: "Recharge Amount"},
    {id: "withdraw_times", text: "Withdraw Times"},
    {id: "withdraw_amount", text: "Withdraw Amount"}
];

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function random_color() {
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
}

function get_url_parameter(p) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == p) {
            return sParameterName[1];
        }
    }
}

function check_login() {
    if (Cookies.get('joker_id') == undefined || Cookies.get('joker_id') == null) window.location.href = "/joker/login.php";
    else $(".username").html(Cookies.get('joker_username'));
}

function logout() {
    Cookies.remove("joker_id");
    Cookies.remove("joker_username");
    Cookies.remove("joker_ticket");
    window.location.href = "/joker/login.php";
}