const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Make dinner'}).then((result) => {
  //   console.log(result);
  // }, (error) => {
  //   console.log(`Error: ${error}`);
  // })

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Make dinner'}).then((result) => {
  //   console.log(result);
  // }, (error) => {
  //   console.log(`Error: ${error}`);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }, error => console.log(`Error: ${error}`));

  db.collection('Users').findOneAndDelete({_id: new ObjectID('593007cb45f9c087640c8753')}).then((result) => {
    console.log(result);
  });


  // db.close();
});
