<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][10] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=10'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=10'); ?>
            <!-- BEGIN PAGE -->
            <div class="row">
                <div class="col-md-12">
                    <div id="customer_table_wrapper" class="dataTables_wrapper no-footer">
                        <table id="customer_table" class="table table-striped table-bordered table-advance table-hover">
                            <thead>
                            <tr class="heading">
                                <th class="font-blue">ID</th>
                                <th class="font-purple">Segment</th>
                                <th class="font-red">Score</th>
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
<script src="js/feature-4-pred.js" type="text/javascript"></script>
</body>
</html>