<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][0] . "</title>";
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
    <?php echo curl($prefix . $domain . '/projects/joker/components/sidebar.php?menu=1&sub=0'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($prefix . $domain . '/projects/joker/components/breadcrumb.php?menu=1&sub=0'); ?>
            <!-- BEGIN PAGE -->
            <div id="customer_table_wrapper" class="dataTables_wrapper no-footer">
                <table id="customer_table" class="table table-striped table-bordered table-advance table-hover">
                    <thead>
                    <tr class="heading">
                        <th>ID</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Club Years</th>
                        <th>Member</th>
                        <th>Horse Owner</th>
                        <th>Major Channel</th>
                        <th>Meetings</th>
                        <th>Investment</th>
                        <th>Dividend</th>
                        <th>Recovery Rate</th>
                        <th>Balance</th>
                        <th>Recharge Times</th>
                        <th>Recharge Amount</th>
                        <th>Withdraw Times</th>
                        <th>Withdraw Amount</th>
                    </tr>
                    </thead>
                    <tbody id="customer_table_body"></tbody>
                </table>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="js/customer.js" type="text/javascript"></script>
</body>
</html>