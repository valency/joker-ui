<?php
$menu = $_GET["menu"];
$sub = $_GET["sub"];
require_once "menu.php";
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
                <a href="index.php">
                    <i class="icon-home"></i>
                    <span class="title"><?php echo $menu_words[0]; ?></span>
                    <?php if ($menu == 0) echo "<span class='selected'></span>"; ?>
                </a>
            </li>
            <li <?php if ($menu == 1) echo "class='start active open'"; ?>>
                <a href="javascript:void(0);">
                    <i class="icon-rocket"></i>
                    <span class="title"><?php echo $menu_words[1]; ?></span>
                    <?php if ($menu == 1) echo "<span class='selected'></span>"; ?>
                    <span class="arrow <?php if ($menu == 1) echo "open"; ?>"></span>
                </a>
                <ul class="sub-menu">
                    <li <?php if ($menu == 1 && $sub == 0) echo "class='active'"; ?>><a href="<?php echo $sub_urls[1][0]; ?>"><i class="icon-bar-chart"></i> <?php echo $sub_words[1][0]; ?> </a></li>
                    <li <?php if ($menu == 1 && $sub == 1) echo "class='active'"; ?>><a href="<?php echo $sub_urls[1][1]; ?>"><i class="icon-bar-chart"></i> <?php echo $sub_words[1][1]; ?> </a></li>
                    <li <?php if ($menu == 1 && $sub == 2) echo "class='active'"; ?>><a href="<?php echo $sub_urls[1][2]; ?>"><i class="icon-graph"></i> <?php echo $sub_words[1][2]; ?> </a></li>
                </ul>
            </li>
            <li <?php if ($menu == 2) echo "class='start active open'"; ?>>
                <a href="javascript:void(0);">
                    <i class="icon-settings"></i>
                    <span class="title"><?php echo $menu_words[2]; ?></span>
                    <?php if ($menu == 2) echo "<span class='selected'></span>"; ?>
                    <span class="arrow <?php if ($menu == 2) echo "open"; ?>"></span>
                </a>
                <ul class="sub-menu">
                    <li <?php if ($menu == 2 && $sub == 0) echo "class='active'"; ?>><a href="<?php echo $sub_urls[2][0]; ?>"><i class="icon-cloud-upload"></i> <?php echo $sub_words[2][0]; ?> </a></li>
                    <li <?php if ($menu == 2 && $sub == 1) echo "class='active'"; ?>><a href="<?php echo $sub_urls[2][1]; ?>"><i class="icon-bulb"></i> <?php echo $sub_words[2][1]; ?> </a></li>
                </ul>
            </li>
        </ul>
        <!-- END SIDEBAR MENU -->
    </div>
</div>
<!-- END SIDEBAR -->