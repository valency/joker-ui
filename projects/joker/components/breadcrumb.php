<?php
$menu = $_GET["menu"];
$sub = $_GET["sub"];
require_once "menu.php";
?>
<!-- BEGIN BREADCRUMB -->
<h3 class="page-title"><?php if ($menu == "0") echo $menu_words[$menu]; else echo $sub_words[$menu][$sub]; ?></h3>
<div class="page-bar">
    <ul class="page-breadcrumb">
        <li>
            <i class="fa fa-home"></i>
            <a href="index.php">Home</a>
            <i class="fa fa-angle-right"></i>
        </li>
        <li>
            <a href="<?php if ($menu == "0") echo "index.php"; else echo "javascript:void(0)"; ?>"><?php echo $menu_words[$menu]; ?></a>
            <?php if ($menu != "0") echo "<i class='fa fa-angle-right'></i>"; ?>
        </li>
        <?php if ($menu != "0") echo "<li><a href=" . $sub_urls[$menu][$sub] . ">" . $sub_words[$menu][$sub] . "</a></li>"; ?>
    </ul>
</div>
<!-- END BREADCRUMB -->
