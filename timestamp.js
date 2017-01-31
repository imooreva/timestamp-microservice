const express = require('express');
const moment = require('moment')
const PORT = process.env.PORT || 3000; //used for heroku

var app = express();
app.use(express.static('./public'));
app.listen(PORT, ()=> { console.log('Express server is up on port', PORT) });

app.get('/:id', (req,res) => {    
    var str = req.params.id;
    var unix = null;
    var natural = null;
    
    if (isNaN(str) && moment(str, "MMMM D, YYYY HH:mm:ss").isValid()) {
        //unix = moment(str).unix();
        unix = Number(moment(str, "MMMM D, YYYY HH:mm:ss").format("X"));
        //natural = moment(str).format('MMMM D, YYYY HH:mm');
        natural = moment.unix(unix).format("MMMM D, YYYY HH:mm:ss");
    };
    
    if (Number(str)) {
        unix = Number(str);
        natural = moment.unix(str).format('MMMM D, YYYY HH:mm:ss');
    };
    res.send({
        unix,
        natural
    });
});