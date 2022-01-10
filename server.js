const express = require('express');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');
const app = express();
const port = 80;

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

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening at http://localhost:${port}`)
})