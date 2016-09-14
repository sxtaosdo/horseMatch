/**
 * Http短连接请求
 */
class HttpHandler implements ISocket {
    private callback: Function;

    public constructor(callback: Function, manager?: any) {
        this.callback = callback;
    }

	/**
	 * 第一条无状态请求
	 */
    public conn(ip: string, port: number): void {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        var url: string = ConfigModel.instance.url + "/login/" + UserModel.instance.token;
        request.open(url, egret.HttpMethod.POST);
        request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            var temp = event.currentTarget.getAllResponseHeaders();
            this.callback("login", JSON.parse(event.currentTarget.response));   //登陆信息特殊处理
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.send();
    }

    public send(type: number, byts: any): void {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        var url: string = ConfigModel.instance.url + "?" + byts;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("session", UserModel.instance.token);
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.send();
    }

    public isConnected(): boolean {
        return true;
    }

    public close(): void {

    }

    private onGetComplete(event: egret.Event): void {
        var request: egret.HttpRequest = <egret.HttpRequest>event.currentTarget;
        var data = JSON.parse(request.response);
        console.log("get data : ", request.response);
        console.log("get data-json : ", data);
    }

    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("get error : " + event.type);
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

}