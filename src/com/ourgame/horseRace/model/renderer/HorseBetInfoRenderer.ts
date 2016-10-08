class HorseBetInfoRenderer extends eui.ItemRenderer {

	public nameText: eui.Label;
	public indexText: eui.Label;
	public stateText: eui.Label;
	public numText: eui.Label;
	public image: eui.Image;
	public betText: eui.Label;

	private icon: egret.Bitmap;

	private point: egret.Point = new egret.Point(0, 0);

	public constructor() {
		super();

		this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "resource/renderer/HorseItenSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false, 0);
		// this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.betText.visible = false;
	}

	public dataChanged(): void {
		var vo: HorseVo = this.data;
		if (this.icon == null) {
			this.icon = BitMapUtil.createBitmapByName("betHead" + vo.mcName + "_png");
			this.addChildAt(this.icon, this.numChildren - 1);
		}
		this.nameText.text = vo.name;
		this.indexText.text = vo.id.toString();
		if (vo.math) {
			this.numText.text = "X" + vo.math.rate;
			this.stateText.text = "" + vo.math.state;
			this.betText.text = "" + vo.math.bet;
			this.betText.visible = vo.math.bet > 0 ? true : false;
		}
	}

	private onTap(addNum: number): void {
		// var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("coin_png");
		// switch (addNum) {
		// 	case 100:
		// 		this.point = this.globalToLocal(750, 570);
		// 		bmp.filters = [new egret.ColorMatrixFilter(MatrixUtils.red)];
		// 		break;
		// 	case 1000:
		// 		this.point = this.globalToLocal(900, 570);
		// 		break;
		// 	case 10000:
		// 		this.point = this.globalToLocal(1050, 570);
		// 		bmp.filters = [new egret.ColorMatrixFilter(MatrixUtils.blue)];
		// 		break;
		// }
		// bmp.y = this.point.y;
		// bmp.x = this.point.x;
		// this.addChild(bmp);
		// egret.Tween.get(bmp).to({ x: (this.coinList.length % 2 == 0 ? 50 : 110) + RandomUtil.randNumber(0, 5), y: 270 + Math.floor(this.coinList.length / 2) * -10 }, 200);
		// this.coinList.push(bmp);
	}

}