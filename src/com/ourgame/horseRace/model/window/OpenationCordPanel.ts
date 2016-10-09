/**
 * 我的投注记录
 */
class OpenationCordPanel extends BaseComponent implements IWindow {

	public closeBtn: eui.Button;
	public list: eui.List;


	private dataList: eui.ArrayCollection;

	public constructor() {
		super();
		this.skinName = "OperationRecordPanelSkin";
	}
	protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
		this.init();
    }

	public enter(data?: any): void {
		ConnectionManager.instance.sendHelper.myBetHistory();
		GameDispatcher.addEventListener(BaseEvent.BET_HISTORY, this.onData, this);
	}

	public exit(): void {
		GameDispatcher.removeEventListener(BaseEvent.BET_HISTORY, this.onData, this);
		ClientModel.instance.openWindow(null);
	}

	public execute(data?: any): void {

	}

	public init(): void {
		this.dataList = new eui.ArrayCollection();
		this.list.itemRenderer = BetHistoryItemRenderer;
	}

    public destroy(): void {
		this.exit();
	}

	private onData(): void {
		this.dataList.removeAll();
		this.dataList.source = ClientModel.instance.betHistory;
		this.dataList.refresh();
	}
}