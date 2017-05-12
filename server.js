var express = require('express');
var moment = require('moment')

//configure express app and start listening
var app = express();
const PORT = process.env.PORT || 3000; //used for heroku

app.use(express.static('./public'));
if (!module.parent) { app.listen(PORT, () => console.log(`Started up on port ${PORT}`)) }; //conditional statement prevents EADDRINUSE error when running mocha/supertest

//function for converting unix timestamps to natural date format 
var unixToNatural = (i) => moment.unix(i).format('MMMM D, YYYY HH:mm:ss');

app.get('/:id', (req,res) => {
    //declare and set vars
    var str = req.params.id;
    var unix = null;
    var natural = null;
    
    //conditional statement needed due to an issue/different outcome when passing a unix time of 0
    if (str == 0) {
        unix = 0;
        natural = unixToNatural(str);
    }
    //verifies string is not a number and is a valid date
    //if true, set unix var using moment's formatting method for unix time, and set natural var using own function
    if (isNaN(str) && moment(str, 'MMMM D, YYYY HH:mm:ss').isValid()) {
        unix = Number(moment(str, 'MMMM D, YYYY HH:mm:ss').format('X'));
        natural = unixToNatural(unix);
    }
    //verifies string is a number
    //if true, set unix var as a number and natural var using own function
    if (Number(str)) {
        unix = Number(str);
        natural = unixToNatural(str);
    }
    //send results as JSON to client
    res.send({ unix, natural });
});

//handle console error by sending status code 204 for icon file
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
