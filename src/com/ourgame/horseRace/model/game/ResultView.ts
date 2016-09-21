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

	public constructor() {
		super();
		this.skinName = "ResultViewSkin";
		this.dataList = new eui.ArrayCollection();
		this.itemList.itemRenderer = ResultItemRenderer;
		this.itemList.dataProvider = this.dataList;
	}

	public enter(data?: any): void {
		this.addEventListener(BaseEvent.BET_INFO_CHANGE, this.onInfo, this);

	}

	public exit(): void {
		this.removeEventListener(BaseEvent.BET_INFO_CHANGE, this.onInfo, this);
	}

	public execute(data?: any): void {

	}

	private onInfo(): void {
		var vo: MatchInfoVo = ClientModel.instance.lastBetInfo
		if (vo) {
			this.nameText.text = ConfigModel.instance.horseList[vo.horseInfoList[0].id].name;
			this.headImage.source = RES.getRes("betHead" + vo.horseInfoList[0].id + "_png");
			this.timeText.text = String(vo.info.leftTime);
			vo.horseInfoList.forEach(element => {
				this.dataList.addItem(element);
			});
			this.dataList.refresh();
		}
	}
}