class OperationPanel extends BaseComponent implements IWindow{

	public constructor() {
		super();
		// this.skinName="resoutce/game_skins/window/SettingPanelSkin.exml";
		this.skinName = "resource/game_skins/window/SettingPanelSkin.exml";
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