<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][0] . "</title>";
    require_once "../php/lib.php";
    require_once "../php/common.php";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=2'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=2'); ?>
            <!-- BEGIN PAGE -->
            <div class="row">
                <div class="col-md-12">
                    <div id="customer_table_wrapper" class="dataTables_wrapper no-footer">
                        <table id="customer_table" class="table table-striped table-bordered table-advance table-hover">
                            <thead>
                            <tr class="heading">
                                <th>ID</th>
                                <th>Customer<br/>Code</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Club<br/>Years</th>
                                <th>Member</th>
                                <th>Horse<br/>Owner</th>
                                <th>Major<br/>Channel</th>
                                <th>Meetings<br/>Attended</th>
                                <th>Investment</th>
                                <th>Dividend</th>
                                <th>Recovery<br/>Rate</th>
                                <th>Balance</th>
                                <th>Recharge<br/>Times</th>
                                <th>Recharge<br/>Amount</th>
                                <th>Withdraw<br/>Times</th>
                                <th>Withdraw<br/>Amount</th>
                                <th class="font-red">Grow<br/>Propensity</th>
                                <th class="font-green">Lapse<br/>Propensity</th>
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
<script src="js/feature.js" type="text/javascript"></script>
<script src="js/feature-1-pred.js" type="text/javascript"></script>
</body>
</html>