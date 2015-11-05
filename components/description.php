<?php
$heading = [
    "Growth / Decline Analysis",
    "New Customers Analysis",
    "Clustering",
    "Bet Type Analysis"
];
$description = [
    "The model forecasts each customer's near term turnover growth and decline. Customers with higher growth/decline propensity scores are more likely to grow / decline.",
    "The model forecasts new customers' future active rate.",
    "The model finds clusters of customers by considering various attributes intelligently. Up to 15 attributes can be used and up to 8 clusters can be formed each time. Clustering results can also be downloaded to local for further analysis.",
    "The model predict each customer’s propensity to change his bet type preference from normal to exotic types."
];
$details = [
    "<li>Growth is defined as customers in the top 20% of turnover growth of meetings in next 2 months versus comparable meetings from previous season.</li>" .
    "<li>Decline is the bottom 20% of customers.</li>" .
    "<li>Scores are recalculated after the last race meeting of each month.</li>" .
    "<li>Predictions are made with a lead time of 1 month.</li>" .
    "<li>E.g. After the final race meeting in Jan, the model will make prediction for Mar and Apr.</li>" .
    "<li>Customers in the lower 40% of turnover (less than ~$8k racing turnover per season) are excluded.</li>",

    "<li>New customer is defined as those who opened their accounts in last 5 years and with available meetings larger than 30.</li>" .
    "<li>Customers with active rate over 60% over 83 meetings are regarded as regular customer.</li>" .
    "<li>The model gives each new customer a score indicating his chance becoming regular customer in next 83 meetings.</li>",

    [
        "<li>Select a group of customers for analysis. For example, \"Order By: Random\", \"Size: 500\" and \"Filter Data By: Segment = 70, 75\" will select 500 random accounts from Segment code 70 and 75.</li>" .
        "<li>Name this group of customer. Suggestion: \"Random-500-Seg-70,75\".</li>" .
        "<li>Click \"Create\" to create this group.</li>",

        "<li>Features - Add the attributes you would like to compare. (Suggested range: 2 to 3)</li>" .
        "<li># of Clusters - Determine the number of groupings in the outcome. (Suggested range: 2 to 4)</li>" .
        "<li>Metric - Determine the clustering technique to be used. (Common suggestions: Euclidean and Cosine)</li>" .
        "<li>Customer Set - Select a customer group created from \"Clustering: Select\".",

        "<li>Click on \"Download\" to get the clustering results in a csv format.</li>"
    ],

    "<li>The model will score customers base on their probability on meeting the following criteria.</li>" .
    "<ul><li>high exotic potential (changing preference) = # of exotic bet lines increase by at least 10% AND  # of exotic to total bet lines increase by at least 10%.</li>" .
    "<li>high exotic potential (increased participation) = # of exotic bet lines increase by at least 10% AND  # of exotic to total bet lines increase by less than 10%.</li></ul>" .
    "<li>Customers with less than 100 bet lines in previous 83 meetings are excluded.</li>" .
    "<li>Prediction period is 42 meetings.</li>"
]
?>

<div class="row">
    <div class="col-md-12">
        <div class="alert alert-block alert-info fade in">
            <button type="button" class="close" data-dismiss="alert"></button>
            <h4 class="alert-heading"><?php echo $heading[$_GET["model"] - 1]; ?></h4>
            <?php
            echo "<p>";
            echo $description[$_GET["model"] - 1];
            if (!is_null($details[$_GET["model"] - 1])) echo " <a href='javascript:void(0)' onclick=\"$(this).parent().next().collapse('toggle');\">View Details &raquo;</a>";
            echo "</p>";
            if (isset($_GET['ol'])) echo "<ol class='collapse'>";
            else echo "<ul class='collapse'>";
            if (isset($_GET['page'])) echo $details[$_GET["model"] - 1][$_GET["page"]];
            else echo $details[$_GET["model"] - 1];
            echo "</ul>";
            ?>
        </div>
    </div>
</div>



