//import http from 'http';
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import elasticsearch from 'elasticsearch';
import injectHandlerDependencies from './utils/inject-handler-dependencies';

import createUser from './handlers/users/create'
import getUsers from './handlers/users/get-users'

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
  res.send('This is an elastic search app');
});

app.get('/users', injectHandlerDependencies(getUsers,client))
app.post('/users',injectHandlerDependencies(createUser,client));