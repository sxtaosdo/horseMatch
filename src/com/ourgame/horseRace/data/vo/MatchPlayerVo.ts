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
	private _bet: number = 0;
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
		if (data.bet || (data.bet == 0)) {
			this.bet = data.bet;
		}
	}


	public get bet(): number {
		return this._bet;
	}


	public set bet(v: number) {
		this._bet = v;
		console.log();

	}


}