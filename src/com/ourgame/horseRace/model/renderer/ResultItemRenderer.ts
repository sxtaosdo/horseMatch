class ResultItemRenderer extends eui.ItemRenderer {
	public nameText: eui.Label;
	public muText: eui.Label;
	public awardText: eui.Label;

	public constructor() {
		super();
		this.skinName = "ResultItemSkin";
	}

	public dataChanged(): void {
		var vo: ResultVo = this.data;
		if (vo) {
			this.nameText.text = vo.name;
			this.muText.text = String(vo.double);
			console.log("renderer收到award|bet：" + vo.award+"|"+vo.bet);

			if (vo.bet) {
				this.awardText.text = String(vo.bet);
			} else {
				this.awardText.text = "0";
			}
		}
	}
}