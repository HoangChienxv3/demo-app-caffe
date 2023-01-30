/*const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/<app-name>'));
app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname + '/dist/<app-name>/index.html'));
});
app.listen(process.env.PORT || 4200);*/

var port = nomalizePort(process.env.PORT || '4200');
app.set('port', port);
var server = http.createServer(app);
server.listen(port() => console.log('Server is listening on port ${port}...'));
server.on('error', onError);
server.on('listening', onListening);
