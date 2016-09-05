class PlayerList extends BaseComponent implements IBase {
	
	public constructor() {
		super(false);
		this.skinName = "resource/game_skins/RightPanelSkin.exml";
		this.touchChildren = false;
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
}