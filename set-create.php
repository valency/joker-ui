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
    <link href="lib/ion-range-slider-2.1.2/css/ion.rangeSlider.css" rel="stylesheet" type="text/css"/>
    <link href="lib/ion-range-slider-2.1.2/css/ion.rangeSlider.skinFlat.css" rel="stylesheet" type="text/css"/>
    <link href="css/feature.css" rel="stylesheet" type="text/css"/>
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
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/description.php?model=3&page=0&ol=true'); ?>
            <div class="row form-group form-horizontal form-inline">
                <label class="col-md-2 control-label">Choose Data From:</label>

                <div class="col-md-3">
                    <a href="data.php" id="data_source_btn" class='form-control btn red no-border'><span>Loading...</span></a>
                    <input id="select_pred_model" value="1" hidden/>
                </div>
            </div>
            <div class="row form-group form-horizontal">
                <label class="col-md-2 control-label">Sort & Size:</label>

                <div class="col-md-8">
                    <div class="input-group">
                        <span class="input-group-addon">Sort</span>
                        <select id="select_pred_order" class="form-control">
                            <option value="random">Random</option>
                            <option value="-grow_prop">Grow Propensity</option>
                            <option value="-decline_prop">Decline Propensity</option>
                            <option value="-inv">Highest Turnover</option>
                            <option value="inv">Lowest Turnover</option>
                            <option value="-to_per_mtg">Highest Turnover per Meeting</option>
                            <option value="to_per_mtg">Lowest Turnover per Meeting</option>
                            <option value="-mtg_num">Highest Active Meetings</option>
                            <option value="mtg_num">Lowest Active Meetings</option>
                            <option value="-to_ytd_growth">Highest Racing Turnover Growth (YTD vs. PYTD)</option>
                            <option value="to_ytd_growth">Lowest Racing Turnover Growth (YTD vs. PYTD)</option>
                            <option value="-to_per_mtg_ytd_growth">Highest Turnover per Meeting Growth (YTD vs. PYTD)</option>
                            <option value="to_per_mtg_ytd_growth">Lowest Turnover per Meeting Growth (YTD vs. PYTD)</option>
                            <option value="-active_rate_ytd_growth">Highest Active Rate Growth (YTD vs. PYTD)</option>
                            <option value="active_rate_ytd_growth">Lowest Active Rate Growth (YTD vs. PYTD)</option>
                            <option value="-to_recent_growth">Highest Racing Turnover Growth (Last 14 Meetings vs. Comparable 14 Meetings)</option>
                            <option value="to_recent_growth">Lowest Racing Turnover Growth (Last 14 Meetings vs. Comparable 14 Meetings)</option>
                            <option value="-to_per_mtg_recent_growth">Highest Turnover per Meeting Growth (Last 14 Meetings vs. Comparable 14 Meetings)</option>
                            <option value="to_per_mtg_recent_growth">Lowest Turnover per Meeting Growth (Last 14 Meetings vs. Comparable 14 Meetings)</option>
                            <option value="-active_rate_recent_growth">Highest Active Rate Growth (Last 14 Meetings vs. Comparable 14 Meetings)</option>
                            <option value="active_rate_recent_growth">Lowest Active Rate Growth (Last 14 Meetings vs. Comparable 14 Meetings)</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <span class="input-group-addon">Size</span>
                        <input id="no_of_records" class="form-control" type="text" value="500" data-toggle="tooltip" title="0 = All Data"/>
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
            <div class="row form-group form-horizontal">
                <div class="col-md-2">
                    <label class="pull-right">Options:</label>
                </div>
                <div class="col-md-10">
                    <div class="checkbox">
                        <label><input type="checkbox" id="select_shuffle_with_limit"> Randomly Select from Top 20% *</label>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="row small font-purple">
                <div class="col-md-12">
                    <span>* If checked, the size of resulting customer set may be less than the designated size due to a smaller size of the top 20% of data.</span>
                </div>
            </div>
            <hr/>
            <div class="row form-group form-horizontal">
                <div class="col-md-6"></div>
                <div class="col-md-4">
                    <input class="form-control" id="set_title" placeholder="Name of the Customer Set"/>
                </div>
                <div class="col-md-2">
                    <button class="form-control btn green no-border" onclick="create_set();">Create</button>
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
<script src="lib/ion-range-slider-2.1.2/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
<script src="js/set-create.js" type="text/javascript"></script>
</body>
</html>
