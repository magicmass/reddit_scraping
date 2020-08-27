const scrape = require('./src/scrapers');

module.exports.add = (event, context, callback) => {
  const {url} = event;
  scrape(url)
    .then(function (data) {
      callback(null, {
        statusCode: 200,
        body: data,
      });
    })
    .catch(function (e) {
      console.log('something bad happened', e);
      callback(null, e);
    });
}