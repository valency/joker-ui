<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    $page = basename($_SERVER["SCRIPT_FILENAME"]);
    echo "<title>SmartCube | " . find_title_by_url_from_array($menu, $page) . "</title>";
    ?>
    <link href="css/feature.css" rel="stylesheet" type="text/css"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content">
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?page=' . $page . '&user=' . $_COOKIE['joker_username']); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?page=' . $page); ?>
            <!-- BEGIN PAGE -->
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/description.php?model=2'); ?>
            <div class="row">
                <div class="col-md-12">
                    <div id="customer_table_wrapper" class="dataTables_wrapper no-footer">
                        <table id="customer_table" class="table table-striped table-bordered table-advance table-hover">
                            <thead>
                            <tr class="heading">
                                <th class="font-blue">ID</th>
                                <th class="font-purple">Segment</th>
                                <th class="font-red">Chance to<br/>Be Regular</th>
                            </tr>
                            </thead>
                            <tbody id="customer_table_body"></tbody>
                        </table>
                    </div>
                </div>
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
<script src="js/feature-2-pred.js" type="text/javascript"></script>
</body>
</html>