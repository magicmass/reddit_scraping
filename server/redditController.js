const REDDIT_URL = `https://old.reddit.com/r/pics/search/?q=`;

// Handle index actions
const { fetchRedditData } = require('./common');

exports.index = function (req, res) {
   const { query } = req.body;
   if(!query || typeof query != 'string') {
        res.json({
            status: 400,
            message: 'Bad Request!'
        });
   } else {
    fetchRedditData(REDDIT_URL + query).then(allProducts => {
        res.json({
            status: 200,
            message: 'Results have been fetched!',
            data: allProducts
         });
       });
   }   
};
