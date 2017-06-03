const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

const id = "59314072977fac133c062fbf2";

if (!ObjectID.isValid(id)){
  console.log('ID not valid');
}

User.findById(id).then((user) => {
  if (!user) {
    return console.log('UserId not found');
  }
  console.log('User: ' + user);
}, (e) => console.log(e));

//.catch((e) => console.log(e))




// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log(`Todos : ${todos}`);
// })
//
// Todo.findOne({
//   completed: false
// }).then((todos) => {
//   console.log(`Todos : ${todos}`);
// })

// Todo.findById(id)
// .then((todos) => {
//   if (!todos) {
//     return console.log('Id not found!');
//   }
//   console.log(`Todos : ${todos}`);
// }).catch((e) => console.log(e));
