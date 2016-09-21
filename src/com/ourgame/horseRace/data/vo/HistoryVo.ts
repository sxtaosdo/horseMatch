class HistoryVo {
	/**奖期id */
	public id: string;
	/**马匹信息列表 */
	public matchInfoList: Array<MatchPlayerVo>;

	public constructor(data?: any) {
		this.matchInfoList = new Array<MatchPlayerVo>();
		if (data) {
			this.setData(data);
		}
	}

	public setData(data: any): void {
		this.id = data.drawId;
		data.matchInfo.forEach(element => {
			this.matchInfoList.push(new MatchPlayerVo(element));
		});
	}
}