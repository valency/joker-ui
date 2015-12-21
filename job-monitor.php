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
            <div>
                <span class="label bg-purple" style="line-height:34px;">Job Slots</span><span id="slot-info" class="label bg-yellow">...</span>
                <button class="btn grey pull-right" style="margin-left:10px;" onclick="clear_job_list();"><i class="fa fa-trash"></i> Clear Job List</button>
                <button class="btn red pull-right" style="margin-left:10px;" onclick="reset_job_tracker();"><i class="fa fa-times"></i> Reset Job Tracker</button>
                <button class="btn green pull-right" onclick="set_num_slots();"><i class="fa fa-pencil-square-o"></i> Set # of Job Slots</button>
            </div>
            <hr/>
            <div id="job-table-wrapper">
                <table class="table table-striped table-bordered table-advance table-hover">
                    <thead>
                    <tr class="heading">
                        <th class="font-green">Seq.</th>
                        <th class="font-blue">ID</th>
                        <th>Name</th>
                        <th>Time (Real)</th>
                        <th>Time (User)</th>
                        <th>Time (System)</th>
                        <th>State</th>
                        <th>Final Status</th>
                        <th><i class='fa fa-cubes'></i> Management</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="js/job-monitor.js" type="text/javascript"></script>
</body>
</html>