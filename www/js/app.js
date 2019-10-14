// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','starter.controllers', 'starter.services','starter.config','starter.router','starter.directive','starter.unit','ionic-citypicker'])

.run(function($ionicPlatform,$location,$rootScope,$window,$cordovaToast,$cordovaSQLite,$timeout,$q,$ionicHistory,$ionicLoading,$ionicPopup,$cordovaStatusbar,$ionicGesture,$cordovaInAppBrowser,$ionicActionSheet,$cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2,$http,$cordovaNetwork,$state,state,req,serveRoot,configFile,sqLiteLoginInfo,tip,jpushService,backMore,reqRoot,httpService) {
  $rootScope.logined=0;//默认未登录
  $rootScope.hpRegister = '0';
  $rootScope.ionHeaderBarSty="orange";//ion-header-bar的背景色，默认是orange
  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();
  localStorage.isIOSPlatform = ionic.Platform.isIOS();
  if(localStorage.gcid){
    var data = {
      accountID: localStorage.gcid,
    };
    $http({
      method: 'POST',
      url: "https://www.qsgjgcs.com/message/needLogin/ggmessage",
      headers: {  
        'Authorization': localStorage.token,
        'phoneNO' : localStorage.telephone,
      },  
      dataType: 'json',
      data: data,
      }).success(function(data) {
        if(data.code=='1000'){
          var tpl='<style>#toZjtg{position:absolute;top:36%;left:72%;z-index:1000;}#zjtgTip .bg{background:rgba(0,0,0,0.8);position:absolute;top:0px;left:0px;bottom:0px;right:0px;z-index:99;}#zjtgTip .bd{z-index:999;color:#000;position:absolute;top:50%;left:50%;margin-left:-160px;width:320px;height:200px;margin-top:-100px;}</style><div id="zjtgTip"><div class="bg"></div><div class="bd"><div class="card"><span style="  position: absolute; color: #fff;  z-index: 1000; font-size: 16px; font-weight: bold; right: 20px; " id="upVer">x</span><div class="item item-divider item-assertive" style="background-color: #2BC9C0;">'+data.datas[0].mtype
          +'</div><div class="item item-text-wrap">'+data.datas[0].mcontent+'<p  id="toZjtgDetail" style="text-align:right;color:#008ccf;margin-top:20px;">'+data.datas[0].yuliu3+'</p></div></div></div></div>';
            document.getElementById("zjtg").innerHTML=tpl;
            document.getElementById("toZjtgDetail").onclick=function(){
             var  url ="http://39.97.234.111/base/userFiles/message/"+data.datas[0].yuliu3+""
              cordova.InAppBrowser.open(url,"_system")

            };
              document.getElementById("upVer").onclick=function(){
                document.getElementById("zjtg").innerHTML=''

            };
            return ;
        
        
          
        }else{
          $rootScope.tip(data.msg);
        }
      }).error(function(error) {
        $rootScope.tip("网络忙，请稍后再试……");

      });
  }
  //热推送更新单元函数
  $rootScope.chcpFn=function(){
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      navigator.splashscreen.hide();//隐藏欢迎界面
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
	  //盖屏
  //  $http.get(serveRoot+'apk/version.json?t='+Date.parse(new Date()))
		// .then(function(data){
		// 	  req.deviceInfo().then(function(deviceInfo){
    //      $rootScope.appVer=deviceInfo.APPVER;//客户端版本
		// 		  console.log($rootScope.appVer);
		// 	  var serverAppVersion = parseInt(data.data.verInfo.substring(1,2));//服务器 版本
		// 	  var zjtgCtrl=data.data.zjtgCtrl;//0表示不开启弹出，1表示开启弹出
		// 	  var zjtgMsg=data.data.zjtgMsg;//资金托管提示语句
		// 	  var zjtgTil=data.data.zjtgTil;//资金托管提示标题
		// 	  var zjtgLink=data.data.zjtgLink;//資金託管詳情連接
		// 	  var upVersion =data.data.upVersion;
		// 	  var iosLink=data.data.iosLink;//資金託管詳情連接
		// 	  var upTpl ='';
		// 	  var flg = false;
		// 	  if($rootScope.appVer.replace('V',"").replace(/\./g,"")<upVersion){
		// 		 if(isIOS){  
		// 			upTpl = "<span id='upVer'style='text-align: center; display: block;'>点击下载最新版本</span>";
		// 			flg = true;
		// 		  }
		// 	  }
		// 	  var tpl='<style>#toZjtg{position:absolute;top:36%;left:72%;z-index:1000;}#zjtgTip .bg{background:rgba(0,0,0,0.8);position:absolute;top:0px;left:0px;bottom:0px;right:0px;z-index:99;}#zjtgTip .bd{z-index:999;color:#000;position:absolute;top:50%;left:50%;margin-left:-160px;width:320px;height:200px;margin-top:-100px;}</style><div id="zjtgTip"><div class="bg"></div><div class="bd"><div class="card"><div class="item item-divider item-assertive">'+zjtgTil+'</div><div class="item item-text-wrap">'+zjtgMsg+'<p style="text-align:right;color:#008ccf;margin-top:20px;">'+upTpl+'</p></div></div></div></div>';
		// 		if(zjtgCtrl && zjtgCtrl == 1||flg){
		// 		  document.getElementById("zjtg").innerHTML=tpl;
		// 		  document.getElementById("toZjtgDetail").onclick=function(){
		// 			$rootScope.inAppBrowserRef.openUrl(zjtgLink);
		// 		  };
		// 		 document.getElementById("upVer").onclick=function(){
		// 			$rootScope.inAppBrowserRef.openUrl(iosLink);
		// 		  };
		// 		  return ;
		// 		}
		// 	  });

	  // });
      //屏蔽ios的热推送
      if (window.indexedDB) {
        console.log("I'm in WKWebView!");
      } else {
          console.log("I'm in UIWebView");
      }
     
     }
  }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //app启动时热推送更新执行

     $rootScope.chcpFn();
     //自动检测更新
     //autoCheckUpdate();
     document.addEventListener("menubutton", onHardwareMenuKeyDown, false);

     //app初始化创建数据库和表
     sqLiteLoginInfo.initDb();
     //初始化状态栏
     if (window.StatusBar) {
        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString("#31a492");
        }
      }
    /***************生产上放开 ********************* ***********************************************/
      try{
        // var notificationCallback = function(event) {
        //   sqLiteLoginInfo.userInfo.get(function(userInfo){
        //     var key = "szshqtx2014hpzx090415#@1";
        //     var id = userInfo.ciNo ? DES3.encrypt(key, 'avd' + userInfo.ciNo) : "";
        //     var alertContent,
        //     activeUrl="";//活动地址
        //     if(device.platform == "Android") {
        //         alertContent = event.alert;
        //         activeUrl=event.extras.activeUrl;
        //     } else {
        //         alertContent = event.aps.alert;
        //         activeUrl=event.activeUrl;
        //         window.plugins.jPushPlugin.setBadge(0);//服务器角标清0
        //         window.plugins.jPushPlugin.setDebugModeFromIos();
        //         event.aps.badge&&window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        //     }
        //     activeUrl&&$rootScope.inAppBrowserRef.openUrl(activeUrl+id);
        //   });
        // };
        // jpushService.init(notificationCallback);
        // req.deviceInfo().then(function(deviceInfo){
        //   //设置别名
        //   //jpushService.setAlias(deviceInfo.APPVER);
        //    sqLiteLoginInfo.userInfo.get(function(userInfo){
        //       var phone =  userInfo.mbPhn;
        //       jpushService.setAlias(phone);
        //    })

        // });

        //初始化友盟统计配置
        // window.plugins.umengAnalyticsPlugin.init();
        //调试模式
     //   window.plugins.umengAnalyticsPlugin.setDebugMode(true);
        //启动MAA服务
      //  function onStartCallback(ret){
       //     console.log('start return: ' + JSON.stringify(ret));
       // }
      //  window.plugins.maaSdkPlugin.start(onStartCallback);

        // 获取版本号
        function onGetVersionCallback(ret){
            console.log('getVersion return: ' + JSON.stringify(ret));
        }
      //  window.plugins.maaSdkPlugin.getVersion(onGetVersionCallback);

        //重新激活MAA加速SDK的接口，请在应用进入前台的时候，即在 applicationWillEnterForeground: 函数中调用
      //   function onActivateCallback(ret){
      //       console.log('activate return: ' + JSON.stringify(ret));
      //   }
      //  window.plugins.maaSdkPlugin.activate(onActivateCallback);

       // 获取META-DATA
        function onGetMetaDataCallback(ret){
            console.log('getMetaData return: ' + JSON.stringify(ret));
            $rootScope.chid=ret;
        }
      //  window.plugins.maaSdkPlugin.getMetaData("UMENG_CHANNEL", onGetMetaDataCallback);
      }catch(e){}

  });
  // 菜单键
  function onHardwareMenuKeyDown() {
      $ionicActionSheet.show({
          titleText: '检查更新',
          buttons: [
              { text: '关于' }
          ],
          destructiveText: '检查更新',
          cancelText: '取消',
          cancel: function () {

          },
          destructiveButtonClicked: function () {
              //检查更新
              checkUpdate();
          },
          buttonClicked: function (index) {

          }
      });
      $timeout(function () {
          hideSheet();
      }, 2000);
  };

  //跳到登录页面
  $rootScope.viewToLogin=function(){
    state.go("login");
  }
  //退出登录
  $rootScope.exitLogin=function(){
    sqLiteLoginInfo.exitLogin(function(){
        state.go("tab.home");
    });
  }
  $rootScope.tip = function(txt){
  // $ionicPopup.alert({
  //     title: '提示',
  //     cssClass:'custom-popup',
  //     template: '<ul>'+txt+'</ul>',
  //     okText:'确定'
  // });
	  var tpl='<span class="animated cpt-toast bounceOutDown-hastrans" style="position: fixed;left: 50%; padding: 10px 20px; font-size: 14px; border-radius: 6px; color: rgb(255, 255, 255); top: 50%; z-index: 1000001; transform: translate3d(-50%, -50%, 0px); animation-duration: 0.5s; background: rgba(7, 17, 27, 0.658824);">'+txt+'</span>';
         document.getElementById("zjtg").innerHTML=tpl;
          setTimeout(function() {
            document.getElementById("zjtg").innerHTML=''
            if(txt=="该账号已在其他设备上登陆,请重新登陆账号"){
              localStorage.clear();
              state.go("login")
            }
        }, 2000)

  }
  //打开外部链接
  $rootScope.inAppBrowserRef=(function(){
    var _browser;
    return {
      getInstance:function(){
          return _browser?_browser:cordova.InAppBrowser;
      },
      close:function(){
        $cordovaInAppBrowser.close();
        _ref.executeSript({file: "myscript.js"});
      },
      //url 请求地址
      //eventObj 有以下几种事件loadstart ：function(cordovaInAppBrowser){}  开始加载回调函数  loadstop：function(cordovaInAppBrowser){} 完成加载回调函数    loaderror：function(cordovaInAppBrowser){}  加载错误回调函数
      //cordovaInAppBrowser回调里面注入$cordovaInAppBrowser对象
      openUrl:function(url,eventObj){
        var ths=this;
         if (!cordova.InAppBrowser) {
            return;
         }
       
        var _ref;
        // toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
        // toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
        // closebuttoncaption=关闭 仅iOS有效
        if(url.indexOf('bbs.he-pai.cn')>0){//bbs
           
            if(url.substring(url.indexOf('&id=')+4).length>0){
            
            }else{
              //未登录  退出bbs
              var _url = "";
              _url="https://bbs.he-pai.cn/user_api/api.php?go=logout&app=true&redirectUrl="+url;
              if(isIOS) {
                _ref=ths.getInstance().open(encodeURI(_url), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
              } else {
                _ref=ths.getInstance().open(encodeURI(_url), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
              }
            }
        }else if(url.indexOf('m.ihefu.com')>0){//进入合富微站点则隐藏toolbar
            _ref=this.getInstance().open(encodeURI(url), '_blank', 'location=no,toolbar=no');
        }else{
             if(url.indexOf('isFromNative')>0){
                if($rootScope.sessionId!=''&&$rootScope.sessionId!=undefined){
                  _ref=ths.getInstance().open(encodeURI(url+='&signKey='+$rootScope.signKey+'&sessionId='+$rootScope.sessionId+'&time='+new Date().getTime()), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
                }else{
                  _ref=ths.getInstance().open(encodeURI(url), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');

                }
             }else{
              if(url.indexOf('wxhb/xnhb/2018augustActivityKxj.html')>0){ //其中有个长按下载的功能需使用浏览器打开
                _ref=ths.getInstance().open(encodeURI(url), '_system', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
              }else{
                _ref=ths.getInstance().open(encodeURI(url), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
              }
             }
        }

        _ref.addEventListener('loadstart', function(event){
          eventObj&&eventObj.loadstart&&eventObj.loadstart(_ref);
          //当前inappbrowser内部浏览器跳到验证成功服务器页面
          var _url=event.url;
          //_url = 'https://10.10.7.5:8100/wechat/#/?sessionId=vuk74gd2xo9c2249wxj3mxcs7ov84j83&signKey=hqkljmhft96uo856ncrusla8ubveu52d';
          if(_url.indexOf('m.he-pai.cn/wechat/#/?')>=0){
            var pras = _url.split('?')[1];
            var pra = pras && pras.split('&');
            var pra0 = pra && pra[0];
            var pra1 = pra && pra[1];
            var sessionId = '';
            var signKey = '';
            if(pra0.split('=')[0] == 'sessionId'){
              sessionId = pra0.split('=')[1];
            }else if(pra0.split('=')[0] == 'signKey'){
              signKey = pra0.split('=')[1];
            }
            if(pra1.split('=')[0] == 'sessionId'){
              sessionId = pra1.split('=')[1];
            }else if(pra1.split('=')[0] == 'signKey'){
              signKey = pra1.split('=')[1];
            }
    
            _ref.close();
            state.go('tab.home');
          }
          //抓取hefu微站点登录链接，提到app登录来
          if(_url.indexOf('m.he-pai.cn/wechat/#/login')>=0){
            _ref.close();
            state.go('login');
          }
          if(_url.indexOf('http://39.97.234.111/rest/success')>=0){
            _ref.close();
            state.go('memberCenter');
          }
          //抓取hefu微站点注册链接，提到app注册来
          if(_url.indexOf('m.he-pai.cn/wechat/#/register')>=0){
            _ref.close();
            $rootScope.hpRegister = '3';
            state.go('login');
          }
          //合富广告页进来
          if(_url.indexOf('m.he-pai.cn/adv')>=0){
            _ref.close();
            state.go('tab.home');
          }

		      //监听微站点风险测评
          if(_url.indexOf('m.he-pai.cn/wechat/#/riskapp')>=0){
            _ref.close();
            state.go('tab.memberCenter');
          }
        
          if(_url.indexOf('platformapp')>=0){
            _ref.close();
            state.go('tab.home');
          }
          //资金存管设置交易密码成功页面抓取回调地址跳转到个人中心
          if(_url.indexOf('pwdRetUrl.do')>=0 && _url.indexOf('retUrl') < 0){
              _ref.close();
              req.deviceInfo().then(function(deviceInfo){
                var param = {
                  "sessionId":deviceInfo.sessionId,
                  "channel":'000001'
                };
                httpService('Z017',param).then(function(data){
                  if(data.returnCode == '0'){
                    localStorage.pwdsetflag = '1';
                    tip("设置交易密码成功");
                    var currentView = $ionicHistory.currentView().stateName; // 获取当前视图
                    if(currentView != 'tab.capitalSuccess'){  
                      state.go('tab.capitalSuccess');
                    }else{
                      $rootScope.$broadcast('refreshCapitalSuccess');
                    };
                  }
                  // else{
                  //   tip(data.returnMsg);
                  // }
                });
            });
          }
          //资金存管设置交易密码失败页面抓取回调地址跳转
          if(_url.indexOf('pinSettingJson-failed.html')>=0 && _url.indexOf('retUrl') < 0){
            $timeout(function(){
              _ref.close();
              tip('交易密码设置失败，请稍后重试！');
              state.go("tab.memberCenter");
            },3000);
          }
          //提现成功或者失败用户点击返回按钮第三方页面跳转
          if(_url.indexOf('https://m.he-pai.cn/wechat/#/memberCenter')>=0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            state.go("tab.memberCenter");
          }
           //资金存管充值成功抓取回调地址跳转到个人中心
         if(_url.indexOf('hpweb/memberCenter/memberCenter/payRetUrl.do')>=0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            state.go("tab.memberCenter");
          }
          //投资成功，抓取第三方接口跳转回调
          if(_url.indexOf('successInvestment.do') >= 0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            req.deviceInfo().then(function(deviceInfo){
              var param = {
              "sessionId":deviceInfo.sessionId,
              "orderId": $rootScope.orderId
              };
              httpService('IM400',param).then(function(data){
                if(data.returnCode == '0'){
                  state.go("tab.investSuccess",{msg: data.returnMsg});
                }else{
                  tip(data.returnMsg);
                }
              });
            });
          }
          //缴费授权签约成功，抓取第三方接口跳转回调
          if(_url.indexOf('https://m.he-pai.cn/wechat/#/bidService') >= 0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            var currentView = $ionicHistory.currentView().stateName; // 获取当前视图
            if(currentView != 'tab.capitalSuccess'){  
              state.go('tab.capitalSuccess');
            }else{
              $rootScope.$broadcast('refreshCapitalSuccess');
            };
          }
          //自动投标签约成功，抓取第三方接口跳转回调
          // if(_url.indexOf('hpweb/memberCenter/memberCenter/autoBid.html') >= 0 && _url.indexOf('retUrl') < 0){
          //   _ref.close();
          //   $rootScope.$broadcast('reloadAutoBid');
          // }
          //自动投标签约成功，抓取第三方接口跳转回调
          if(_url.indexOf('hpweb/memberCenter/memberCenter/bankDepositManagement.do') >= 0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            $rootScope.$broadcast('reloadAutoBid');
          }
          //自动债转签约成功，抓取第三方接口跳转回调
          if(_url.indexOf('hpweb/memberCenter/memberCenter/index.html') >= 0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            $rootScope.$broadcast('reloadAutoBid');
          }
          //客服服务关闭面板的时候则返回app发现页面
          if(_url.indexOf('http://he-pai.udesk.cn/hc') >= 0){
            _ref.close();
          }

          //开通存管失败则提前拦截,不改变isOpen
          if(_url.indexOf('openAccountAppJson-failed.html') >= 0 && _url.indexOf('retUrl') < 0){
            $timeout(function(){
              _ref.close();
              $timeout(function(){
                tip('开通存管失败，请稍后重试！');
              },1000);
            },2000);
          }
          //开通存管之后的页面
          if(_url.indexOf('https://m.he-pai.cn/wechat/#/capitalSuccess') >= 0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            localStorage.isOpen = '0';
            //存储手机号到本地数据库
            sqLiteLoginInfo.userInfo.get(function(userInfo) {
              userInfo.mbPhn = $rootScope.mbPhn;
              sqLiteLoginInfo.userInfo.set(userInfo);
            });
            $rootScope.$broadcast('refreshCapitalSuccess');
            state.go('tab.capitalSuccess');
          }
          
          //银行第三方页面忘记密码回调地址抓取
          if(_url.indexOf('https://m.he-pai.cn/wechat/#/resetZcTradePwd') >= 0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            state.go('tab.resetZcTradePwd');
          }

          //绑定银行卡之后地址抓取
          if(_url.indexOf('https://m.he-pai.cn/wechat/#/banksInfoZc') >= 0 && _url.indexOf('retUrl') < 0){
            _ref.close();
            $rootScope.$broadcast('refreshbanksInfoZc');
          }
        });
        var loadTime=0;
        _ref.addEventListener('loadstop', function(event){
          var _url=event.url;
          //签署数字证书，连连支付，大额支付成功后跳转到我的合拍
          if(_url.indexOf(encodeURI('签署成功'))>=0 || _url.indexOf('llpayh5/index.html#/success')>=0 || _url.indexOf('pay/success.html')>=0){
              tip("3秒后跳回商户",function(){
                //签署数字证书成功，更新本地数据库
                sqLiteLoginInfo.userInfo.get(function(userInfo) {
                  userInfo.isSignCertAuth = '1';
                  sqLiteLoginInfo.userInfo.set(userInfo);
                });
                state.go("tab.memberCenter");
              })
              setTimeout(function(){
                _ref.close();
              },3000);
          }

          if(_url.indexOf('llpayh5/index.html#/error')>=0){
              tip("3秒后跳回商户",function(){
                state.go("quickPayment");
              })
              setTimeout(function(){
                _ref.close();
              },3000);
          }
          if(_url.indexOf('m.he-pai.cn/wechat/#/login')>=0){
            _ref.close();
            state.go('login');
          }
          if(_url.indexOf('m.he-pai.cn/wechat/#/bidList/1/1/0')>=0||_url.indexOf('actbidlist')>=0){
            _ref.close();
            state.go('tab.bidList',{"bidId":'1',"querytype":'1'});
          }

          if(_url.indexOf('pay/fail.html')>=0){
              tip("3秒后跳回商户",function(){
                 state.go("largePayment");
              })
              setTimeout(function(){
                _ref.close();
              },3000);
          }

          if(_url.indexOf('https://m.he-pai.cn/wxhb/xnhb/2018newsAct')>=0){
            _ref.close();
            state.go("tab.home");
          }
          eventObj&&eventObj.loadstop&&eventObj.loadstop(_ref);
          $rootScope.loadingHide();
        });
        _ref.addEventListener('loaderror', function(){
          eventObj&&eventObj.loaderror&&eventObj.loaderror(_ref);
          $rootScope.loadingHide();
        });
        _ref.addEventListener('exit', function(event){
          eventObj&&eventObj.exit&&eventObj.exit(_ref);
          $rootScope.loadingHide();
        });
     
      }
    }
  })();
  /**
  *视图跳转
  *配置权限拦截器
  stateName：状态名称
  stateParams:视图状态参数
  disableBack：是否在状态栏头部显示返回功能键
  第一个参数是statename状态名
  如果只有2个参数，第二个参数是对象的话就是stateParams，如果是boolen类型，那么第二个参数就是disableBack
  如果有3个参数，第二个参数是对象的话就是stateParams，第三个参数就是disableBack
  */
  $rootScope.toView=function(_stateName,_stateParam,_disableBack){
    state.go(_stateName,_stateParam,_disableBack);
  }
  //loading加载
  var loadingStatus;//标识loading状态，0为隐藏loading  1为显示
  $rootScope.loadingShow = function() {
    loadingStatus=1;
    $ionicLoading.show({
      maxWidth: 200,
      noBackdrop :true,
      template :'<style>.loading-container .loading{padding:0px!important;background-color: rgba(0, 0, 0, 0);}</style><img style="border-radius:5px;opacity:0.8;" src="img/loading.gif" width="500px"/>'
    });
    var time=0;
    var backtime=setInterval(function(){
      if(time>10){
        tip("网络连接失败，请检查您的网络情况",function(){
          clearInterval(backtime);
          $ionicLoading.hide();
        });
      }
      if(loadingStatus==0){
        clearInterval(backtime);
      }
      ++time;
    },1000);
  };
  $rootScope.loadingHide = function(){
    loadingStatus=0;
    $ionicLoading.hide();
  };
  //返回上一个视图回调函数
  $rootScope.goBackView=function(e){
      //隐藏键盘
      var node = document.getElementsByClassName('keyboard');
      angular.element(node).remove();

      var stateName = ($ionicHistory.currentView()).stateName;//当前页面的statename
      e&&e.preventDefault();
      if(stateName in backMore) {
        $ionicHistory.goBack(backMore[stateName]);
        return;
      }
      if($rootScope.registerToCapSup && stateName=="tab.capitalSupervision"){
        $rootScope.registerToCapSup = false;
        state.go("tab.memberCenter");
        return;
      }
      // 弹出确定是否退出提示
      function showExitConfirm() {
          var confirmPopup = $ionicPopup.confirm({
              title: '<strong>退出应用?</strong>',
              template: '你确定要退出应用吗?',
              okText: '退出',
              cancelText: '取消'
          });

          confirmPopup.then(function (res) {
              if (res) {
                  //注意，这段代码是应用退出前保存统计数据，请在退出应用前调用
                  //window.plugins.umengAnalyticsPlugin.onKillProcess();
                  ionic.Platform.exitApp();
              } else {
                  // Don't close
              }
          });
      }

      //非登录状态下的上一个视图
       var backView=(function(){
        var _firstView="";//标识返回按钮起始返回视图
        var _historyViewLst=$ionicHistory.viewHistory().views;//视图历史记录;
        var _backView;//返回视图
        var _viewsArr=[];//保存历史视图数组队列
        var _viewsArrLen=0;
        var time=0;//遍寻次数，操作3次，返回首页视图
        var filterPage=[
          'tab.investHly',
          'tab.invest',
          'tab.investWly',
          'tab.memberCenter',
          'tab.assetStatistics',
          'tab.capitalFlow',
          'investTickets',
          'tab.accountM',
          'tab.planDetail',
          'tab.quitHly',
          'tab.assetStatistics',
          'tab.updateLoginPwd',
          'tab.updateTradePwd',
          'tab.resetTradePwd',
          'tab.resetTradePwdContent',
          'tab.updatePhn',
          'tab.updatePhnStep2',
          'withdraw',
          'withdrawFee',
          'withdrawIptPwd',
          'quickPayment',
          'wechatPayment',
          'tab.myInvest',
          'tab.myInvestNew',
          'tab.investDetail',
          'record',
          'recordInfo',
          'tab.investZzb',
          'tab.myTasks',
          'passwordM',
          ].join();//需要过滤页面

        return function(currentView){
          if(currentView&&(!$ionicHistory.currentView().backViewId||filterPage.indexOf(currentView.stateName)==-1)){
            return _viewsArr[0];
          }
          if(!currentView){//初始调用，进行数据初始化
            _firstView=$ionicHistory.currentView();
            _viewsArr=[];
            for (var view in $ionicHistory.viewHistory().views){
               _viewsArr.push($ionicHistory.viewHistory().views[view]);
            }
            _viewsArrLen=_viewsArr.length;
            if(!_firstView.backViewId){
              return _viewsArr[0];
            }
            _backView=_historyViewLst[_firstView.backViewId];
          }else{//追溯过程逻辑
            ++time;//追溯次数自增1
            _backView=_historyViewLst[currentView.backViewId];
          }
          try{
            if(_backView.stateName==_firstView.stateName||time==2){
              return _viewsArr[0];
            }
            return (filterPage.indexOf(_backView.stateName)>=0)?backView(_historyViewLst[_backView.backViewId]):_backView;
          }catch(e){
            return _viewsArr[0];
          }

        }
      })();
      //判断处于哪个页面时双击退出
      if($location.path() == '/tab/home') {
          if ($rootScope.backButtonPressedOnceToExit) {
              /***************生产上放开 ********************************************************************/
              try{
                //注意，这段代码是应用退出前保存统计数据，请在退出应用前调用
                window.plugins.umengAnalyticsPlugin.onKillProcess();
                // 关闭SDK接口，当应用结束时需要关闭SDK，在applicationWillTerminate:函数中调用
                isIOS&&window.plugins.maaSdkPlugin.stop();
              }catch(e){

              }

              ionic.Platform.exitApp();
          } else {
              $rootScope.backButtonPressedOnceToExit = true;
              $cordovaToast.showShortTop('再按一次退出系统');
              setTimeout(function () {
                  $rootScope.backButtonPressedOnceToExit = false;
              }, 2000);
          }
      }else if ($ionicHistory.backView()) {
          if(localStorage.token){//登录的用户直接返回上一级
            $ionicHistory.goBack();
          }else{//未登录的页面需要推展判断
            var view=backView();
            view.go();
          }
       
      } else {
          if ($rootScope.backButtonPressedOnceToExit) {
            /***************生产上放开 ********************************************************************/
            try{
              //注意，这段代码是应用退出前保存统计数据，请在退出应用前调用
              window.plugins.umengAnalyticsPlugin.onKillProcess();
              // 关闭SDK接口，当应用结束时需要关闭SDK，在applicationWillTerminate:函数中调用
              isIOS&&window.plugins.maaSdkPlugin.stop();
            }catch(e){}


            ionic.Platform.exitApp();
            // 关闭SDK接口，当应用结束时需要关闭SDK，在applicationWillTerminate:函数中调用
            isIOS&&window.plugins.maaSdkPlugin.stop();
          }else{
            $rootScope.backButtonPressedOnceToExit = true;
            $cordovaToast.showShortTop('再按一次退出系统');
            setTimeout(function () {
                $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
          }
      }
      return false;
  }

  
  //双击退出
  $ionicPlatform.registerBackButtonAction(function (e) {
    var stateName = ($ionicHistory.currentView()).stateName;//当前页面的statename
    if(stateName == "gesturePwd"){
      tip("请输入手势密码");
    }else{
      if(stateName in backMore) {
        $ionicHistory.goBack(backMore[stateName]);
        return;
      }
      $rootScope.goBackView(e);
    }

  }, 101);
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  //设置tabs插件导航在底部显示
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  //让nav标题在iOS和Android上都居中显示
  $ionicConfigProvider.navBar.alignTitle('center');
  //禁止ios下的左右切换滑动
  $ionicConfigProvider.views.swipeBackEnabled(false);
});
