<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $menu_words[0] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=0&sub=0'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=0&sub=0'); ?>
            <!-- BEGIN PAGE -->
            <div class="row">
                <div class="col-md-12">
                    <h3>System Status</h3>
                    <?php if ($handle = opendir('./')) {
                        while (false !== ($entry = readdir($handle))) {
                            if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == "php") {
                                echo "<span><a href='" . $entry . "'>" . $entry . "</a> (Last Update: " . date("F d Y, H:i:s", filemtime($entry)) . ")</span><br/>";
                            }
                        }
                        closedir($handle);
                    } ?>
                </div>
            </div>
            <hr/>
            <div class="row">
                <div class="col-md-12">
                    <h3>Updates</h3>
                    <span class="font-red">v0.8.7</span>
                    <ul>
                        <li>Fixed exporting of large csv file bug</li>
                        <li>Removed exporting to excel</li>
                        <li>Added cleaning database before importing data</li>
                        <li>Added current working data set indicator</li>
                        <li>Added gzip support</li>
                        <li>Added zoom in / out buttons</li>
                    </ul>
                    <span class="font-red">v0.8.6</span>
                    <ul>
                        <li>Modified model 3 test page title to data exploration</li>
                        <li>Modified data exploration axis to dotted grey</li>
                        <li>Added data filter for data exploration</li>
                        <li>Fixed data filter or operation not working bug</li>
                        <li>Fixed data filter and operation bug (cannot combine same field)</li>
                    </ul>
                    <span class="font-red">v0.7.30</span>
                    <ul>
                        <li>Added updates log</li>
                        <li>Fixed overlapping bug of the x axis of figures</li>
                        <li>Added plot test page</li>
                        <li>Added figure zoom / pan features (non-categorical only)</li>
                    </ul>
                    <span class="font-red">v0.7.25</span>
                    <ul>
                        <li>Fixed model 3 api call bug</li>
                        <li>Modified distance model to cosine distance for clustering</li>
                        <li>Added categorical clustering support</li>
                    </ul>
                    <span class="font-red">v0.7.15</span>
                    <ul>
                        <li>Added https certificate at footer, please import to os before using the system</li>
                        <li>Modified data model to model-oriented</li>
                        <li>Removed model 2 data</li>
                    </ul>
                    <span class="font-red">v0.7.13</span>
                    <ul>
                        <li>Fixed model 2 figure 1 bug</li>
                        <li>Modified api subsystem to nginx / gunicorn</li>
                        <li>Added table column dragging</li>
                        <li>Added table column hide / show</li>
                    </ul>
                    <span class="font-red">v0.6.29</span>
                    <ul>
                        <li>Added registration</li>
                        <li>Modified model 1 data set</li>
                        <li>Added uploading model validation files on-the-fly</li>
                        <li>Modified separated pages of model validation</li>
                        <li>Added enlarging model statistics figure</li>
                    </ul>
                    <span class="font-red">v0.6.28</span>
                    <ul>
                        <li>Modified words of lapse to decline</li>
                        <li>Modified predictions to the front of tables</li>
                        <li>Added export all data (exporting large amount of data (>3000 records) is very slow)</li>
                        <li>Added printing of current page</li>
                        <li>Added portlet to statistical figures</li>
                        <li>Added model validation</li>
                        <li>Added fake login (username: smartcube, password: 1ac14128-4467-40f3-bf81-ebe0fad3f866)</li>
                        <li>Modified clustering only on model 1</li>
                        <li>Fixed model 3 plotting bug</li>
                        <li>Modified user profile page</li>
                        <li>Modified demo url to: http://120.25.209.91/joker/</li>
                    </ul>
                    <span class="font-red">v0.6.11</span>
                    <ul>
                        <li>Modified API system to Django</li>
                        <li>Modified UI system to Bootstrap</li>
                        <li>Modified default sorting mode to sync with query</li>
                        <li>Added exporting feature</li>
                        <li>Added show / hide column feature</li>
                        <li>Removed prediction mode of model 1</li>
                        <li>Added predictions in model tables</li>
                        <li>Added separated customer page</li>
                    </ul>
                    <span class="font-red">v0.5.16</span>
                    <ul>
                        <li>Modified YTD to PYTD</li>
                        <li>Modified prediction period list</li>
                        <li>Removed options in detail window</li>
                        <li>Added ranking in detail window</li>
                        <li>Fixed model 2 ordering bug</li>
                    </ul>
                    <span class="font-red">v0.5.14</span>
                    <ul>
                        <li>Added ordering function</li>
                        <li>Modified yearly to annual in period selection of model 1</li>
                        <li>Modified Fig 1.1 to Growth Rate of Turnover (YTD)</li>
                        <li>Added KPI in Fig 1.1 & 2.1</li>
                        <li>Modified Fig 1.2 to Turnover per Meeting</li>
                        <li>Modified color palette for all piecharts</li>
                        <li>Modified Fig 1.5 & 1.6 to Turnover of … (YTD)</li>
                        <li>Modified the format of propensity in data table to percentage</li>
                        <li>Modified Fig 2.1 to Avg. Act. Rate (YTD)</li>
                        <li>Modified Fig 2.2 to # of Active Custs. per Meeting</li>
                        <li>Modified the x axis of Fig 1.3, 2.3, and 2.4</li>
                        <li>Modified Fig 2.6 & 2.7 to New Custs.' Turnover of … (YTD)</li>
                    </ul>
                    <span class="font-red">v0.5.2</span>
                    <ul>
                        <li>Fixed removing data source</li>
                        <li>Fixed expression of prop.</li>
                        <li>Added figures for model 1 and model 2</li>
                        <li>Fixed expression of growth 10%</li>
                        <li>Fixed sorting by LABEL_PROB</li>
                    </ul>
                </div>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="js/index.js" type="text/javascript"></script>
</body>
</html>