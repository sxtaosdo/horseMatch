class InfoItemRenderer extends eui.ItemRenderer {

	public dateText: eui.Label;

	public constructor() {
		super();

		this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "InfoItemSkin";
	}
	protected onSkinComplete(e: any): void {

	}

	public dataChanged(): void {
		var vo: MatchPlayerVo = this.data.vo;
		this.dateText.text = this.data.time;
		for (var i: number = 0; i < 5; i++) {
			if (vo.rank == i) {
				this["icon" + (i + 1)].visible = true;
			} else {
				this["icon" + (i + 1)].visible = false;
			}
		}
		console.log(vo);
	}
}