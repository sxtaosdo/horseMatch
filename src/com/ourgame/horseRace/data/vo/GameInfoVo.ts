class GameInfoVo {
	/**携带额 */
	public acctAmount: number;
	/**下注倒计时 */
	public cdTime: number;
	/**奖期 */
	public drawId: number;
	/**下一个奖期 */
	public nextDrawId: number;
	/**开始时间 */
	public leftTime: number;
	/**标识码 */
	public rtnCode: number;
	/**提示信息 */
	public rtnMsg: string;

	public constructor() {
	}

	public setData(data: any): void {
		this.acctAmount = data.acctAmount;
		this.cdTime = Math.floor(data.cdTime / 1000);
		this.drawId = data.drawId;
		this.leftTime = Math.floor(data.leftTime / 1000);
		this.rtnCode = data.rtnCode;
		this.rtnMsg = data.rtnMsg;
		this.nextDrawId = data.nextDrawId;
	}
}