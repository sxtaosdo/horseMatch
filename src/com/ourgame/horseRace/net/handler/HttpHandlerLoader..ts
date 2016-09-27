/**
 * Http短连接请求
 */
class HttpHandlerLoader implements ISocket {
    private callback: Function;
    private loader: egret.URLLoader = new egret.URLLoader();
    private request = new egret.URLRequest();

    public constructor(callback: Function, manager?: any) {
        this.callback = callback;
        this.loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.request.method = egret.URLRequestMethod.POST;
    }

	/**
	 * 第一条无状态请求
	 */
    public conn(ip: string, port: number): void {
        // this.request = new egret.HttpRequest();
        // this.request.responseType = egret.HttpResponseType.TEXT;
        // this.request.withCredentials = true;
        // var url: string = ConfigModel.instance.url + "/login/" + UserModel.instance.token;
        // this.request.open(url, egret.HttpMethod.POST);
        // this.request.addEventListener(egret.Event.COMPLETE, this.onLogin, this);
        // this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        // this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        // this.request.send();
        //======================================================================================
        this.loader.addEventListener(egret.Event.COMPLETE, this.onLogin, this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        let url: string = ConfigModel.instance.url + "/login/" + UserModel.instance.token;
        this.request.url = url;
        this.loader.load(this.request);
        console.log("发送了：" + ConfigModel.instance.url + "/login/" + UserModel.instance.token);
    }

    private onLogin(event: egret.Event): void {
        // let request: egret.HttpRequest = event.currentTarget;
        // request.removeEventListener(egret.Event.COMPLETE, this.onLogin, this);
        // this.request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        // this.callback("login", JSON.parse(event.currentTarget.response));
        // console.log("event.currentTarget.response:" + request.response);
        //======================================================================================
        this.loader.removeEventListener(egret.Event.COMPLETE, this.onLogin, this);
        this.loader.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        this.callback("login", JSON.parse(event.currentTarget.data));
        console.log("event.currentTarget.response:" + event.currentTarget.data);
    }

    public send(type: any, byts?: any): void {
        // this.request.open(ConfigModel.instance.url + type, egret.HttpMethod.POST);
        // this.request.send(byts);
        // console.log("发送了：" + ConfigModel.instance.url + type);
        //============================================================================
        // let loader: egret.URLLoader = new egret.URLLoader();
        // loader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        // let request: egret.URLRequest = new egret.URLRequest(ConfigModel.instance.url + type);
        // loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // request.method = egret.URLRequestMethod.POST;
        // request.data = new egret.URLVariables(byts);
        // loader.load(request);
        //===============================================================================
        this.request.url = ConfigModel.instance.url + type;
        this.request.data = new egret.URLVariables(byts);
        this.loader.load(this.request);
        console.log("发送了：" + ConfigModel.instance.url + type);
    }

    public isConnected(): boolean {
        return true;
    }

    public close(): void {

    }

    private onGetComplete(event: egret.Event): void {
        var request: egret.HttpRequest = event.currentTarget;
        console.log("request.data:" + request.response);

        var data = JSON.parse(request.response);
        var temp: string = request["_url"].substr(request["_url"].indexOf("hrb/") + 4);
        var type: string;
        if (temp.indexOf("/") > -1) {
            type = temp.substring(0, temp.lastIndexOf("/"));
        } else {
            type = temp;
        }
        console.log("type:" + type + "\ntemp" + temp);

        this.callback(type, data);
        if (ConfigModel.instance.debug) {
            console.log(data);
        }
    }

    private onLoadError(event: egret.IOErrorEvent): void {
        console.log("onLoadError");
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

}