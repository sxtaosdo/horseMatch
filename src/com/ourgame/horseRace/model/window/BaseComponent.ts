/**
 * 带皮肤的类
 * @author sxt
 * 提供一些基本的通用操作，关闭，居中等
 */
class BaseComponent extends eui.Component {
    protected skinLoaded: boolean = false;
    protected isCenter: boolean = false;

    public constructor(isCenter: boolean = true) {
        super();
        this.isCenter = isCenter;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
    }

    protected onStage(e: any): void {
        if (this.isCenter) {
            this.center();
        }
    }

    protected onSkinComplete(e: any): void {
        this.skinLoaded = true;
        try {
            this.center();
            this.initCloseBtn();
        } catch (error) {
            console.log(error);
            ClientModel.instance.openWindow(null);
        }
    }

    private center(): void {
        if (this.stage != null) {
            this.x = (this.stage.stageWidth - this.width) >> 1;
            this.y = (this.stage.stageHeight - this.height) >> 1;
        }
    }

    private initCloseBtn(): void {
        try {
            (<eui.Button>this["closeBtn"]).addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if (this["exit"]) {
                    this["exit"]();
                }
            }, this);
        } catch (e) {
            // console.log(e);
        }
    }

}
