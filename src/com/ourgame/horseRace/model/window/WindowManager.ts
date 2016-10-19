/**
 * 窗口管理
 * @author sxt
 */
class WindowManager extends egret.Sprite {

    private static _instance: WindowManager = new WindowManager();

    private currentWin: IWindow;
    private winList: any;
    private modalAlpha: number = .6;
    private bg: egret.Sprite;
    private _alertDataList: Array<any>;

    public static get instance(): WindowManager {
        return WindowManager._instance;
    }

    public constructor() {
        super();
        if (WindowManager._instance != null) {
            console.warn("不能重复实例化本类WindowManager！");
            return;
        }
        this.winList = {};
        this._alertDataList = new Array<any>();
    }

    public open(panel: any, data?: any): void {
        if ((panel != null) && (panel == Alert)) {
            this._alertDataList.push(data);
        } else {
            if (this.currentWin != null) {
                // console.log("关闭旧窗口：" + this.currentWin);
                this.close(this.currentWin);
            }
        }
        if ((panel == this.currentWin) || (panel == null)) {
            return;
        } else {
            if (this.winList[panel] == null) {
                this.winList[panel] = new panel();
            }
            this.addPopUp(this.winList[panel], true);
            this.winList[panel].enter(data);
            this.currentWin = this.winList[panel];
            // console.log("打开窗口：" + this.currentWin);
        }
    }

    public close(panel: any, data?: any): void {
        if (this.winList[panel] != null) {
            this.removePopUp(this.winList[panel]);
            this.winList[panel].exit();
        } else {
            var win: any = this.currentWin;
            if ((this.currentWin != null) && (this.contains(win))) {
                this.removeChild(win)
                win["exit"]();
            }
        }
        this.currentWin = null;
        this.exit();
    }

    public enter(data?: any): void {
        //        GameDispatcher.addEventListener(BaseEvent.WINDOW_EVENT,this.onWindow,this);
        if (this.bg == null) {
            this.bg = new egret.Sprite();
            this.bg.graphics.beginFill(0x000000, this.modalAlpha);
            this.bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.bg.graphics.endFill();
            this.bg.width = this.stage.stageWidth;
            this.bg.height = this.stage.stageHeight;
            this.bg.touchEnabled = true;
        }
        this.addChildAt(this.bg, 0);
    }

    public exit(data?: any): void {
        //        GameDispatcher.instance.removeEventListener(BaseEvent.WINDOW_EVENT,this.onWindow);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        if (this.bg && this.bg.parent) {
            this.bg.parent.removeChild(this.bg);
        }
    }

    public destroy(): void {
        this.exit();
    }

    private addPopUp(window: egret.DisplayObject, isModal: boolean = true): void {
        window.alpha = 0;
        this.addChild(window);
        // TweenMax.to(window, 0.2, { alpha: 1 });
        egret.Tween.get(window).to({ alpha: 1 }, 300);
    }

    private removePopUp(window: egret.DisplayObject): void {
        if (this.contains(window)) {
            //            TweenMax.to(window,1.4,{ alpha: 0,onComplete: this.removeChild,onCompleteParams: [window] });
            this.removeChild(window);
        }
    }

    public get alertDataList(): Array<any> {
        return this._alertDataList;
    }
}
