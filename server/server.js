const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  },(error) => {
    res.status(400).send(error);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})
// const newTodo = new Todo({
//   text: 'Test SendGrid Nodejs',
//   // completed: false,
//   // completedAt: 21
// });
//
// newTodo.save().then((doc) => {
//   console.log('Todo saved! ', doc);
// }, (error) => {
//   console.log(`Unable to save. Error: ${error}`)
// });

module.exports = {app};
