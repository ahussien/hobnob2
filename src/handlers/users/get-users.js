import  getUsersEngine from '../../engines/users/getUsers' 
function getUsers(req, res, db) {

getUsersEngine(req,db).then((result) => {
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