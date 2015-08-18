<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][7] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=7'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=7'); ?>
            <!-- BEGIN PAGE -->
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">Features</span>
                        <input type="hidden" id="select_features" class="form-control select2" value=""/>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon">Data Set</span>
                        <select id="select_data_set" class="form-control">
                            <option value="1">Model 1</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <span class="input-group-addon"># of Clusters</span>
                        <input id="input_clusters" class="form-control" type="text" value="5"/>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="input-group">
                        <span class="input-group-addon">Customer Set</span>
                        <input id="input_set_id" class="form-control" value="" placeholder="CUST_SET_ID"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <button class="btn red pull-right" onclick="cluster();">Perform Clustering</button>
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
<script src="assets/global/plugins/ion.rangeslider/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
<script src="js/set-show.js" type="text/javascript"></script>
</body>
</html>