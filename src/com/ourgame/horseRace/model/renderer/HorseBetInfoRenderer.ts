class HorseBetInfoRenderer extends eui.ItemRenderer {
	public headImgae: eui.Image;
	public stateText: eui.Label;
	public numText: eui.Label;
	public indexText: eui.Label;
	public statePb: eui.ProgressBar;
	public stateImage: eui.Label;
	public nameText: eui.Label;
	public steteText: eui.Label;
	public betText: eui.BitmapLabel;

	private point: egret.Point = new egret.Point(0, 0);
	private lastBetMoney: number = 0;
	private coinList: Array<egret.Bitmap>;

	public constructor() {
		super();
		this.coinList = new Array<egret.Bitmap>();
		this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
		this.skinName = "resource/renderer/HorseItenSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this, false, 0);
		// this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.betText.visible = false;
		this.statePb.maximum = 1500;
		this.statePb.minimum = 0;
	}

	public dataChanged(): void {
		var vo: HorseVo = this.data;
		// if (this.icon == null) {
		// 	this.icon = BitMapUtil.createBitmapByName("betHead" + vo.mcName + "_png");
		// 	this.addChildAt(this.icon, this.numChildren - 1);
		// }
		this.headImgae.source = RES.getRes("betHead" + vo.mcName + "_png");
		this.nameText.text = vo.name;
		this.indexText.text = vo.id.toString();
		if (vo.math) {
			this.numText.text = "X" + vo.math.rate;
			this.stateText.text = "" + vo.math.state;
			this.betText.text = "" + vo.math.bet;
			this.betText.visible = vo.math.bet > 0 ? true : false;
			this.statePb.value = vo.math.state;
			this.stateImage.text = ConfigModel.instance.getState(vo.math.state).name;
		}
		console.log("on update" + TimeUtils.printTime);
		if (vo.math) {
			if (this.data.math.bet < 1) {
				this.deleteCoin();
				this.lastBetMoney = 0;
			} else {
				this.onTap();
			}
		}
	}

	private onTap(): void {
		let addNum: number = this.data.math.bet - this.lastBetMoney;
		if (addNum > 0) {
			this.lastBetMoney = this.data.math.bet;
			let bmp: egret.Bitmap = BitMapUtil.createBitmapByName("coin" + addNum + "_png");
			bmp.y = this.point.y;
			bmp.x = this.point.x;
			this.addChildAt(bmp, this.numChildren - 1);
			// egret.Tween.get(bmp).to({ x: (this.coinList.length % 2 == 0 ? 50 : 110) + RandomUtil.randNumber(0, 5), y: 270 + Math.floor(this.coinList.length / 2) * -10 }, 200);
			bmp.x = (this.coinList.length % 2 == 0 ? 50 : 110) + RandomUtil.randNumber(0, 5);
			bmp.y = 270 + Math.floor(this.coinList.length / 2) * -10;
			this.coinList.push(bmp);
		} else {

		}
	}

	private deleteCoin() {
		while (this.coinList.length > 0) {
			let coin: egret.Bitmap = this.coinList.pop()
			if (coin.parent) {
				coin.parent.removeChild(coin);
			}
		}
	}

}