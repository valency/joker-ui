<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[2][0] . "</title>";
    ?>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content page-sidebar-closed-hide-logo">
<div class="page-header -i navbar navbar-fixed-top">
    <div class="page-header-inner">
        <?php require_once "components/logo.php"; ?>
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <?php require_once "components/login.php"; ?>
            </ul>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<div class="page-container">
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=2&sub=0'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=2&sub=0'); ?>
            <!-- BEGIN PAGE -->
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
                if ($extension != "csv" and $extension != "gz") {
                    echo "<p>Sorry, only csv and gz files are allowed.</p>";
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
                <form action="upload.php" method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <div class="fileinput fileinput-new" data-provides="fileinput">
                            <div class="input-group input-large">
                                <div class="form-control uneditable-input" data-trigger="fileinput">
                                    <i class="fa fa-file fileinput-exists"></i>&nbsp; <span class="fileinput-filename"></span>
                                </div>
                        <span class="input-group-addon btn default btn-file">
                            <span class="fileinput-new"> Select file </span>
                            <span class="fileinput-exists"> Change </span>
                            <input type="file" name="file_upload"/>
                        </span>
                                <a href="javascript:void(0)" class="input-group-addon btn red fileinput-exists" data-dismiss="fileinput"> Remove </a>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" name="submit" class="btn purple"><i class="fa fa-check"></i> Submit</button>
                    </div>
                </form>
            <?php } ?>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="js/index.js" type="text/javascript"></script>
</body>
</html>