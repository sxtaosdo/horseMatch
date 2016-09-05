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
		this.horseList.layout = lay;
	}

	public enter(data?: any): void {
		if (this.skinLoaded) {
			this.horseList.dataProvider = this.horseData;
			this.btn100.selected = true;
			this.horseList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);

			this.horseData.source.forEach(element => {
				console.log(element);
			});
		}
	}

	public exit(): void {

	}

	public execute(data?: any): void {

	}

	private onItemTap(evt:eui.ItemTapEvent):void{
		
	}
}