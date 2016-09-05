class RoomBtnItemRenderer extends eui.ItemRenderer {

	public bgImage: eui.Image;
	public startBtn: eui.Button;

	private mc: egret.MovieClip;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "resource/renderer/RoomItenSkin.exml";
	}

	protected onSkinComplete(e: any): void {

	}

	public dataChanged(): void {
		// var vo: RoomInfoItemVo = this.data;
		this.bgImage.source = this.data.image;
		this.mc = MovieclipUtils.createMc("lobbyWareMc_png", "lobbyWareMc_json");
		this.mc.x = 40;
		this.addChildAt(this.mc, 0);
	}
}