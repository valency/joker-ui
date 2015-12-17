<?php
$menu = [[
    "title" => "Dashboard",
    "icon" => "icon-home",
    "url" => "dashboard.php",
], [
    "title" => "Models",
    "icon" => "icon-rocket",
    "url" => "javascript:void(0)",
    "submenu" => [[
        "title" => "Customer Review",
        "icon" => "icon-users",
        "url" => "customer.php"
    ], [
        "title" => "Growth / Decline Analysis",
        "icon" => "icon-rocket",
        "url" => "javascript:void(0)",
        "submenu" => [[
            "title" => "Statistics",
            "icon" => "icon-bar-chart",
            "url" => "feature-1-stat.php"
        ], [
            "title" => "Predictions",
            "icon" => "icon-list",
            "url" => "feature-1-pred.php"
        ], [
            "title" => "Validation",
            "icon" => "icon-vector",
            "url" => "validation.php?mode=1"
        ]]], [
        "title" => "New Customers Analysis",
        "icon" => "icon-rocket",
        "url" => "javascript:void(0)",
        "submenu" => [[
            "title" => "Statistics",
            "icon" => "icon-bar-chart",
            "url" => "feature-2-stat.php"
        ], [
            "title" => "Predictions",
            "icon" => "icon-list",
            "url" => "feature-2-pred.php"
        ], [
            "title" => "Validation",
            "icon" => "icon-vector",
            "url" => "validation.php?mode=2"
        ]]], [
        "title" => "Bet Type Analysis",
        "icon" => "icon-rocket",
        "url" => "javascript:void(0)",
        "submenu" => [[
            "title" => "Statistics",
            "icon" => "icon-bar-chart",
            "url" => "feature-4-stat.php"
        ], [
            "title" => "Predictions",
            "icon" => "icon-list",
            "url" => "feature-4-pred.php"
        ], [
            "title" => "Validation",
            "icon" => "icon-vector",
            "url" => "validation.php?mode=4"
        ]]], [
        "title" => "Clustering",
        "icon" => "icon-pie-chart",
        "url" => "javascript:void(0)",
        "submenu" => [[
            "title" => "Select",
            "icon" => "icon-list",
            "url" => "set-create.php"
        ], [
            "title" => "Perform",
            "icon" => "icon-pie-chart",
            "url" => "set-show.php"
        ], [
            "title" => "View Results",
            "icon" => "icon-book-open",
            "url" => "set-review.php"
        ]]]
    ]
], [
    "title" => "Maintenance",
    "icon" => "icon-settings",
    "url" => "javascript:void(0)",
    "submenu" => [[
        "title" => "User Management",
        "icon" => "icon-users",
        "url" => "user.php"
    ], [
        "title" => "Data Management",
        "icon" => "icon-briefcase",
        "url" => "data.php"

    ], [
        "title" => "Model Management",
        "icon" => "icon-list",
        "url" => "job.php"
    ], [
        "title" => "Job Management",
        "icon" => "icon-speedometer",
        "url" => "job-monitor.php"
    ]]
]];

function find_title_by_url($m, $url)
{
    if ($m["url"] == $url) return $m["title"];
    if (array_key_exists("submenu", $m)) {
        for ($i = 0; $i < count($m["submenu"]); $i++) {
            $title = find_title_by_url($m["submenu"][$i], $url);
            if ($title != null) return $m["title"] . " : " . $title;
        }
    }
    return null;
}

function find_title_by_url_from_array($m, $url)
{
    for ($i = 0; $i < count($m); $i++) {
        $title = find_title_by_url($m[$i], $url);
        if ($title != null) {
            return $title;
        }
    }
    return null;
}