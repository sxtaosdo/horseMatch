class ObstacleVo {
	/**障碍类型 */
	public type: number = 0;
	/**障碍位置 */
	public local: number;
	/**是否通过 */
	public isPass: boolean;
	/**滞留时间 */
	public time: number;
	/**进入陷阱的时间 */
	public inTime: number = 0;

	public constructor(data?: any) {
		if (data) {
			this.initData(data);
		}
	}

	public initData(data: string): void {
		// this.type = data.type;
		// console.log(data);
		var index: number = 0;
		var step: number = 4;
		var temp: number = 0;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.type = temp < 5000 ? 0 : 1;
		index += step;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.local = temp / 10;
		index += step;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.isPass = temp < 50000 ? true : false;
		index += step;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.time = temp / 10000;
	}

}