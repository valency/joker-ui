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
                        <span class="input-group-addon"># of Clusters</span>
                        <input id="input_clusters" class="form-control" type="text" value="5"/>
                        <input id="select_data_set" value="1" hidden/>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon">Metric</span>
                        <select id="select_metric" class="form-control">
                            <option value="euclidean">Euclidean</option>
                            <option value="minkowski">Minkowski</option>
                            <option value="cityblock">Manhattan</option>
                            <option value="seuclidean">Standardized Euclidean</option>
                            <option value="sqeuclidean">Squared Euclidean</option>
                            <option value="cosine">Cosine</option>
                            <option value="correlation">Correlation</option>
                            <option value="hamming">Normalized Hamming</option>
                            <option value="jaccard">Jaccard</option>
                            <option value="chebyshev">Chebyshev</option>
                            <option value="canberra">Canberra</option>
                            <option value="braycurtis">Bray-Curtis</option>
                            <option value="mahalanobis">Mahalanobis</option>
                            <option value="yule">Yule</option>
                            <option value="matching">Matching</option>
                            <option value="dice">Dice</option>
                            <option value="kulsinski">Kulsinski</option>
                            <option value="rogerstanimoto">Rogers-Tanimoto</option>
                            <option value="russellrao">Russell-Rao</option>
                            <option value="sokalmichener">Sokal-Michener</option>
                            <option value="sokalsneath">Sokal-Sneath</option>
                            <option value="wminkowski">Weighted Minkowski</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon">Customer Set</span>
                        <select id="input_set_id" class="form-control"></select>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="row form-group">
                <div class="col-md-9"></div>
                <div class="col-md-3">
                    <button class="form-control btn red no-border" onclick="cluster();">Perform Clustering</button>
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
<script src="assets/global/plugins/ion.rangeslider/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
<script src="js/set-show.js" type="text/javascript"></script>
</body>
</html>