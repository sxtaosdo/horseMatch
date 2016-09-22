class OpenationCordPanel extends BaseComponent implements IWindow {
	
	public constructor() {
		super();
		this.skinName = "OperationRecordPanelSkin";
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