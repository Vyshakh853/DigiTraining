const readline = require('readline');
const fs = require('fs');
var header =[],
    jsonData=[],
    lineRecords=[];
var tempData={};
var isHeader=true;
var currYear=0,
    prevYear=0,
    maleValue=0,
    femaleValue=0;
    /*Array containing asian countries*/
var asianCountries = ["Afghanistan", "Armenia", "Azerbaijan", "Bangladesh",
   "Bhutan", "Cambodia", "China", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel",
   "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives",
   "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Qatar", "Russia", "Saudi Arabia",
   "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand",
   "Philippines", "United Arab Emirates", "Turkmenistan", "Uzbekistan", "Vietnam", "Yemen",
   "Europe & Central Asia (all income levels)",
   "South Asia", "East Asia & Pacific (all income levels)"
];

function totalValue(country){
    if(country==lineRecords[0]){
        if(lineRecords[2]=='"Life expectancy at birth, male (years)"'){
            maleValue=maleValue+parseFloat(lineRecords[5]);
        }
        if(lineRecords[2]=='"Life expectancy at birth, female (years)"'){
            femaleValue=femaleValue+parseFloat(lineRecords[5]);
        }
    }
    prevYear=currYear;
}
/*Reference for reading csv file*/
const rl = readline.createInterface({
  input: fs.createReadStream('../csvFile/Indicators.csv')
});
/*Reading line by line of csv file*/
rl.on('line', function(line) {
    /*Split the line of csv file into columns*/
    lineRecords= line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
 	var len=lineRecords.length;
    /*Creating header*/
    for(var i=0;i<len;i++){
        if(isHeader){       
        header[i]=lineRecords[i];
        }
    }
    if(!isHeader){
    currYear=lineRecords[4];
    if(!isHeader){
        /*Calculating the total for each country*/
        if(currYear==prevYear||prevYear==0){
            asianCountries.forEach(totalValue);
        }
        /*Push the data into json*/
        else{
            tempData[header[4]]=prevYear.toString();
     	    tempData["Life expectancy at birth, female (years)"]=femaleValue.toString();
     	    tempData["Life expectancy at birth, male (years)"]=maleValue.toString();
     	    prevYear=currYear;
     	    maleValue=0;
     	    femaleValue=0;
     	    jsonData.push(tempData);
            fs.writeFileSync("../jsonFile/first.json",JSON.stringify(jsonData,undefined,3),encoding="utf8");
        }
    }
    }	      
    tempData={};
    isHeader=false;
    
});