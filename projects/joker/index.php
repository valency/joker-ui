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
            <?php if ($handle = opendir('./')) {
                while (false !== ($entry = readdir($handle))) {
                    if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == "php") {
                        echo "<span><a href='" . $entry . "'>" . $entry . "</a> (Last Update: " . date("F d Y, H:i:s", filemtime($entry)) . ")</span><br/>";
                    }
                }
                closedir($handle);
            } ?>
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