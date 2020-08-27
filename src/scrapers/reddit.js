const puppeteer = require('puppeteer');

module.exports = {
    host: 'reddit.com',
    scrape: (url) => {
        return (async () => {
            const url1 = url + '&sort=comments&t=all';
            const browser = await puppeteer.launch({ args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
              ], });
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0); 
            await page.goto(url1, {waitUntil: 'networkidle2'});
            let result = '';
           
            result = await page.evaluate(() => {
                function fetchImagesfromPost() {
                    const postImages = [];
                    const posts = document.querySelectorAll('.search-result.search-result-link');
                    for(var i = 0; i < posts.length; i++) {
                        if(posts[i].children[0].hasChildNodes() && posts[i].children[0].children[0].src !== '') {
                            postImages.push({
                                image: posts[i].children[0].children[0].src,
                                filterBy: 'comments'
                            });
                            if(postImages.length > 2) {
                                break;
                            }
                        }
                    }
                    return postImages;
                }
                const postImages = fetchImagesfromPost();
                return Promise.resolve({
                    redditTopImages: postImages
                });
            });

            if(result.redditTopImages.length < 3) {
                const page = await browser.newPage();
                await page.setDefaultNavigationTimeout(0); 
                await page.goto(url += '&sort=top&t=all', {waitUntil: 'networkidle2'});
                result = await page.evaluate((result) => {
                    function fetchImagesfromPost(result) {
                        const posts = document.querySelectorAll('.search-result.search-result-link');
                        for(var i = 0; i < posts.length; i++) {
                            if(posts[i].children[0].hasChildNodes() && posts[i].children[0].children[0].src !== '') {
                                result.redditTopImages.push({
                                    url: posts[i].children[0].children[0].src,
                                    filterBy: 'top'
                                });
                                if(result.redditTopImages.length > 2) {
                                    break;
                                }
                            }
                        }
                        return result;
                    }
                    const postImages = fetchImagesfromPost(result);
                    return Promise.resolve(postImages);
                }, result);
            }

            await browser.close();
            return result; 
        })();
    },
    normalize: url => url
};
