const express = require('express');
const path = require('path');
const app = express();
//const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log("server is running up")
});