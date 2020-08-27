const handler = require('../handler');

module.exports = {
    fetchRedditData: (url) => {
        return new Promise((resolve, reject) => {
            handler.add({
                url: url
                }, null, (err, output) => {
                if (err)
                    reject(err);
                resolve(output);
            })
        });
    }
}