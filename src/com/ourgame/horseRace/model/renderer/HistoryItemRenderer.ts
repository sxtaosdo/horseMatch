class HistoryItemRenderer extends eui.ItemRenderer {

	public dateText: eui.Label;
	public h1Text: eui.Label;
	public h2Text: eui.Label;
	public h3Text: eui.Label;
	public h4Text: eui.Label;
	public h5Text: eui.Label;

	public constructor() {
		super();

		this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "HistoryItemSkin";
	}
	protected onSkinComplete(e: any): void {

	}

	public dataChanged(): void {
		var vo: HistoryVo = this.data;
		this.dateText.text = vo.id;
		// this.h1Text.text = String(vo.matchInfoList[0].rank);
		// this.h2Text.text = String(vo.matchInfoList[1].rank);
		// this.h3Text.text = String(vo.matchInfoList[2].rank);
		// this.h4Text.text = String(vo.matchInfoList[3].rank);
		// this.h5Text.text = String(vo.matchInfoList[4].rank);
		vo.matchInfoList.forEach(element => {
			// this["h" + element.id + "Text"].text = String(element.rank);
			if (element.rank == 1) {
				this["icon" + element.id].visible = true;
			} else {
				this["icon" + element.id].visible = false;
			}
		});
	}
}