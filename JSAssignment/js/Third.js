const readline = require('readline');
const fs = require('fs');
var header =[],
    jsonData=[],
    countries=[],
    total=[],
    topFive=[];
var tempData={};
var isHeader=true;
var currCountry={};
var check=false;
/*Reference for reading csv file*/
const rl = readline.createInterface({
    input: fs.createReadStream('../csvFile/Indicators.csv')
});
/*Reading line by line*/
rl.on('line', function(line) {
    var lineRecords= line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
	var len=lineRecords.length;
    /*Creating header*/
    for(var i=0;i<len;i++){
        if(isHeader){       
            header[i]=lineRecords[i];
        }
    }
    if(!isHeader){
        currCountry=lineRecords[0];
        var lenCountries=countries.length;
        var lenTotal=total.length;
        /*Comparing each country and calculating the total*/
        for(var i=0;i<lenCountries;i++){
     	    if(currCountry===countries[i]){
     		    if(lineRecords[2]=='"Life expectancy at birth, total (years)"'){
     			    total[i]=parseFloat(total[i])+parseFloat(lineRecords[5]);
     		    }
     		    check=true;
     		    break;
     	    }
     	    check=false;
        }
        if(!check){
     	    if(lineRecords[2]=='"Life expectancy at birth, total (years)"'){
     			countries[lenCountries]=lineRecords[0];
     			total[lenTotal]=lineRecords[5];
     		}
        }
    }
    isHeader=false;
});
/*After reading all the csv and calculating the total*/
rl.on("close",function(){
	var lenCountries=countries.length;
    var lenTotal=total.length;
    var temp=null;
    /*Sorting the total and countries with respect to total*/
    for(var j=0;j<lenTotal-1;j++){
        for(var i=0;i<lenTotal-1;i++){
		  if(total[i]<total[i+1]){
			temp=total[i];
			total[i]=total[i+1];
			total[i+1]=temp;
			temp=countries[i];
			countries[i]=countries[i+1];
			countries[i+1]=temp;
		  }
        }
    }
    /*Push the top 5 details to json file*/
    for(var i=0;i<5;i++){
		tempData[header[0]]=countries[i];
		tempData["Life expectancy at birth, total (years)"]=total[i];
		jsonData.push(tempData);
		fs.writeFileSync("../jsonFile/third.json",JSON.stringify(jsonData,undefined,2),encoding="utf8");
		tempData={};
    }
});