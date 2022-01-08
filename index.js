const express = require('express');
const fs = require('fs')
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('./index.html', {root: __dirname})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})