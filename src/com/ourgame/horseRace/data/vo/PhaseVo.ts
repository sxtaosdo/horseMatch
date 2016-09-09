/**比赛阶段信息 */
class PhaseVo {

	/**加速度 */
	public acceleration: number;
	/**最大速度 */
	public maxSpeed: number;
	/**障碍 */
	public obstacleType: number;
	/**障碍位置 */
	public obstaclePosition: number;
	/**是否通过 */
	public pass: boolean;
	/**障碍停留时间 */
	public obstacleStay: number;
	/**通过障碍失败后加速度 */
	public obstacleAcc: number;
	/** 通过障碍失败后最大速度*/
	public obstacleMaxSpeed: number;
	/**总花费时间 */
	public totalTime: number = 0;

	public constructor() {
	}

	public initData(data: string): void {
		var index: number = 0;
		var step: number = 4;
		var temp: number = 0;
		temp = (parseInt(data.substring(index, index + step), 16) +60000) /2;
		this.acceleration = temp;
		index += step;
		this.maxSpeed = (parseInt(data.substring(index, index + step), 16) +60000) /2;
		index += step;
		this.obstacleType = (parseInt(data.substring(index, index + step), 16) +60000) /2;
		index += step;
		this.obstaclePosition = (parseInt(data.substring(index, index + step), 16) +60000) /2;
		index += step;
		this.pass = parseInt(data.substring(index, index + step), 16) > 32767 ? true : false;
		index += step;
		this.obstacleStay = (parseInt(data.substring(index, index + step), 16) +60000) /2;
		index += step;
		this.obstacleAcc = (parseInt(data.substring(index, index + step), 16) +60000) /2;
		index += step;
		this.obstacleMaxSpeed = (parseInt(data.substring(index, index + step), 16) +60000) /2;
		console.log(this);

	}
}