const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Study Nodejs',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert Todo ', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Hieu Cao',
  //   age: 25,
  //   location: 'Helsinki, Finland'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert new user ', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  //   console.log(`Result: \n ${result.ops}`);
  //   // console.log(`New user added: \n ${JSON.stringify(result.ops, undefined, 2)}`);
  // });

  db.close();
});
