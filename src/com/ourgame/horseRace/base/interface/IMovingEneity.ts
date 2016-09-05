interface IMovingEneity extends IBaseGameEntity {
	/**
	 * 速度
	 */
	velocity: Vector2Ds;
	/**
	 * 位置
	 */
	position: Vector2Ds;
	/**
	 * 朝向
	 */
	heading: Vector2Ds;
	/**
	 * 垂直朝向向量的向量
	 */
	side: Vector2Ds;
	mass: number;
	/**
	 * 最大速度
	 */
	maxSpeed: number;
	/**
	 * 最大推动力
	 */
	maxForce: number;
	/**
	 * 最大旋转速率
	 */
	maxTurnRate: number;
	speed: number;
	speedX: number;
	speedY: number;
	/**角度 */
	rotation: number;
	/**持有者 */
	owner: IBase;
	/**碰撞的包围盒 */
	hitBox: egret.Rectangle;

	updateHitBox(x, y);
}