var COLOR_PALETTE = ["#467D97", "#5DA5DA", "#60BD68", "#F17CB0", "#B2912F", "#B276B2", "#DECF3F", "#F15854", "#A03423"];
var STATE_CODE = {
    NA: {
        text: "N/A",
        color: "grey"
    },
    finished_true: {
        text: "Success",
        color: "grey-gallery"
    },
    finished_false: {
        text: "Failed",
        color: "red"
    },
    running: {
        text: "Running",
        color: "green"
    },
    queued: {
        text: "Queued",
        color: "purple"
    },
    skipped: {
        text: "Skipped",
        color: "yellow"
    }
};
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
    {id: "turnover_ratio", type: "range", text: "Turnover Ratio", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "active_rate_ratio", type: "range", text: "Active Rate Ratio", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "recovery_rate_ratio", type: "range", text: "Recovery Rate Ratio", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "amplification", type: "range", text: "Amplification", hint: "", show_in_pred_table: false, show_in_detail_table: false},
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
    {id: "active_rate_previous_83", text: "Active Rate (Prev. 83)", hint: "Active Rate of Previous 83 Meetings"},
    {id: "age_rc", text: "Age (RC)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "active_rate_recent", text: "Active Rate (Recent)", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "turnover_ratio", text: "Turnover Ratio", hint: "", show_in_pred_table: false, show_in_detail_table: false},
    {id: "active_rate_ratio", text: "Active Rate Ratio", hint: "", show_in_pred_table: false, show_in_detail_table: false}
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