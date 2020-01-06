const domain = "http://127.0.0.1/yuezhu_admin/public/index.php/index"; //域名
//路由列表
const routeList = {
  //获取今日之星排行
  getTodayStarRank: domain + '/index/getTodayStarRank',
  //获取首页的附近悬赏数据
  getIndexEvents: domain + '/index/getIndexEvents',
  //搜索页查询接口
  searchAllEvent: domain + '/index/searchAllEvent',
  mapKey: "USUBZ-RGXCF-2VGJT-JJMYB-XDLZJ-BSF4T" //地图的key，使用腾讯位置服务api的标识
}

module.exports = routeList; //暴露出变量