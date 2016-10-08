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
		// if (this.self.sid == "1") {
		// 	egret.log("seekstate");
		// }
	}

    public execute(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		var list: Array<RoadVo> = this.self.roadList;
		var date: Date = new Date();
		var nextTime = (date.getTime() - ClientModel.instance.enterStateTime + 1000 / RoadMethod.secondInterval) / 1000 * RoadMethod.secondInterval;
		var currentTime = 0;
		var reachEnd: boolean = true;
		if (this.self.sTime > 0) {
			if (egret.getTimer() - this.self.sTime > 1000) {
				this.self.changeAnimation(AnimationType.RUN);
				this.self.sTime = 0;
			}
		}
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
					if (list[i].state == 5) {
						// console.log("中陷阱");
						this.self.getFSM().ChangeState(HorseEnityStateStuck.instance);
						//this.self.changeAnimation(AnimationType.FALL);
					}
					else if (list[i].state == 4) {
						// console.log("通过障碍");
						this.self.getFSM().ChangeState(HorseEnityStatePass.instance);
					}
					this.self.sTime = egret.getTimer();
				}
				reachEnd = false;
				break;
			}
			else {
				currentTime += list[i].throughTime;
			}

		}
		if (reachEnd) {
			this.self.currentX = list[list.length - 1].startX + list[list.length - 1].throughLength + list[list.length - 1].startSpeed * (nextTime - currentTime);
		}

		//超过右侧线
		if (this.self.currentX > GameWorld.RIGHT_LINE + ClientModel.instance.roadPastLength) {
			//尚未到达终点--》摄像头向右移动
			if (this.self.currentX < GameWorld.DEADLINE_LENGTH) {
				ClientModel.instance.roadPastLength = this.self.currentX - GameWorld.RIGHT_LINE;
			}
			//到达终点
			else {
				entity.getFSM().ChangeState(HorseEnityStateEnd.instance);	//比赛结束
				if (ClientModel.instance.first == null) {
					ClientModel.instance.first = this.self;
				}
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
		this.self.sTime = egret.getTimer();
	}

    public execute(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;

		if (this.self.sTime > 0) {
			this.self.stopAnimation();
			if (egret.getTimer() - this.self.sTime > 2500) {
				this.self.sTime = 0;
				this.self.stopAnimation(false);
			}
		}
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
		if (this.self) {
			this.self.changeAnimation(AnimationType.DROWN);
		} else {
			this.self.changeAnimation(AnimationType.FALL);
		}
	}

    public execute(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		var list: Array<RoadVo> = this.self.roadList;
		var date: Date = new Date();
		var nextTime = (date.getTime() - ClientModel.instance.enterStateTime + 1000 / RoadMethod.secondInterval) / 1000 * RoadMethod.secondInterval;
		var currentTime = 0;
		var reachEnd: boolean = true;
		if (this.self.sTime > 0) {
			if (egret.getTimer() - this.self.sTime > 1000) {
				// this.self.changeAnimation(AnimationType.FALL);
				this.self.sTime = 0;
			}
		}
		for (var i: number = 0; i < list.length; i++) {
			if (list[i].throughTime + currentTime >= nextTime) {
				//跑出障碍(返回奔跑状态)
				if (list[i].obstacleType == 0) {
					this.self.getFSM().ChangeState(HorseEnityStateSeek.instance);
				}
				//在障碍中，stuk是否要播放动画，x坐标不变
				else {
					this.self.sTime = egret.getTimer();
					entity.getDisplayObject().x = this.self.currentX - ClientModel.instance.roadPastLength;
				}
				break;
			}
			else {
				currentTime += list[i].throughTime;
			}

		}
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
		this.self.sTime = egret.getTimer();
		this.self.changeAnimation(AnimationType.JUMP);
	}

    public execute(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		var list: Array<RoadVo> = this.self.roadList;
		var date: Date = new Date();
		var nextTime = (date.getTime() - ClientModel.instance.enterStateTime + 1000 / RoadMethod.secondInterval) / 1000 * RoadMethod.secondInterval;
		var currentTime = 0;
		var reachEnd: boolean = true;
		for (var i: number = 0; i < list.length; i++) {
			if (list[i].throughTime + currentTime >= nextTime) {
				//跑出障碍(返回奔跑状态)
				if (list[i].obstacleType == 0) {
					this.self.getFSM().ChangeState(HorseEnityStateSeek.instance);
				}
				//在障碍中，pass要播放动画，x坐标随之变化，待sxt确认
				else {
					this.self.currentX = list[i].throughLength / list[i].throughTime * (nextTime - currentTime) + list[i].startX;
					entity.getDisplayObject().x = this.self.currentX - ClientModel.instance.roadPastLength;
					this.self.sTime = egret.getTimer();
				}
				break;
			}
			else {
				currentTime += list[i].throughTime;
			}

		}
	}

    public exit(entity: IBaseGameEntity): void {
		this.self = <HorseEntity>entity;
		this.self.currentX += ObstacleVo.OBSTACLE_LENGTH;
	}
}