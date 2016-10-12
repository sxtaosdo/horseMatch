class HorseVo extends egret.HashObject {

	public id: number;
	public name: string;
	/**栖息地 */
	public habitat: string;
	/**年龄 */
	public age: number;
	/**品种 */
	public breed: string;
	/**加速度 */
	public acceleration: number;
	/**最高速度 */
	public maximumSpeed: number;
	/**普通速度 */
	public speed: number;
	/**耐力 */
	public endurance: number;
	/**恢复能力 
	 * 赛马在普通速度奔跑一定时间后再次加速到最高速度的这个时间，时间越短恢复能力越高。
	 */
	public recovery: number;
	/**纹理 */
	public mcName: string;
	/**本局信息 */
	public math: MatchPlayerVo;
	public width: number = 0;
	public height: number = 0;


	public constructor() {
		super();
	}

	public analysis(data: any): void {
		this.id = data.id;
		this.name = data.name;
		this.habitat = data.habitat;
		this.age = data.age;
		this.breed = data.breed;
		this.acceleration = data.acceleration;
		this.maximumSpeed = data.maximumSpeed;
		this.speed = data.speed;
		this.endurance = data.endurance;
		this.recovery = data.recovery;
		this.mcName = data.mcName;
		this.height = data.height;

		// var temp: any = new md5().hex_md5(this.mcName)
		// console.log("this.mcName md5:" + temp);

	}
}