import createUserEngine from '../../engines/users/createUser'
function create(req, res, db) {
    createUserEngine(req,db).then((result) => {
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

export default create;