const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

// we need a this keyword for this method
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access, token});
  return user.save().then(() => {
    // the value token will be returned as a success for the next then call
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  })
};



// model method
UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

//model method
UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    })
  });
};


//run some code before the given event
// before we save, we will make some changes to it
// next is needed
UserSchema.pre('save', function(next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if(user.isModified('password')){
    let hashedPassword;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};
