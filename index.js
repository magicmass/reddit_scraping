const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

/**
 * Initialize the app
 */
let app = express();

/**
 * Importing Routes
 */
const apiRoutes = require("./server/api-routes");

const port = process.env.PORT || 8080;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public')));

/**
 * CORS related code
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'POST, GET');
        return res.status(200).json({});
    }
    next();
});

/**
 * Send message for default URL
 */
app.get('/', function(req,res) {
    res.json({
        status: '200',
        message: 'Server is successfully running!',
    });
});

/**
 *  Use Api routes in the App
 */
app.use('/api', apiRoutes);

/**
 *  listening on port
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}
    Visit http://localhost:${port}`);
});