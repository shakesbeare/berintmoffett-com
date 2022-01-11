const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.get('/api', (req, res) => {
    res.json({message: "Hello from the server!"});
})

// This must be defined last!
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/build/index.html"))
})