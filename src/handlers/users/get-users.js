function getUsers(req, res, db, getUsersEngine) {

getUsersEngine(req,db, getUsersEngine)
.then((result) => {
   res.status(201);
     res.set('Content-Type', 'text/plain');
     res.send(JSON.stringify(result));
  }).catch((err) => {
    res.status(500);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'Internal Server Error:'+err
    });
  });

}

export default getUsers;