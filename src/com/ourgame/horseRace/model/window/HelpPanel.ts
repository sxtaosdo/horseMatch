/**
 * 帮助面板
 */
class HelpPanel extends BaseComponent implements IWindow {

    // private list: eui.List;
    // private data: eui.ArrayCollection;
    // public closeBtn: eui.Button;
    // public btn1: eui.RadioButton;
    // public btn2: eui.RadioButton;
    // public btn3: eui.RadioButton;
    // public btn4: eui.RadioButton;
    // public btn5: eui.RadioButton;
    // public btn6: eui.RadioButton;
    // public btn7: eui.RadioButton;


    public constructor() {
        super();
        this.skinName = "resource/game_skins/window/HelpPanelSkin.exml";
    }

    protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
    }

    public enter(data?: any): void {
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.exit, this);
        // GameDispatcher.addEventListener(BaseEvent.HELP_DATA_EVENT, this.onData, this);
        // ConnectionManager.instance.sendHelper.help();
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    }

    public exit(data?: any): void {
        // if (this.stage != null) {
        //     this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.exit, this);
        // }
        ClientModel.instance.openWindow(null);
    }

    public execute(data?: any): void {
    }

    /**
     * 初始化
     */
    public init(): void { }
    /**
     * 销毁
     */
    public destroy(): void { }


}