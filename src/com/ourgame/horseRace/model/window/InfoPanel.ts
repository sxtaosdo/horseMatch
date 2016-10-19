/**
 * 赛马资料
 */
class InfoPanel extends BaseComponent implements IWindow {
	public closeBtn: eui.Button;
	public headBtn1: eui.RadioButton;
	public headBtn2: eui.RadioButton;
	public headBtn3: eui.RadioButton;
	public headBtn4: eui.RadioButton;
	public headBtn5: eui.RadioButton;
	public viewStacks: eui.ViewStack;
	public headImage: eui.Image;
	public idText: eui.Label;
	public nameText: eui.Label;
	public qxdText: eui.Label;
	public nlText: eui.Label;
	public bqpvText: eui.Label;
	public lsdlText: eui.Label;
	public bqtzText: eui.Label;
	public bqztText: eui.Label;
	public dataList: eui.List;
	public leftTab: eui.TabBar;

	private arr: eui.ArrayCollection;

	public constructor() {
		super();
		this.arr = new eui.ArrayCollection();
		this.skinName = "resource/game_skins/window/InfoPanelSkin.exml";
	}

	protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
		this.leftTab.dataProvider = this.viewStacks;
		this.onInfoData(1);
    }

	public enter(data?: any): void {
		if (this.skinLoaded) {
			this.dataList.itemRenderer = InfoItemRenderer;
			this.leftTab.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabTap, this);
			this.headBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
			this.headBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
			this.headBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
			this.headBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
			this.headBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
		}
		GameDispatcher.addEventListener(BaseEvent.WINDOW_HISTORY, this.onData, this);
		GameDispatcher.addEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onUpdate, this);
		ConnectionManager.instance.sendHelper.horseInfo();
		GameDispatcher.addEventListener(BaseEvent.HORSE_INFO_EVENT, this.onLeftTap, this);
	}

	public exit(): void {
		ClientModel.instance.openWindow(null);
		this.dataList.itemRenderer = InfoItemRenderer;
		this.leftTab.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabTap, this);
		this.headBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
		this.headBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
		this.headBtn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
		this.headBtn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
		this.headBtn5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftTap, this);
		GameDispatcher.removeEventListener(BaseEvent.WINDOW_HISTORY, this.onData, this);
		GameDispatcher.removeEventListener(BaseEvent.HORSE_INFO_EVENT, this.onLeftTap, this);
		GameDispatcher.removeEventListener(BaseEvent.MATCH_INFO_CHANGE, this.onUpdate, this);
	}

	public execute(data?: any): void {

	}

	public init(): void {

	}

    public destroy(): void {

	}

	private onTabTap(evt: eui.ItemTapEvent): void {
		console.log(evt);
		switch (this.leftTab.selectedIndex) {
			case 0:

				break;
			case 1:
				ConnectionManager.instance.sendHelper.history();
				break;
		}
	}

	private onData(): void {
		let index: number = parseInt(this.headBtn1.group.selection.label);
		this.arr.removeAll();
		ClientModel.instance.history.forEach(element => {
			element.matchInfoList.forEach(matchVo => {
				if (matchVo.id == index) {
					this.arr.addItem({ time: element.id, vo: matchVo });
				}
			});
		});
		this.dataList.dataProvider = this.arr;
	}

	private onLeftTap(evt: egret.TouchEvent): void {
		let index: number = parseInt(this.headBtn1.group.selection.label)
		switch (this.leftTab.selectedIndex) {
			case 0:
				this.onInfoData(index);
				break;
			case 1:
				this.onData();
				break;
		}
	}

	private onInfoData(index: number): void {
		if (ClientModel.instance.horseInfo.length > 0) {
			let client: ClientModel = ClientModel.instance;
			let data: HorseVo;
			ConfigModel.instance.horseList.forEach(element => {
				if ((index) == element.id) {
					data = element;
				}
			});
			let data2: MatchPlayerVo;
			ClientModel.instance.horseInfo.forEach(element => {
				if ((index) == element.id) {
					data2 = element;
				}
			});
			if (data) {
				this.qxdText.text = data.habitat;
				this.nlText.text = String(data.age);
				this.bqpvText.text = String(data2.rate);
				this.lsdlText.text = String(data2.winPct);

				// this.bqtzText.text = String(data2.bet);
				this.bqtzText.text = String(ClientModel.instance.operationObj[index] ? ClientModel.instance.operationObj[index] : 0);
				this.bqztText.text = ConfigModel.instance.getState(data2.state).name;
				this.headImage.texture = RES.getRes("betHead" + index + "_png");
				this.nameText.text = data.name;
				this.idText.text = String(data.id);
			}
		}
	}

	private onUpdate(): void {
		this.onInfoData(this.leftTab.selectedIndex);
	}
}
