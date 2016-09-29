class ObstacleVo {
	public static OBSTACLE_LENGTH: number = 200;
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

	public constructor(data?: any) {
		if (data) {
			this.initData(data);
		}
	}

	public initData(data: string): void {
		// this.type = index;
		var index: number = 0;
		var step: number = 4;
		var temp: number = 0;

		this.length = ObstacleVo.OBSTACLE_LENGTH;
		this.passTime = 1 * RoadMethod.secondInterval;
		this.notPassMaxTime = 2 * RoadMethod.secondInterval;
		this.notPassMinTime = 1.5 * RoadMethod.secondInterval;
		this.picUrl = "obstacle" + index.toString() + "_png";
		this.passMove = "jump";
		this.notPassMove = "drunk";

		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;	//随机生成障碍类型
		this.type = temp < 5000 ? 0 : 1;
		index += step;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.postion = Math.floor(temp / 1000 > 30 ? temp / 10000 : temp);
		this.postion = Math.floor(RoadMethod.roadIntervals * (Math.random() + 1) / 3)
	}
}