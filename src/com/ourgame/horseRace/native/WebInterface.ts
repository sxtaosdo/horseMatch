/**
 * 网页
 * @author 
 *
 */
class WebInterface implements INative {

    public constructor() {
    }

    public closeApp(data?: any): void {
        // window["onWebViewJSCallback"]("lua://CloseHelp.lobby.command");
        window.open("lua://CloseHelp.lobby.command");
        if (ConnectionManager.instance.isConnected) {
            ConnectionManager.instance.close();
        }
    }

    public recharge(data?: any): void {
        window.open("http://newshop.ourgame.com/class.shtml?flag=2&templateID=19&ClassID=21&ClassName=t");
    }

    public scan(data?: any): void {

    }

    public onSocketClose(data?: any): void {
        ClientModel.instance.openAlert(2);
    }

    public onLoadeBegin(data?: any): void {
        window["onWebViewShouldStartLoading"](data);
    }

    public onLoadeComplete(data?: any): void {
        // window["onWebviewDidFinishLoading"](data);
    }

    public onLoadeError(data?: any): void {
        window["OnDidFailLoading"](data);
    }

    public callfunction(data?: any): void {
        // console.log("lua://webview.touch" + data);
        window.open("lua://webview.touch" + data);
        ClientModel.instance.openAlert("lua://webview.touch" + data);
    }

    public onInitComplete(data?: any): void {
        window.location.href = "lua://webview.miniGameInitComplete";
    }

}
