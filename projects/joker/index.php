<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $menu_words[0] . "</title>";
    $domain = $_SERVER['HTTP_HOST'];
    $prefix = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
    require_once "../../php/lib.php";
    require_once "../../php/common.php";
    require_once "components/css.php";
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
    <?php echo curl($prefix . $domain . '/projects/joker/components/sidebar.php?menu=0&sub=0'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($prefix . $domain . '/projects/joker/components/breadcrumb.php?menu=0&sub=0'); ?>
            <!-- BEGIN PAGE -->
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