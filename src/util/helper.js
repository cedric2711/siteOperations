const fs = require("fs");
const path = require("path");
const jsonexport = require('jsonexport');

const writeTo= (data,fileName) => {
    // Write to file
    const filePath = path.join(process.cwd(), `src/dataFiles/${fileName}`);
    const file = fs.createWriteStream(filePath);
    file.write(data);
    file.end();
}

const writeToCSV= (data, fileName) => {
    jsonexport(data,function(err, csv){
        if(err) return console.log(err);
        console.log(csv);
        writeTo(csv, fileName);
    });
}
module.exports ={
    writeTo:writeTo,
    writeToCSV:writeToCSV
};