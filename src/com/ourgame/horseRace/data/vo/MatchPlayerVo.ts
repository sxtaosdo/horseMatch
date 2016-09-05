/**
 * 每局马状态和倍率信息
 */
class MatchPlayerVo {
	/**状态 */
	public state: number;
	/**倍率 */
	public rate: number;
	/**已下注的金额 */
	public bet:number;

	public constructor() {
	}

	public analysis(data: any): void {
		this.state = data.state;
		this.rate = data.rate;
	}

}