<html>
<head>
    <?php
    require_once "components/common.php";
    require_once "components/lib.php";
    require_once "components/css.php";
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[2][1] . "</title>";
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
    <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/sidebar.php?menu=2&sub=1'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($PROTOCOL . $DOMAIN . '/joker/components/breadcrumb.php?menu=2&sub=1'); ?>
            <!-- BEGIN PAGE -->
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
                            if ($entry != "." && $entry != ".." && (pathinfo($entry, PATHINFO_EXTENSION) == "csv" || pathinfo($entry, PATHINFO_EXTENSION) == "gz")) {
                                echo "<tr>";
                                echo "<td class='font-green bold'><a class='file-entry' href='data/" . $entry . "' target='_blank'><i class='fa fa-file-o'></i> " . $entry . "</a></td>";
                                echo "<td>" . number_format(filesize('./data/' . $entry)) . "</td>";
                                echo "<td>" . date("F d Y, H:i:s", filemtime('./data/' . $entry)) . "</td>";
                                echo "<td>";
                                if (pathinfo($entry, PATHINFO_EXTENSION) == "csv") {
                                    echo "<button onclick=\"datafile_import('" . $entry . "')\" class='btn default btn-xs blue'><i class='fa fa-edit'></i> Import</button>";
                                } elseif (pathinfo($entry, PATHINFO_EXTENSION) == "gz") {
                                    echo "<button onclick=\"datafile_extract('" . $entry . "')\" class='btn default btn-xs purple'><i class='fa fa-download'></i> Extract</button>";
                                }
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