class ResultItemRenderer extends eui.ItemRenderer {
	public nameText: eui.Label;
	public muText: eui.Label;
	public awardText: eui.Label;

	public constructor() {
		super();
		this.skinName = "ResultItemSkin";
	}

	public dataChanged(): void {
		var vo: MatchPlayerVo = this.data;
		this.nameText.text = ConfigModel.instance.horseList[vo.id].name;
		this.muText.text = String(vo.rate);
		this.awardText.text = "0"
	}
}