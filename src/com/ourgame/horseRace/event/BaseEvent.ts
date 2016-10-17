/**
 * 非game状态的事件
 */
class BaseEvent {
	/**登陆成功 */
	public static LOGIN_RESULT_EVENT: string = "loginResultEvent";
	/**奖池 */
	public static POOL_EVENT: string = "poolEvent";
	/**到达终点线 */
	public static REACH_END_LINE: string = "reachEndLine";
	/**游戏状态信息 */
	public static GAME_STATE_INFO: string = "gameStateInfo"

	/**用户携带额改变 */
	public static USER_MOENY_CHANGE: string = "userMoneyChange"
	/**比赛详情 */
	public static MATCH_INFO_CHANGE: string = "betInfoChange";
	/**下注结果错误 */
	public static BET_OPERATION_RESULT: string = "betOperationError";
	/**撤销投注消息 */
	public static BET_CANCEL: string = "betCancel";
	/**历史投注消息 */
	public static BET_HISTORY: string = "getHistroy"
	/**赛事结果-中奖金额 */
	public static DRAW_RESULT: string = "drawResult"
	/**暂时收分动画 */
	public static SHOW_RESULT_EFFECT: string = "showResultEffect";
	/**赛马资料 */
	public static HORSE_INFO_EVENT: string = "horseInfoEvent";


	/**window */
	/**历史奖期记录 */
	public static WINDOW_HISTORY: string = "windowHistory";

	/**窗口尺寸变化 */
	public static RESIZE_EVENT: string = "resizeEvent";
}