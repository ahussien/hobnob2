"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import http from 'http';
require('dotenv').config();

const app = (0, _express.default)(); //Middlewares

app.use(_bodyParser.default.json({
  limit: 1e6
}));
app.listen(process.env.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Hobnob API server listening on port ${process.env.SERVER_PORT}!`);
});
app.get('/', (req, res) => {
  res.send('Hello, World! OK 222');
});
app.post('/users', (req, res) => {
  if (req.headers['content-length'] === 0) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'Payload should not be empty'
    });
    return;
  }

  if (req.headers['content-type'] !== 'application/json') {
    res.status(415);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'The "Content-Type" header must always be "application/json"'
    });
    return;
  }

  res.status(400);
  res.set('Content-Type', 'application/json');
  res.json({
    message: 'Payload should be in JSON format'
  });
});