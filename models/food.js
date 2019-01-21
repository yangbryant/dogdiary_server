/*
此类信息需与App保持一致
eat: 0:不能吃; 1:能吃; 2:谨慎吃; 3:剧毒,食用后需立即就医; 其他待补充
category: 0:所有食物; 1:水果; 2:蔬菜; 3:主食; 4:菌类; 5:肉蛋; 6:奶制品; 7:海鲜; 8:饮料; 9:零食; 10:坚果; 11:调味品; 12:药类; 其他待补充
*/
const foodSchema = new global.mongoose.Schema({
  name: String,
  alias: String,
  name_pinyin: String,
  category: Number,
  eat: Number, // 除了能吃不能吃,还有可以吃一点等情况
  logo: String,
  updated: Number, // 更新时间戳
  title: String,
  detail: String
});

module.exports = global.mongoose.model('Food', foodSchema);