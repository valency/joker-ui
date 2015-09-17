<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $menu_words[0] . "</title>";
    ?>
</head>
<body class="page-header-<span class='font-purple'>Fixed</span> page-quick-sidebar-over-content page-sidebar-closed-hide-logo">
<div class="page-header -i navbar navbar-<span class='font-purple'>Fixed</span>-top">
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
                    <h3>Updates</h3>
                    <span class="font-blue">v0.9.7</span>
                    <ul>
                        <li><span class='font-green'>Added</span> hints for customer table and details</li>
                        <li><span class='font-green'>Added</span> responsive design for review of customer sets</li>
                    </ul>
                    <span class="font-blue">v0.9.2</span>
                    <ul>
                        <li><span class='font-purple'>Fixed</span> multiple badges bug on data management page</li>
                        <li><span class='font-red'>Removed</span> open sans font to increase performance</li>
                    </ul>
                    <span class="font-blue">v0.9.1</span>
                    <ul>
                        <li><span class='font-red'>Removed</span> withdraw / recharge options from column filters</li>
                        <li><span class='font-purple'>Fixed</span> reason code display bug</li>
                        <li><span class='font-purple'>Fixed</span> x axis too dense bug of turnover distribution figure</li>
                        <li><span class='font-purple'>Fixed</span> x axis order bug of turnover distribution figure</li>
                    </ul>
                    <span class="font-blue">v0.8.30</span>
                    <ul>
                        <li><span class='font-green'>Added</span> display of turnover and active rate trends</li>
                        <li><span class='font-green'>Added</span> auto-complete for customer set search</li>
                        <li><span class='font-red'>Removed</span> features list from dashboard</li>
                        <li><span class='font-green'>Added</span> responsive menu toggle on small screens (mobile version)</li>
                        <li><span class='font-yellow'>Modified</span> model 3 UI design</li>
                        <li><span class='font-yellow'>Modified</span> figures to be resized to maximized screen space</li>
                        <li><span class='font-green'>Added</span> zooming only on x / y axis</li>
                    </ul>
                    <span class="font-blue">v0.8.26</span>
                    <ul>
                        <li><span class='font-purple'>Fixed</span> clear database bug</li>
                        <li><span class='font-yellow'>Modified</span> # of reason codes to 6</li>
                        <li><span class='font-yellow'>Modified</span> investment to turnover (TO)</li>
                        <li><span class='font-yellow'>Modified</span> meetings attended to active meetings</li>
                        <li><span class='font-red'>Removed</span> displays of recharge / withdrawal information</li>
                        <li><span class='font-green'>Added</span> links on dashboard</li>
                        <li><span class='font-green'>Added</span> colors to updates</li>
                        <li><span class='font-green'>Added</span> turnover parts</li>
                    </ul>
                    <span class="font-blue">v0.8.20</span>
                    <ul>
                        <li><span class='font-green'>Added</span> customer set model</li>
                        <li><span class='font-red'>Removed</span> data exploration page</li>
                        <li><span class='font-green'>Added</span> customer set management pages</li>
                        <li><span class='font-yellow'>Modified</span> clustering for customer sets</li>
                        <li><span class='font-yellow'>Modified</span> first time usage policy</li>
                        <li><span class='font-yellow'>Modified</span> certificates</li>
                    </ul>
                    <span class="font-blue">v0.8.16</span>
                    <ul>
                        <li><span class='font-yellow'>Modified</span> API subsystem architecture</li>
                        <li><span class='font-green'>Added</span> user system</li>
                        <li><span class='font-green'>Added</span> source of data</li>
                        <li><span class='font-red'>Removed</span> upload page</li>
                        <li><span class='font-green'>Added</span> uploading in data management</li>
                        <li><span class='font-green'>Added</span> data source system</li>
                        <li><span class='font-yellow'>Modified</span> exporting file name as data source and configurations</li>
                    </ul>
                    <span class="font-blue">v0.8.7</span>
                    <ul>
                        <li><span class='font-purple'>Fixed</span> exporting of large csv file bug</li>
                        <li><span class='font-red'>Removed</span> exporting to excel</li>
                        <li><span class='font-green'>Added</span> cleaning database before importing data</li>
                        <li><span class='font-green'>Added</span> current working data set indicator</li>
                        <li><span class='font-green'>Added</span> gzip support</li>
                        <li><span class='font-green'>Added</span> zoom in / out buttons</li>
                    </ul>
                    <span class="font-blue">v0.8.6</span>
                    <ul>
                        <li><span class='font-yellow'>Modified</span> model 3 test page title to data exploration</li>
                        <li><span class='font-yellow'>Modified</span> data exploration axis to dotted grey</li>
                        <li><span class='font-green'>Added</span> data filter for data exploration</li>
                        <li><span class='font-purple'>Fixed</span> data filter or operation not working bug</li>
                        <li><span class='font-purple'>Fixed</span> data filter and operation bug (cannot combine same field)</li>
                    </ul>
                    <span class="font-blue">v0.7.30</span>
                    <ul>
                        <li><span class='font-green'>Added</span> updates log</li>
                        <li><span class='font-purple'>Fixed</span> overlapping bug of the x axis of figures</li>
                        <li><span class='font-green'>Added</span> plot test page</li>
                        <li><span class='font-green'>Added</span> figure zoom / pan features (non-categorical only)</li>
                    </ul>
                    <span class="font-blue">v0.7.25</span>
                    <ul>
                        <li><span class='font-purple'>Fixed</span> model 3 api call bug</li>
                        <li><span class='font-yellow'>Modified</span> distance model to cosine distance for clustering</li>
                        <li><span class='font-green'>Added</span> categorical clustering support</li>
                    </ul>
                    <span class="font-blue">v0.7.15</span>
                    <ul>
                        <li><span class='font-green'>Added</span> https certificate at footer, please import to os before using the system</li>
                        <li><span class='font-yellow'>Modified</span> data model to model-oriented</li>
                        <li><span class='font-red'>Removed</span> model 2 data</li>
                    </ul>
                    <span class="font-blue">v0.7.13</span>
                    <ul>
                        <li><span class='font-purple'>Fixed</span> model 2 figure 1 bug</li>
                        <li><span class='font-yellow'>Modified</span> api subsystem to nginx / gunicorn</li>
                        <li><span class='font-green'>Added</span> table column dragging</li>
                        <li><span class='font-green'>Added</span> table column hide / show</li>
                    </ul>
                    <span class="font-blue">v0.6.29</span>
                    <ul>
                        <li><span class='font-green'>Added</span> registration</li>
                        <li><span class='font-yellow'>Modified</span> model 1 data set</li>
                        <li><span class='font-green'>Added</span> uploading model validation files on-the-fly</li>
                        <li><span class='font-yellow'>Modified</span> separated pages of model validation</li>
                        <li><span class='font-green'>Added</span> enlarging model statistics figure</li>
                    </ul>
                    <span class="font-blue">v0.6.28</span>
                    <ul>
                        <li><span class='font-yellow'>Modified</span> words of lapse to decline</li>
                        <li><span class='font-yellow'>Modified</span> predictions to the front of tables</li>
                        <li><span class='font-green'>Added</span> export all data (exporting large amount of data (>3000 records) is very slow)</li>
                        <li><span class='font-green'>Added</span> printing of current page</li>
                        <li><span class='font-green'>Added</span> portlet to statistical figures</li>
                        <li><span class='font-green'>Added</span> model validation</li>
                        <li><span class='font-green'>Added</span> fake login (username: smartcube, password: 1ac14128-4467-40f3-bf81-ebe0fad3f866)</li>
                        <li><span class='font-yellow'>Modified</span> clustering only on model 1</li>
                        <li><span class='font-purple'>Fixed</span> model 3 plotting bug</li>
                        <li><span class='font-yellow'>Modified</span> user profile page</li>
                        <li><span class='font-yellow'>Modified</span> demo url to: http://120.25.209.91</li>
                    </ul>
                    <span class="font-blue">v0.6.11</span>
                    <ul>
                        <li><span class='font-yellow'>Modified</span> API system to Django</li>
                        <li><span class='font-yellow'>Modified</span> UI system to Bootstrap</li>
                        <li><span class='font-yellow'>Modified</span> default sorting mode to sync with query</li>
                        <li><span class='font-green'>Added</span> exporting feature</li>
                        <li><span class='font-green'>Added</span> show / hide column feature</li>
                        <li><span class='font-red'>Removed</span> prediction mode of model 1</li>
                        <li><span class='font-green'>Added</span> predictions in model tables</li>
                        <li><span class='font-green'>Added</span> separated customer page</li>
                    </ul>
                    <span class="font-blue">v0.5.16</span>
                    <ul>
                        <li><span class='font-yellow'>Modified</span> YTD to PYTD</li>
                        <li><span class='font-yellow'>Modified</span> prediction period list</li>
                        <li><span class='font-red'>Removed</span> options in detail window</li>
                        <li><span class='font-green'>Added</span> ranking in detail window</li>
                        <li><span class='font-purple'>Fixed</span> model 2 ordering bug</li>
                    </ul>
                    <span class="font-blue">v0.5.14</span>
                    <ul>
                        <li><span class='font-green'>Added</span> ordering function</li>
                        <li><span class='font-yellow'>Modified</span> yearly to annual in period selection of model 1</li>
                        <li><span class='font-yellow'>Modified</span> Fig 1.1 to Growth Rate of Turnover (YTD)</li>
                        <li><span class='font-green'>Added</span> KPI in Fig 1.1 & 2.1</li>
                        <li><span class='font-yellow'>Modified</span> Fig 1.2 to Turnover per Meeting</li>
                        <li><span class='font-yellow'>Modified</span> color palette for all piecharts</li>
                        <li><span class='font-yellow'>Modified</span> Fig 1.5 & 1.6 to Turnover of … (YTD)</li>
                        <li><span class='font-yellow'>Modified</span> the format of propensity in data table to percentage</li>
                        <li><span class='font-yellow'>Modified</span> Fig 2.1 to Avg. Act. Rate (YTD)</li>
                        <li><span class='font-yellow'>Modified</span> Fig 2.2 to # of Active Custs. per Meeting</li>
                        <li><span class='font-yellow'>Modified</span> the x axis of Fig 1.3, 2.3, and 2.4</li>
                        <li><span class='font-yellow'>Modified</span> Fig 2.6 & 2.7 to New Custs.' Turnover of … (YTD)</li>
                    </ul>
                    <span class="font-blue">v0.5.2</span>
                    <ul>
                        <li><span class='font-purple'>Fixed</span> removing data source</li>
                        <li><span class='font-purple'>Fixed</span> expression of prop.</li>
                        <li><span class='font-green'>Added</span> figures for model 1 and model 2</li>
                        <li><span class='font-purple'>Fixed</span> expression of growth 10%</li>
                        <li><span class='font-purple'>Fixed</span> sorting by LABEL_PROB</li>
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
