/**
 * 游戏状态
 * @author sxt
 */
class GameStateDef {
    /**
     * 未登录
     */
    public static GAME_STATE_ACCOUNT_NULL:number=0;

    /**
     * 巨奖条状态（默认）
     */
    public static GAME_STATE_LOTTERY: number = 100;
    /**
     * 游戏-普通
     */ 
    public static GAME_STATE_LOTTERY_COMMON: number = 200;
    /**
    * 游戏-free
    */ 
    public static GAME_STATE_LOTTERY_FREE: number = 250;
    /**
     * 中巨奖了
     */
    public static GAME_STATE_JP: number = 300;
    
	public constructor() {
	}
	/**
	 * 普通游戏环节
	 */ 
    public static TYPE_COMMON: number = 0;
    /**
     * freehit环节
     */ 
    public static TYPE_FREE: number = 1;
    
}
