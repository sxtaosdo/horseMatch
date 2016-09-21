/**
 * Http短连接请求
 */
class HttpHandler implements ISocket {
    private callback: Function;

    public constructor(callback: Function, manager?: any) {
        this.callback = callback;
        let obj;
        obj as egret.DisplayObject
    }

	/**
	 * 第一条无状态请求
	 */
    public conn(ip: string, port: number): void {
        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        // var url: string = ConfigModel.instance.url + "/login/" + UserModel.instance.token;
        // request.open(url, egret.HttpMethod.POST);
        // // request.setRequestHeader("JSESSIONID", "537D64A9278068E5359A5D7AF42CAE86");
        // request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
        //     var temp = event.currentTarget.getAllResponseHeaders();
        //     // var JssionId = event.currentTarget.getResponseHeader("Set-Cookie");
        //     // var JssID_Cookie = window.localStorage.key(1);
        //     // var temp = event.currentTarget.getResponseHeader("Content-Type");
        //     // var temp = event.currentTarget.getResponseHeader("Content-Length");
        //     // window.localStorage.setItem("JSESSIONID", "537D64A9278068E5359A5D7AF42CAE86");
        //     // egret.localStorage.setItem("JSESSIONID", "537D64A9278068E5359A5D7AF42CAE86");
        //     console.log(document.cookie);

        //     this.callback("login", JSON.parse(event.currentTarget.response));   //登陆信息特殊处理
        // }, this);
        // request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        // request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        // request.send();

        //创建 URLLoader 对象
        var loader: egret.URLLoader = new egret.URLLoader();
        //设置加载方式为纹理
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //添加加载完成侦听
        // var ss=decodeURI()
        loader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            // window.localStorage.key(0);
            // var temp1 = window.localStorage.getItem("JSESSIONID");
            var temp: egret.URLLoader = (<egret.URLLoader>event.currentTarget);
            this.callback("login", JSON.parse(event.currentTarget.data));   //登陆信息特殊处理
        }, this);
        //添加加载失败侦听
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        var url: string = ConfigModel.instance.url + "/login/" + UserModel.instance.token;
        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        //开始加载
        loader.load(request);

    }

    public send(type: any, byts?: any): void {

        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        // var url: string = ConfigModel.instance.url + type;
        // request.open(url, egret.HttpMethod.POST);
        // // request.withCredentials=true;
        // // request.setRequestHeader("JSESSIONID", "537D64A9278068E5359A5D7AF42CAE86");
        // request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        // request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        // request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        // request.send();

        //创建 URLLoader 对象
        var loader: egret.URLLoader = new egret.URLLoader();
        //设置加载方式为纹理
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        //添加加载失败侦听
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        var url: string = ConfigModel.instance.url + type;
        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        // request.data = new egret.URLVariables("JSESSIONID=537D64A9278068E5359A5D7AF42CAE86");
        //开始加载
        loader.load(request);


    }

    public isConnected(): boolean {
        return true;
    }

    public close(): void {

    }

    private onGetComplete(event: egret.Event): void {
        var request: egret.URLLoader = event.currentTarget;
        var data = JSON.parse(request.data);
        var temp: string = request._request.url.substr(request._request.url.indexOf("hrb/") + 4);
        var type: string;
        if (temp.indexOf("/") > -1) {
            type = temp.substring(0, temp.lastIndexOf("/"));
        } else {
            type = temp;
        }
        this.callback(type, data);
        if (ConfigModel.instance.debug) {
            console.log(data);
        }
    }

    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("get error : " + event.type + "\n url:" + event.currentTarget._url);
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

}