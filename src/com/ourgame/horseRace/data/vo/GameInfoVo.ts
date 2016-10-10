class GameInfoVo {
	/**携带额 */
	public acctAmount: number;
	/**下注倒计时 */
	public cdTime: number;
	/**奖期 */
	public drawId: number = 0;
	/**下一个奖期 */
	public nextDrawId: number;
	/**开始时间 */
	public leftTime: number;
	/**标识码 */
	public rtnCode: number;
	/**提示信息 */
	public rtnMsg: string;

	private _isNew: boolean = false;

	public constructor() {
	}

	public setData(data: any): void {
		this.acctAmount = data.acctAmount;
		this.cdTime = Math.floor(data.cdTime / 1000);
		this.leftTime = Math.floor(data.leftTime / 1000);
		if (this.drawId < parseInt(data.drawId)) {
			this._isNew = true;
		} else {
			this._isNew = false;
		}
		this.drawId = data.drawId;
		this.rtnCode = data.rtnCode;
		this.rtnMsg = data.rtnMsg;
		this.nextDrawId = data.nextDrawId;
	}

	public get isNew(): boolean {
		return this._isNew;
	}
}