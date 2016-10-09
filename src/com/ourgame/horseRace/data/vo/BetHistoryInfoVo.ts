class BetHistoryInfoVo {
	public id: number;
	public date: string;
	public money: number;
	public award: number;

	public constructor(data: any) {
		this.setData(data);
	}

	public setData(data: any): void {
		this.id = data.id
		this.date = data.date
		this.money = data.money
		this.award = data.award

	}
}