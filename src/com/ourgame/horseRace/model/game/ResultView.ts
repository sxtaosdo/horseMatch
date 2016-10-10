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
		this.timeText.text = String(ClientModel.instance.gameTime);
		GameDispatcher.addEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onInfo, this);
		GameDispatcher.addEventListener(BaseEvent.DRAW_RESULT, this.onAward, this);
		ConnectionManager.instance.sendHelper.matchResult();
		this.onInfo();
	}

	public exit(): void {
		this.removeEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onInfo, this);
		GameDispatcher.removeEventListener(BaseEvent.DRAW_RESULT, this.onAward, this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	public execute(data?: any): void {
		this.timeText.text = String(data);
	}

	private onInfo(): void {
		var vo: MatchInfoVo = ClientModel.instance.lastBetInfo;
		if (vo) {
			this.nameText.text = ConfigModel.instance.horseList[vo.horseInfoList[0].id - 1].name;
			this.headImage.source = RES.getRes("betHead" + vo.horseInfoList[0].id + "_png");
			vo.horseInfoList.forEach(element => {
				this.dataList.addItem(element);
			});
			this.dataList.refresh();
			if (ConfigModel.instance.debug) {
				this.timer = ConfigModel.instance.nextTime - 2;
			} else {
				this.timer = vo.info.leftTime;
			}
		}
	}

	private onAward(): void {
		if (this.moneyText) {
			this.moneyText.text = String(ClientModel.instance.awardMoneoy);
		}
	}
}