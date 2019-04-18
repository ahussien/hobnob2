"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _elasticsearch = _interopRequireDefault(require("elasticsearch"));

var _injectHandlerDependencies = _interopRequireDefault(require("./utils/inject-handler-dependencies"));

var _create = _interopRequireDefault(require("./handlers/users/create"));

var _getUsers = _interopRequireDefault(require("./handlers/users/get-users"));

var _createUser = _interopRequireDefault(require("./engines/users/createUser"));

var _getUsers2 = _interopRequireDefault(require("./engines/users/getUsers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import http from 'http';
require('dotenv').config();

const handlerToEngineMap = new Map([[_create.default, _createUser.default], [_getUsers.default, _getUsers2.default]]);
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
  res.send('This is an elastic search app');
});
app.get('/users', (0, _injectHandlerDependencies.default)(_getUsers.default, client, handlerToEngineMap));
app.post('/users', (0, _injectHandlerDependencies.default)(_create.default, client, handlerToEngineMap));