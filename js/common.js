var API_SERVER = "https://127.0.0.1:8443/";
var COLOR_PALETTE = ["#467D97", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2", "#DECF3F", "#F15854", "#A03423"];
var FEATURE_TAGS_MODEL_1 = [
    {id: "id", text: "ID", hint: "Customer ID"},
    {id: "segment", text: "Segment", hint: "Customer Segment"},
    {id: "age", text: "Age", hint: "Customer Age"},
    {id: "gender", text: "Gender", hint: "Customer Gender"},
    {id: "yrs_w_club", text: "Club Years", hint: "Years with the Club"},
    {id: "is_member", text: "Member", hint: "Whether the Customer Is a Member"},
    {id: "is_hrs_owner", text: "Horse Owner", hint: "Whether the Customer Is a Horse Owner"},
    {id: "major_channel", text: "Major Channel", hint: "Major Racing Betting Channel"},
    {id: "mtg_num", text: "Active Meetings", hint: "# of Active Meetings in Recent 83 Meetings"},
    {id: "inv", text: "Turnover", hint: "Total Turnover of Recent 83 Meetings"},
    {id: "div", text: "Dividend", hint: "Total Dividend of Recent 83 Meetings"},
    {id: "rr", text: "Recovery Rate", hint: "Divide Dividend by Turnover"},
    {id: "end_bal", text: "Balance", hint: "Balance of Account(s)"},
    {id: "recharge_times", text: "Recharge Times", hint: ""},
    {id: "recharge_amount", text: "Recharge Amount", hint: ""},
    {id: "withdraw_times", text: "Withdraw Times", hint: ""},
    {id: "withdraw_amount", text: "Withdraw Amount", hint: ""}
];

var CATEGORICAL_COLUMNS = ["id", "segment", "age", "gender", "is_member", "is_hrs_owner", "major_channel"];

var FEATURE_TAGS_PROP = [
    {id: "grow_prop", text: "Grow Propensity", hint: "Larger Value Represents Higher Propensity to Grow"},
    {id: "decline_prop", text: "Decline Propensity", hint: "Larger Value Represents Higher Propensity to Decline"},
    {id: "chance_to_be_regular", text: "Chance to be Regular", hint: ""}
];

var WaitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId)  uniqueId = "Don't call this twice without a uniqueId";
        if (timers[uniqueId]) clearTimeout(timers[uniqueId]);
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

Array.prototype.findKeyValue = function (key_desc, key, value_desc) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][key_desc] == key) return this[i][value_desc];
    }
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
