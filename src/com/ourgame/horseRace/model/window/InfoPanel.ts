/**
 * 赛马资料
 */
class InfoPanel extends BaseComponent implements IWindow {
	
	public closeBtn: eui.Button;
	public headBtn1: eui.RadioButton;
	public headBtn2: eui.RadioButton;
	public headBtn3: eui.RadioButton;
	public headBtn4: eui.RadioButton;
	public headBtn5: eui.RadioButton;
	public viewStack: eui.ViewStack;

	public constructor() {
		super();
		this.skinName = "resource/game_skins/window/InfoPanelSkin.exml";
	}

	protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
    }

	public enter(data?: any): void {

	}

	public exit(): void {
		ClientModel.instance.openWindow(null);
	}

	public execute(data?: any): void {

	}

	public init(): void {

	}

    public destroy(): void {

	}
}