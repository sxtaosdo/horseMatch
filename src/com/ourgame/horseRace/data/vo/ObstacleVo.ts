class ObstacleVo {
	/**障碍类型 */
	public type: number = 0;
    /**障碍长度 */
	public length:number;
	/**通过障碍时间 */
	public passTime: number;
	/**滞留障碍最大时间 */
	public notPassMaxTime: number;
	/**滞留障碍最小时间 */
	public notPassMinTime: number;
	/**纹理图集 */
	public picUrl:String;
	/**通过障碍动作 */
	public passMove:String;
	/**未通过障碍动作 */
	public notPassMove:String;

	public constructor(data?: any) {
		if (data) {
			this.initData(data);
		}
	}

	public initData(index: number): void {
		this.type=index;
		this.length=50;
		this.passTime=0.05;
		this.notPassMaxTime=1;
		this.notPassMinTime=0.5;
		this.picUrl="obstacle"+index.toString()+"_png";
		this.passMove="jump";
		this.notPassMove="drunk";
	}
}