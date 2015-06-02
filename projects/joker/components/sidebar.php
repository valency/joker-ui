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
                    <i class="<?php echo $menu_icons[0]; ?>"></i>
                    <span class="title"><?php echo $menu_words[0]; ?></span>
                    <?php if ($menu == 0) echo "<span class='selected'></span>"; ?>
                </a>
            </li>
            <?php for ($i = 1; $i < count($menu_words); $i++) {
                echo "<li";
                if ($menu == $i) echo " class='start active open'";
                echo "><a href='javascript:void(0);'><i class='" . $menu_icons[$i] . "'></i>";
                echo "<span class='title'>" . $menu_words[$i] . "</span>";
                if ($menu == $i) echo "<span class='selected'></span>";
                echo "<span class='arrow";
                if ($menu == $i) echo " open";
                echo "'></span></a><ul class='sub-menu'>";
                for ($j = 0; $j < count($sub_words[$i]); $j++) {
                    echo "<li";
                    if ($menu == $i && $sub == $j) echo " class='active'";
                    echo "><a href=" . $sub_urls[$i][$j] . "><i class=" . $sub_icons[$i][$j] . "></i> " . $sub_words[$i][$j] . "</a></li>";
                }
                echo "</ul></li>";
            } ?>
        </ul>
        <!-- END SIDEBAR MENU -->
    </div>
</div>
<!-- END SIDEBAR -->