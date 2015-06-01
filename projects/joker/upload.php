<html>
<head>
    <title>Project Joker</title>
    <?php require "../../php/lib.php"; ?>
</head>
<body>
<div>
    <a href="index.php" style="float:right;margin-top:12px;"><img class="ui avatar image" src="/img/home.png"></a>

    <h1>CSV Data Uploader</h1>

    <h3 class="label-yellow-font">Last Update: <?php echo date("F d Y, H:i:s", filemtime("./upload.php")); ?></h3>
</div>
<hr/>
<?php
if (isset($_POST["submit"]) && is_uploaded_file($_FILES['file_upload']['tmp_name'])) {
    $target_dir = "./data/";
    echo "<p>File will be uploaded to: " . $target_dir . "</p>";
    $target_file = $target_dir . basename($_FILES["file_upload"]["name"]);
    echo "<p>Target file is: " . $target_file . "</p>";
    $extension = pathinfo($target_file, PATHINFO_EXTENSION);
    echo "<p>File extension is: " . $extension . "</p>";
    $upload_ok = true;
    if (file_exists($target_file)) {
        echo "<p>Sorry, file already exists.</p>";
        $upload_ok = false;
    }
    if ($_FILES["file_upload"]["size"] > 100000000) {
        echo "<p>Sorry, your file is too large.</p>";
        $upload_ok = false;
    }
    if ($extension != "csv") {
        echo "<p>Sorry, only CSV files are allowed.</p>";
        $upload_ok = false;
    }
    if ($upload_ok == false) {
        echo "<p>Sorry, your file was not uploaded.</p>";
    } else {
        if (move_uploaded_file($_FILES["file_upload"]["tmp_name"], $target_file)) {
            echo "<p>The file '" . basename($_FILES["file_upload"]["name"]) . "' has been uploaded.</p>";
        } else {
            echo "<p>Sorry, there was an error uploading your file.</p>";
        }
    }
} else { ?>
    <form class="ui labeled input input-group" action="upload.php" method="post" enctype="multipart/form-data">
        <a class="ui teal label btn-file">Browse&hellip;<input type="file" name="file_upload" id="file_upload"></a>
        <input type="text" readonly/>
        <input class="ui red button" type="submit" name="submit" value="Upload" style="margin-left:-5px;padding-right:1em!important;"/>
    </form>
<?php } ?>
</body>
</html>
