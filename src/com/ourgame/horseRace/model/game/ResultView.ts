/**
 * 结果展示
 */
class ResultView extends BaseComponent implements IBase {

	public moneyText: eui.Label;
	public headImage: eui.Image;
	public nameText: eui.Label;
	public itemList: eui.List;
	public timeText: eui.Label;

	private dataList: eui.ArrayCollection;
	private timer: number = 0;
	private call: Function;
	private callThis: any;

	public constructor() {
		super();
		this.skinName = "ResultViewSkin";
		this.dataList = new eui.ArrayCollection();
		this.itemList.itemRenderer = ResultItemRenderer;
		this.itemList.dataProvider = this.dataList;
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.timeText.text = "";
	}

	public enter(data?: any): void {
		// console.log("ResultView enter:" + egret.getTimer());
		this.call = data.call;
		this.callThis = data.thisObj;
		GameDispatcher.addEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onInfo, this);
		// ConnectionManager.instance.sendHelper.drawMatch();
		this.onInfo();
	}

	public exit(): void {
		// console.log("ResultView exit:" + egret.getTimer());
		this.removeEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onInfo, this);
		TimerManager.instance.clearTimer(this.execute);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	public execute(data?: any): void {
		this.timeText.text = String(this.timer);
		this.timer--;
		if (this.timer < 0) {
			TimerManager.instance.clearTimer(this.execute);
			this.timeText.text = "";
			if (this.call) {
				this.call.call(this.callThis);
			}
		}
	}

	private onInfo(): void {
		// console.log("ResultView onInfo:" + egret.getTimer());
		var vo: MatchInfoVo = ClientModel.instance.lastBetInfo
		if (vo) {
			this.nameText.text = ConfigModel.instance.horseList[vo.horseInfoList[0].id - 1].name;
			this.headImage.source = RES.getRes("betHead" + vo.horseInfoList[0].id + "_png");
			this.timeText.text = String(vo.info.leftTime);
			vo.horseInfoList.forEach(element => {
				this.dataList.addItem(element);
			});
			this.dataList.refresh();
			// this.timer = ClientModel.instance.lastBetInfo.info.leftTime;
			this.timer = ConfigModel.instance.nextTime;
			TimerManager.instance.doLoop(1000, this.execute, this);
		}
	}
}