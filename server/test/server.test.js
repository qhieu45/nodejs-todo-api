const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},
{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 512
}
]
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((error, response) => {
        if (error) {
          return done (error);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((error, response) => {
        if (error) {
          return done(error)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })

  })
});

describe ('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
})


describe ('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[1].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${(new ObjectID()).toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    const hexID = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo).toNotExist();
          done();
        }, (e) => {
          done(e);
        })
      });
  })

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${(new ObjectID()).toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });

})

describe('PATCH /todos/:id', () => {
  const firstHexId = todos[0]._id.toHexString();
  const secondHexId = todos[1]._id.toHexString();
  const textUpdate = 'Hello From Testing';
  it('should update the todo', (done) => {
    request(app)
      .patch(`/todos/${firstHexId}`)
      .send({text: textUpdate, completed: true})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(textUpdate);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
      request(app)
        .patch(`/todos/${secondHexId}`)
        .send({text: textUpdate, completed: false})
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(textUpdate);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
  }, (e) => done(e))
})
//
// describe('POST /users', () => {
  const email = 'hieuhieu@test.com';
  const password = "123456789";
  it('should create a new user', (done) => {
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(email);
      })
      .end((error, response) => {
        if (error) {
          return done (error);
        }

        User.find({email}).then((users) => {
          expect(users.length).toBe(1);
          expect(users[0].email).toBe(email);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not create email with invalid data', (done) => {
    request(app)
      .post('/users')
      .send()
      .expect(400)
      .end((error, response) => {
        if (error) {
          return done(error)
        }

        User.find().then((users) => {
          expect(users.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
  //
  // it('should not create email with same email', (done) => {
  //   request(app)
  //     .post('/users')
  //     .send({email, password})
  //     .expect(400)
  //     .end((error, response) => {
  //       if (error) {
  //         return done(error)
  //       }
  //
  //       Todo.find().then((todos) => {
  //         expect(todos.length).toBe(2);
  //         done();
  //       }).catch((e) => done(e));
  //     });
  // });
//
// });
