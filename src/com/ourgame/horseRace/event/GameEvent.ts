/**
 * game环节事件
 * @author 
 * sxt
 */
class GameEvent {
    /**
     * 游戏服务器连接成功
     */
    public static GAME_NET_CONN: string = "gameNetConn";
    /**
     * 游戏状态改变
     */
    public static GAME_STATE_EVENT: string = "gameStateEvent";
    /**
     * 登陆返回
     */
    public static LOGIN_EVENT: string = "loginEvent";

    //******************************配置文件相关事件
    /**
     * 配置文件加载完毕
     */
    public static CONFIG_INIT_COMPLETE_EVENT: string = "configInitCompleteEvent";
    /**
     * 语言文件加载完毕
     */
    public static LANGUAGE_INIT_COMPLETE_EVENT: string = "languageInitCompleteEvent";
    /**
     * 美术资源加载完毕
     */
    public static ASSETS_COMPLETE_EVENT: string = "assetsCompleteEvent";
    /**
     * 虚拟按钮信息
     */
    public static VIRUAL_INFO_EVENT: string = "virualInfoEvent";


    //********************************游戏环节相关事件
    /**
     * 携带额改变
     */
    public static USER_MONEY_CHANGE: string = "userMoneyChange";
    /**
     * 下注列表visible改变
     */
    public static ANTELIST_CHANGE_EVENT: string = "antelistChangeEvent";
    /**
     * 押注区间发生变化
     */
    public static USER_BET_RANGE_CHANGE: string = "userBetRrangeChange";
    /**
     * 服务器推送底金配置信息改变
     */
    public static USER_ANTE_CHANGE: string = "userAnteChange";
    /**
     * 用户选择的底金
     */
    public static BET_EVENT: string = "betEvent";

    /**
     * 摇奖结果
     */
    public static LOTTERY_ROLL_RESULT: string = "lotteryRollResult";
    /**
     * 自动摇奖
     */
    public static LOTTERY_AUTO_EVENT: string = "lotteryAutoEvent";
    /**
     * 奖励金额改变
     */
    public static AWARDE_CHANG_EVENT: string = "awardeChangeEvent";
    //===============================================================
    /**
     * 巨奖-奖池变化
     */
    public static JP_POOL_CHANGE_EVENT: string = "jpPoolChangeEvent";
    //===================================================================
    /**
     * 窗口
     */
    public static WINDOW_EVENT: string = "windowEvent";
    /**
     * 帮助面板数据
     */
    public static HELP_DATA_EVENT: string = "helpDataEvent";
    //==============================================================================
    /**
     * 有人中巨奖的消息
     */
    public static BIGWIN_EVENT: string = "bigWinEvent";
    /**
     * 自己中巨奖了
     */
    public static BIGWIN_SELF_EVENT: string = "bigWinSelfEvent";
    /**
     * 升级
     */
    public static LEVEL_UP_EVENT:string="levelUpEvent";
}
