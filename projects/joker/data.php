<html>
<head>
    <title>Project Joker</title>
    <?php require "../../php/lib.php"; ?>
</head>
<body>
<div>
    <a href="index.php" style="float:right;margin-top:12px;"><img class="ui avatar image" src="/img/home.png"></a>

    <h1>CSV Data Processor</h1>

    <h3 class="label-yellow-font">Last Update: <?php echo date("F d Y, H:i:s", filemtime("./data.php")); ?></h3>
</div>
<hr/>
<table class="ui celled striped table">
    <thead>
    <tr>
        <th colspan="4"> Files</th>
    </tr>
    </thead>
    <tbody>
    <?php if ($handle = opendir('./data/')) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != ".." && pathinfo($entry, PATHINFO_EXTENSION) == "csv") {
                echo "<tr>";
                echo "<td class='bold'><i class='file outline icon'></i> " . $entry . "</td>";
                echo "<td class='right aligned'>" . number_format(filesize('./data/' . $entry)) . " bytes</td>";
                echo "<td class='right aligned'>" . date("F d Y, H:i:s", filemtime('./data/' . $entry)) . "</td>";
                echo "<td class='left aligned collapsing'>";
                echo "<a href='javascript:void(0)' class='ui teal button'>Add as Features</a>";
                echo "<a href='javascript:void(0)' class='ui teal button'>Add as Predictions</a>";
                echo "<a href='javascript:void(0)' class='ui red minimal button' onclick=\"refresh_confirm_filename('" . $entry . "');\">Delete</a>";
                echo "</td>";
                echo "</tr>";
            }
        }
        closedir($handle);
    } ?>
    </tbody>
</table>
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
<script>
    $(document).ready(function () {
        $('.basic.demo.modal').modal('attach events', '.minimal.button');
    });
    function refresh_confirm_filename(f) {
        $("#confirm_filename").html(f);
    }
    function delete_file() {
        $.get("data/delete.php?f=" + $("#confirm_filename").html(), function (r) {
            if (r != "1") alert("Something is wrong while deleting the file!");
            location.reload();
        });
    }
</script>
</body>
</html>