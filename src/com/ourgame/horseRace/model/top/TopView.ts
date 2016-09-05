/**
 * 顶部条
 */
class TopView extends BaseComponent implements IBase {

	public typeText: eui.Label;
	public timerText: eui.Label;

	private time: number = 0;
	private call: Function;
	private callThis: any;

	public constructor(call: Function, callThis: any) {
		super(false);
		this.call = call;
		this.callThis = callThis;
		this.skinName = "resource/skins/TopViewSkin.exml";
	}

	protected onSkinComplete(e: any): void {
		super.onSkinComplete(e);
	}

	public enter(data?: any): void {
		if (this.skinLoaded) {
			switch (data) {
				case GameState.BET_STAGE:
					this.time = ConfigModel.instance.betTime;
					this.typeText.text = "投注倒计时";
					break;
				case GameState.PREPARE_STAGE:
					this.typeText.text = "比赛倒计时";
					this.time = ConfigModel.instance.resultTime;
					break;
				case GameState.RUN_STAGE:
					this.typeText.text = "";
					this.timerText.text = "";
					return;
				case GameState.RESULT_STAGE:
					this.typeText.text = "距下一场比赛";
					this.time = ConfigModel.instance.nextTime;
					break;
			}
		}
		TimerManager.instance.doLoop(1000, this.execute, this);
	}

	public exit(): void {

	}

	public execute(data?: any): void {
		if (this.time > -1) {
			this.timerText.text = String(this.time);
			this.time--;
		} else {
			TimerManager.instance.clearTimer(this.execute);
			if (this.call) {
				this.call.apply(this.callThis);
			}
		}
	}

}