/**
 * native接口管理
 * @author sxt
 */
class InterfaceManager {
    private static _instance: InterfaceManager;
    private currentNative: INative;

    public constructor() {
        if (egret.Capabilities.runtimeType == "web") {
            this.currentNative = new WebInterface();
            return;
        }
        switch (egret.Capabilities.os) {
            case "iOS":
                this.currentNative = new IosInterface();
                // ClientModel.instance.clientType = 1;
                break;
            case "Android":
                this.currentNative = new AndroidInterface();
                // ClientModel.instance.clientType = 2;
                break;
            case "Windows PC":
            case "Mac OS":
                this.currentNative = new WebInterface();
                // ClientModel.instance.clientType = 0;
                break;
            case "Windows Phone":
                this.currentNative = new WebInterface();
                // ClientModel.instance.clientType = 3;
                break;
            default:
                if (this.isWeiXin) {
                    this.currentNative = new WebInterface();
                }
                break;
        }
    }

    public get isWeiXin(): boolean {
        var ua: string = navigator.userAgent.toString();

        var str: any = ua.match(/MicroMessenger/i);
        if (str == "MicroMessenger") {
            return true;
        } else {
            return false;
        }

    }

    public get isMove(): boolean {
        switch (egret.Capabilities.os) {
            case "iOS":
            case "Android":
                return true;
            default:
                return false;
        }
    }

    public static get instance(): InterfaceManager {
        if (this._instance == null) {
            this._instance = new InterfaceManager();
        }
        return this._instance;
    }

    public native(): INative {
        return this.currentNative;
    }

    public closeApp(data?: any): void {
        InterfaceManager.instance.currentNative.closeApp(data);
    }

    public recharge(data?: any): void {
        InterfaceManager.instance.currentNative.recharge(data);
    }

    public scan(data?: any): void {
        InterfaceManager.instance.currentNative.scan(data);
    }

    public onSocketClose(data?: any): void {
        InterfaceManager.instance.currentNative.onSocketClose(data);
    }

    public onLoadeBegin(data?: any): void {
        InterfaceManager.instance.currentNative.onLoadeBegin(data);
    }

    public onLoadeComplete(data?: any): void {
        InterfaceManager.instance.currentNative.onLoadeComplete(data);
    }

    public onLoadeError(data?: any): void {
        InterfaceManager.instance.currentNative.onLoadeError(data);
    }

    public callfunction(data?: any): void {
        InterfaceManager.instance.currentNative.callfunction(data);
    }

    public onInitComplete(data?: any): void {
        InterfaceManager.instance.currentNative.onInitComplete(data);
    }
}
