const express = require('express');
const bodyParser = require('body-parser');

//init express;
const app = express();

//body parser middleware
app.use(bodyParser.json());

//routes
const eventRoutes = require('./routes/events');
app.use(eventRoutes);
app.use('/', eventRoutes);

//server runs on port 5000. 
const port = 5000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});