var GROWTH_RATE_TURNOVER = [0.0486, 0.0493, 0.0501, 0.0503, 0.0497, 0.0495, 0.0502, 0.0504];
var GROWTH_RATE_TURNOVER_COUNT = [12, 13, 14, 15, 16, 17, 18, 19];
var TURNOVER_LAST_SEASON = [1020.192938, 908.261628, 1174.287382, 1020.192938, 908.261628, 1174.287382, 1084.628432, 1204.928393];
var TURNOVER_THIS_SEASON = [1020.192938, 908.261628, 1174.287382, 1025.293903, 913.711198, 1181.333106, 1090.593888, 1206.133321];
var PDF_GROWTH_RATE_TURNOVER = [0.00001, 0.0003, 0.004, 0.054, 0.24, 0.4, 0.24, 0.054, 0.004, 0.0003, 0.00001];
var PDF_GROWTH_RATE_TURNOVER_COUNT = [-1.0, -0.8, -0.6, -0.4, -0.2, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
var BET_TYPE = ['QIN', 'QPL', 'PLA', 'WIN', 'TCE', 'TRI', 'F-F', 'DBL', 'QTT', 'D-T', '6UP', 'T-T', 'TBL'];
var PERCENTAGE_BET_TYPE = [0.254, 0.189, 0.186, 0.18, 0.063, 0.028, 0.028, 0.024, 0.016, 0.014, 0.008, 0.006, 0.004];
var PERCENTAGE_MAJOR_CHANNEL = [0.023235469083528713, 0.22665080309339677, 0.37894110648423557, 0.0013997270532246212, 0.14588655212233614, 0.0811141827343668, 0.05231479861427022, 0.09045736081464115];
var MAJOR_CHANNEL_LABEL = ["MULTI", "AOSBS", "TEL", "MISSING", "EWIN", "ESC", "OTHERS", "IOSBS"];
var ACCUMULATIVE_AVERAGE_ACTIVE_RATE = [0.32, 0.34, 0.36, 0.37, 0.38, 0.386, 0.39, 0.394];
var ACTIVE_CUSTOMERS_LAST_SEASON = [63827, 83629, 59435, 68392, 60834];
var ACTIVE_CUSTOMERS_THIS_SEASON = [70209, 79448, 60281, 67283, 62938];
var PDF_ACTIVE_RATE_COUNT = [0.0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1.0];
var PDF_ACTIVE_RATE = [0.5, 0.2, 0.12, 0.08, 0.04, 0.03, 0.02, 0.01];
var PDF_GROWTH_RATE_ACTIVE_RATE_COUNT = [-1.0, -0.8, -0.6, -0.4, -0.2, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0];
var PDF_GROWTH_RATE_ACTIVE_RATE = [0.00001, 0.0003, 0.004, 0.054, 0.24, 0.4, 0.24, 0.054, 0.004, 0.0003, 0.00001];
var PERCENTAGE_NEW_BET_TYPE = [0.304, 0.189, 0.186, 0.18, 0.053, 0.018, 0.018, 0.014, 0.014, 0.012, 0.006, 0.004, 0.002];
var GROWTH_SEG_70_75 = [{
    "Total Growth": [4.4, -1.4, 3.3, 1.9]
}, {
    "Top Quintile": [8.3, 0.4, 3.5, 3.7],
    "2nd Quintile": [7.1, 0.4, 3.5, 2.4],
    "3rd Quintile": [4.7, 0.4, 3.6, 0.2],
    "4th Quintile": [-4.8, 0.4, 2.1, -7.4],
    "5th Quintile": [-55.9, -10.1, -7.5, -47.7]
}, {
    "September": [8.1, 2.9, 1.0, 4.0],
    "October": [5.2, 1.8, 0.2, 3.1],
    "November": [7.9, 1.8, 0.2, 5.8],
    "December": [-19.4, 0.4, 0.2, -19.9],
    "January": [10.4, 1.7, 0.1, 8.5],
    "February": [-8.9, 0.1, 0.1, -9.1],
    "March": [8.5, 0.8, 0.1, 7.6],
    "April": [5.2, 0.6, 0.1, 4.5],
    "May": [17.1, 0.5, 0.2, 16.3],
    "June": [-1.5, -1.6, 12.8, -11.3]
}, {
    "ST Races": [9.5, -0.4, 7.4, 2.0],
    "HV Races": [-4.2, 1.9, -7.1, 1.8]
}, {
    "Day Races": [10.6, 0.6, 8.5, 2.2],
    "Night Races": [-4.0, 0.7, -6.4, 1.6]
}, {
    "Normal Bet Types": [3.3, -1.3, 3.7, 0.9],
    "Exotic Bet Types": [10.5, -1.0, 5.4, 5.8]
}, {
    "Bet Lines per Meeting": [null, null, null, null],
    "Avg. Bet Size": [null, null, null, null]
}, {
    "3 Days Since Last Race": [null, null, null, null],
    "4 Days Since Last Race": [null, null, null, null],
    "5+ Days Since Last Race": [null, null, null, null]
}];