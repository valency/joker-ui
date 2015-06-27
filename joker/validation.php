<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[1][6] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=1&sub=6'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=1&sub=6'); ?>
            <!-- BEGIN PAGE -->
            <div id="form" style="display:none;">
                <div class="row form-group">
                    <div class="col-md-9">
                        <div class="input-group">
                            <span class="input-group-addon">Source File</span>
                            <select id="select2_source" class="form-control select2">
                                <?php if ($handle = opendir('./data/')) {
                                    while (false !== ($entry = readdir($handle))) {
                                        if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == "csv") {
                                            echo "<option value='" . $entry . "'>";
                                            echo $entry;
                                            echo "</option>";
                                        }
                                    }
                                    closedir($handle);
                                } ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group">
                            <span class="input-group-addon">Model</span>
                            <select id="select2_model" class="form-control">
                                <option value="Grow">Grow Propensity</option>
                                <option value="Lapse">Decline Propensity</option>
                                <option value="Growth">Chance to be Regular</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">Segment</span>
                            <input type='hidden' id='select2_segment' class='form-control select2' value=''/>
                        </div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-12">
                        <button class="btn green pull-right" type="button" onclick="validate();">Validate</button>
                    </div>
                </div>
            </div>
            <div id="canvas" style="display:none;">
                <div id="canvas_label"></div>
                <hr/>
                <div class="table-scrollable">
                    <table class="table table-striped table-bordered table-advance table-hover">
                        <thead>
                        <tr id="canvas_table_header" class="heading">
                            <th><i class="fa fa-briefcase"></i> Ground Truth</th>
                            <th><i class="fa fa-asterisk"></i> SmartCube Model</th>
                        </tr>
                        </thead>
                        <tbody id="canvas_table_body"></tbody>
                        <tfoot id="canvas_table_foot" class="bg-grey-mint"></tfoot>
                    </table>
                </div>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="js/feature.js" type="text/javascript"></script>
<script src="js/validation.js" type="text/javascript"></script>
</body>
</html>