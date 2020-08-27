// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Server is successfully running!',
        message: 'Welcome to Server',
    });
});

// Import Reddit controller
var redditController = require('./redditController');

/**
 *  Reddit  routes
 */
router.route('/reddit')
    .post(redditController.index)

/**
 *  Export API routes
 */
module.exports = router;