function createUser(req, res, db) {
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
    db.index({
      index: process.env.ELASTICSEARCH_INDEX,
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
  }

export default createUser;