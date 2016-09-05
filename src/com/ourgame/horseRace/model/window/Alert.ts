/**
 * 飘字提示
 * @author sxt
 */
class Alert extends BaseComponent implements IWindow {

    public static SHOW_TIME: number = 2500;
    private contentText: eui.Label;
    private okBtn: eui.Button;
    private returnBtn: eui.Button;
    private bg: egret.Sprite;
    private isShow: boolean = false;
    private info: Object;

    public constructor() {
        super();
        this.skinName = "resource/game_skins/window/AlertSkin.exml";
        this.init();
    }


    public enter(data?: any): void {
        // console.log("1 alert剩余数量：" + WindowManager.instance.alertDataList.length);
        if (this.isShow == false) {
            this.isShow = true;
            this.info = WindowManager.instance.alertDataList.shift();
            if (this.info != null) {
                this.alpha = 1;
                this.contentText.text = this.info["text"];
            } else {
                this.isShow = false;
                ClientModel.instance.openWindow(null);
            }
            this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtn, this);
            this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturnBtn, this);
        }
    }

    public execute(data?: any): void {

    }

    private onShowComplete(): void {
        this.isShow = false;
        if (WindowManager.instance.alertDataList.length > 0) {
            this.enter();
        } else {
            ClientModel.instance.openWindow(null);
        }
    }

    public exit(data?: any): void {
        this.contentText.text = "";
        TimerManager.instance.clearTimer(ClientModel.instance.openWindow);
        ClientModel.instance.openWindow(null);
        this.isShow = false;
    }

    public destroy(): void {
        this.exit();
    }

    public init(): void {
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0xffffff, 0);
        this.bg.graphics.drawRect(0, 0, Main.STAGE_WIDTH, Main.STAGE_HEIGHT);
        this.bg.graphics.endFill();
        this.addChildAt(this.bg, 0);
    }

    private onOkBtn(): void {
        if (this.info) {
            if (this.info["okFun"]) {
                this.info["okFun"]();
            }
        }
        this.exit();
    }

    private onReturnBtn(): void {
        if (this.info) {
            if (this.info["canelFun"]) {
                this.info["canelFun"]();
            }
        }
        this.exit();
    }
}
