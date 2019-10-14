angular.module('starter.config', [])
.constant('configFile','https://www.he-pai.cn/app/www/chcp.json')
.constant('serveRoot','https://www.he-pai.cn/app/')//https://www.he-pai.cn/app/www/   /(\w+)\s(\w+)/
.constant('reqRoot','http://10.10.16.23:8800/mobiserver/api/newCall.do')
.constant('getMsg','http://www.qsgjgcs.com/userLoginGetValidateCode') //获取验证码
.constant('register','http://www.qsgjgcs.com/userRegister') //注册
.constant('login','http://www.qsgjgcs.com/userLoginIn') //登录
.constant('updateMsg','http://www.qsgjgcs.com/userRnoForRePass') //修改密码获取验证码
.constant('addPass','http://www.qsgjgcs.com/userRePass') //确认修改密码
.constant('upPhoto','http://www.qsgjgcs.com/userRePhoto') //修改头像
.constant('exitLogin','http://www.qsgjgcs.com/userLoginOut') //退出登录
.constant('bdMsgList','http://www.qsgjgcs.com/bangdan/queryPL') //榜单留言列表
.constant('imgUrl','http://39.97.234.111/base/userFiles/bdImg/') //图片路径
.constant('bdDz','http://www.qsgjgcs.com/bangdan/dataZan') //榜单点赞
.constant('bdList','http://www.qsgjgcs.com/bangdan/dataList') //评论列表

.constant('bdjb','http://www.qsgjgcs.com/bangdan/needLogin/jiebang') //我要揭榜
.constant('plbd','http://www.qsgjgcs.com/bangdan/needLogin/addReview') //留言
.constant('setbusiness','http://www.qsgjgcs.com/user/needLogin/jymm') //交易密码
.constant('getPrice','http://www.qsgjgcs.com/qingbei/needLogin/queryAmount') //获取金额
.constant('qbcs','http://www.qsgjgcs.com/qingbei/needLogin/qingBeiZZFirst') //青贝曾送
.constant('qbcs2','http://www.qsgjgcs.com/qingbei/needLogin/qingBeiZZSecond') //青贝曾送第二步
.constant('qbjl','http://www.qsgjgcs.com/qingbei/needLogin/qingBeiJYList') //青贝交易记录
.constant('getskm','http://www.qsgjgcs.com/qingbei/needLogin/qrcode') //获取青贝二维码
.constant('fbBd','http://www.qsgjgcs.com/bangdan/needLogin/add') //发布榜单
.constant('jbJl','http://www.qsgjgcs.com/bangdan/needLogin/jbList') //揭榜记录
.constant('fbJl','http://www.qsgjgcs.com/bangdan/needLogin/fbList') //发榜记录
.constant('bdDetailJl','http://www.qsgjgcs.com/bangdan/needLogin/bdjbrList') //当前榜单揭榜记录
.constant('ljjb','http://www.qsgjgcs.com/bangdan/needLogin/fbrJieBang') //揭榜
.constant('bdyl','http://www.qsgjgcs.com/bangdan/needLogin/imgPrv') //bdyl

.constant('hdfb','http://www.qsgjgcs.com/activity/needLogin/add') //活动发布
.constant('queryAct','http://www.qsgjgcs.com/activity/queryData') //活动列表
.constant('canjiaAct','http://www.qsgjgcs.com/activity/needLogin/cyhd') //参与活动


;
