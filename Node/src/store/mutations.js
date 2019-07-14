export const mutations = {
// 增加新闻方法
  addNews(state, message) {
    state.infoSuccess = message;
  },
// 删除新闻
  deleteNews(state, info) {
    console.log("删除数据");
    console.log("最终执行的info对象",info);
    state.deleteNewsInfo = info;
  },
// 修改新闻	
 modNews(state, modinfo) {
    console.log("修改数据");
    console.log("最终执行的修改modinfo对象",modinfo);
    state.modNewsInfo = modinfo;
  }
}
