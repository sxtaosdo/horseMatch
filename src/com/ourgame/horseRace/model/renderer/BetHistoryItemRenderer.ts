class BetHistoryItemRenderer extends eui.ItemRenderer {
	public idText: eui.Label;
	public dateText: eui.Label;
	public moneyText: eui.Label;
	public awardText: eui.Label;


	public constructor() {
		super();

		// this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "BetHistoryItemSkin";
	}

	public dataChanged(): void {
		var vo: BetHistoryInfoVo = this.data;
		this.idText.text = String(vo.id);
		this.dateText.text = String(vo.date);
		this.moneyText.text = String(vo.money);
		this.awardText.text = String(vo.award);
	}
}