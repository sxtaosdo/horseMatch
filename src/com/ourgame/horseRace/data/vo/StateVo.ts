class StateVo {
	public min: number = 0;
	public max: number = 0;
	public name: string = "";

	public constructor(data: any) {
		this.min = data.min;
		this.max = data.max;
		this.name = data.name;
	}
}