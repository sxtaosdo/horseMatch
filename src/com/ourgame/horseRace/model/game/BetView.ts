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
	/**选中的筹码 */
	public selectMoney: number = 100;


	public constructor() {
		super();

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

	}

	public execute(data?: any): void {
		this.horseData.removeAll();
	}

	private onItemTap(evt: eui.ItemTapEvent): void {
		var data = this.horseData.source[this.horseList.selectedIndex];
		data.math.bet += this.selectMoney;
		this.horseData.itemUpdated(data);
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
	}
}