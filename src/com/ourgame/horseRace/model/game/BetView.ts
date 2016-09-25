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
	public matchIdText: eui.Label;
	public revokeBtn: eui.Button;
	public bgImage: eui.Image;
	/**选中的筹码 */
	public selectMoney: number = 100;
	private coinList: Array<any>;
	private betInfoList: Object;
	/**操作队列 */
	private operationObj: any;


	public constructor() {
		super(false);

		this.operationObj = new Object();
		this.coinList = new Array<any>();
		this.betInfoList = Object();
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
		}
		GameDispatcher.addEventListener(BaseEvent.BET_INFO_CHANGE, this.onBetChange, this);
		this.onBetChange();
	}

	public exit(): void {
		this.onRemove();
		this.btn100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
		this.btn1000.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
		this.btn10000.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
		this.revokeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onrevokeTap, this);
		GameDispatcher.removeEventListener(BaseEvent.BET_INFO_CHANGE, this.onBetChange, this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	public execute(data?: any): void {
		this.horseData.removeAll();
	}

	private onItemTap(evt: eui.ItemTapEvent): void {
		if (!UserModel.instance.isEnough(this.selectMoney)) {
			ClientModel.instance.openAlert("RMB不足，请充值");
			return;
		}
		var data = this.horseData.source[this.horseList.selectedIndex];//点击扣钱
		data.math.bet += this.selectMoney;
		UserModel.instance.money -= this.selectMoney;
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
		bmp.y = this.stage.stageHeight - 140;
		// bmp.y = 570;
		this.addChild(bmp);
		if (this.coinList[this.horseList.selectedIndex] == null) {
			this.coinList[this.horseList.selectedIndex] = new Array<egret.Bitmap>();
		}
		egret.Tween.get(bmp).to({ x: (this.coinList[this.horseList.selectedIndex].length % 2 == 0 ? 60 : 130) + RandomUtil.randNumber(0, 5) + (this.horseList.selectedIndex * 250), y: (this.horseList.y + 300) + Math.floor(this.coinList[this.horseList.selectedIndex].length / 2) * -10 }, 200);
		this.coinList[this.horseList.selectedIndex].push(bmp);
		if (this.operationObj[this.horseList.selectedIndex]) {
			this.operationObj[this.horseList.selectedIndex] += this.selectMoney;
		} else {
			this.operationObj[this.horseList.selectedIndex] = this.selectMoney;
		}
		TimerManager.instance.doOnce(1000, this.sendOperation, this);
	}

	private sendOperation(): void {
		var key: any;
		var str: string = "";
		for (key in this.operationObj) {
			str += (key + "x" + this.operationObj[key] + "#");
		}
		str = str.substr(0, str.length - 1);
		ConnectionManager.instance.sendHelper.bet(str);
	}

	private randomInfo(id: number): MatchPlayerVo {	//temp随机一个下注信息
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

	private onBetChange(): void {

		if (ClientModel.instance.lastBetInfo) {
			var list: any = ClientModel.instance.lastBetInfo.horseInfoList;
			list.forEach(element => {
				this.betInfoList[element.id] = element;
			});
			this.horseData.source.forEach(element => {
				element.math = this.betInfoList[element.id];
			});
			this.horseData.refresh();
			this.matchIdText.text = String(ClientModel.instance.lastBetInfo.info.drawId);
		}
	}

}