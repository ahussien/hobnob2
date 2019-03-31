//import http from 'http';
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import elasticsearch from 'elasticsearch';
import createUser from './handlers/users/create'
import injectHandlerDependencies from './utils/inject-handler-dependencies';
require('dotenv').config();


const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_PROTOCOL}://${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

const app = express();

//Middlewares
app.use(bodyParser.json({
  limit: 1e6
}));

app.listen(process.env.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Hobnob API server listening on port ${process.env.SERVER_PORT}!`);
});

app.get('/', (req, res) => {
  res.send('Hello, World! OK 222');
});

app.post('/users',injectHandlerDependencies(createUser,client));