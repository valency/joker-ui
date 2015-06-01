<?php
$menu = $_GET["menu"];
$sub = $_GET["sub"];
?>
<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
    <div class="page-sidebar navbar-collapse collapse">
        <!-- BEGIN SIDEBAR MENU -->
        <ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
            <li class="sidebar-toggler-wrapper" style="margin-bottom:15px;">
                <div class="sidebar-toggler"></div>
            </li>
            <li <?php if ($menu == 0) echo "class='start active open'"; ?>>
                <a href="javascript:void(0);">
                    <i class="icon-home"></i>
                    <span class="title">Dashboard</span>
                    <?php if ($menu == 0) echo "<span class='selected'></span>"; ?>
                </a>
            </li>
            <li <?php if ($menu == 1) echo "class='start active open'"; ?>>
                <a href="javascript:void(0);">
                    <i class="icon-home"></i>
                    <span class="title">Demo</span>
                    <?php if ($menu == 1) echo "<span class='selected'></span>"; ?>
                    <span class="arrow <?php if ($menu == 1) echo "open"; ?>"></span>
                </a>
                <ul class="sub-menu">
                    <li <?php if ($menu == 1 && $sub == 0) echo "class='active'"; ?>><a href="feature1.php"><i class="icon-bar-chart"></i> Model 1</a></li>
                    <li <?php if ($menu == 1 && $sub == 1) echo "class='active'"; ?>><a href="feature2.php"><i class="icon-bar-chart"></i> Model 2</a></li>
                    <li <?php if ($menu == 1 && $sub == 2) echo "class='active'"; ?>><a href="cluster.php"><i class="icon-graph"></i> Model 3</a></li>
                </ul>
            </li>
            <li <?php if ($menu == 2) echo "class='start active open'"; ?>>
                <a href="javascript:void(0);">
                    <i class="icon-basket"></i>
                    <span class="title">Maintenance</span>
                    <?php if ($menu == 2) echo "<span class='selected'></span>"; ?>
                    <span class="arrow <?php if ($menu == 2) echo "open"; ?>"></span>
                </a>
                <ul class="sub-menu">
                    <li <?php if ($menu == 2 && $sub == 0) echo "class='active'"; ?>><a href="upload.php"><i class="icon-home"></i> CSV Data Uploader</a></li>
                    <li <?php if ($menu == 2 && $sub == 1) echo "class='active'"; ?>><a href="data.php"><i class="icon-bulb"></i> CSV Data Processor</a></li>
                </ul>
            </li>
        </ul>
        <!-- END SIDEBAR MENU -->
    </div>
</div>
<!-- END SIDEBAR -->