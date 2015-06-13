<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[2][1] . "</title>";
    $domain = $_SERVER['HTTP_HOST'];
    $prefix = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
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
    <?php echo curl($prefix . $domain . '/projects/joker/components/sidebar.php?menu=2&sub=1'); ?>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <?php echo curl($prefix . $domain . '/projects/joker/components/breadcrumb.php?menu=2&sub=1'); ?>
            <!-- BEGIN PAGE -->
            <div class="table-scrollable">
                <table class="table table-striped table-bordered table-advance table-hover">
                    <thead>
                    <tr>
                        <th><i class="fa fa-briefcase"></i> File Name</th>
                        <th><i class="fa fa-database"></i> Size</th>
                        <th><i class="fa fa-clock-o"></i> Upload Time</th>
                        <th><i class='fa fa-edit'></i> Import As</th>
                        <th><i class='fa fa-cubes'></i> Manage</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php if ($handle = opendir('./data/')) {
                        while (false !== ($entry = readdir($handle))) {
                            if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == "csv") {
                                echo "<tr>";
                                echo "<td class='font-green bold'><i class='fa fa-file-o'></i> " . $entry . "</td>";
                                echo "<td>" . number_format(filesize('./data/' . $entry)) . " bytes</td>";
                                echo "<td>" . date("F d Y, H:i:s", filemtime('./data/' . $entry)) . "</td>";
                                echo "<td class='collapsing'>";
                                echo "<button op='feature' filename='" . $entry . "' class='btn default btn-xs purple' data-toggle='confirmation' data-original-title='Are you sure?'>Features</button>";
                                echo "<button op='prediction' as='Grow' filename='" . $entry . "' class='btn default btn-xs blue' data-toggle='confirmation' data-original-title='Are you sure?'>Predictions (Grow)</button>";
                                echo "<button op='prediction' as='Lapse' filename='" . $entry . "' class='btn default btn-xs blue' data-toggle='confirmation' data-original-title='Are you sure?'>Predictions (Lapse)</button>";
                                echo "<button op='prediction' as='Growth' filename='" . $entry . "' class='btn default btn-xs blue' data-toggle='confirmation' data-original-title='Are you sure?'>Predictions (Growth)</button>";
                                echo "";
                                echo "</td>";
                                echo "<td><button op='delete' filename='" . $entry . "' class='btn default btn-xs black' data-toggle='confirmation' data-original-title='Are you sure?'><i class='fa fa-trash-o'></i> Delete</button></td>";
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