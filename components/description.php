<?php
$heading = [
    "Growth / Decline Analysis",
    "New Customers Analysis",
    "Clustering",
    "Bet Type Analysis"
];
$description = [
    "The model forecasts each customer's near term turnover growth and decline. Customers with larger grow propensity score are more likely to grow and so does decline. Grow is defined as in the top 20% of percentage growth of meetings in next 2 months versus comparable meetings from previous season. Decline is in the bottom 20%. Predictions are made with a lead time of 1 month. Customers in the lower 40% of turnover (less than ~$8k racing turnover per season) are excluded.",
    "The model focuses on new customers' participation growth. Customers with active rate over 60% are regarded as regular and the model gives each new customer a score indicating the chance to be regular in next 83 meetings. New customer is defined as those who opened their accounts in last 5 years and with available meetings larger than 30.",
    "The model concentrates on each customer’s changing trend of preference from standard bet types to exotic bet types. If a customer will increase his exotic bet lines by at least 10%, he is regarded as high potential. Further, if the proportion of exotic bet lines among his total bet lines will also increase by 10%, then he is high potential due to changing bet type preference; if not, then he is high potential due to higher participation. The model gives each customer a score of being high potential due to changing bet type preference and a score of being high potential due to higher participation in next 42 meetings. Customers with less than 100 bet lines in previous 83 meetings are excluded.",
    "The model finds clusters of customers by considering various attributes intelligently. Up to 15 attributes can be used and up to 8 clusters can be formed each time. Clustering results can also be downloaded to local for further analysis."
];
?>

<div class="row">
    <div class="col-md-12">
        <div class="alert alert-block alert-info fade in">
            <button type="button" class="close" data-dismiss="alert"></button>
            <h4 class="alert-heading"><?php echo $heading[$_GET["model"] - 1]; ?></h4>

            <p><?php echo $description[$_GET["model"] - 1]; ?></p>
        </div>
    </div>
</div>



