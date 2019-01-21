const userSchema = new global.mongoose.Schema({
  username: String,
  realname: String,
  password: String,
  email: String,
  sex: Number
});

module.exports = global.mongoose.model('User', userSchema);