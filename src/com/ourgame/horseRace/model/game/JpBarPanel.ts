class JpBarPanel extends BaseComponent implements IBase {

	private mc: egret.MovieClip;
	private flash: egret.MovieClip;
	private poolText: egret.BitmapText;

	public constructor() {
		super(false);
		this.touchChildren = false;

		this.poolText = new egret.BitmapText();
		this.poolText.font = RES.getRes("hallPool_fnt");
		this.poolText.width = 240;
		this.poolText.x = 50;
		this.poolText.y = 20;
		this.poolText.textAlign = egret.HorizontalAlign.CENTER;
		this.skinName = "resource/game_skins/JpBarSkin.exml";
	}

	protected onSkinComplete(e: any): void {
        super.onSkinComplete(e);
		this.addChild(this.poolText);
    }

	public enter(data?: any): void {
		this.flash = MovieclipUtils.createMc("jpBarFlashMc_png", "jpBarLightMc_json");
		this.flash.gotoAndPlay(1, -1);
		this.flash.scaleX = this.flash.scaleY = 0.65;
		this.flash.x = 100;
		this.flash.y = 12;
		this.addChild(this.flash);

		this.mc = MovieclipUtils.createMc("jpBarLightMc_png", "jpBarLightMc_json");
		this.mc.gotoAndPlay(1, -1);
		this.mc.x = 42;
		this.addChild(this.mc);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		GameDispatcher.addEventListener(BaseEvent.POOL_EVENT, this.changePool, this);
	}

	public exit(): void {
		ClientModel.instance.openWindow(null);
		GameDispatcher.removeEventListener(BaseEvent.POOL_EVENT, this.changePool, this);
	}

	public execute(data?: any): void {

	}

	public init(): void {

	}

    public destroy(): void {

	}

	private onTap(): void {
		ClientModel.instance.openWindow(RankPanel);
	}

	private changePool(): void {
		
    }
}