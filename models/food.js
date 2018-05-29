const foodSchema = require('../schemas/food')

module.exports = global.mongoose.model('Food', foodSchema);