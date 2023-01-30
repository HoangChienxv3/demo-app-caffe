const express = require('express');
const path = require('path');

const app = express();

app.use(express.static("demo-app-caffe.herokuapp.com" + '/dist'));
app.get('/*', function (req, res) {
    res.sendFile(path.join("demo-app-caffe.herokuapp.com" + '/dist/index.html'));
});

app.listen(process.env.PORT || 4200);
