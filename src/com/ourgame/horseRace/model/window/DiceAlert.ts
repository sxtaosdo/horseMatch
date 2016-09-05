class DiceAlert extends BaseComponent implements IBase {
	public closeBtn: eui.Button;
	public contentText: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/game_skins/window/DiceAlertSkin.exml";
	}

	protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
    }

	public enter(data?: any): void {
		console.log(data);
		this.contentText.text = data;
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