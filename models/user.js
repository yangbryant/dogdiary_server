const userSchema = require('../schemas/user')

module.exports = global.mongoose.model('User', userSchema);