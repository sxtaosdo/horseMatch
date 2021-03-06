class ObstacleVo {
	public static OBSTACLE_LENGTH: number = 300;
	/**障碍类型 */
	public type: number = 0;
    /**障碍长度 */
	public length: number;
	/**通过障碍时间 */
	public passTime: number;
	/**滞留障碍最大时间 */
	public notPassMaxTime: number;
	/**滞留障碍最小时间 */
	public notPassMinTime: number;
	/**纹理图集 */
	public picUrl: String;
	/**通过障碍动作 */
	public passMove: String;
	/**未通过障碍动作 */
	public notPassMove: String;
	/**位置 */
	public postion: number;
	/**是否通过 */
	public isPass: boolean = false;

	public constructor(data?: any) {
		if (data) {
			this.initData(data);
		}
	}

	public initData(data: string): void {
		// this.type = index;
		let index: number = 0;
		let step: number = 4;
		let temp: number = 0;

		this.length = ObstacleVo.OBSTACLE_LENGTH;
		this.passTime = 0.5 * RoadMethod.secondInterval;
		this.notPassMaxTime = 1 * RoadMethod.secondInterval;
		this.notPassMinTime = 1 * RoadMethod.secondInterval;
		this.picUrl = "obstacle" + index.toString() + "_png";
		this.passMove = "jump";
		this.notPassMove = "drunk";

		temp = (parseInt(data.substring(index, index + step), 16));	//随机生成障碍类型
		let temp1: string = temp.toString();
		temp = parseInt(temp1.substr(temp1.length - 1));
		this.type = temp < 5 ? 1 : 2;
		// console.log(temp + "\t" + data);

		index += step;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.postion = Math.floor(temp / 1000 > 30 ? temp / 10000 : temp);
		this.postion = Math.floor(RoadMethod.roadIntervals * (Math.random() + 1) / 3);

		index += step;
		temp = parseInt(data.substring(index, index + step), 16);
		this.isPass = (temp > 30000) ? true : false;
	}
}