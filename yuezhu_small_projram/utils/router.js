const domain = "http://127.0.0.1/yuezhu_admin/public/index.php/index"; //域名
//路由列表
const routeList = {
  //获取今日之星排行
  getTodayStarRank: domain + '/index/getTodayStarRank',
  //获取首页的附近悬赏数据
  getIndexEvents: domain + '/index/getIndexEvents',
  //搜索页查询接口
  searchAllEvent: domain + '/index/searchAllEvent',
  //获取标签数据
  getLabel: domain + '/index/getLabel',
  //获取悬赏详情页数据
  getEventDetails: domain + '/index/getEventDetails',
  //根据标签id查询悬赏数据
  getLabelReward: domain + '/index/getLabelReward',
  //立即领取悬赏事件
  receiveReward: domain + '/index/receiveReward',
  //地图的key，使用腾讯位置服务api的标识
  mapKey: "USUBZ-RGXCF-2VGJT-JJMYB-XDLZJ-BSF4T"
}

module.exports = routeList; //暴露出变量