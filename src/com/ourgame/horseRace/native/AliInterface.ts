/**
 * 支付宝接口
 */
class AliInterface implements IPlatform {


	public closeApp(data?: any): void {
        // egret.ExternalInterface.call("2N", "quit");
        console.log("执行了条用外部方法：退出应用");
	}

    public recharge(data?: any): void {

    }

    public scan(data?: any): void {
        // egret.ExternalInterface.call("2N", "scan");
        console.log("执行了条用外部方法:扫码");
		// AlipayJSBridge.call('scan', {
		// 	type: 'bar'
		// }, function (result) {
		// 	console.log("扫码结果：" + result);

		// });
    }

    public onSocketClose(data?: any): void {
        ClientModel.instance.openAlert(2);
    }

    public onLoadeBegin(data?: any): void {

    }

    public onLoadeComplete(data?: any): void {

    }

    public onLoadeError(data?: any): void {

    }

    public callfunction(data?: any): void {

    }

    public onInitComplete(data?: any): void {

    }

	public share(data?: any): void {
		// AlipayJSBridge.call('share', {
		// 	'bizType': "testShareBizType",   // 标示业务类型，埋点时使用，不需要埋业务参数，可以设空
		// 	'keepOrder': false, // 保持分享渠道的顺序,android 9.1 换新的分享组件以后不支持
		// 	'channels': [{
		// 		name: 'Weibo', //新浪微博
		// 		param: {
		// 			title: '分享的标题',
		// 			content: '分享的内容，不能超过140',
		// 			imageUrl: '分享的图片地址',
		// 			captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先imageUrl)
		// 			url: 'http://baidu.com' //分享跳转的url，当添加此参数时，分享的图片大小不能超过32K
		// 		}
		// 	}, {
		// 			name: 'LaiwangTimeline', //来往动态
		// 			param: {
		// 				title: '分享的标题',
		// 				content: '分享的内容',
		// 				imageUrl: '分享的图片地址',
		// 				captureScreen: true,
		// 				url: 'http://alipay.com'
		// 			}
		// 		}, {
		// 			name: 'Weixin', //微信
		// 			param: {
		// 				title: '分享的标题',
		// 				content: '分享的内容',
		// 				imageUrl: '分享的图片地址',
		// 				captureScreen: true,
		// 				url: 'http://baidu.com'
		// 			}
		// 		}, {
		// 			name: 'WeixinTimeLine', //微信朋友圈
		// 			param: {
		// 				title: '分享的标题',
		// 				content: '分享的内容',
		// 				imageUrl: '分享的图片地址',
		// 				captureScreen: true,
		// 				url: 'http://baidu.com'
		// 			}
		// 		}, {
		// 			name: 'SMS', //短信
		// 			param: {
		// 				content: '短信内容',
		// 				// contentType和extData为人传人定制功能专用，无需求请勿设置，campId   活动ID （一定不能为空）
		// 				contentType: 'url',
		// 				extData: 'targetUrl=http://d.alipay.com/rcr/expect.htm,slTargetUrl=http://m.alipay.com,campId=,bizId=biztest,bizName=bn,validDate=10800,length=8'
		// 			}
		// 		}, {
		// 			name: 'CopyLink', //复制链接
		// 			param: {
		// 				url: 'http://m.alipay.com'
		// 			}
		// 		}, {
		// 			name: 'ALPContact',   //支付宝联系人,9.0版本
		// 			param: {   //请注意，支付宝联系人仅支持一下参数
		// 				contentType: 'text',    //必选参数,目前支持支持"text","image","url"格式
		// 				content: "xxx",    //必选参数,分享描述
		// 				iconUrl: "xxx",   //必选参数,缩略图url，发送前预览使用,
		// 				imageUrl: "xxx", //图片url
		// 				url: "http://www.163.com",   //必选参数，卡片跳转连接
		// 				title: "share title",    //必选参数,分享标题
		// 				memo: "",   //透传参数,分享成功后，在联系人界面的通知提示。
		// 				otherParams: {    //透传参数，额外的分享入参
		// 					extendData: "testXY",    //可选参数，额外的分享入参。服务器验证签名使用，由服务器@笑六 提前发给业务方
		// 					alipayUrl: 'alipays://xxxx' // 这种方式的url打开 不会跳转到h5中间页
		// 				}
		// 			}
		// 		}]
		// }, function (result) {
		// 	console.log("分享结果：" + result);
		// });
	}


}