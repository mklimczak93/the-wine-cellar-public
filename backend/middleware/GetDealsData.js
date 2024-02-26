// --- IMPORTS
const puppeteer = require('puppeteer');


// --- MAIN CODE
const getWineData = async(websiteURL, agreeSelector, additionalPopupSelector, additionalPopupSelector2, searchSelector, searchPhrase, searchButton, pickFirst, nameSelector, priceSelector, wineShop) => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless : true });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768
      });

    // Navigate the page to a URL
    await page.goto(websiteURL);
    await page.screenshot({path: './deals_raw_data/0.png'});

    //Age consent
    try {
        await page.click(agreeSelector);
        await new Promise(function(resolve) {setTimeout(resolve, 2000)});
        console.log('Age popup closed.');
    } catch(error) {
        console.log('Age consent error: ' + error);
    }
    

    //closing additional popups is present
    if (additionalPopupSelector) {
        try {
            await page.waitForSelector(additionalPopupSelector, {
                visible: true
            });
            await new Promise(function(resolve) {setTimeout(resolve, 7000)});
            await page.click(additionalPopupSelector);
            console.log('Additional popup closed.');
        } catch(error) {
            console.log('Additional popups 01 error: ' + error);
        }      
    };

    //closing additional popups is present
    if (additionalPopupSelector2) {
        try {
            await page.waitForSelector(additionalPopupSelector2, {
                visible: true
            });
            await new Promise(function(resolve) {setTimeout(resolve, 6000)});
            await page.click(additionalPopupSelector2);
            console.log('Additional popup2 closed.');
        } catch(error) {
            console.log('Additional popups 02 error: ' + error);
        }      
    };

    //awiting for search to be visible
    try {
        await page.screenshot({path: './deals_raw_data/1.png'});
        await page.waitForSelector(searchSelector, {
            visible: true
        });
        await page.screenshot({path: './deals_raw_data/2.png'});
    } catch(error) {
        console.log('Search visibility error: ' + error);
    }

    // Type into search box
    try {
        await page.type(searchSelector, searchPhrase);
        await page.click(searchButton);
        await page.screenshot({path: './deals_raw_data/3.png'});
        console.log('Searching');
        await new Promise(function(resolve) {setTimeout(resolve, 3000)});
        await page.screenshot({path: './deals_raw_data/4.png'});
    } catch(error) {
        console.log('Typing into search error: ' + error);
    }

    //clicking again if the searched page is not available
    try {
        if (await page.$(pickFirst) === null) {
            await page.click(searchButton); 
        }
        await new Promise(function(resolve) {setTimeout(resolve, 6000)});
    } catch(error) {
        console.log('Clicking again: ' + error)
    }
    

    //click first result
    try {
        await page.screenshot({path: './deals_raw_data/5.png'});
        await page.waitForSelector(pickFirst);
        await page.click(pickFirst);
        await new Promise(function(resolve) {setTimeout(resolve, 3000)});
        await page.screenshot({path: './deals_raw_data/6.png'});
    } catch(error) {
        console.log('Clicking first result error: ' + error)
    }
    

    //get Data from the search result
    let name;
    let price;
    let currentURL;

    try {
        await page.waitForSelector(nameSelector, priceSelector);
        name = await (await (await page.$(nameSelector)).getProperty('content')).jsonValue();
        console.log('Got name.');
        price = await (await (await page.$(priceSelector)).getProperty('content')).jsonValue();
        console.log('Got price.');
        currentURL = page.url(); 
        console.log('Got url.');
    } catch(error) {
        console.log('Gettting name, price, URL error: ' + error)
    }
    
    
    //composing data object
    let data;
    if (name && price) {
        data = {
            available: true,
            shopName: wineShop,
            wineURLInShop: currentURL,
            wineNameInShop: name,
            winePriceInShop: price
        }
    } else {
        data = {
            available: false,
            shopName: wineShop
        }
    }
    

    //closing browser, logging data & returning data
    await browser.close()
    console.log(data);

    return data
}





//exporting functions
module.exports = {
    getWineData
};