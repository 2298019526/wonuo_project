const domain = "http://127.0.0.1/yuezhu_admin/public/index.php/index"; //域名
//路由列表
const routeList = {
  //微信小程序登录,根据code换区sessionkey
  login: domain + '/index/login',
  //获取用户信息
  getUserInfo: domain + '/index/getUserInfo',
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
  //获取悬赏流程页面数据
  getRewardProcess: domain + '/index/getRewardProcess',
  //结束悬赏
  endTheReward: domain + '/index/endTheReward',
  //发布悬赏
  release: domain + '/index/release',
  //获取个人中心悬赏信息
  getMineReward: domain + '/index/getMineReward',
  //获取我的发布
  getMyReleaseData: domain + '/index/getMyReleaseData',
  //获取我的接取
  getMyReceiveData: domain + '/index/getMyReceiveData',
  //获取积分记录数据
  getIntegralRecordData: domain + '/index/getIntegralRecordData',
  //地图的key，使用腾讯位置服务api的标识
  //mapKey: "2W3BZ-GADKG-2QMQC-IPCL6-ZUUTK-TEBDU"
  mapKey: "USUBZ-RGXCF-2VGJT-JJMYB-XDLZJ-BSF4T",
}

module.exports = routeList; //暴露出变量