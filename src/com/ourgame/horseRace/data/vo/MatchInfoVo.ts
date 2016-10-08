class MatchInfoVo {
	public info: GameInfoVo;
	public horseInfoList: Array<MatchPlayerVo>;

	public constructor(data?: any) {
		this.info = new GameInfoVo();
		this.horseInfoList = new Array<MatchPlayerVo>();
		if (data) {
			this.setData(data);
		}
	}

	public setData(data: any): void {
		this.info.setData(data);
		data.matchInfo.forEach(element => {
			this.horseInfoList.push(new MatchPlayerVo(element));
		});
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
}