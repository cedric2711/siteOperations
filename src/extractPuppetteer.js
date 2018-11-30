const puppeteer = require("puppeteer");
const helper = require("./util/helper");
const {INPUT_FIELD, SEARCH_BUTTON, FIRST_RESULT, PULL_OUT} =require("./util/commonVariables");
const {NETWORK_LOAD_OPTIONS} =require("./util/commonVariables");

// constancs selectors
// const INPUT_FIELD = "#s";
// const SEARCH_BUTTON = "#searchsubmit";
// const FIRST_RESULT = "#primary #main article div a:nth-child(1)";
// const PULL_OUT = "#main";

var articlesID = [
    "AMA-0000001", "AMA-0000002", "AMA-0000003"//, 
    // "AMA-0000002", "AMA-0000003", "AMA-0000004", "AMA-0000005", "AMA-0000006", "AMA-0000007", "AMA-0000008", "AMA-0000009", "AMA-0000010",
    // "AMA-0000011", "AMA-0000012", "AMA-0000013", "AMA-0000014", "AMA-0000015", "AMA-0000016", "AMA-0000017", "AMA-0000018", "AMA-0000019", "AMA-0000020",
    // "AMA-0000021", "AMA-0000022", "AMA-0000023", "AMA-0000024", "AMA-0000025", "AMA-0000026", "AMA-0000027", "AMA-0000028", "AMA-0000029", "AMA-0000030"
];


(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    var siteInfo = [];
    var formatedText = [];

    await page.goto('https://amaspaces.com', {timeout:60000});
    for (var i = 0; i < articlesID.length; i++) {
        let pageInfo = { title: articlesID[i], info: "No info" };
        await page.click(INPUT_FIELD);
        await page.keyboard.type(articlesID[i]);

        await Promise.all([
            page.waitForNavigation(NETWORK_LOAD_OPTIONS),
            page.click(SEARCH_BUTTON),
          ]);

        // await page.click(SEARCH_BUTTON);
        // await page.waitFor(4000);

        let articleAvailableflag = true;
        const dataBlock ={
            id: articlesID[i],
            title: "Empty",
            content:""
        };

        await Promise.all([
            page.waitForNavigation(NETWORK_LOAD_OPTIONS),
            page.click(FIRST_RESULT)
            .catch((e) => {
                console.log(e);
                siteInfo.push(pageInfo);
                formatedText.push(dataBlock);
                articleAvailableflag = false;
            })
          ]);

        // await page.click(FIRST_RESULT)
        //     .catch((e) => {
        //         console.log(e);
        //         siteInfo.push(pageInfo);
        //         formatedText.push(dataBlock);
        //         articleAvailableflag = false;
        //     });

        // await page.waitFor(4000);
        
        if (articleAvailableflag) {
            console.log('complete navigation.');
            await page.evaluate((sel) => {
                // dataBlock.title= document.querySelector('.entry-title').textContent;
                // const entryBlock = document.querySelector('.entry-content').children;
                // const textContent = [];
                // const dataBlock ={
                //     id: articlesID[i],
                //     title: title,
                //     content:""
                // };
                // for(var s=0; s<entryBlock.length; s++){
                //     if(entryBlock[s].textContent.indexOf("Get in touch with us")>-1){
                //         break;
                //     }
                //     if(entryBlock[s].textContent === "" || entryBlock[s].className.indexOf("carousel")>-1){
                //         continue;
                //     }
                //     textContent.push(entryBlock[s].textContent);
                   
                // }
                // dataBlock.content=textContent; 
                // formatedText.push(dataBlock);
                // console.log(entryBlock);
                return document.querySelector(sel).innerHTML;
            }, PULL_OUT)
                .then((obj) => {
                    console.log(articlesID[i])
                    console.log(obj);
                    console.log("----------------------------------");
                    pageInfo.info = obj;
                    siteInfo.push(pageInfo);
                    return obj;
                })
                .catch((e) => {
                    siteInfo.push(pageInfo);
                    formatedText.push(dataBlock);
                    return console.log(e);
                });
        }

    }
    await helper.writeTo(JSON.stringify(siteInfo),'dataCSV.csv');
    await helper.writeToCSV(siteInfo,'dataJSON.text');
    // await writeRequestToFile(JSON.stringify(siteInfo));
    await browser.close();
})();

// const writeRequestToFile = (data) => {
//     // Write to file
//     const filePath = path.join(process.cwd(), `src/data2.text`);
//     const file = fs.createWriteStream(filePath);
//     file.write(data);
//     file.end();
// }