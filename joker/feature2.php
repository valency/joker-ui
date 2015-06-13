<html>
<head>
    <title>Project Joker: Feature & Analysis Result Table Demo</title>
    <?php require "../php/lib.php"; ?>
    <link rel="stylesheet" href="/lib/datatables-1.10.6/media/css/jquery.dataTables.css">
    <link rel="stylesheet" href="/lib/datatables-1.10.6/extensions/TableTools/css/dataTables.tableTools.css">
    <link rel="stylesheet" href="/lib/datatables-1.10.6/extensions/ColVis/css/dataTables.colVis.min.css">
    <link rel="stylesheet" href="css/feature.css"/>
    <script src="/lib/datatables-1.10.6/media/js/jquery.dataTables.min.js"></script>
    <script src="/lib/datatables-1.10.6/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
    <script src="/lib/datatables-1.10.6/extensions/ColVis/js/dataTables.colVis.min.js"></script>
    <script src="/lib/d3.min.js"></script>
    <script src="data/feature.js"></script>
    <script src="js/feature.js"></script>
    <script src="js/feature2.js"></script>
</head>
<body>
<div id="data_source">
    <h1>Racing Season 13-14</h1>
    <hr/>
    <span class="bold">No. of Customers: </span>
    <span id="data_count">Loading...</span>
</div>
<hr/>
<div>
    <span class="bold">Sort: </span>
    <select id="sort_mode">
        <option value="'CUST_ID'">CUST_ID</option>
        <option value="'AGE'">AGE</option>
        <option value="'GENDER'">GENDER</option>
        <option value="'YRS_W_CLUB'">YRS_W_CLUB</option>
        <option value="'IS_MEMBER'">IS_MEMBER</option>
        <option value="'IS_HRS_OWNER'">IS_HRS_OWNER</option>
        <option value="'MAJOR_CHANNEL'">MAJOR_CHANNEL</option>
        <option value="'MTG_NUM'">MTG_NUM</option>
        <option value="'INV'">INV</option>
        <option value="'INV_SEG1'">INV_SEG1</option>
        <option value="'INV_SEG2'">INV_SEG2</option>
        <option value="'INV_SEG3'">INV_SEG3</option>
        <option value="'DIV'">DIV</option>
        <option value="'RR'">RR</option>
        <option value="'END_BAL'">SOD_BAL</option>
        <option value="'RECHARGE_TIMES'">RECHARGE_TIMES</option>
        <option value="'RECHARGE_AMOUNT'">RECHARGE_AMOUNT</option>
        <option value="'WITHDRAW_TIMES'">WITHDRAW_TIMES</option>
        <option value="'WITHDRAW_AMOUNT'">WITHDRAW_AMOUNT</option>
        <option value="'LABEL_PROB'">LABEL_PROB</option>
    </select>
    <span class="bold" style="margin-left:5px;">Order: </span>
    <select id="order_mode">
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
    </select>
    <span class="bold" style="margin-left:5px;">Limit: </span>
    <input id="limit_size" value="100" style="width:5em;"/>
    <button onclick="load_data();">Show Details</button>
    <button id="show_stat_btn" onclick="show_figures();">Show Statistics</button>
</div>
<hr/>
<div id="figure_container"></div>
<div id="canvas_container">
    <span id="canvas_loading" style="color:red;display:none;">Loading...</span>
    <table id="canvas" class="compact" cellspacing="0" width="100%" style="display:none;">
        <thead>
        <tr>
            <th>ID</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Years w/ Club</th>
            <th>Member</th>
            <th>Horse Owner</th>
            <th>Major Channel</th>
            <th>Meetings Attend Last Season</th>
            <th>Total Investment</th>
            <th>Dividend</th>
            <th>Recovery Rate</th>
            <th>Balance</th>
            <th>Recharge Times</th>
            <th>Recharge Amount</th>
            <th>Withdraw Times</th>
            <th>Withdraw Amount</th>
            <th>Growth > 10%</th>
        </tr>
        </thead>
        <tbody id="canvas_tbody"></tbody>
    </table>
</div>
<div id="dialog-message" title="Loading..." style="display:none;">
    <p>Loading...</p>
</div>
</body>
</html>