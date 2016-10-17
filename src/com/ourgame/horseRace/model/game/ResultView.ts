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

	private requestInterval: number = 2500;
	private lastRequest: number = 0;
	// private resultList: Array<ResultVo>;

	public constructor() {
		super();
		this.skinName = "ResultViewSkin";
		this.dataList = new eui.ArrayCollection();
		// this.resultList = new Array<ResultVo>();
		this.itemList.itemRenderer = ResultItemRenderer;

	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.timeText.text = "";
	}

	public enter(data?: any): void {
		this.moneyText.text = "";
		this.execute(ClientModel.instance.gameTime)
		GameDispatcher.addEventListener(BaseEvent.DRAW_RESULT, this.onInfo, this);
		this.onInfo();
		GameDispatcher.send(BaseEvent.SHOW_RESULT_EFFECT);
	}

	public exit(): void {
		GameDispatcher.removeEventListener(BaseEvent.DRAW_RESULT, this.onInfo, this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
		// this.headImage.texture = null;
	}

	public execute(data?: any): void {
		if (data > -1) {
			this.timeText.text = String(data);
		} else {
			this.timeText.text = "";
		}
	}

	private requst(): void {
		if (egret.getTimer() - this.lastRequest > this.requestInterval) {
			this.lastRequest = egret.getTimer();
			ConnectionManager.instance.sendHelper.matchResult();
			console.log("请求比赛收益" + TimeUtils.printTime);
		}
	}

	private onInfo(): void {
		if (!ClientModel.instance.resultInfo.matchInfo) {
			//如果进入游戏后直接是结果页面是没有比赛信息数据的，所以请求一次draw
			this.requst();
			console.log("直接是结果页面,horseInfoList为空，请求一次draw");
			return;
		} else {
			this.dataList.removeAll();
			var winInfo: any = {};
			if (ClientModel.instance.resultInfo.winInfo) {
				var temp: Array<string> = ClientModel.instance.resultInfo.winInfo.split("#");
				temp.forEach(element => {
					var temp2 = element.split("x");
					winInfo[temp2[0]] = temp2[1];
				});
			}
			ClientModel.instance.resultInfo.matchInfo.forEach(element => {
				var vo = new ResultVo();
				vo.setDate(element)
				vo.setBetData(winInfo[vo.id]);
				this.dataList.addItem(vo);
				// console.log("id:" + vo.id + "\t award:" + vo.award);

			});
			// this.dataList.refresh();
			this.itemList.dataProvider = this.dataList;

			this.nameText.text = this.dataList.source[0].name;
			this.headImage.source = RES.getRes("betHead" + this.dataList.source[0].id + "_png");
		}
		if (this.moneyText) {
			if (ClientModel.instance.resultInfo.winAmount) {
				this.moneyText.text = String(ClientModel.instance.resultInfo.winAmount);
			} else {
				this.moneyText.text = "0";
			}
		}
		GameDispatcher.send(BaseEvent.SHOW_RESULT_EFFECT);
	}
}