/**
 * 平台接口，关于平台方法
 */
interface IPlatform extends INative {
	/**
	 * 充值
	 */
    recharge(data?: any): void;
	/**
	 * 分享
	 */
	share(data?: any): void;
}