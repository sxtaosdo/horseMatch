class BufferVo {
	/**触发时间 */
	public time: number;
	/**持续时间 */
	public holdTime: number;

	public constructor(data?: any) {
		if (data) {
			this.initData(data);
		}
	}

	public initData(data: string): void {
		console.log(data);
		var index: number = 0;
		var step: number = 4;
		var temp: number = 0;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.time = temp / 100;
		index += step;
		temp = (parseInt(data.substring(index, index + step), 16) + 60000) / 2;
		this.holdTime = temp / 100;

	}
}