class RoadVo {
	/**起始速度 */
	public startSpeed: number=0;
	/**加速度 */
	public acceleration: number=0;
	/**起始坐标 */
	public startX: number=0;
	/**经过路程 */
	public throughLength: number=0;
	/**经过时间 */
	public throughTime: number=0;
	/**状态 1-正常 2-愤怒 3-低落 4-障碍(通过) 5-障碍（陷入）*/
	public state: number=1;
	/**障碍类型 0为无障碍*/
	public obstacleType:number=0;
	/**当前在该阶段时间 */
	public currentTime: number=0;


	public constructor() {
	}
}