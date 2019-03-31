//import http from 'http';
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import elasticsearch from 'elasticsearch';
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

app.post('/users', (req, res) => {
  if (req.headers['content-length'] === 0) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'Payload should not be empty',
    });
    return;
  }
  if (req.headers['content-type'] !== 'application/json') {
    res.status(415);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'The "Content-Type" header must always be "application/json"',
    });
    return;
  }
  client.index({
    index: 'hobnob',
    type: 'user',
    body: req.body,
  }).then((result) => {
    res.status(201);
    res.set('Content-Type', 'text/plain');
    res.send(result._id);
  }).catch(() => {
    res.status(500);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'Internal Server Error'
    });
  });
});