/**
 * 开奖的历史记录
 */
class HistoryPanel extends BaseComponent implements IWindow {
	public list: eui.List;
	public closeBtn: eui.Button;

	private dataList: eui.ArrayCollection;

	public constructor() {
		super();

		this.dataList = new eui.ArrayCollection();

		this.skinName = "HistoryPanelSkin";
	}

	protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
		this.list.itemRenderer = HistoryItemRenderer;
    }

	public enter(data?: any): void {
		GameDispatcher.addEventListener(BaseEvent.WINDOW_HISTORY, this.onData, this);
		ConnectionManager.instance.sendHelper.history();
	}

	public exit(): void {
		ClientModel.instance.openWindow(null);
	}

	public execute(data?: any): void {

	}

	public init(): void {

	}

    public destroy(): void {
		this.exit();
	}

	private onData(): void {
		this.dataList.removeAll();
		ClientModel.instance.history.forEach(element => {
			this.dataList.addItem(element);
		});
		this.list.dataProvider = this.dataList;
	}
}