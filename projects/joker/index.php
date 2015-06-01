<html>
<head>
    <title>Smart Cube | Dashboard</title>
    <?php require_once "../../php/lib.php"; ?>
    <?php require_once "../../php/common.php"; ?>
    <?php require_once "components/css.php"; ?>
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
    <?php
    $domain = $_SERVER['HTTP_HOST'];
    $prefix = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
    $relative = '/projects/joker/components/sidebar.php?menu=0&sub=0';
    echo curl($prefix . $domain . $relative);
    ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <h3 class="page-title">Dashboard</h3>

            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="index.php">Home</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="index.php">Dashboard</a>
                    </li>
                </ul>
            </div>
            <h4 class="font-green">Demo</h4>
            <ul>
                <li><a href="feature1.php">Analysis Result Table (Model 1) Demo</a> (Last Update: <?php echo date("F d Y, H:i:s", filemtime("./feature1.php")); ?>)</li>
                <li><a href="feature2.php">Analysis Result Table (Model 2) Demo</a> (Last Update: <?php echo date("F d Y, H:i:s", filemtime("./feature2.php")); ?>)</li>
                <li><a href="cluster.php">Clustering (Model 3) Demo</a> (Last Update: <?php echo date("F d Y, H:i:s", filemtime("./cluster.php")); ?>)</li>
            </ul>
            <h4 class="font-green">Maintenance</h4>
            <ul>
                <li><a href="upload.php">CSV Data Uploader</a> (Last Update: <?php echo date("F d Y, H:i:s", filemtime("./upload.php")); ?>)</li>
                <li><a href="data.php">CSV Data Processor</a> (Last Update: <?php echo date("F d Y, H:i:s", filemtime("./data.php")); ?>)</li>
            </ul>
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="js/index.js" type="text/javascript"></script>
</body>
</html>