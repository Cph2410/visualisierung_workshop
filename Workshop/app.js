const path = require('path');

const express = require('express');
const app = express();
const port = 8000;
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./index.html'));
})

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname,'./index.js'));
})

app.get('/ExampleData/exampleData.tsv', (req, res) => {
    res.sendFile(path.join(__dirname,'/ExampleData/exampleData.tsv'));
})


app.listen(port, ()=>{
    console.log(`Node-Server listening at http://localhost:${port}`)
})