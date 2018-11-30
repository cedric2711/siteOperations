const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

// constancs selectors
const INPUT_FIELD = "#s";
const SEARCH_BUTTON = "#searchsubmit";
const FIRST_RESULT = "#primary #main article div a:nth-child(1)";
const PULL_OUT = "#main";

var articlesID = [
    // "AMA-0000001", "AMA-0000002", "AMA-0000003", "AMA-0000004", "AMA-0000005", "AMA-0000006", "AMA-0000007", "AMA-0000008", "AMA-0000010",
    // "AMA-0000011", "AMA-0000012", "AMA-0000013", "AMA-0000014", "AMA-0000015", "AMA-0000016", "AMA-0000020",
    "AMA-0000023", "AMA-0000024", "AMA-0000026", "AMA-0000027", "AMA-0000028"];
var siteInfo = [];


   const callAsync = async (articleIDPassed, index) => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://amaspaces.com');

        let pageInfo = { title: articleIDPassed, info: "No info" };
        await page.click(INPUT_FIELD);
        await page.keyboard.type(articleIDPassed);

        await page.click(SEARCH_BUTTON);

        let articleAvailableflag = true;
        // await page.waitForSelector(FIRST_RESULT, { timeout: 5000})
        // .then((t)=> {
        //     console.log("id present.")
        //     articleAvailableflag=true;
        // })
        // .catch((e)=>{
        //     console.log("id not present.")
        //     return false;
        // });



        // if (articleAvailableflag) {
        // await page.click(FIRST_RESULT)
        //     .then(() => console.log('click completed'))
        //     .catch((e) => console.log(e));
        await page.waitFor(4000);
        await page.click(FIRST_RESULT);
        await page.waitFor(4000); 
        console.log('complete navigation.');
        await page.evaluate((sel) => {
            return document.querySelector(sel).innerHTML;
        }, PULL_OUT)
            .then((obj) => {
                console.log(articleIDPassed)
                console.log(obj);
                console.log("----------------------------------");
                pageInfo.info = obj;
                siteInfo.push(pageInfo);
                browser.close();
                return obj;
            })
            .catch((e) => {
                siteInfo.push(pageInfo);
                browser.close();
                return console.log(e);
            });
        // }




        await writeRequestToFile(JSON.stringify(siteInfo));
        
        if(articlesID.length -1 !== index){
            let reqIndex = index+1;
            callAsync(articlesID[reqIndex], reqIndex);
        }
    };
callAsync(articlesID[0],0);
const writeRequestToFile = (data) => {
    // Write to file
    const filePath = path.join(process.cwd(), `src/data2.text`);
    const file = fs.createWriteStream(filePath);
    file.write(data);
    file.end();
}