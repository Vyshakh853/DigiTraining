const readline = require('readline');
const fs = require('fs');
var header =[],
    jsonData=[];
var tempData={};
var isHeader=true;
var birthRate=0,
    deathRate=0;
    /*Reference for reading the csv file*/
const rl = readline.createInterface({
    input: fs.createReadStream('../csvFile/Indicators.csv')
});
/*Reading line by line*/
rl.on('line', function(line) {
    var lineRecords= line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    var len=lineRecords.length;
    /*Creating headers*/
    for(var i=0;i<len;i++){
        if(isHeader){       
            header[i]=lineRecords[i];
        }
    }	
    /*If country is India note down the birth rate and death rate and push to json file*/
    if(lineRecords[0]=='India'){
     	var indicatorName=lineRecords[2];
     	if(indicatorName=='"Birth rate, crude (per 1,000 people)"'){
     		birthRate=lineRecords[5];
     	}
     	if(indicatorName=='"Death rate, crude (per 1,000 people)"'){
     		deathRate=lineRecords[5];
     	}
        /*Push the data to json file*/
        if(birthRate!=0 && deathRate!=0){
         	tempData[header[4]]=lineRecords[4];
            tempData["Birth rate, crude (per 1,000 people)"]=birthRate.toString();
  		    tempData["Death rate, crude (per 1,000 people)"]=deathRate.toString(); 
            jsonData.push(tempData);
            fs.writeFileSync("../jsonFile/second.json",JSON.stringify(jsonData,undefined,3),encoding="utf8");
            birthRate=0;
            deathRate=0;
        }  
    }
    tempData={};
    isHeader=false;
    
});

