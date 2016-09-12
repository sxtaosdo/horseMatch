class HorseBetInfoRenderer extends eui.ItemRenderer {

	public nameText: eui.Label;
	public indexText: eui.Label;
	public stateText: eui.Label;
	public numText: eui.Label;
	public image: eui.Image;
	public betText: eui.Label;

	private icon: egret.Bitmap;
	private coinList: Array<egret.Bitmap>;
	private point: egret.Point = new egret.Point(0, 0);

	public constructor() {
		super();

		this.coinList = new Array<egret.Bitmap>();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "resource/renderer/HorseItenSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false, 0);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
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
			if (vo.math.bet > 0) {
				this.onTap(vo.math.bet - parseInt(this.betText.text));
			} else if (vo.math.bet == 0) {
				this.onRemove();
			}
			this.betText.text = "" + vo.math.bet;
		}
	}

	private onTap(addNum: number): void {
		var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("coin_png");
		switch (addNum) {
			case 100:
				this.point = this.globalToLocal(750, 570);
				break;
			case 1000:
				this.point = this.globalToLocal(900, 570);
				break;
			case 10000:
				this.point = this.globalToLocal(1050, 570);
				break;
		}
		bmp.y = this.point.y;
		bmp.x = this.point.x;
		this.addChild(bmp);
		egret.Tween.get(bmp).to({ x: this.coinList.length % 2 == 0 ? 50 : 110, y: 270 + Math.floor(this.coinList.length / 2) * -10 }, 200);
		this.coinList.push(bmp);
	}

	private onRemove(evt?: egret.Event): void {
		while (this.coinList.length > 0) {
			var bmp: egret.Bitmap = this.coinList.pop();
			if (bmp.parent) {
				bmp.parent.removeChild(bmp);
			}
		}
	}
}