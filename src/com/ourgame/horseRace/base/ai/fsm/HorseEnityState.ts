/** 马的状态*/

/**准备 */
class HorseEnityStateIdel implements IState {

	private static _instance: HorseEnityStateIdel;
	private client: ClientModel;
	private self: HorseEntity;

	public constructor() {
	}

	public static get instance(): HorseEnityStateIdel {
		if (this._instance == null) {
			this._instance = new HorseEnityStateIdel();
		}
		return this._instance;
	}

	public onMessage(entity: IBaseGameEntity, telegram: Telegram): boolean {
		return false;
	}

    public enter(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		this.self.currentX = GameWorld.LEFT_LINE;
		this.self.getDisplayObject().x = GameWorld.LEFT_LINE;
		this.self.changeAnimation(AnimationType.IDEL);
	}

    public execute(entity: IBaseGameEntity): void {

	}

    public exit(entity: IBaseGameEntity): void {

	}
}

/**靠近 */
class HorseEnityStateSeek implements IState {

	private static _instance: HorseEnityStateSeek;
	private client: ClientModel;
	private self: HorseEntity;

	public constructor() {
		this.client = ClientModel.instance;
	}

	public static get instance(): HorseEnityStateSeek {
		if (this._instance == null) {
			this._instance = new HorseEnityStateSeek();
		}
		return this._instance;
	}

	public onMessage(entity: IBaseGameEntity, telegram: Telegram): boolean {
		return false;
	}

    public enter(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		this.self.changeAnimation(AnimationType.RUN);
	}

    public execute(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		var speed: number = RandomUtil.randNumber(1, 25);
		this.self.speed = speed;
		if (speed > this.client.maxSpeed) {
			this.client.maxSpeed = speed;
		}
		this.self.currentX += speed;
		// if ((this.self.obstacle) && (this.self.currentX >= this.self.obstacle.local)) {
		// 	if (this.self.obstacle.isPass == false) {
		// 		this.self.obstacle.inTime = egret.getTimer();
		// 		this.self.getFSM().ChangeState(HorseEnityStateStuck.instance);
		// 	} else {
		// 		this.self.obstacle = null;
		// 	}
		// }
		//超过右侧线
		if (this.self.currentX > GameWorld.RIGHT_LINE + ClientModel.instance.roadPastLength) {
			//尚未到达终点--》摄像头向右移动
			if (this.self.currentX < GameWorld.DEADLINE_LENGTH) {
				ClientModel.instance.roadPastLength = this.self.currentX - GameWorld.RIGHT_LINE;
			}
			//到达终点
			else {
				entity.getFSM().ChangeState(HorseEnityStateEnd.instance);	//比赛结束
				GameDispatcher.send(BaseEvent.REACH_END_LINE);
			}
		}
		entity.getDisplayObject().x = this.self.currentX - ClientModel.instance.roadPastLength;
	}

    public exit(entity: IBaseGameEntity): void {

	}
}


/**结束状态 */
class HorseEnityStateEnd implements IState {

	private static _instance: HorseEnityStateEnd;
	private client: ClientModel;
	private self: HorseEntity;

	public constructor() {
		this.client = ClientModel.instance;
	}

	public static get instance(): HorseEnityStateEnd {
		if (this._instance == null) {
			this._instance = new HorseEnityStateEnd();
		}
		return this._instance;
	}

	public onMessage(entity: IBaseGameEntity, telegram: Telegram): boolean {
		return false;
	}

    public enter(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		egret.Tween.get(this).wait(1000 / 30 * 100).call(() => {
			this.self.displayObject["frameRate"] = 0;
			egret.Tween.get(this.self.displayObject).wait(200).to({
				frameRate: 30
			}, 5000);
		});
	}

    public execute(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		var speed: number = RandomUtil.randNumber(1, 10);
		this.self.speed = speed;
		if (speed > this.client.maxSpeed) {
			this.client.maxSpeed = speed;
		}
		this.self.currentX += speed;
		entity.getDisplayObject().x = this.self.currentX - ClientModel.instance.roadPastLength;

	}

    public exit(entity: IBaseGameEntity): void {

	}
}

/**中陷阱 */
class HorseEnityStateStuck implements IState {

	private static _instance: HorseEnityStateStuck;
	private client: ClientModel;
	private self: HorseEntity;

	public constructor() {
	}

	public static get instance(): HorseEnityStateStuck {
		if (this._instance == null) {
			this._instance = new HorseEnityStateStuck();
		}
		return this._instance;
	}

	public onMessage(entity: IBaseGameEntity, telegram: Telegram): boolean {
		return false;
	}

    public enter(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		// this.self.armature.animation.gotoAndPlay("pao");
		this.self.changeAnimation(AnimationType.FALL);
	}

    public execute(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		// if ((egret.getTimer() - this.self.obstacle.inTime) > this.self.obstacle.time) {
		// 	this.self.getFSM().ChangeState(HorseEnityStateSeek.instance);
		// }
	}

    public exit(entity: IBaseGameEntity): void {

	}
}

/**通过陷阱 */
class HorseEnityStatePass implements IState {

	private static _instance: HorseEnityStatePass;
	private client: ClientModel;
	private self: HorseEntity;

	public constructor() {
	}

	public static get instance(): HorseEnityStatePass {
		if (this._instance == null) {
			this._instance = new HorseEnityStatePass();
		}
		return this._instance;
	}

	public onMessage(entity: IBaseGameEntity, telegram: Telegram): boolean {
		return false;
	}

    public enter(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		this.self.changeAnimation(AnimationType.JUMP);
	}

    public execute(entity: IBaseGameEntity): void {

	}

    public exit(entity: IBaseGameEntity): void {

	}
}