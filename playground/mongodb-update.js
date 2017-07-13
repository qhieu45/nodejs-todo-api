const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('593012f145f9c087640c893a')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //     console.log(`After updated: \n ${JSON.stringify(result, undefined, 2)}`);
  //   }, (error) => {
  //     console.log(`Error: ${error}`);
  //   });

  db.collection('Users').findOneAndUpdate({
    name: 'Hieu Cao'
  }, {
    $set: {
      name: 'Huy Cao Quang',
      location: 'Saigon, Vietnam'
    },
    $inc: {
      age: +4
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(`After updated: \n ${JSON.stringify(result, undefined, 2)}`);
  }, (error) => {
    console.log(error);
  });

  // db.close();
});
