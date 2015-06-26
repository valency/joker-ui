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
            <div class="table-scrollable">
                <table class="table table-striped table-bordered table-advance table-hover">
                    <thead>
                    <tr>
                        <th><i class="fa fa-briefcase"></i> File Name</th>
                        <th><i class="fa fa-database"></i> Size</th>
                        <th><i class="fa fa-clock-o"></i> Upload Time</th>
                        <th><i class='fa fa-cubes'></i> Manage</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php if ($handle = opendir('./data/')) {
                        while (false !== ($entry = readdir($handle))) {
                            if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == "csv") {
                                echo "<tr>";
                                echo "<td class='font-green bold'><a href='data/" . $entry . "' target='_blank'><i class='fa fa-file-o'></i> " . $entry . "</a></td>";
                                echo "<td>" . number_format(filesize('./data/' . $entry)) . "</td>";
                                echo "<td>" . date("F d Y, H:i:s", filemtime('./data/' . $entry)) . "</td>";
                                //                                echo "<td class='collapsing'>";
                                //                                echo "<button op='feature' filename='" . $entry . "' class='btn default btn-xs purple' data-toggle='confirmation' data-original-title='Are you sure?' data-singleton='true' data-popout='true'>Features</button>";
                                //                                echo "<button op='prediction' as='Grow' filename='" . $entry . "' class='btn default btn-xs blue' data-toggle='confirmation' data-original-title='Are you sure?' data-singleton='true' data-popout='true'>Predictions (Grow)</button>";
                                //                                echo "<button op='prediction' as='Lapse' filename='" . $entry . "' class='btn default btn-xs blue' data-toggle='confirmation' data-original-title='Are you sure?' data-singleton='true' data-popout='true'>Predictions (Decline)</button>";
                                //                                echo "<button op='prediction' as='Growth' filename='" . $entry . "' class='btn default btn-xs blue' data-toggle='confirmation' data-original-title='Are you sure?' data-singleton='true' data-popout='true'>Predictions (Growth)</button>";
                                //                                echo "";
                                //                                echo "</td>";
                                echo "<td>";
                                echo "<button onclick=\"datafile_import('" . $entry . "')\" class='btn default btn-xs blue'><i class='fa fa-edit'></i> Import</button>";
                                echo "<button onclick=\"datafile_delete('" . $entry . "')\" class='btn default btn-xs black'><i class='fa fa-trash-o'></i> Delete</button>";
                                echo "</td>";
                                echo "</tr>";
                            }
                        }
                        closedir($handle);
                    } ?>
                    </tbody>
                </table>
            </div>
            <!-- END PAGE -->
        </div>
    </div>
    <!-- END CONTENT -->
</div>
<?php require_once "components/footer.php"; ?>
<?php require_once "components/js.php"; ?>
<script src="js/data.js" type="text/javascript"></script>
</body>
</html>