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
            <div><input id="file_upload" class="hidden" type="file" name="files[]" data-url="./data/?dir=." multiple/></div>
            <div id="file_list_table_wrapper">
                <table class="table table-striped table-bordered table-advance table-hover">
                    <thead>
                    <tr class="heading">
                        <th><i class="fa fa-briefcase"></i> File Name</th>
                        <th><i class="fa fa-database"></i> Size</th>
                        <th><i class="fa fa-clock-o"></i> Upload Time</th>
                        <th><i class='fa fa-cubes'></i> Manage</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php if ($handle = opendir('./data/')) {
                        while (false !== ($entry = readdir($handle))) {
                            if ($entry != "." && $entry != ".." && (pathinfo($entry, PATHINFO_EXTENSION) == "csv" || pathinfo($entry, PATHINFO_EXTENSION) == "gz")) {
                                echo "<tr>";
                                echo "<td><a class='file-entry' href='data/" . $entry . "' target='_blank'><i class='fa fa-file-text-o'></i> " . $entry . "</a></td>";
                                echo "<td>" . number_format(filesize('./data/' . $entry)) . "</td>";
                                echo "<td>" . date("Y-m-d H:i:s", filemtime('./data/' . $entry)) . "</td>";
                                echo "<td style='white-space:nowrap;'>";
                                if (pathinfo($entry, PATHINFO_EXTENSION) == "csv") {
                                    echo "<button onclick=\"datafile_import('" . $entry . "')\" class='btn default btn-xs blue btn-admin'><i class='fa fa-edit'></i> Import</button>";
                                } elseif (pathinfo($entry, PATHINFO_EXTENSION) == "gz") {
                                    echo "<button onclick=\"datafile_extract('" . $entry . "')\" class='btn default btn-xs purple btn-admin'><i class='fa fa-download'></i> Extract</button>";
                                }
                                echo "<button onclick=\"delete_data_file('" . $entry . "')\" class='btn default btn-xs black btn-admin'><i class='fa fa-trash-o'></i> Delete</button>";
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
<script src="lib/jquery-file-upload-9.10.1/js/vendor/jquery.ui.widget.js"></script>
<script src="lib/jquery-file-upload-9.10.1/js/jquery.iframe-transport.js"></script>
<script src="lib/jquery-file-upload-9.10.1/js/jquery.fileupload.js"></script>
<script src="js/data.js" type="text/javascript"></script>
</body>
</html>