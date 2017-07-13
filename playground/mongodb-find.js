const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({_id: new ObjectID("592ffa7b2d498810dcb5d3d0")}).toArray().then((docs) => {
  //   console.log('Todos: ');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (error) => {
  //   console.log(`Unable to fetch todos ${error}`)
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count} `);
  // }, (error) => {
  //   console.log(`Unable to fetch todos ${error}`)
  // });


  db.collection('Users').find({age: 25}).toArray().then((docs) => {
    console.log(`Users: \n ${JSON.stringify(docs, undefined, 2)}`);
  }, (error) => {
    console.log(`Error: ${error}`);
  })
  // db.close();
});
