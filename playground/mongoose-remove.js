const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove -- remoe everything Todo.remove({})
//
// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove({})
//
// Todo.findOneAndRemove({_id: new ObjectID('5932896256079b0e30ff80c0')})
// .then((todo) => {
//   console.log(todo);
// })

Todo.findByIdAndRemove('593293eb3c61772cdc7a50fb')
  .then(todo => console.log(`Item removed: ${todo}`));
