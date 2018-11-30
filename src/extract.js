import { Selector } from 'testcafe';
import fs from 'fs';
import path from 'path';

fixture`Getting Started`
    .page`https://amaspaces.com`;

test('My first test', async t => {

    // var form = await Selector('#property-searchform');
    // var reheader= await Selector('.page-title');
    // var headerText = await reheader.innerText;
    var articlesID = [
        "AMA-0000001", "AMA-0000002", "AMA-0000003", "AMA-0000004", "AMA-0000005", "AMA-0000006", "AMA-0000007", "AMA-0000008", "AMA-0000010",
        "AMA-0000011", "AMA-0000012", "AMA-0000013", "AMA-0000014", "AMA-0000015", "AMA-0000016", "AMA-0000020",
        "AMA-0000023", "AMA-0000024", "AMA-0000026", "AMA-0000027", "AMA-0000028"]
    var pageInfo = [];
    for (var arID = 0; arID < articlesID.length; arID++) {
        await t
            .typeText('#s', articlesID[arID])
            .click('#searchsubmit');

        var list = await Selector('.featured-thumb')
            .find('a')
            .nth(0);

        await t
            .click(list);

        const data = await t.eval(() => {
            return document.querySelector('#main').innerHTML;

            //entry-content
        });
        // const nextPage = await Selector('a').withAttribute('href','/Rating/%23?page=2');
        var pageData = { title: articlesID[arID], info: data }
        await pageInfo.push(pageData);
        
        await writeRequestToFile(JSON.stringify(pageInfo));
    }

});

const writeRequestToFile = (data) => {
    // Write to file
    const filePath = path.join(process.cwd(), `src/data.text`);
    const file = fs.createWriteStream(filePath);
    file.write(data);
    file.end();
}