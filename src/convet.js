let csvToJson = require('convert-csv-to-json');

let fileInputName = './rankings.csv'; 
let fileOutputName = 'pedro_Phunk_Ranks.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
