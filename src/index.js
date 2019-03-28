//import http from 'http';
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();

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
  res.status(400);
  res.set('Content-Type', 'application/json');
  res.json({
    message: 'Payload should be in JSON format',
  });
});