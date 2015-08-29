<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][8] . "</title>";
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
                <div class="col-md-9">
                    <select id="input_set_id" class="form-control"></select>
                    <input id="select_data_set" value="1" hidden/>
                </div>
                <div class="col-md-3">
                    <span class="form-control btn red no-border" onclick="cust_set_search();">Review Customer Set</span>
                </div>
            </div>
            <hr/>
            <div class="row">
                <div id="canvas-hint" class="col-md-12"></div>
                <div id="canvas" class="col-md-9"></div>
                <div id="canvas-control" class="col-md-3 hidden" style="border-left:1px solid black;">
                    <p class="nowrap"><span id="canvas-control-name" class="font-red bold">Loading...</span></p>

                    <p class="font-xs">
                        <span class="bold"># of Clusters: </span>
                        <span id="canvas-control-clusters">Loading...</span><br/>
                        <span class="bold">Created on: </span>
                        <span id="canvas-control-create-time">Loading...</span><br/>
                        <span class="bold">Clustered on: </span>
                        <span id="canvas-control-cluster-time">Loading...</span>
                    </p>

                    <p>
                        <button class="btn btn-xs green"><i class="fa fa-download"></i> Download</button>
                        <button class="btn btn-xs grey"><i class="fa fa-times"></i> Delete</button>
                    </p>
                    <hr/>
                    <div>

                    </div>
                    <hr/>
                    <div>

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
<script src="/lib/d3.min.js"></script>
<script src="js/set-review.js" type="text/javascript"></script>
</body>
</html>