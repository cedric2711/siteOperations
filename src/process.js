const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const path = require("path");
const jsonexport = require('jsonexport');

const formatedText = [];
const filePath = path.join(process.cwd(), `src/data.text`);
fs.readFile(filePath, function(err, dataStream) {
    if(!err){
        dataBlock = JSON.parse(dataStream);
        dataBlock.forEach(element => {
            // let block = parser.parseFromString(element.info);
            const dom = new JSDOM('<!DOCTYPE html>'+element.info);
            const title = dom.window.document.querySelector('.entry-title');
            const entryBlock = dom.window.document.querySelector('.entry-content').children;
            const textContent = [];
            const dataBlock ={
                id: element.title,
                title: title.textContent,
                content:""
            };
            for(var s=0; s<entryBlock.length; s++){
                if(entryBlock[s].textContent.indexOf("Get in touch with us")>-1){
                    break;
                }
                if(entryBlock[s].textContent === "" || entryBlock[s].className.indexOf("carousel")>-1){
                    continue;
                }
                textContent.push(entryBlock[s].textContent);
               
            }
            dataBlock.content=textContent; 
            formatedText.push(dataBlock);
        });
    }
    writeRequestToFile(JSON.stringify(formatedText));

    jsonexport(formatedText,function(err, csv){
        if(err) return console.log(err);
        console.log(csv);
        writeRequestToCSV(csv);
    });
});


const writeRequestToFile = (data) => {
    // Write to file
    const filePath = path.join(process.cwd(), `src/formated.text`);
    const file = fs.createWriteStream(filePath);
    file.write(data);
    file.end();
}
const writeRequestToCSV = (data) => {
    const filePath = path.join(process.cwd(), `src/formatedCSV.csv`);
    const file = fs.createWriteStream(filePath);
    file.write(data);
}