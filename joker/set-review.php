<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][8] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=8'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=8'); ?>
            <!-- BEGIN PAGE -->
            <div class="row form-group">
                <div class="col-md-9">
                    <select id="input_set_id" class="form-control"></select>
                    <input id="select_data_set" value="1" hidden/>
                </div>
                <div class="col-md-3">
                    <span class="form-control btn red no-border" onclick="cust_set_search();">Review Customer Set</span>
                </div>
            </div>
            <hr/>
            <div class="row">
                <div id="canvas" class="col-md-12"></div>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="/lib/d3.min.js"></script>
<script src="js/set-review.js" type="text/javascript"></script>
</body>
</html>