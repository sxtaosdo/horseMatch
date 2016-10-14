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

	private requestInterval: number = 20000;
	private lastRequest: number = 0;

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
		this.moneyText.text = "";
		this.execute(ClientModel.instance.gameTime)
		GameDispatcher.addEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onInfo, this);
		GameDispatcher.addEventListener(BaseEvent.DRAW_RESULT, this.onAward, this);
		if (egret.getTimer() - this.lastRequest > this.requestInterval) {
			this.lastRequest = egret.getTimer();
			ConnectionManager.instance.sendHelper.matchResult();
			console.log("请求比赛收益" + TimeUtils.printTime);
		}
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
		if (data > -1) {
			this.timeText.text = String(data);
		} else {
			this.timeText.text = "";
		}
	}

	private onInfo(): void {
		var vo: MatchInfoVo = ClientModel.instance.lastBetInfo;
		if (vo.horseInfoList.length < 1) {
			//如果进入游戏后直接是结果页面是没有比赛信息数据的，所以请求一次draw
			ConnectionManager.instance.sendHelper.drawMatch();
			console.log("直接是结果页面,horseInfoList为空，请求一次draw");
			return;
		}
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