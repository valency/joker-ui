<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][8] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=8'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=8'); ?>
            <!-- BEGIN PAGE -->
            <div class="row form-group">
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon">Model</span>
                        <select id="select_pred_model" class="form-control">
                            <option value="grow_prop">Grow Propensity</option>
                            <option value="decline_prop">Decline Propensity</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon">Feature 1</span>
                        <select id="select_feature_1" class="form-control">
                            <option value="id">ID</option>
                            <option value="segment">Segment</option>
                            <option value="age">Age</option>
                            <option value="gender">Gender</option>
                            <option value="yrs_w_club">Club Years</option>
                            <option value="is_member">Member</option>
                            <option value="is_hrs_owner">Horse Owner</option>
                            <option value="major_channel">Major Channel</option>
                            <option value="mtg_num">Meetings Attended</option>
                            <option value="inv">Investment</option>
                            <option value="div">Dividend</option>
                            <option value="rr">Recovery Rate</option>
                            <option value="end_bal">Balance</option>
                            <option value="recharge_times">Recharge Times</option>
                            <option value="recharge_amount">Recharge Amount</option>
                            <option value="withdraw_times">Withdraw Times</option>
                            <option value="withdraw_amount">Withdraw Amount</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon">Feature 2</span>
                        <select id="select_feature_2" class="form-control">
                            <option value="id">ID</option>
                            <option value="segment">Segment</option>
                            <option value="age">Age</option>
                            <option value="gender">Gender</option>
                            <option value="yrs_w_club">Club Years</option>
                            <option value="is_member">Member</option>
                            <option value="is_hrs_owner">Horse Owner</option>
                            <option value="major_channel">Major Channel</option>
                            <option value="mtg_num">Meetings Attended</option>
                            <option value="inv">Investment</option>
                            <option value="div">Dividend</option>
                            <option value="rr">Recovery Rate</option>
                            <option value="end_bal">Balance</option>
                            <option value="recharge_times">Recharge Times</option>
                            <option value="recharge_amount">Recharge Amount</option>
                            <option value="withdraw_times">Withdraw Times</option>
                            <option value="withdraw_amount">Withdraw Amount</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <span class="input-group-addon">Size</span>
                        <input id="no_of_records" class="form-control" type="text" value="500"/>
                    </div>
                </div>
                <div class="col-md-1">
                    <button class="btn green pull-right" type="button" onclick="plot();">Plot</button>
                </div>
            </div>
            <hr/>
            <div class="row">
                <div id="canvas" class="col-md-12"></div>
                <!--                <div id="canvas_tools" class="col-md-3 hidden">-->
                <!--                    <a class="pull-right" href="javascript:void(0)" onclick="scale(-1);" style="margin-left:5px;"><i class="fa fa-minus"></i></a>-->
                <!--                    <a class="pull-right" href="javascript:void(0)" onclick="scale(1);" style="margin-left:5px;"><i class="fa fa-plus"></i></a>-->
                <!--                </div>-->
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="/lib/d3.min.js"></script>
<script src="js/plot.js" type="text/javascript"></script>
</body>
</html>