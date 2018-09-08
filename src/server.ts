import * as express from 'express';

  let app = express(),
  port = process.env.PORT || 3000;

  app.listen(port);

console.log('todo list RESTful API server started on: ' + port);