const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes_db.js');
const cors = require('cors');

//db connection
//require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({origin: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/',(req, res) => {
//    res.set('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
    res.send(`Node and express server running ${PORT}`);
});

// app routes
app.get('/products',routes.getProducts);
app.get('/interestedProducts',routes.getInterestedProducts)
app.get('/similarProducts/pid=',routes.getSimilarProducts)


app.listen(PORT, () => 
console.log(`Your server is running on port ${PORT}`)
);