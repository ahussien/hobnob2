function getUsers(req, res, db) {
  db.search({
    index: 'hobnob'
  }, (err, result) => {
    if (err) {
      res.status(500);
      res.set('Content-Type', 'application/json');
      res.json({
        message: err
      });
    }

    res.status(201);
    res.set('Content-Type', 'text/plain');
    res.send(JSON.stringify(result));
  })

}

export default getUsers;