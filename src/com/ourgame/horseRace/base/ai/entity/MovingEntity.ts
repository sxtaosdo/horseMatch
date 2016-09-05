



class BaseMovingEntity extends BaseGameEntity {

	/**
	 * 速度
	 */
	public velocity: Vector2Ds;

	/**
	 * 朝向
	 */
	public heading: Vector2Ds;
	/**
	 * 垂直朝向向量的向量
	 */
	public side: Vector2Ds;
	public mass: number;
	/**
	 * 最大速度
	 */
	public maxSpeed: number;
	/**
	 * 最大推动力
	 */
	public maxForce: number;
	/**
	 * 最大旋转速率
	 */
	public maxTurnRate: number;
	/**
	 * 其实坐标
	 */
	public p0: egret.Point;
	public speedX: number;
	public speedY: number;
	public owner:IBase;
	public hitBox:egret.Rectangle;
	// public rotation: number;
	protected _position: Vector2Ds;
	protected _rotation: number;
	protected _speed: number = 0;

	public constructor() {
		super();
		this.hitBox = new egret.Rectangle();
	}

	public set position(value: Vector2Ds) {
		this._position = value;
		this.displayObject.x = this.position.x;
		this.displayObject.y = this.position.y;
	}

	public get position(): Vector2Ds {
		return this._position;
	}

	public set speed(value: number) {
		this._speed = value;
		this.setSpeedXY();
	}

	public get speed(): number {
		return this._speed;
	}

	public set rotation(value: number) {
		this._rotation = value;
		this.displayObject.rotation = this._rotation;
		this.setSpeedXY();
	}

	public get rotation(): number {
		return this._rotation;
	}

    private setSpeedXY(): void {
		if (this._rotation  && this.speed > 0) {
			var hudu: number = this.rotation / 57;
			this.speedX = this.speed * Math.cos(hudu);
			this.speedY = this.speed * Math.sin(hudu);
		}
    }
}