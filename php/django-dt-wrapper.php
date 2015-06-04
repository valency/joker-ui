<?php
require_once "common.php";
$json = json_decode(curl($API_SERVER . "joker/" . $_GET["target"] . "/?page=" . $_GET["draw"]));
$result = array("draw" => $_GET["draw"], "recordsTotal" => $json->{"count"}, "recordsFiltered" => $json->{"count"}, "data" => $json->{"results"});
echo json_encode($result);
