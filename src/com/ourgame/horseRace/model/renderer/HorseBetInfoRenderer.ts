class HorseBetInfoRenderer extends eui.ItemRenderer {

	public nameText: eui.Label;
	public indexText: eui.Label;
	public stateText: eui.Label;
	public numText: eui.Label;
	public image: eui.Image;
	public betText: eui.Label;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "resource/renderer/HorseItenSkin.exml";
	}

	protected onSkinComplete(e: any): void {

	}

	public dataChanged(): void {
		var vo: HorseVo = this.data;
		this.nameText.text = vo.name;
		this.indexText.text = vo.id.toString();
		if (vo.math) {
			this.numText.text = "X" + vo.math.rate;
			this.stateText.text = "" + vo.math.state;
			this.betText.text = "" + vo.math.bet;
		}
	}
}