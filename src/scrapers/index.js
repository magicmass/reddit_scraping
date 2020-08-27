const urlUtil = require('url');

const reddit = require('./reddit');

const websites = {
    reddit
};

const getWebsite = host =>
  Object.keys(websites).find(website =>
    host.indexOf(websites[website].host) >= 0
  )

module.exports = (url, website) => {
  if (website && Object.keys(websites).indexOf(website) === -1) {
    return Promise.reject({
      website, url,
      message: 'unsupported `website` supplied as arg; this is most likely a data issue in db',
    });
  }

  const _website = website || getWebsite(urlUtil.parse(url).host);

  if (!_website) {
    return Promise.reject({ message: 'website invalid', url });
  }

  const { scrape, normalize } = websites[_website];

  return new Promise((resolve, reject) => {
        scrape(url).then(data => {
            resolve(Object.assign({}, data, {
                url: normalize(url)
            }))
        }
        ).catch(e => {
        console.log(e);
        reject(e);
        })
    }
  )
}