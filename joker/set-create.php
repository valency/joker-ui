<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][6] . "</title>";
    ?>
    <link href="assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.Metronic.css" rel="stylesheet" type="text/css"/>
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=6'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=6'); ?>
            <!-- BEGIN PAGE -->
            <div class="row form-group form-horizontal">
                <label class="col-md-2 control-label">Choose Data From:</label>

                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-addon">Data Set</span>
                        <select id="select_pred_model" class="form-control">
                            <option value="1">Model 1</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-addon">Order By</span>
                        <select id="select_pred_order" class="form-control">
                            <option value="grow_prop">Grow Propensity</option>
                            <option value="decline_prop">Decline Propensity</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <span class="input-group-addon">Size</span>
                        <input id="no_of_records" class="form-control" type="text" value="500"/>
                    </div>
                </div>
            </div>
            <div class="row form-group form-horizontal">
                <div class="col-md-2">
                    <label class="pull-right">Filter Data By:</label>
                </div>
                <div class="col-md-10" id="filter_list">
                    <a href="javascript:void(0)" class="label bg-blue" onclick="add_filter();"><i class="fa fa-plus"></i></a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button class="btn green pull-right" onclick="create_set();">Create Customer Set</button>
                    <button id="data_source_btn" class='btn red pull-right' style="margin-right:5px;"><span>Loading...</span></button>
                </div>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="/lib/d3.min.js"></script>
<script src="assets/global/plugins/ion.rangeslider/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
<script src="js/set-create.js" type="text/javascript"></script>
</body>
</html>