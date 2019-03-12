"use strict";

var _http = _interopRequireDefault(require("http"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestHandler = function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello, World!');
};

const server = _http.default.createServer(requestHandler);

server.listen(8008);