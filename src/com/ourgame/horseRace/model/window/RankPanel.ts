class RankPanel extends BaseComponent implements IWindow {

	public closeBtn: eui.Button;
	public kBtn: eui.RadioButton;
	public tBtn: eui.RadioButton;

	public constructor() {
		super();
		this.skinName = "resource/game_skins/window/RankPanelSkin.exml";
	}

	protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
		this.kBtn.selected = true;
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