class GetVo {
	public min:number=0;
	public max:number=0;
	public time:number=0;
	public num:number=0;

	public constructor(data:any) {
		this.min=data.min;
		this.max=data.max;
		this.time=data.time;
		this.num=data.num;
	}
}