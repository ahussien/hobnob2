"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _elasticsearch = _interopRequireDefault(require("elasticsearch"));

var _create = _interopRequireDefault(require("./handlers/users/create"));

var _injectHandlerDependencies = _interopRequireDefault(require("./utils/inject-handler-dependencies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import http from 'http';
require('dotenv').config();

const client = new _elasticsearch.default.Client({
  host: `${process.env.ELASTICSEARCH_PROTOCOL}://${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`
});
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
app.post('/users', (0, _injectHandlerDependencies.default)(_create.default, client));