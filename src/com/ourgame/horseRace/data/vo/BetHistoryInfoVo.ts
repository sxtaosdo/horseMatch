class BetHistoryInfoVo {
	public id: number;
	public date: string;
	public money: number;
	public award: number;

	public constructor(data: any) {
		this.setData(data);
	}

	public setData(data: any): void {
		this.id = data.drawId
		//2016-10-13 11:29:06.0
		let str: string = data.betTime
		this.date = str.substring(str.indexOf("-") + 1, str.lastIndexOf(":"));
		this.money = data.betAmount
		this.award = data.winAmount

	}
}