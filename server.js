const express = require('express');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');
const app = express();
const address = '192.168.0.15';
const port = 5000;

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

app.get('/static/images/piltover-long.jpeg', function(req, res) {
    var options = {
        root: path.join(__dirname)
    }

    res.sendFile('/static/images/piltover-long.jpeg', options);
})

app.get('/arcane-p2e', function (req, res) {
    var options = {
        root: path.join(__dirname)
    }

    res.sendFile('arcane-p2e.html', options);
})

app.listen(port, address, () => {
    console.log(`App listening at http://localhost:${port}`)
})