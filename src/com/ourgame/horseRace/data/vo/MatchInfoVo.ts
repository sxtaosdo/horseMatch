class MatchInfoVo {
	public info: GameInfoVo;
	public horseInfoList: Array<MatchPlayerVo>;
	private _includeRank: boolean = false;

	public constructor(data?: any) {
		this.info = new GameInfoVo();
		this.horseInfoList = new Array<MatchPlayerVo>();
		if (data) {
			this.setData(data);
		}
	}

	public setData(data: any): void {
		this._includeRank = false;
		this.info.setData(data);
		let temp: number = 0;
		if (data.matchInfo) {
			this.horseInfoList = [];
			data.matchInfo.forEach(element => {
				let vo: MatchPlayerVo = new MatchPlayerVo(element)
				this.horseInfoList.push(vo);
				if (vo.rank > 0) {//判断是否包含名次信息
					temp++;
				}
			});
		}
		if (temp > 4) {
			this._includeRank = true;
		}
	}

	public toString(): string {
		var str: string = "";
		var key: any;
		for (key in this.info) {
			if (String(this.info[key]).indexOf("function") < 0) {
				str += key + ":" + this.info[key] + "\t"
			}
		}
		return str;
	}

	public get includeRank(): boolean {
		return this._includeRank;
	}

	public get isNew(): boolean {
		return this.info.isNew;
	}
}