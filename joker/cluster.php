<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][5] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=5'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=5'); ?>
            <!-- BEGIN PAGE -->
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">Features</span>
                        <input type="hidden" id="select2_features" class="form-control select2" value=""/>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon"># of Records</span>
                        <input id="no_of_records" class="form-control" type="text" value="500"/>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon"># of Clusters</span>
                        <input id="no_of_clusters" class="form-control" type="text" value="5"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon">Prediction</span>
                        <select id="select2_predictions" class="form-control">
                            <option value="Grow">Grow Propensity</option>
                            <option value="Lapse">Decline Propensity</option>
                            <option value="Growth">Chance to be Regular</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <button class="btn green pull-right" type="button" onclick="cluster();">Perform Clustering</button>
                </div>
            </div>
            <hr/>
            <div id="canvas"></div>
            <!-- END PAGE -->
        </div>
    </div>
</div>
<!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="/lib/d3.min.js"></script>
<script src="js/cluster.js" type="text/javascript"></script>
</body>
</html>