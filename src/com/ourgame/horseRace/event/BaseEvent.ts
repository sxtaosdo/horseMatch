/**
 * 非game状态的事件
 */
class BaseEvent {
	/**登陆成功 */
	public static LOGIN_RESULT_EVENT: string = "loginResultEvent";
	/**奖池 */
	public static POOL_EVENT:string="poolEvent";



	//==========================================================
	//=====================步步为营==============================
	//==========================================================
	/**步步为营-go结果 */
	public static DICE_GO_RESULT_EVENT: string = "GoResultEvent";
	/**步步为营-信息 */
	public static DICE_INFO_EVENT: string = "DiceInfoEvent";
}