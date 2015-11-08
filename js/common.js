var API_DOMAIN = location.hostname;
var API_PORT = 9002;
var API_PROTOCOL = "http";
var API_SERVER = API_PROTOCOL + "://" + API_DOMAIN + ":" + API_PORT + "/";
var COLOR_PALETTE = ["#467D97", "#5DA5DA", "#60BD68", "#F17CB0", "#B2912F", "#B276B2", "#DECF3F", "#F15854", "#A03423"];
var FEATURE_TAGS = [[
    {id: "id", text: "ID", type: "range", hint: "Customer ID", show_in_pred_table: false, show_in_detail_table: false},
    {id: "segment", text: "Segment", type: "in", hint: "Customer Segment", show_in_pred_table: false, show_in_detail_table: false},
    {id: "age", text: "Age", type: "range", hint: "Customer Age", show_in_pred_table: false, show_in_detail_table: true},
    {id: "gender", text: "Gender", type: "in", hint: "Customer Gender", show_in_pred_table: true, show_in_detail_table: false},
    {id: "yrs_w_club", text: "Club Years", type: "range", hint: "Years with the Club", show_in_pred_table: true, show_in_detail_table: true},
    {id: "is_member", text: "Member", type: "in", hint: "Whether the Customer Is a Member", show_in_pred_table: true, show_in_detail_table: false},
    {id: "is_hrs_owner", text: "Horse Owner", type: "in", hint: "Whether the Customer Is a Horse Owner", show_in_pred_table: true, show_in_detail_table: false},
    {id: "major_channel", text: "Major Channel", type: "in", hint: "Major Racing Betting Channel", show_in_pred_table: true, show_in_detail_table: true},
    {id: "mtg_num", text: "Active Meetings", type: "range", hint: "# of Active Meetings in Recent 83 Meetings", show_in_pred_table: true, show_in_detail_table: true},
    {id: "inv", text: "Turnover", type: "range", hint: "Total Turnover of Recent 83 Meetings", show_in_pred_table: true, show_in_detail_table: true},
    {id: "div", text: "Dividend", type: "range", hint: "Total Dividend of Recent 83 Meetings", show_in_pred_table: true, show_in_detail_table: true},
    {id: "rr", text: "Recovery Rate", type: "range", hint: "Divide Dividend by Turnover", show_in_pred_table: true, show_in_detail_table: true},
    {id: "end_bal", text: "Balance", type: "range", hint: "Balance of Account(s)", show_in_pred_table: true, show_in_detail_table: true},
    {id: "recharge_times", type: "range", text: "Recharge Times", hint: "", show_in_pred_table: false, show_in_detail_table: true},
    {id: "recharge_amount", type: "range", text: "Recharge Amount", hint: "", show_in_pred_table: false, show_in_detail_table: true},
    {id: "withdraw_times", type: "range", text: "Withdraw Times", hint: "", show_in_pred_table: false, show_in_detail_table: true},
    {id: "withdraw_amount", type: "range", text: "Withdraw Amount", hint: "", show_in_pred_table: false, show_in_detail_table: true},
    {id: "active_rate_previous_83", type: "range", text: "Active Rate (Prev. 83)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "to_per_mtg", type: "range", text: "Turnover per Meeting", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "betline_per_mtg", type: "range", text: "Betlines per Meeting", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "avg_bet_size", type: "range", text: "Average Bet Size", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "to_ytd_growth", type: "range", text: "Racing Turnover Growth (YTD vs. PYTD)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "to_recent_growth", type: "range", text: "Racing Turnover Growth (Last 14 Meetings vs. Comparable 14 Meetings)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "to_per_mtg_ytd_growth", type: "range", text: "Turnover per Meeting Growth (YTD vs. PYTD)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "to_per_mtg_recent_growth", type: "range", text: "Turnover per Meeting Growth (Last 14 Meetings vs. Comparable 14 Meetings)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "betline_per_mtg_ytd_growth", type: "range", text: "Betlines per Meeting Growth (YTD vs. PYTD)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "betline_per_mtg_recent_growth", type: "range", text: "Betlines per Meeting Growth (Last 14 Meetings vs. Comparable 14 Meetings)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "avg_bet_size_ytd_growth", type: "range", text: "Average Bet Size Growth (YTD vs. PYTD)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "avg_bet_size_recent_growth", type: "range", text: "Average Bet Size Growth (Last 14 Meetings vs. Comparable 14 Meetings)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "active_rate_ytd_growth", type: "range", text: "Active Rate Growth (YTD vs. PYTD)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "active_rate_recent_growth", type: "range", text: "Active Rate Growth (Last 14 Meetings vs. Comparable 14 Meetings)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "grow_prop", type: "range", text: "Grow Propensity", hint: "Larger Value Represents Higher Propensity to Grow", show_in_pred_table: false, show_in_detail_table: false},
    {id: "decline_prop", type: "range", text: "Decline Propensity", hint: "Larger Value Represents Higher Propensity to Decline", show_in_pred_table: false, show_in_detail_table: false}
], [
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
    {id: "active_rate_previous_83", text: "Active Rate (Prev. 83)", hint: "Active Rate of Previous 83 Meetings"}
], [], [
    {id: "id", text: "ID", hint: "Customer ID"},
    {id: "segment", text: "Segment", hint: "Customer Segment"},
    {id: "age", text: "Age", hint: "Customer Age"},
    {id: "gender", text: "Gender", hint: "Customer Gender"},
    {id: "yrs_w_club", text: "Club Years", hint: "Years with the Club"},
    {id: "is_member", text: "Member", hint: "Whether the Customer Is a Member"},
    {id: "is_hrs_owner", text: "Horse Owner", hint: "Whether the Customer Is a Horse Owner"},
    {id: "major_channel", text: "Major Channel", hint: "Major Racing Betting Channel"},
    {id: "ar", text: "Active Rate", hint: ""},
    {id: "ar_exotic", text: "Active Rate (Exotic)", hint: ""},
    {id: "inv_standard", text: "Turnover (Standard)", hint: "Total Turnover of Standard Betlines for Recent 83 Meetings"},
    {id: "inv_exotic", text: "Turnover (Exotic)", hint: "Total Turnover of Exotic Betlines for Recent 83 Meetings"},
    {id: "div_standard", text: "Dividend (Standard)", hint: "Total Dividend of Standard Betlines for Recent 83 Meetings"},
    {id: "div_exotic", text: "Dividend (Exotic)", hint: "Total Dividend of Exotic Betlines for Recent 83 Meetings"},
    {id: "rr_standard", text: "Recovery Rate (Standard)", hint: "Divide Dividend by Turnover of Standard Betlines"},
    {id: "rr_exotic", text: "Recovery Rate (Exotic)", hint: "Divide Dividend by Turnover of Exotic Betlines"},
    {id: "betline_standard", text: "Betline (Standard)", hint: "# of Standard Betlines for Recent 83 Meetings"},
    {id: "betline_exotic", text: "Betline (Exotic)", hint: "# of Exotic Betlines for Recent 83 Meetings"}
]];
var CATEGORICAL_COLUMNS = ["id", "segment", "age", "gender", "is_member", "is_hrs_owner", "major_channel"];
var FEATURE_TAGS_PROP = [
    {id: "grow_prop", text: "Grow Propensity", hint: "Larger Value Represents Higher Propensity to Grow"},
    {id: "decline_prop", text: "Decline Propensity", hint: "Larger Value Represents Higher Propensity to Decline"},
    {id: "chance_to_be_regular", text: "Chance to Be Regular", hint: "The Chance of a Customer Becoming a Regular Customer"},
    {id: "score_hp_preference", text: "Preference Potential", hint: "Score of High Potential due to Preference"},
    {id: "score_hp_participation", text: "Participation Potential", hint: "Score of High Potential due to Participation"}
];
var CLUSTERING_METRICS = [
    {id: "euclidean", text: "Euclidean"},
    {id: "minkowski", text: "Minkowski"},
    {id: "cityblock", text: "Manhattan"},
    {id: "seuclidean", text: "Standardized Euclidean"},
    {id: "sqeuclidean", text: "Squared Euclidean"},
    {id: "cosine", text: "Cosine"},
    {id: "correlation", text: "Correlation"},
    {id: "hamming", text: "Normalized Hamming"},
    {id: "jaccard", text: "Jaccard"},
    {id: "chebyshev", text: "Chebyshev"},
    {id: "canberra", text: "Canberra"},
    {id: "braycurtis", text: "Bray-Curtis"},
    {id: "mahalanobis", text: "Mahalanobis"},
    {id: "yule", text: "Yule"},
    {id: "matching", text: "Matching"},
    {id: "dice", text: "Dice"},
    {id: "kulsinski", text: "Kulsinski"},
    {id: "rogerstanimoto", text: "Rogers-Tanimoto"},
    {id: "russellrao", text: "Russell-Rao"},
    {id: "sokalmichener", text: "Sokal-Michener"},
    {id: "sokalsneath", text: "Sokal-Sneath"},
    {id: "wminkowski", text: "Weighted Minkowski"}
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

String.prototype.splitMiddle = function () {
    var middle = Math.floor(this.length / 2);
    var before = this.lastIndexOf(' ', middle);
    var after = this.indexOf(' ', middle + 1);
    if (before == -1 || (after != -1 && middle - before >= after - middle)) {
        middle = after;
    } else {
        middle = before;
    }
    var s1 = this.substr(0, middle);
    var s2 = this.substr(middle + 1);
    return [s1, s2];
};

Array.prototype.findKeyValue = function (key_desc, key, value_desc) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][key_desc] == key) return this[i][value_desc];
    }
};


function error_message(msg) {
    return "<span class='text-danger'><i class='fa fa-times-circle'></i> " + msg + "</span>";
}

function warning_message(msg) {
    return "<span class='text-warning'><i class='fa fa-warning'></i> " + msg + "</span>";
}

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
    if (Cookies.get('joker_id') == undefined || Cookies.get('joker_id') == null) {
        window.location.href = "/joker/login.php";
    } else {
        $.get(API_SERVER + "joker/auth/verify/?id=" + Cookies.get('joker_id') + "&ticket=" + Cookies.get('joker_ticket'), function (r) {
            $(".username").html(Cookies.get('joker_username'));
        }).fail(function () {
            window.location.href = "/joker/login.php";
        });
    }
}

function logout() {
    Cookies.remove("joker_id");
    Cookies.remove("joker_username");
    Cookies.remove("joker_ticket");
    window.location.href = "/joker/login.php";
}

function init_widget() {
    $('[data-toggle="tooltip"]').tooltip();
    $("select").select2({
        dropdownAutoWidth: 'true',
        minimumResultsForSearch: Infinity
    });
}

function count_decimals(v) {
    var test = v, count = 0;
    while (test > 10) {
        test /= 10;
        count++;
    }
    return count;
}

function n_formatter(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' billion';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' million';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' k';
    return num;
}

