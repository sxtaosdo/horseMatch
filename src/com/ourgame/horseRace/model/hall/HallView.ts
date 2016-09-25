/**
 * 大厅
 */
class HallView extends BaseComponent implements IBase {

	public btn1: eui.Button;
	public btn2: eui.Button;

	public constructor() {
		super();
		this.skinName = "resource/skins/HallViewSkin.exml";
		this.touchEnabled = false;
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
	}

	public enter(data?: any): void {
	}

	public exit(): void {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	public execute(data?: any): void {

	}

	private onItemTap(evt: eui.ItemTapEvent): void {

	}

	private onTap(evt: egret.TouchEvent): void {
		switch (evt.target) {
			case this.btn1:
				ClientModel.instance.changeGameState(new GameWorld());
				break;
			case this.btn2:
				ClientModel.instance.changeGameState(new GameWorld());
				break;
		}
	}

}