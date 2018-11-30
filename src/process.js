const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Convert HTML string into json object.
const processHTMLString = (htmlString, id) => {
    const dom = new JSDOM("<!DOCTYPE html>"+htmlString);
    const title = dom.window.document.querySelector(".entry-title");
    const entryBlock = dom.window.document.querySelector(".entry-content").children;
    const textContent = [];
    const dataBlock ={
        id: id,
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
    return dataBlock;
}

module.exports = processHTMLString;