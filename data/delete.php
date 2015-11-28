<?php
if (isset($_GET["f"])) {
    $f = $_GET["f"];
    $ext = pathinfo($f, PATHINFO_EXTENSION);
    if ($ext == "csv" || $ext == "gz") {
        if (unlink($f)) echo "1"; else echo "-1";
    } else {
        echo "-2";
    }
} else {
    echo "0";
}