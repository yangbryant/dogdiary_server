const userSchema = new global.mongoose.Schema({
  user_id: Number,
  username: String,
  password: String,
  active: { type: Boolean, default: true }
});

module.exports = global.mongoose.model('User', userSchema);