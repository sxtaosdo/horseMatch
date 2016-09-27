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
		var list: Array<RoadVo> = this.self.roadList;
		var date: Date = new Date();
		var nextTime = (date.getTime() - ClientModel.instance.enterStateTime + 1000 / RoadMethod.secondInterval)/10000;
		var currentTime = 0;
		for (var i: number = 0; i < list.length; i++) {
			if (list[i].throughTime + currentTime >= nextTime) {
				//s=vo*t+1/2*a*t*t--无障碍(到达终点冲过去，哦吼吼)
				if (list[i].obstacleType == 0) {
					var target = list[i].startSpeed * (nextTime - currentTime) + (nextTime - currentTime) * (nextTime - currentTime) * list[i].acceleration / 2;
					if (i != list.length - 1) {
						this.self.currentX = Math.min(list[i].throughLength, target) + list[i].startX;
					}
					else {
						this.self.currentX = target;
					}
				}
				else {
					if (list[i].throughTime + currentTime == nextTime) {
						this.self.currentX = list[i].throughLength + list[i].startX;
						console.log("此时根据是否通过障碍决定播放离开障碍后动作");
					}
					else {
						this.self.currentX = list[i].startX;
						console.log("播放跳跃或者什么什么的状态吧，应该计算一下播放到第几帧，请sxt自行研究吧");
					}
				}
				break;
			}
			else {
				currentTime += list[i].throughTime;
			}
		}
		// var speed: number = RandomUtil.randNumber(1, 25);
		// this.self.speed = speed;
		// if (speed > this.client.maxSpeed) {
		// 	this.client.maxSpeed = speed;
		// }
		// this.self.currentX += speed;
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