/**
 * 消息号
 * @author sxt
 */
class MsgType {
    /**
     * 游戏消息的基准值
     */
    public static GLID_BASE_FISH: number = 0x000FF000;
    public static REQ_BASE: number = 0;
    public static ACK_BASE: number = 10;
    /**
     * C->C 客户端本地消息
     */
    public static GLFS_NetworkEvent: number = MsgType.GLID_BASE_FISH + 0x00000001;

    //======================================================================================================================================================================
    //【系统及同步消息】
    //======================================================================================================================================================================
    public static GLFS_Ping: number = MsgType.GLID_BASE_FISH + 0x00000201;	// C->S S->C 延迟检测
    public static GLFS_PeriodChangeACK: number = MsgType.GLID_BASE_FISH + 0x00000202;	// S->C 赛季更迭
    public static GLFS_PeriodSync: number = MsgType.GLID_BASE_FISH + 0x00000203;	// S->C 时间同步
    public static GLFS_PlayerJoinACK: number = MsgType.GLID_BASE_FISH + 0x00000204;	// S->C 玩家加入游戏
    public static GLFS_PlayerLeaveACK: number = MsgType.GLID_BASE_FISH + 0x00000205;	// S->C 玩家离开游戏
    public static GLFS_PurchaseBulletTipACK: number = MsgType.GLID_BASE_FISH + 0x00000206;	// S->C 服务器要求客户端购买子弹
    public static GLFS_PurchaseBulletREQ: number = MsgType.GLID_BASE_FISH + 0x00000207;	// C->S 客户端请求兑换炮弹
    public static GLFS_PurchaseBulletACK: number = MsgType.GLID_BASE_FISH + 0x00000208;	// S->C 兑换成功后，更新客户端子弹数
    public static GLFS_StandardModeSelectREQ: number = MsgType.GLID_BASE_FISH + 0x00000209;	// C->S 客户端通知服务器选择的普通馆模式
    public static GLFS_PeriodLeaveTimeACK: number = MsgType.GLID_BASE_FISH + 0x00000209;	// S->C 赛季剩余时长(用于播放倒计时)[2011.10.13]
    public static GLFS_StandardModeSelectACK: number = MsgType.GLID_BASE_FISH + 0x00000210;	// S->C 服务器广播客户端是否报名成功
    public static GLFS_ShowStageAwards: number = MsgType.GLID_BASE_FISH + 0x00000211;	//S->C 客户端显示提示阶段奖励
    public static GLFS_GameResult: number = MsgType.GLID_BASE_FISH + 0x00000212;	// S->C 客户端显示幸运奖
    public static GLFS_Checkout: number = MsgType.GLID_BASE_FISH + 0x00000213;	// C->S 客户端主动请求结算
    public static GLFS_RestartACK: number = MsgType.GLID_BASE_FISH + 0x00000214;	// S->C 服务器通知客户端服务器当前倒计时，发了代表启用倒计时
    public static GLFS_RestartGameREQ: number = MsgType.GLID_BASE_FISH + 0x00000215;	// C->S 客户端要求重新开始本局游戏
    public static GLFS_ModeSelectACK: number = MsgType.GLID_BASE_FISH + 0x00000216;	// S->C 告诉客户端弹出模式选择
    public static GLFS_TimeReport: number = MsgType.GLID_BASE_FISH + 0x00000217;	// C->S 客户端通知服务器当前的时间，用于防外挂
    public static GLFS_GameInit: number = MsgType.GLID_BASE_FISH + 0x00000218;	// S->C 第一次进入游戏时的通知消息
    public static GLFS_NoMoneyACK: number = MsgType.GLID_BASE_FISH + 0x00000219;	// S->C 任何模式，没钱了就发这消息
    public static GLFS_MGPlayerStateACK: number = MsgType.GLID_BASE_FISH + 0x00000220;	// S->C C->S 通知比赛模式状态信息
    public static GLFS_MGChangeHostACK: number = MsgType.GLID_BASE_FISH + 0x00000221;	// S->C 通知比赛模式状态信息
    public static GLFS_MGKickACK: number = MsgType.GLID_BASE_FISH + 0x00000222;	// S->C C->S 踢人通知
    public static GLFS_MGStartGameREQ: number = MsgType.GLID_BASE_FISH + 0x00000223;	// C->S 请求开始游戏
    public static GLFS_MGStateChanged: number = MsgType.GLID_BASE_FISH + 0x00000224;	// S->C 游戏状态改变
    public static GLFS_MGGameResult: number = MsgType.GLID_BASE_FISH + 0x00000230;	// S->C 游戏结束的结果
    public static GLFS_BombAttributeACK: number = MsgType.GLID_BASE_FISH + 0x00000240;	// S->C 服务器通知客户端炮弹参数
    public static GLFS_BeanLimitACK: number = MsgType.GLID_BASE_FISH + 0x00000241;	// S->C 当超过场馆最高限制时,发出通知
    public static GLFS_UpdateBeanACK: number = MsgType.GLID_BASE_FISH + 0x00000242;	// S->C 用户充值后通知服务器更新
    /**
     *  止损通知
     */
    public static GLFS_MaxLossACK: number = MsgType.GLID_BASE_FISH + 0x00000246;

    /**
     * 不购买炮弹了 
     */
    public static GLFS_NotPurchaseBulletREQ: number = MsgType.GLID_BASE_FISH + 0x00000265;


    public static GLFS_UpdateBeanREQ: number = MsgType.GLID_BASE_FISH + 0x00000245;	// C->S 用户充值后通知服务器更新


    public static GLFS_FreeRechargeTipACK: number = MsgType.GLID_BASE_FISH + 0x00000248;		// S->C 新平台免冲提示
    public static GLFS_FreeRechargeCommitACK: number = MsgType.GLID_BASE_FISH + 0x00000249;	//  S->C 新平台免冲确认

    public static GLFS_QueryBeanREQ: number = MsgType.GLID_BASE_FISH + 0x00000250;	//  C->S 新平台查询万能豆
    public static GLFS_QueryBeanACK: number = MsgType.GLID_BASE_FISH + 0x00000251;	//  S->C 新平台查询万能豆

    public static FreeRechargeREQ: number = MsgType.GLID_BASE_FISH + 0x00000252;	// C->S 新平台免冲请求
    /**
     * 防沉迷时间消息
     */
    public static GLFS_WallowTimeBoxACK: number = MsgType.GLID_BASE_FISH + 0x00000253;


    /**
     *S->C服务端返回玩家回收炮弹得到的金币 
     */
    public static GLFS_CoinFromRecoverBulletACK: number = MsgType.GLID_BASE_FISH + 0x00000266;
    /**
     * S->C 服务端返回用户升级请求 
     */
    public static GLFS_FisherUpLevelACK: number = MsgType.GLID_BASE_FISH + 0x264;
    /**
     *   全服播报
     */
    public static GLFS_AllServiceBroadcast: number = MsgType.GLID_BASE_FISH + 0x260;

    /**
     * 客户端请求升级
     */
    public static GLFS_FisherUpLevelREQ: number = MsgType.GLID_BASE_FISH + 0x263;

    //======================================================================================================================================================================
    //【炮弹消息】
    //======================================================================================================================================================================
    public static GLFS_ChangeLevelACK: number = MsgType.GLID_BASE_FISH + 0x00000301;	// C->S 客户端请求更换大炮等级
    public static GLFS_ShootREQ: number = MsgType.GLID_BASE_FISH + 0x00000304;	// C->S 客户端请求在当前旋转下发炮
    public static GLFS_ShootACK: number = MsgType.GLID_BASE_FISH + 0x00000305;	// S->C 某玩家发炮
    public static GLFS_ExplodeREQ: number = MsgType.GLID_BASE_FISH + 0x00000302;	// C->S 告知服务器本次爆炸的鱼及情况
    public static GLFS_ExplodeACK: number = MsgType.GLID_BASE_FISH + 0x00000303;	// S->C 服务器确认最终爆炸信息，并广播
    public static GLFS_CanonRotationACK: number = MsgType.GLID_BASE_FISH + 0x00000306;	// C->S S->C 炮台位置变化
    public static GLFS_AutoShootACK: number = MsgType.GLID_BASE_FISH + 0x00000307;	// C->S S->C 自动射击



    //======================================================================================================================================================================
    //【小游戏相关消息】
    //======================================================================================================================================================================
    public static GLFS_ShellGameStartACK: number = MsgType.GLID_BASE_FISH + 0x00000401;	// S->C 通知小游戏开始
    public static GLFS_ShellGameSelectACK: number = MsgType.GLID_BASE_FISH + 0x00000402;	// C->S S->C，客户端选择结果及服务器广播
    public static GLFS_DiamondGameStartACK: number = MsgType.GLID_BASE_FISH + 0x00000403;	// S->C 钻石大奖开始
    public static GLFS_DiamondGameResultACK: number = MsgType.GLID_BASE_FISH + 0x00000404;	// S->C 钻石大奖结果
    public static GLFS_AddDiamondACK: number = MsgType.GLID_BASE_FISH + 0x00000405;	// S->C 添加一颗钻石
    public static GLFS_DiamondGameProgressACK: number = MsgType.GLID_BASE_FISH + 0x00000406;	// S->C 通知钻石大奖中,鲨鱼被击中的进度
    public static GLFS_SuperCannonReadyACK: number = MsgType.GLID_BASE_FISH + 0x00000407;	// S->C 通知超级大炮准备好  (会被后面这消息替换);
    public static GLFS_ShellRefreshCoinACK: number = MsgType.GLID_BASE_FISH + 0x00000408;	//C->S客户端贝壳请求刷新金币//S->C更新完毕
    public static GLFS_FishLotteryACK: number = MsgType.GLID_BASE_FISH + 0x00000409;// S->C 得到鱼券
    public static GLFS_FullScreenCannonReadyACK: number = MsgType.GLID_BASE_FISH + 0x00000410;// S->C 通知核弹准备好
    public static GLFS_RefreshDiamondTriggerNum: number = MsgType.GLID_BASE_FISH + 0x00000412;// S->C 刷新海洋之心触发次数
    public static GLFS_AngryOfGodReadyACK: number = MsgType.GLID_BASE_FISH + 0x00000413;// S->C 通知海神之怒准备好
    public static GLFS_StartBingoAck: number = MsgType.GLID_BASE_FISH + 0x00000414;// S->C 触发比倍
    public static GLFS_BingoDataReq: number = MsgType.GLID_BASE_FISH + 0x00000415;// C->S 比倍
    public static GLFS_BingoDataAck: number = MsgType.GLID_BASE_FISH + 0x00000416;// S->C 比倍
    public static GLFS_BingoEndReq: number = MsgType.GLID_BASE_FISH + 0x00000417;// C->S 比倍收分
    public static GLFS_BingoEndAck: number = MsgType.GLID_BASE_FISH + 0x00000418;// S->C 比倍收分,服务器广播
    public static GLFS_DiamondRefreshCoinACK: number = MsgType.GLID_BASE_FISH + 0x00000419;//C->S客户端贝壳请求刷新金币//S->C更新完毕

    public static GLFS_UseSuperWeaponsReq: number = MsgType.GLID_BASE_FISH + 0x00000420;// C->S客户端请求使用超级武器
    public static GLFS_RewardTaskStartAck: number = MsgType.GLID_BASE_FISH + 0x00000421;// 悬赏任务开始消息 add by wanghj 2014/02/10
    public static GLFS_RewardTaskEndAck: number = MsgType.GLID_BASE_FISH + 0x00000422;// 悬赏任务结束消息 add by wanghj 2014/02/10
    public static GLFS_ShellGameOverTimeResultACK: number = MsgType.GLID_BASE_FISH + 0x00000423;// S->C 出贝壳超时未选服务端给出的结果


    //======================================================================================================================================================================
    //【背包】
    //======================================================================================================================================================================
    public static GLFS_UserBackpackReq: number = MsgType.GLID_BASE_FISH + 0x00000430;// C->S客户端请求背包列表
    public static GLFS_UserBackpackAck: number = MsgType.GLID_BASE_FISH + 0x00000431;// S->C客户端请求背包列表

    public static GLFS_UsePropReq: number = MsgType.GLID_BASE_FISH + 0x00000433;// C->S客户端请求使用道具
    public static GLFS_UsePropAck: number = MsgType.GLID_BASE_FISH + 0x00000434;// S->C客户端请求使用道具

    public static GLFS_TidyBackpackReq: number = MsgType.GLID_BASE_FISH + 0x00000435;// C->S客户端请求整理背包
    public static GLFS_TidyBackpackAck: number = MsgType.GLID_BASE_FISH + 0x00000436;// S->C客户端请求整理背包

    public static GLFS_UnLoadPropReq: number = MsgType.GLID_BASE_FISH + 0x00000437;// C->S客户端请求卸下道具
    public static GLFS_UnLoadPropAck: number = MsgType.GLID_BASE_FISH + 0x00000438;// S->C客户端请求卸下道具

    public static GLFS_UpdateUserBackpack: number = MsgType.GLID_BASE_FISH + 0x00000439;// S->C 更新背包

    //======================================================================================================================================================================
    //【幸运轮盘】
    //======================================================================================================================================================================

    public static GLFS_RouletteBegin: number = MsgType.GLID_BASE_FISH + 0x00000253;	// S->C 达到5颗宝石时,触发轮盘,直接发结果
    public static GLFS_RouletteEnd: number = MsgType.GLID_BASE_FISH + 0x00000254;	// C->S 客户端轮盘转动完毕通知服务器发放奖励
    public static GLFS_RouletteAward: number = MsgType.GLID_BASE_FISH + 0x00000256;	// // S->C 广播获得的奖励







    //======================================================================================================================================================================
    //【临时测试用消息】
    //======================================================================================================================================================================
    public static GLFS_DebugServerPos: number = MsgType.GLID_BASE_FISH + 0x00000801;
    public static GLFS_DebugCommandREQ: number = MsgType.GLID_BASE_FISH + 0x00000802;	// C->S 客户端通知服务器生成鱼
    public static GLFS_BombPowerTest: number = MsgType.GLID_BASE_FISH + 0x00000803;
    public static GLFS_DebugConfigACK: number = MsgType.GLID_BASE_FISH + 0x00000804;	// C->S 发送配置文件到服务器端
    public static GLFS_UpdateDebugPanelREQ: number = MsgType.GLID_BASE_FISH + 0x00000805;	// C->S 请求更新调试面板
    public static GLFS_UpdateDebugPanelACK: number = MsgType.GLID_BASE_FISH + 0x00000806;	// S->C 调试面板数据更新
    public static GLFS_CommitDebugPanelACK: number = MsgType.GLID_BASE_FISH + 0x00000807;	// C->S 调试面板数据提交

    //======================================================================================================================================================================
    //【DB信息】
    //======================================================================================================================================================================
    public static GLFS_GameBalanceSearchReq: number = MsgType.GLID_BASE_FISH + 0x00000904;	// GS->FishDBS 执行结算结果查询
    public static GLFS_GameBalanceREQ: number = MsgType.GLID_BASE_FISH + 0x00000905;	// GS->FishDBS 执行结算请求
    public static GLFS_GameBalanceACK: number = MsgType.GLID_BASE_FISH + 0x00000906;	//FishDBS->GS 返回结算的结果
    public static GLFS_DailyCheckoutREQ: number = MsgType.GLID_BASE_FISH + 0x00000907;	// GS->FishDBS 每日结算时间同步请求
    public static GLFS_DailyCheckoutACK: number = MsgType.GLID_BASE_FISH + 0x00000908;	// FishDBS -> GS 每日到点结算
    public static GLFS_HonorRankREQ: number = MsgType.GLID_BASE_FISH + 0x00000914;	// C-> GS -> FishDBS 请求排名内容
    public static GLFS_HonorRankACK: number = MsgType.GLID_BASE_FISH + 0x00000915;	// FishDBS -> GS -> C 服务器下发排名列表
    public static GLFS_MailHeaderREQ: number = MsgType.GLID_BASE_FISH + 0x00000918;	// C-> GS -> FishDBS
    public static GLFS_MailHeaderACK: number = MsgType.GLID_BASE_FISH + 0x00000919;	// FishDBS -> GS -> C 服务器下发邮件头列表
    public static GLFS_MailContentREQ: number = MsgType.GLID_BASE_FISH + 0x0000091A;	// C-> GS -> FishDBS 请求邮件内容
    public static GLFS_MailContentACK: number = MsgType.GLID_BASE_FISH + 0x0000091B;	// FishDBS -> GS -> C 服务器下发邮件内容
    public static GLFS_MailDeleteREQ: number = MsgType.GLID_BASE_FISH + 0x0000091C;	// C-> GS -> FishDBS 请求删除邮件
    public static GLFS_MailDeleteACK: number = MsgType.GLID_BASE_FISH + 0x0000091D;	// FishDBS -> GS -> C 请求删除邮件
    public static GLFS_MailAddReq: number = MsgType.GLID_BASE_FISH + 0x0000091E;	// GS -> FishDBS 请求添加邮件
    public static GLFS_MailAddAck: number = MsgType.GLID_BASE_FISH + 0x0000091F;	// FishDBS -> GS 请求添加邮件的回复
    public static GLFS_ClearCustomData: number = MsgType.GLID_BASE_FISH + 0x00000920;	// GS->FishDBS 仅供测试使用：清空某个用户的个性数据信息
    // 这个消息只有在debug版的FishGameDB中才会处理，这个消息会清空该玩家的邮件、排名、历史排名等信息
    public static GLFS_UnreadMailACK: number = MsgType.GLID_BASE_FISH + 0x00000921;	// GS->C 未读邮件通知客户端


    //======================================================================================================================================================================
    //【扩展游戏】
    //======================================================================================================================================================================
    public static GLFS_RaceGameStartACK: number = MsgType.GLID_BASE_FISH + 0x408;	// S->C 通知赛鱼开始
    public static GLFS_RaceGameBetREQ: number = MsgType.GLID_BASE_FISH + 0x409;	// C->S 押注
    public static GLFS_RaceGameBetACK: number = MsgType.GLID_BASE_FISH + 0x410;	// S->C 通知单独的一个人押注更新
    public static GLFS_RaceGameBetOver: number = MsgType.GLID_BASE_FISH + 0x411;	// S->C 服务器押注时间到时,通知所有人哪条鱼会赢
    public static GLFS_RaceGameBetResult: number = MsgType.GLID_BASE_FISH + 0x412;	// S->C 服务器押注信息
    public static GLFS_RaceGameSeedACK: number = MsgType.GLID_BASE_FISH + 0x418;	// S->C 服务器下发RaceGame验证种子




    //======================================================================================================================================================================
    //【金鲨来袭】
    //======================================================================================================================================================================
    public static GLFS_SharkGameStartACK: number = MsgType.GLID_BASE_FISH + 0x413;	// S->C 金鲨逆袭开始
    public static GLFS_SharkGameResultACK: number = MsgType.GLID_BASE_FISH + 0x414;	// S->C 金鲨逆袭结果


    public static GLFS_SharkGameProgressACK: number = MsgType.GLID_BASE_FISH + 0x415;	// S->C 金鲨逆袭中鲨鱼被击中的进度

    public static GLFS_ShoalFishStartACK: number = MsgType.GLID_BASE_FISH + 0x416;	// S->C 增加鱼群队列开始消息(客户端用于显示金鲨逆袭倒计时)
    public static GLFS_SharkGamePhaseTimeACK: number = MsgType.GLID_BASE_FISH + 0x417;	// S->C 增加金鲨逆袭中显示阶段消息(客户端用于显示金鲨颜色)
    public static GLFS_SharkGameSendBadgeACK: number = MsgType.GLID_BASE_FISH + 0x420;  //(金鲨升级) S->C 服务器向Flash客户端下发“徽章中奖”的报文

    public static GLFS_SharkGameCostChampionACK: number = MsgType.GLID_BASE_FISH + 0x421;	// S->C 服务器向Flash客户端下发“成本回收期30秒消费冠军”的报文

    //======================================================================================================================================================================
    //【聊天】
    //======================================================================================================================================================================

    public static GLFS_ChatNotifyMessage: number = MsgType.GLID_BASE_FISH + 0x271;	 // C->S S->C 聊天通知消息(动态流)


    //add by zhengyu

    //======================================================================================================================================================================
    //【鱼币  炮弹 结算 分离】
    //======================================================================================================================================================================
    public static GLFS_UserCheckOutACK: number = MsgType.GLID_BASE_FISH + 0x282;	 // C->S 聊天通知消息(动态流)

    public static GLFS_UserCheckOutREQ: number = MsgType.GLID_BASE_FISH + 0x281;	 // S->C 聊天通知消息(动态流)

    public static GLFS_KeepOnGameREQ: number = MsgType.GLID_BASE_FISH + 0x283;	 // C->S   继续请求

    public static GLFS_KeepOnGameACK: number = MsgType.GLID_BASE_FISH + 0x284;	 // C->S   继续请求
    //======================================================================================================================================================================
    //【增加服务器通知消息消息】
    //======================================================================================================================================================================
    public static GLFS_NotifyMessage: number = MsgType.GLID_BASE_FISH + 0x257;	// S->C 服务器下发通知消息


    public static GLFS_RequestCheckAchievement: number = MsgType.GLID_BASE_FISH + 0x00000501;	//C->S 请求验证成就



    //======================================================================================================================================================================
    //【比赛系统】
    //======================================================================================================================================================================
    //public static  GLFS_MatchGameInit				:number = MsgType.GLID_BASE_FISH + 0x00000260;	// S->C 第一次进入比赛游戏时的通知消息



    //		public static  GLFS_MGStateChange				:number = MsgType.GLID_BASE_FISH + 0x00000257;	// S->C 比赛状态变化
    //		
    //		public static  GLFS_MGCheckOut				:number = MsgType.GLID_BASE_FISH + 0x00000258;		// S->C 比赛结果
    //		
    //		public static  GLFS_ItemNotify				:number = MsgType.GLID_BASE_FISH + 0x00000270;	// S->C 广播玩家道具信息
    //		
    //		public static  GLFS_MGCoinNotify				:number = MsgType.GLID_BASE_FISH + 0x00000259;		// S->C 玩家积分
    //
    //		public static  GLFS_UseItem				:number = MsgType.GLID_BASE_FISH + 0x00000272;		//// C->S 玩家使用道具
    //
    //		public static  GLFS_MGPlayerInfo				:number = MsgType.GLID_BASE_FISH + 0x00000273;		// S->C 下发所有玩家(比赛玩家信息);

    /**
     * 请求改变锁定状态 
     */
    public static GLFS_CommonLockFishReq: number = MsgType.GLID_BASE_FISH + 0x965;
    /**
     * 改变锁定状态 的广播
     */
    public static GLFS_CommonLockFishAck: number = MsgType.GLID_BASE_FISH + 0x966;

    /**
     * 请求锁定某条鱼
     */
    public static GLFS_CommonLockInstanceReq: number = MsgType.GLID_BASE_FISH + 0x967;
    /**
     * 某玩家锁定某条鱼的广播
     */
    public static GLFS_CommonLockInstanceAck: number = MsgType.GLID_BASE_FISH + 0x968;


    /**
     *  C->S客户端请求服务器检查购买炮弹情况
     */
    public static GLFS_CheckBuyBulletREQ: number = MsgType.GLID_BASE_FISH + 0x257;

    /**
     *  翻倍模式 投注值的配置信息
     */
    public static GLFS_BettingValueForBombACK: number = MsgType.GLID_BASE_FISH + 0x962;
    /**
     *  每种鱼对应翻的倍数配置信息
     */
    public static GLFS_DoubleTimesForFishACK: number = MsgType.GLID_BASE_FISH + 0x963;
    /**
     *  翻倍分数提示配置信息
     */
    public static GLFS_ScorePromptACK: number = MsgType.GLID_BASE_FISH + 0x964;
    /**
     * 特殊鱼倍数信息 
     */
    public static GLFS_SpecialTimesFishConfigAck: number = MsgType.GLID_BASE_FISH + 0x427;
    /**
     *  C->S :通知服务端读取数据库里面玩家当前任务列表
     */
    public static GLFS_NoviceGuideTaskProcessAck: number = MsgType.GLID_BASE_FISH + 0x424;
    /**
     *  C->S :通知服务端读取数据库里面玩家当前任务列表
     */
    public static GLFS_UpdateUserAchievementArrayReq: number = MsgType.GLID_BASE_FISH + 0x425;
    /**
     *  C->S :步步为赢邮件通知
     */
    public static GLFS_QuoridorMailNoticeReq: number = MsgType.GLID_BASE_FISH + 0x426;


    /**
     * S->C :彩金池变化 
     */
    public static GLFS_RefreshHandselPrizePoolAck: number = MsgType.GLID_BASE_FISH + 0x985;

    /**
     * S->C :赢得彩金 
     */
    public static GLFS_HandselGameResultAck: number = MsgType.GLID_BASE_FISH + 0x986;

    /**
     * C->S :请求彩金中奖信息数据 
     */
    public static GLFS_UserHandselInfosRankReq: number = MsgType.GLID_BASE_FISH + 0x987;

    /**
     * S->C :彩金中奖信息 
     */
    public static GLFS_UserHandselInfosRankAck: number = MsgType.GLID_BASE_FISH + 0x988;

    /**
     * c->s :内部接入ID 
     */
    public static GLFS_OurGameInnerGameMarkReq: number = MsgType.GLID_BASE_FISH + 0xA13;

    //======================================================================================================================================================================
    //【新增体验馆】
    //======================================================================================================================================================================

    /**
     * S->C :免费炮弹打光
     */
    public static GLFS_NoTrialBulletACK: number = MsgType.GLID_BASE_FISH + 0x428;

    /**
     * S->C :步步为赢的投骰子数量刷新
     */
    public static GLFS_AddSbsStarACK: number = MsgType.GLID_BASE_FISH + 0x429;

    /**
     *  S->C 步步下次触发星星剩余次数(任务类型更新)
     */
    public static GLFS_AddSbsLeftTimesACK: number = MsgType.GLID_BASE_FISH + 0x42A;

    //======================================================================================================================================================================
    //【海岛服务器】
    //======================================================================================================================================================================
    //		/**
    //		 * 获取彩金榜请求 
    //		 */	
    //		public static  GLFS_QuerySGHandselRankReq: number = MsgType.GLID_BASE_FISH + 0x994;
    /**
     * 返回步步为赢所有配置
     */
    public static GLFS_QueryAllSbsGameConfAck: number = MsgType.GLID_BASE_FISH + 0x995;
    /**
     * 服务器人数 
     */
    public static GLFS_QueryCurNOPACK: number = MsgType.GLID_BASE_FISH + 0x998;
    /**
     * 小游戏播报内容 
     */
    public static GLFS_SGBroadCastACK: number = MsgType.GLID_BASE_FISH + 0x99B;

    /**
     * 登陆海岛通知服务器Username 
     */
    public static GLFS_FishIslandRegistMailOBReq: number = MsgType.GLID_BASE_FISH + 0x9A2;
    /**
     * 服务器返回未读邮件数量 
     */
    public static GLFS_FishIslandRegistMailOBAck: number = MsgType.GLID_BASE_FISH + 0x9A3;

    //=======================================================================================
    //=====================================new===============================================
    //=======================================================================================

    /**登陆 */
    public static R_LOGIN: number = MsgType.REQ_BASE + 1;
    public static A_LOGIN: number = MsgType.ACK_BASE + 1;


    /**步步为营-信息 */
    public static R_DICE_INFO: number = MsgType.REQ_BASE + 10;
    public static A_DICE_INFO: number = MsgType.ACK_BASE + 10;


    /**巨奖池 */
    public static A_GAME_POOL: number = MsgType.REQ_BASE + 100;
}
