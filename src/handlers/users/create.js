import Ajv from 'ajv';
import profileSchema from '../../schema/users/profile.json';
import createUserSchema from '../../schema/users/create.json';

function create(req, res, db, create) {
  //validate User input

  const ajvValidate = new Ajv({allErrors: true})
    .addFormat('email', /^[\w.+]+@\w+\.\w+$/)
    .addSchema([profileSchema, createUserSchema])
    .compile(createUserSchema);

  const valid = ajvValidate(req.body);
  if (!valid) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json(ajvValidate.errors);
  }

  create(req,db)
  .then((result) => {
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