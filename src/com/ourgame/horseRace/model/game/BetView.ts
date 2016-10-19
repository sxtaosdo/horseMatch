/**
 * 下注界面
 */
class BetView extends BaseComponent implements IBase {

	private horseData: eui.ArrayCollection;
	private client: ClientModel;

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
	/** 筹码的图像*/
	private coinList: Array<any>;
	private betInfoList: Object;

	/**每次的操作，发送给服务器前的操作，发送后清空 */
	// public operationTemp: any;
	/**是否正在发送投注消息中 */
	public isSending: boolean = false;


	public constructor() {
		super(false);

		this.coinList = new Array<any>();
		this.betInfoList = Object();
		this.horseData = new eui.ArrayCollection();
		this.client = ClientModel.instance;
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
		GameDispatcher.addEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onBetChange, this);
		GameDispatcher.addEventListener(BaseEvent.BET_OPERATION_RESULT, this.onBetResult, this);
		GameDispatcher.addEventListener(BaseEvent.BET_CANCEL, this.onBetCancel, this);
		this.onBetChange();
		// this.operationTemp = {};
		this.clearnOperation();
	}

	public exit(): void {
		this.onRemove();
		this.btn100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
		this.btn1000.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
		this.btn10000.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoneyTap, this);
		this.revokeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onrevokeTap, this);
		GameDispatcher.removeEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onBetChange, this);
		GameDispatcher.removeEventListener(BaseEvent.BET_OPERATION_RESULT, this.onBetResult, this);
		GameDispatcher.removeEventListener(BaseEvent.BET_CANCEL, this.onBetCancel, this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	public execute(data?: any): void {
		this.horseData.removeAll();
	}

	private onItemTap(evt: eui.ItemTapEvent): void {
		if (!UserModel.instance.isEnough(this.selectMoney)) {
			this.client.openAlert("RMB不足，请充值");
			return;
		}

		var bmp: egret.Bitmap;
		switch (this.selectMoney) {
			case 100:
				bmp = BitMapUtil.createBitmapByName("coin100_png");
				bmp.x = 750;
				break;
			case 1000:
				bmp = BitMapUtil.createBitmapByName("coin1000_png");
				bmp.x = 900;
				break;
			case 10000:
				bmp = BitMapUtil.createBitmapByName("coin10000_png");
				bmp.x = 1050;
				break;
		}
		bmp.y = this.stage.stageHeight - 140;
		this.addChild(bmp);
		if (this.coinList[this.horseList.selectedIndex] == null) {
			this.coinList[this.horseList.selectedIndex] = new Array<egret.Bitmap>();
		}

		//被点击马匹的信息
		let data: HorseVo = this.horseData.source[this.horseList.selectedIndex];//点击扣钱
		data.math.bet += this.selectMoney;
		UserModel.instance.money -= this.selectMoney;
		this.horseData.itemUpdated(data);

		//飞金币动画
		let tx: number = (this.coinList[this.horseList.selectedIndex].length % 2 == 0 ? 60 : 130) + RandomUtil.randNumber(0, 5) + (this.horseList.selectedIndex * 250)
		let ty: number = (this.stage.stageHeight >> 1) + 35 + Math.floor(this.coinList[this.horseList.selectedIndex].length / 2) * -10;
		egret.Tween.get(bmp).to({ x: tx, y: ty }, 200).wait(0).call((data: HorseVo, bmp: egret.Bitmap) => {
			this.horseData.itemUpdated(data);
			// console.log("send" + TimeUtils.printTime);
			if (bmp.parent) {
				bmp.parent.removeChild(bmp);
			}

		}, this, [data, bmp]);
		this.coinList[this.horseList.selectedIndex].push(bmp);

		//记录总投注
		if (this.client.operationObj[data.id]) {
			this.client.operationObj[data.id] += this.selectMoney;
		} else {
			this.client.operationObj[data.id] = this.selectMoney;
		}

		//记录本次投注
		if (this.client.operationCurrent[data.id]) {
			this.client.operationCurrent[data.id] += this.selectMoney;
		} else {
			this.client.operationCurrent[data.id] = this.selectMoney;
		}
		// if (this.operationTemp[data.id]) {
		// 	this.operationTemp[data.id] += this.selectMoney;
		// } else {
		// 	this.operationTemp[data.id] = this.selectMoney;
		// }
		TimerManager.instance.doOnce(1000, this.sendOperation, this);
	}

	private clearnOperation(): void {
		this.client.isWaitBetResult = false;
		for (var key in this.client.operationObj) {
			this.client.operationObj[key] = 0;
		}
	}

	private sendOperation(): void {
		if (this.client.isWaitBetResult == false) {
			this.client.isWaitBetResult = true;
			var key: any;
			var str: string = "";
			for (key in this.client.operationCurrent) {
				str += (key + "x" + this.client.operationCurrent[key] + "#");
				this.client.operationSended[key] = this.client.operationCurrent[key];
			}
			str = str.substr(0, str.length - 1);
			if ((!str) || (str == "")) {
				console.log(str);
				this.client.isWaitBetResult = false;
				return;
			}
			this.client.operationCurrent = {};
			ConnectionManager.instance.sendHelper.bet(str);
		}
	}

	private onMoneyTap(evt: egret.TouchEvent): void {
		this.selectMoney = parseInt(evt.currentTarget.label);
	}

	private onrevokeTap(evt: egret.TouchEvent): void {
		ConnectionManager.instance.sendHelper.cancel();
		if (ConfigModel.instance.debug) {
			this.horseData.source.forEach(element => {
				element.math.bet = 0;
			});
			this.horseData.refresh();
			this.onRemove();
		}
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
		if (this.client.lastBetInfo) {
			var list: any = this.client.lastBetInfo.horseInfoList;
			list.forEach(element => {
				this.betInfoList[element.id] = element;
			});
			this.horseData.source.forEach(element => {
				element.math = this.betInfoList[element.id];
			});
			this.horseData.refresh();
			this.matchIdText.text = String(this.client.lastBetInfo.info.drawId);
		}
	}

	/**下注消息结果 */
	private onBetResult(): void {
		this.client.isWaitBetResult = false;
		if (this.client.betOperation.rtnCode != 0) {
			let arr: Array<string> = this.client.betOperation.betInfo.split("#");
			arr.forEach(element => {
				let id = element[0];
				let money: number = parseInt(element[1]);
				if (this.client.operationObj[id]) {
					this.client.operationObj[id] -= money;
				}
			});
		}
		this.client.operationSended = {};
		this.sendOperation();
	}

	/**撤销消息结果 */
	private onBetCancel(): void {
		if (this.client.betCancel.rtnCode == 0) {
			this.horseData.source.forEach(element => {
				element.math.bet = 0;
			});
			this.horseData.refresh();
			this.onRemove();
			this.clearnOperation();
		}
	}

}