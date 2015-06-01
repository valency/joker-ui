<html>
<head>
    <title>Project Joker: Clustering Demo</title>
    <?php require "../../php/lib.php"; ?>
    <link rel="stylesheet" href="css/cluster.css"/>
    <script src="/lib/d3.min.js"></script>
    <script src="js/cluster.js"></script>
</head>
<body>
<div>
    <p>
        <span>Schema: </span>
        <select id="schema">
            <option value="feature_11">feature_11</option>
            <option value="feature_and_result">feature_and_result</option>
        </select>
        <span style="margin-left:5px;">Job ID: </span><input id="job_id" value="" style="width:24em;"/>
    </p>

    <p>
        <span># of Records: </span><input id="no_of_records" value="100" style="width:5em;"/>
        <span style="margin-left:5px;"># of Clusters: </span><input id="no_of_clusters" value="3" style="width:3em;"/>
    </p>

    <p>
        <a href="javascript:void(0)" onclick="load_header();">Show Header</a> |
        <a href="javascript:void(0)" onclick="generate_data();">Generate Data</a> |
        <a href="javascript:void(0)" onclick="cluster();">Perform Clustering</a> |
        <a href="javascript:void(0)" onclick="plot();">Plot Results</a>
    </p>
</div>
<hr/>
<div id="canvas"></div>
</body>
</html>