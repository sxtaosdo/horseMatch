/**
 * 顶部条
 */
class TopView extends BaseComponent implements IBase {

	public moneyText: eui.Label;
	public addBtn: eui.Button;
	public stateGroup: eui.Group;
	public timeBg: eui.Image;
	public timerText: eui.Label;
	public typeText: eui.Label;
	public kjBtn: eui.Button;
	public jlBtn: eui.Button;
	public smBtn: eui.Button;
	public moreBtn: eui.ToggleButton;
	public moreGroup: eui.Group;
	public soundBtn: eui.ToggleButton;
	public ruleBtn: eui.Button;
	public taskBtn: eui.Button;

	private time: number = 0;
	private call: Function;
	private callThis: any;
	private isShowTime: boolean = false;

	public constructor(call: Function, callThis: any) {
		super(false);
		this.call = call;
		this.callThis = callThis;
		this.skinName = "resource/skins/TopViewSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
		this.moneyText.text = String(UserModel.instance.money);
		this.kjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKjTap, this);
		this.jlBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJlTap, this);
		this.smBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSmTap, this);
		this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleTap, this);
		this.taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaskTap, this);
		this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoreTap, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddTap, this);
		this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundTap, this);
	}

	private changeTimerState(key: boolean): void {
		this.isShowTime = key;
		this.stateGroup.visible = key;
		this.timeBg.visible = key;
	}

	private onMoreTap(): void {
		this.moreGroup.visible = this.moreBtn.selected;
	}

	public enter(data?: any): void {
		if (this.skinLoaded) {
			switch (data) {
				case GameState.BET_STAGE:
					this.time = ClientModel.instance.betTime;
					this.typeText.text = "投注倒计时";
					this.changeTimerState(true);
					break;
				case GameState.PREPARE_STAGE:
					this.typeText.text = "比赛倒计时";
					this.time = ClientModel.instance.prepareTime;
					this.changeTimerState(true);
					break;
				case GameState.RUN_STAGE:
					this.typeText.text = "比赛中";
					// this.timerText.text = String(ClientModel.instance.enterStateTime);
					this.time = ClientModel.instance.lastBetInfo.info.leftTime
					this.changeTimerState(false);
					break;
				case GameState.RESULT_STAGE:
					this.typeText.text = "距下一场比赛";
					this.time = ConfigModel.instance.nextTime;
					this.changeTimerState(false);
					break;
			}
		}
		this.onMoneyChange();
		// console.log("TopView time:" + this.time + "\t state:" + data + "\t" + TimeUtils.printTime);

		if (this.isShowTime) {
			this.execute();
			TimerManager.instance.doLoop(1000, this.execute, this);
		}
		GameDispatcher.addEventListener(BaseEvent.USER_MOENY_CHANGE, this.onMoneyChange, this);
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		if (this.time > 0) {
			this.timerText.text = String(this.time);
			// console.log("top time:" + this.time);
			this.time--;
		} else {
			TimerManager.instance.clearTimer(this.execute);
			try {
				this.call.apply(this.callThis);
			} catch (e) {
				console.error(e)
			}
		}
	}

	public onKjTap(evt: egret.TouchEvent): void {
		ClientModel.instance.openWindow(HistoryPanel);
	}

	public onJlTap(evt: egret.TouchEvent): void {
		ClientModel.instance.openWindow(OpenationCordPanel);
	}

	public onSmTap(evt: egret.TouchEvent): void {
		ClientModel.instance.openWindow(InfoPanel);

	}

	public onSoundTap(evt: egret.TouchEvent): void {
		// ClientModel.instance.openWindow();

	}

	public onRuleTap(): void {
		ClientModel.instance.openWindow(HelpPanel);
	}

	public onTaskTap(): void {
		ClientModel.instance.openWindow(TaskPanel);
	}

	private onMoneyChange(): void {
		this.moneyText.text = UserModel.instance.money.toString();
	}

	private onAddTap(): void {
		// this.moneyText.text = UserModel.instance.money.toString();
		InterfaceManager.instance.recharge();
	}

}