<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][3] . "</title>";
    require_once "../php/lib.php";
    require_once "../php/common.php";
    require_once "components/css.php";
    ?>
    <link href="css/feature.css" rel="stylesheet" type="text/css"/>
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=3'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=3'); ?>
            <!-- BEGIN PAGE -->
            <div id="figure_container"></div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="/lib/d3.min.js"></script>
<script src="data/feature.js" type="text/javascript"></script>
<script src="js/feature.js" type="text/javascript"></script>
<script src="js/feature-2-stat.js" type="text/javascript"></script>
</body>
</html>