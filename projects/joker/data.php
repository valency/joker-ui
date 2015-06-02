<html>
<head>
    <?php
    require_once "components/menu.php";
    echo "<title>SmartCube | " . $sub_words[2][1] . "</title>";
    $domain = $_SERVER['HTTP_HOST'];
    $prefix = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
    require_once "../../php/lib.php";
    require_once "../../php/common.php";
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
                        <th><i class="fa fa-user"></i> Size</th>
                        <th><i class="fa fa-shopping-cart"></i> Upload Time</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php if ($handle = opendir('./data/')) {
                        while (false !== ($entry = readdir($handle))) {
                            if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == "csv") {
                                echo "<tr>";
                                echo "<td class='hidden-xs'>" . $entry . "</td>";
                                echo "<td class='right aligned'>" . number_format(filesize('./data/' . $entry)) . " bytes</td>";
                                echo "<td class='right aligned'>" . date("F d Y, H:i:s", filemtime('./data/' . $entry)) . "</td>";
                                echo "<td class='left aligned collapsing'>";
                                echo "<a href='javascript:void(0)' class='btn default btn-xs purple'><i class='fa fa-edit'></i> Add as Features </a>";
                                echo "<a href='javascript:void(0)' class='btn default btn-xs blue'><i class='fa fa-edit'></i> Add as Predictions</a>";
                                echo "<a href='javascript:void(0)' class='btn default btn-xs black' onclick=\"refresh_confirm_filename('" . $entry . "');\"><i class='fa fa-trash-o'></i> Delete</a>";
                                echo "</td>";
                                echo "</tr>";
                            }
                        }
                        closedir($handle);
                    } ?>
                    </tbody>
                </table>
            </div>
            <div class="ui basic demo modal">
                <div class="header">Delete File</div>
                <div class="content">
                    <div class="image">
                        <i class="archive icon"></i>
                    </div>
                    <div class="description">
                        <p>Are you sure you want to delete the following file?<br/><span id="confirm_filename" class="label-red-font">...</span></p>
                    </div>
                </div>
                <div class="actions">
                    <div class="two fluid ui inverted buttons">
                        <div class="ui red basic cancel inverted button">
                            <i class="remove icon"></i>
                            No
                        </div>
                        <div class="ui green ok basic inverted button" onclick="delete_file();">
                            <i class="checkmark icon"></i>
                            Yes
                        </div>
                    </div>
                </div>
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