<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    $page = basename($_SERVER["SCRIPT_FILENAME"]) . "?mode=" . $_GET["mode"];
    echo "<title>SmartCube | " . find_title_by_url_from_array($menu, $page) . "</title>";
    ?>
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?page=' . $page); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?page=' . $page); ?>
            <!-- BEGIN PAGE -->
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/description.php?model=' . $_GET["mode"]); ?>
            <div id="form" style="display:none;">
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">Ground Truth <sup class="font-purple">1</sup></span>
                            <select id="select-ground-truth" class="form-control select2">
                                <?php if ($handle = opendir('./data/validation/ground-truth/')) {
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
                            <span class="input-group-btn"><button class="btn purple" type="button" style="margin-left:10px;" onclick="$('#upload-ground-truth').click();"><i class="fa fa-upload"></i> Upload</button></span>
                            <span class="input-group-btn"><button class="btn purple" type="button" style="margin-left:10px;" onclick="window.open('data/validation/ground-truth/'+$('#select-ground-truth').val());"><i class="fa fa-download"></i> Download</button></span>
                            <span class="input-group-btn"><button class="btn red" type="button" style="margin-left:10px;" onclick="delete_data_file('validation/ground-truth/'+$('#select-ground-truth').val());"><i class="fa fa-times"></i> Delete</button></span>
                            <input id="upload-ground-truth" class="file-upload hidden" type="file" name="files[]" data-url="./data/?dir=validation/ground-truth" multiple/>
                        </div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">Club Model Results <sup class="font-purple">2</sup></span>
                            <select id="select-club-model" class="form-control select2">
                                <?php if ($handle = opendir('./data/validation/')) {
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
                            <span class="input-group-btn"><button class="btn purple" type="button" style="margin-left:10px;" onclick="$('#upload-club-model').click();"><i class="fa fa-upload"></i> Upload</button></span>
                            <span class="input-group-btn"><button class="btn purple" type="button" style="margin-left:10px;" onclick="window.open('data/validation/'+$('#select-club-model').val());"><i class="fa fa-download"></i> Download</button></span>
                            <span class="input-group-btn"><button class="btn red" type="button" style="margin-left:10px;" onclick="delete_data_file('validation/'+$('#select-club-model').val());"><i class="fa fa-times"></i> Delete</button></span>
                            <input id="upload-club-model" class="file-upload hidden" type="file" name="files[]" data-url="./data/?dir=validation" multiple/>
                        </div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-addon">Segment</span>
                            <input type='hidden' id='select-segment' class='form-control select2' value=''/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-addon">Model</span>
                            <select id="select-model" class="form-control"></select>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="row small font-purple">
                    <div class="col-md-12">
                        <span><sup class="font-red">1</sup> The file of ground truth be a CSV-formatted file which contains a sorted list of CUST_ID. The header of the CSV file should be "TRUTH".</span>
                    </div>
                    <div class="col-md-12">
                        <span><sup class="font-red">2</sup> The file of club model results should be a CSV-formatted file where each column represents a sorted list of CUST_ID of one model. The header of the CSV file should be the names of models.</span>
                    </div>
                </div>
                <hr/>
                <div class="row form-group">
                    <div class="col-md-12">
                        <button class="btn green pull-right" type="button" onclick="validate();"><i class="fa fa-play"></i> Validate</button>
                    </div>
                </div>
            </div>
            <div id="canvas" style="display:none;">
                <div id="canvas_label"></div>
                <hr/>
                <div class="table-scrollable">
                    <table class="table table-striped table-bordered table-advance table-hover">
                        <thead>
                        <tr id="canvas-table-header" class="heading">
                            <th><i class="fa fa-asterisk"></i> SmartCube Model</th>
                        </tr>
                        </thead>
                        <tbody id="canvas-table-body"></tbody>
                        <tfoot id="canvas-table-foot" class="bg-red"></tfoot>
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
<script src="lib/jquery-file-upload-9.10.1/js/vendor/jquery.ui.widget.js"></script>
<script src="lib/jquery-file-upload-9.10.1/js/jquery.iframe-transport.js"></script>
<script src="lib/jquery-file-upload-9.10.1/js/jquery.fileupload.js"></script>
<script src="lib/d3.min.js"></script>
<script src="js/figure.js" type="text/javascript"></script>
<script src="js/feature.js" type="text/javascript"></script>
<script src="js/validation.js" type="text/javascript"></script>
</body>
</html>