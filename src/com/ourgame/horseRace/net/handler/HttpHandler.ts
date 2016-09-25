/**
 * Http短连接请求
 */
class HttpHandler implements ISocket {
    private callback: Function;
    private request = new egret.HttpRequest();

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
        // this.request.setRequestHeader("contentType", "application/json;charset=UTF-8");
        this.request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        this.request.addEventListener(egret.Event.COMPLETE, this.onLogin, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        this.request.send();
        console.log("发送了：" + ConfigModel.instance.url + "/login/" + UserModel.instance.token);
    }

    private onLogin(event: egret.Event): void {
        let request: egret.HttpRequest = event.currentTarget;
        request.removeEventListener(egret.Event.COMPLETE, this.onLogin, this);
        this.request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        console.log("event.currentTarget.response:" + request.response);
        this.callback("login", JSON.parse(event.currentTarget.response));
    }

    public send(type: any, byts?: any): void {
        this.request.open(ConfigModel.instance.url + type, egret.HttpMethod.POST);
        this.request.send(byts);
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

    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("get error : " + event.type + "\n url:" + event.currentTarget._url);
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

}