const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/dmcf'));
app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname + '/dist/dmcf/index.html'));
});
var port = app.listen(process.env.PORT || 8080);
app.set('port', port);

/*var port = nomalizePort(process.env.PORT || '4200');
app.set('port', port);
var server = http.createServer(app);
server.listen(port() => console.log('Server is listening on port ${port}...'));
server.on('error', onError);
server.on('listening', onListening);
*/