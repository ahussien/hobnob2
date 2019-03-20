"use strict";

var _http = _interopRequireDefault(require("http"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const requestHandler = function (req, res) {
  if (req.method === 'POST' && req.url === '/users') {
    res.writeHead(400, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      message: 'Payload should not be empty'
    }));
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello, World! OK');
};

const server = _http.default.createServer(requestHandler);

server.listen(process.env.SERVER_PORT);