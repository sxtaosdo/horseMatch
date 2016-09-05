class TestWindow extends BaseComponent implements IBase {
	private addBtn: eui.Button;
	private curBtn: eui.Button;
	private sBtn: eui.Button;
	private ssBtn: eui.Button;

	private changeMapBtn: eui.Button;
	// private curBtn: eui.Button;
	// private sBtn: eui.Button;
	private closeBtn: eui.Button;

	private numText: eui.Label;
	private showNumText: eui.Label;
	private main: Main;

	public constructor() {
		super(false);
		this.skinName = "resource/game_skins/TestSkin.exml";
		this.alpha = 0.6;
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.x = 745;
		this.y = 120;
	}

	public enter(data?: any): void {
		this.main = data;
		if (this.skinLoaded) {
			// this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtn, this);
			this.curBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCutBtn, this);
			// this.sBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSBtn, this);
			// this.ssBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.on8Btn, this);

			this.changeMapBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeMap, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			TimerManager.instance.doLoop(1000, this.execute, this);

			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}
	}

	public exit(): void {
		this.onTouchEnd();
	}

	public execute(data?: any): void {
		if (this.skinLoaded) {
			this.numText.text = "生成数:" + EntityManager.instance.length;
			this.showNumText.text = "显示数:" + (<egret.DisplayObjectContainer>this.main.game.getChildAt(1)["getChildAt"](1)).numChildren;
		}
	}

	private onTouchEnd(evt?: any): void {
		TimerManager.instance.clearTimer(this.onMove);
	}

	private onTouchMove(evt: egret.TouchEvent): void {
		TimerManager.instance.doFrameLoop(1, this.onMove, this, [evt]);
	}

	private onMove(evt: egret.TouchEvent): void {
		this.x = evt.stageX - (this.width >> 1);
		this.y = evt.stageY - (this.height >> 1);
	}

	private onAddBtn(): void {
		GameDispatcher.send(TestEvent.ADD_FISH_EVENT);
	}

	private onCutBtn(): void {
		GameDispatcher.send(TestEvent.CHANGE_PATH);
	}

	private onSBtn(): void {
		TimerManager.instance.clearTimer(this.onAddBtn);
	}

	private on8Btn(): void {
		TimerManager.instance.doLoop(150, this.onAddBtn, this)
	}

	private onChangeMap(): void {
		GameDispatcher.send(TestEvent.CHANGE_MAP);
	}

	private onClose(): void {
		// GameDispatcher.send(TestEvent.CLOSE_EVENT);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}



}