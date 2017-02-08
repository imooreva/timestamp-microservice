const express = require('express');
const moment = require('moment')
const PORT = process.env.PORT || 3000; //used for heroku

var app = express();
app.use(express.static('./public'));
app.listen(PORT, () => { console.log('Express server is up on port', PORT) });

const unixToNatural = (i) => moment.unix(i).format('MMMM D, YYYY HH:mm:ss');

app.get('/:id', (req,res) => {    
    var str = req.params.id;
    var unix = null;
    var natural = null;
    
    if (str == 0) {
        unix = 0;
        natural = unixToNatural(str);
    }    
    if (isNaN(str) && moment(str, 'MMMM D, YYYY HH:mm:ss').isValid()) {
        unix = Number(moment(str, 'MMMM D, YYYY HH:mm:ss').format('X'));
        natural = unixToNatural(unix);
    }    
    if (Number(str)) {
        unix = Number(str);
        natural = unixToNatural(str);
    }
    
    res.send({ unix, natural });
});