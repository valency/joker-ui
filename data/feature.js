var GROWTH_RATE_TURNOVER = [-0.024, -0.001, 0.002, 0.014, 0.023, -0.002, 0.004];
var GROWTH_RATE_TURNOVER_COUNT = [1, 2, 3, 4, 5, 6, 7];
var TURNOVER_LAST_SEASON = [574777142.9, 1019735485, 1620146436, 2079660347, 2611569235, 3179919310, 3791251373];
var TURNOVER_THIS_SEASON = [560932011.2, 1018897081, 1624035292, 2108984959, 2670684882, 3173358994, 3804822186];
var PDF_GROWTH_RATE_TURNOVER = [0.00001, 0.0003, 0.004, 0.054, 0.24, 0.4, 0.24, 0.054, 0.004, 0.0003, 0.00001];
var PDF_GROWTH_RATE_TURNOVER_COUNT = [-1.0, -0.8, -0.6, -0.4, -0.2, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
var BET_TYPE = ['ALUP', 'QQP', 'PLA', 'QIN', 'WIN', 'QPL', 'W-P', 'TCE', 'QTT', 'DBL', 'F-F', 'TRI', 'D-T', '6UP', 'T-T', 'TBL'];
var PERCENTAGE_BET_TYPE = [0.175, 0.158, 0.116, 0.116, 0.104, 0.075, 0.073, 0.051, 0.046, 0.024, 0.020, 0.017, 0.008, 0.006, 0.006, 0.004];
var PERCENTAGE_MAJOR_CHANNEL = [0.65, 0.293, 0.057];
var MAJOR_CHANNEL_LABEL = ["IS", "TEL", "ESC"];
var ACCUMULATIVE_AVERAGE_ACTIVE_RATE = [0.042, 0.084, 0.089, 0.093, 0.097, 0.108, 0.104];
var ACTIVE_CUSTOMERS_LAST_SEASON = [0.096, 0.09, 0.088, 0.087, 0.085, 0.084, 0.084];
var ACTIVE_CUSTOMERS_THIS_SEASON = [0.1, 0.097, 0.096, 0.095, 0.094, 0.093, 0.093];
var PDF_ACTIVE_RATE_COUNT = [0.0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1.0];
var PDF_ACTIVE_RATE = [0.5, 0.2, 0.12, 0.08, 0.04, 0.03, 0.02, 0.01];
var PDF_GROWTH_RATE_ACTIVE_RATE_COUNT = [-1.0, -0.8, -0.6, -0.4, -0.2, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
var PDF_GROWTH_RATE_ACTIVE_RATE = [0.00001, 0.0003, 0.004, 0.054, 0.24, 0.4, 0.24, 0.054, 0.004, 0.0003, 0.00001];
var PERCENTAGE_NEW_BET_TYPE = [0.304, 0.189, 0.186, 0.18, 0.053, 0.018, 0.018, 0.014, 0.014, 0.012, 0.006, 0.004, 0.002];
var GROWTH_SEG_70_75 = [{
    "Total Growth": [1.40, -1.80, 0.40, 2.90]
}, {
    "Top Quintile": [51.50, 2.30, 6.30, 39.20],
    "2nd Quintile": [-1.80, 1.40, 2.70, -5.60],
    "3rd Quintile": [-25.00, 1.80, 0.20, -26.40],
    "4th Quintile": [-51.40, 4.90, -6.80, -50.30],
    "5th Quintile": [-96.10, -34.40, -34.90, -90.90]
}, {
    "September": [1.40, -1.80, 0.40, 2.90]
}, {
    "ST Races": [-37.60, -3.80, -41.50, 11.00],
    "HV Races": [null, null, null, null]
}, {
    "Day Races": [-17.90, -2.70, -20.50, 6.10],
    "Night Races": [62.60, 2.50, 49.40, 6.20]
}, {
    "Normal Bet Types": [1.50, -2.30, 0.40, 3.50],
    "Exotic Bet Types": [2.00, -2.80, 0.50, 4.40]
}, {
    "Bet Lines per Meeting": [-0.80, null, null, null],
    "Avg. Bet Size": [2.50, null, null, null]
}, {
    "3 Days Since Last Race": [6.00, -1.20, 0.80, 6.30],
    "4 Days Since Last Race": [-38.80, -4.00, -31.60, -6.70],
    "5+ Days Since Last Race": [111.50, 6.60, 79.90, 10.30]
}];


