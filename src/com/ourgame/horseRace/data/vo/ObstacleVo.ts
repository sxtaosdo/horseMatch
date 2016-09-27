class ObstacleVo {
	/**障碍类型 */
	public type: number = 0;
    /**障碍长度 */
	public length:number;
	/**通过障碍时间 */
	public passTime: number;
	/**滞留障碍最大时间 */
	public notPassMaxTime: number;
	/**滞留障碍最小时间 */
	public notPassMinTime: number;
	/**纹理图集 */
	public picUrl:String;
	/**通过障碍动作 */
	public passMove:String;
	/**未通过障碍动作 */
	public notPassMove:String;

	public constructor(data?: any) {
		if (data) {
			this.initData(data);
		}
	}

	public initData(data: string): void {
		var index: number = 0;
		var step: number = 4;
		var temp: number = 0;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.type = temp < 5000 ? 0 : 1;
		index += step;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		// this.local = temp / 10;
		// index += step;
		// temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		// this.isPass = temp < 50000 ? true : false;
		// index += step;
		// temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		// this.time = temp / 10000;
	}

}