/**
 * 下注界面
 */
class BetView extends BaseComponent implements IBase {

	private horseData: eui.ArrayCollection;

	public leftGroup: eui.Group;
	public rightGroup: eui.Group;
	public btn100: eui.RadioButton;
	public btn1000: eui.RadioButton;
	public btn10000: eui.RadioButton;
	public horseList: eui.List;
	public revokeBtn: eui.Button;
	public bgImage: eui.Image;
	/**选中的筹码 */
	public selectMoney: number = 100;
	private coinList: Array<any>;


	public constructor() {
		super(false);

		this.coinList = new Array<any>();
		this.horseData = new eui.ArrayCollection();
		ConfigModel.instance.horseList.forEach(element => {
			this.horseData.addItem(element);
		});
		this.skinName = "resource/skins/BetViewSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.horseList.itemRenderer = HorseBetInfoRenderer;
		var lay: eui.HorizontalLayout = new eui.HorizontalLayout();
		lay.gap = 3
		this.horseList.layout = lay;
		this.btn100.selected = true;
	}

	public enter(data?: any): void {
		if (this.skinLoaded) {
			this.horseList.dataProvider = this.horseData;
			this.horseList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);

			this.btn100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
			this.btn1000.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
			this.btn10000.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
			this.revokeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onrevokeTap, this);

			this.horseData.source.forEach(element => {
				// console.log(element);
				element.math = this.randomInfo(element.id);
			});
			this.horseData.refresh();
		}

	}

	public exit(): void {
		this.onRemove();
	}

	public execute(data?: any): void {
		this.horseData.removeAll();
	}

	private onItemTap(evt: eui.ItemTapEvent): void {
		var data = this.horseData.source[this.horseList.selectedIndex];
		data.math.bet += this.selectMoney;
		this.horseData.itemUpdated(data);

		var bmp: egret.Bitmap = BitMapUtil.createBitmapByName("coin_png");
		switch (this.selectMoney) {
			case 100:
				bmp.x = 750;
				bmp.filters = [new egret.ColorMatrixFilter(MatrixUtils.red)];
				break;
			case 1000:
				bmp.x = 900;
				break;
			case 10000:
				bmp.x = 1050;
				bmp.filters = [new egret.ColorMatrixFilter(MatrixUtils.blue)];
				break;
		}
		bmp.y = 570;
		this.addChild(bmp);
		if (this.coinList[this.horseList.selectedIndex] == null) {
			this.coinList[this.horseList.selectedIndex] = new Array<egret.Bitmap>();
		}
		egret.Tween.get(bmp).to({ x: (this.coinList[this.horseList.selectedIndex].length % 2 == 0 ? 60 : 130) + RandomUtil.randNumber(0, 5) + (this.horseList.selectedIndex * 250), y: 390 + Math.floor(this.coinList[this.horseList.selectedIndex].length / 2) * -10 }, 200);
		this.coinList[this.horseList.selectedIndex].push(bmp);
	}

	private randomInfo(id: number): MatchPlayerVo {
		var vo: MatchPlayerVo = new MatchPlayerVo();
		vo.bet = 0;
		vo.rate = RandomUtil.randInt(100, 2000) / 100;
		vo.state = RandomUtil.randInt(1, 5);
		return vo;
	}

	private onMoneyTap(evt: egret.TouchEvent): void {
		this.selectMoney = parseInt(evt.currentTarget.label);
	}

	private onrevokeTap(evt: egret.TouchEvent): void {
		this.horseData.source.forEach(element => {
			element.math.bet = 0;
		});
		this.horseData.refresh();
		this.onRemove();
	}


	private onRemove(evt?: egret.Event): void {
		this.coinList.forEach(element => {
			while (element.length > 0) {
				var bmp: egret.Bitmap = element.pop();
				if (bmp.parent) {
					bmp.parent.removeChild(bmp);
				}
			}
		});
	}

}