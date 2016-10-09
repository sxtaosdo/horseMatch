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
	public viewStack: eui.ViewStack;
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
	}

	public exit(): void {
		ClientModel.instance.openWindow(null);
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
		let index: number = parseInt(this.headBtn1.group.selection.label)
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
		let client: ClientModel = ClientModel.instance;
		let data: HorseVo = ConfigModel.instance.horseList[index - 1];
		this.qxdText.text = data.habitat;
		this.nlText.text = String(data.age);
		this.bqpvText.text = String(client.lastBetInfo.horseInfoList[index - 1].rate);
		this.lsdlText.text = "";
		this.bqtzText.text = String(client.lastBetInfo.horseInfoList[index - 1].bet);
		this.bqztText.text = String(client.lastBetInfo.horseInfoList[index - 1].state);
		this.headImage.texture = RES.getRes("betHead" + index + "_png");
		this.nameText.text = data.name;
		this.idText.text = String(data.id);
	}
}