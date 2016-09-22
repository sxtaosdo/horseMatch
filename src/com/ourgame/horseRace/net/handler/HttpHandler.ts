/**
 * Http短连接请求
 */
class HttpHandler implements ISocket {
    private callback: Function;
    private request = new egret.HttpRequest();

    public constructor(callback: Function, manager?: any) {
        this.callback = callback;
        let obj;
        obj as egret.DisplayObject
    }

	/**
	 * 第一条无状态请求
	 */
    public conn(ip: string, port: number): void {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.withCredentials = true;
        var url: string = ConfigModel.instance.url + "/login/" + UserModel.instance.token;
        this.request.open(url, egret.HttpMethod.POST);
        this.request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        this.request.send();

        // //创建 URLLoader 对象
        // var loader: egret.URLLoader = new egret.URLLoader();
        // //设置加载方式为纹理
        // loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // //添加加载完成侦听
        // // var ss=decodeURI()
        // loader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
        //     // window.localStorage.key(0);
        //     // var temp1 = window.localStorage.getItem("JSESSIONID");
        //     var temp: egret.URLLoader = (<egret.URLLoader>event.currentTarget);
        //     this.callback("login", JSON.parse(event.currentTarget.data));   //登陆信息特殊处理
        //     // this.test();
        // }, this);
        // //添加加载失败侦听
        // loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        // var url: string = ConfigModel.instance.url + "/login/" + UserModel.instance.token;
        // // var url: string = ConfigModel.instance.url+"http://172.28.160.175/login/" + UserModel.instance.token;
        // var request: egret.URLRequest = new egret.URLRequest(url);
        // request.method = egret.URLRequestMethod.POST;
        // //开始加载
        // loader.load(request);
    }

    private test(): void {
        // var loader: egret.URLLoader = new egret.URLLoader();
        // //设置加载方式为纹理
        // loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // //添加加载完成侦听
        // // var ss=decodeURI()
        // loader.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
        //     var temp: egret.URLLoader = (<egret.URLLoader>event.currentTarget);
        //     console.log(temp);
        // }, this);
        // //添加加载失败侦听
        // loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        // var url: string = "http://172.28.160.175:5566/login/session";
        // var request: egret.URLRequest = new egret.URLRequest(url);
        // request.method = egret.URLRequestMethod.POST;
        // //开始加载
        // loader.load(request);


        // this.request.open("http://172.28.160.175:5566/login/session", egret.HttpMethod.POST);
        this.request.open(ConfigModel.instance.url + "/hrb/init", egret.HttpMethod.POST);
        this.request.send();
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