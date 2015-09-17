<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[2][0] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=2&sub=0'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=2&sub=0'); ?>
            <!-- BEGIN PAGE -->
            <div class="row form-group">
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon">Model</span>
                        <select id="select2_model" class="form-control">
                            <option value="1">Model 1</option>
                            <option value="2">Model 2</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="input-group">
                        <input id="search_cust_id" class="form-control" value="" placeholder="CUST_ID"/>
                        <span class="input-group-addon btn red" onclick="cust_search();">ID Search</span>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="row" id="customer_table_wrapper">
                <div class="col-md-12"></div>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="lib/d3.min.js"></script>
<script src="js/figure.js" type="text/javascript"></script>
<script src="js/feature.js" type="text/javascript"></script>
<script src="js/customer.js" type="text/javascript"></script>
</body>
</html>