const express = require('express');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');
const app = express();

const PORT = process.env.PORT;
const TEST_PORT = 5000;
var USED_PORT;
if (process.argv.length >= 3){
    if (process.argv[2] == "test"){
        USED_PORT = TEST_PORT;
        console.log('Test port selected...')
    }
}
else {
    console.log("Production port selected")
    USED_PORT = PORT;
}


app.use(function(req, res, next){
    console.log(`${req.ip} GET ${req.url}`);
    next();
})

app.get('/', function (req, res) {
    res.send('Hello, World!');
})

app.get('/static/css/arcane-p2e.css', function(req, res){
    var options = {
        root: path.join(__dirname)
    }
    
    res.sendFile('/static/css/arcane-p2e.css', options);
})

app.get('/static/images/:image', function(req, res) {
    var options = {
        root: path.join(__dirname)
    }

    res.sendFile(`/static/images/${req.params['image']}`, options)
})

app.get('/arcane-p2e', function (req, res) {
    var options = {
        root: path.join(__dirname)
    }

    res.sendFile('arcane-p2e.html', options);
})

app.listen(USED_PORT, () => {
    console.log(`Server running on port ${USED_PORT}`)
})