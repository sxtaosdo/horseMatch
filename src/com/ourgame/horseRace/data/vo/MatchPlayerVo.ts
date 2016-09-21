/**
 * 每局马状态和倍率信息
 */
class MatchPlayerVo {
	public id: number;
	/**状态 */
	public state: number;
	/**倍率 */
	public rate: number;
	/**已下注的金额 */
	public bet: number = 0;
	/**排名 */
	public rank: number;

	public constructor(data?: any) {
		if (data) {
			this.analysis(data);
		}
	}

	public analysis(data: any): void {
		this.id = data.hId;
		this.rate = data.odds;
		this.state = data.state;
		this.rank = data.rank;
	}

}