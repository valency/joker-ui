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
                <div class="row">
                    <div class="col-md-12">
                        <span class="label bg-red">RESULTS</span>
                        <span class="label bg-grey">MODEL_1</span>
                        <span class="label bg-grey">MODEL_2</span>
                        <span class="label bg-grey">...</span>
                        <span class="label bg-grey">MODEL_N</span>
                    </div>
                </div>
                <hr/>
                <div class="row form-group">
                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">Source File</span>
                            <select id="select2_source" class="form-control select2">
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
                            <span class="input-group-btn"><button class="btn purple" type="button" style="margin-left:10px;" onclick="$('#file_upload').click();"><i class="fa fa-upload"></i> Upload New Data</button></span>
                            <span class="input-group-btn"><button class="btn red" type="button" style="margin-left:10px;" onclick="delete_validation_file();"><i class="fa fa-times"></i> Delete</button></span>
                            <input id="file_upload" class="hidden" type="file" name="files[]" data-url="./data/?dir=validation" multiple>
                        </div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-addon">Segment</span>
                            <input type='hidden' id='select2_segment' class='form-control select2' value=''/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <span class="input-group-addon">Model</span>
                            <select id="select2_model" class="form-control"></select>
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
<script src="lib/jquery-file-upload-9.10.1/js/vendor/jquery.ui.widget.js"></script>
<script src="lib/jquery-file-upload-9.10.1/js/jquery.iframe-transport.js"></script>
<script src="lib/jquery-file-upload-9.10.1/js/jquery.fileupload.js"></script>
<script src="lib/d3.min.js"></script>
<script src="js/figure.js" type="text/javascript"></script>
<script src="js/feature.js" type="text/javascript"></script>
<script src="js/validation.js" type="text/javascript"></script>
</body>
</html>