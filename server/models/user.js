const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
  }
});

// we need a this keyword for this method
// UserSchema.methods.generateAuthToken = function () {
//   let user = this;
//   let access = 'auth';
//   let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
//   user.tokens.push({access, token});
//   return user.save().then(() => {
//     // the value token will be returned as a success for the next then call
//     return token;
//   });
// };

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
}


let User = mongoose.model('User', UserSchema);

module.exports = {User};
