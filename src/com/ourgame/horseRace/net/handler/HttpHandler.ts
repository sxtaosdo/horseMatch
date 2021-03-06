/**
 * Http短连接请求
 * 根据flash思路写的，感觉有待优化
 * 要写一个请求队列，不然连续请求会出错
 */
class HttpHandler implements ISocket {
    private callback: Function;
    private request = new egret.HttpRequest();
    /**消息队列 */
    private requestList: Array<any> = new Array<any>();
    /**是否消息正在发送中 */
    private isSending: boolean = false;

    public constructor(callback: Function, manager?: any) {
        this.callback = callback;
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
        this.request.setRequestHeader("Content-Type", "application/json");
        this.request.addEventListener(egret.Event.COMPLETE, this.onLogin, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        this.request.send();
    }

    private onLogin(event: egret.Event): void {
        let request: egret.HttpRequest = event.currentTarget;
        request.removeEventListener(egret.Event.COMPLETE, this.onLogin, this);
        this.request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        this.callback("login", JSON.parse(event.currentTarget.response));
        console.log("event.currentTarget.response:" + request.response);
    }

    public send(type: any, byts?: any): void {
        if (this.isSending == false) {
            this.isSending = true;
            this.request.open(ConfigModel.instance.url + type, egret.HttpMethod.POST);
            this.request.setRequestHeader("Content-Type", "application/json");
            this.request.send(byts);
            console.log("发送了：" + ConfigModel.instance.url + type);
        } else {
            this.requestList.push({ type: type, byts: byts });
        }
    }

    public isConnected(): boolean {
        return true;
    }

    public close(): void {

    }

    private onGetComplete(event: egret.Event): void {
        this.isSending = false;
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
        // console.log("type:" + type + "\ntemp" + temp);

        this.callback(type, data);
        if (ConfigModel.instance.debug) {
            console.log(data);
        }
        if (this.requestList.length > 0) {
            let obj: any = this.requestList.shift();
            this.send(obj.type, obj.byts);
        }
    }

    private onLoadError(event: egret.IOErrorEvent): void {
        this.isSending = false;
        console.log("onLoadError");
        console.log(event.currentTarget);
        ClientModel.instance.openAlert("网络异常");
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

}