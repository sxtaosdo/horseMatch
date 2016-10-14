/**
 *
 * @author 
 *
 */
interface INative {
    /**
     * 关闭应用程序
     */ 
    closeApp(data?:any): void;
    /**
     * 扫码
     */ 
    scan(data?:any):void;
    /**
     * socket断开
     */ 
    onSocketClose(data?:any):void;
    /**
     * 加载资源开始
     */
    onLoadeBegin(data?:any):void;
    /**
     * 加载资源完成
     */
    onLoadeComplete(data?:any):void;
    /**
     * 加载资源失败
     */
    onLoadeError(data?:any):void;
    /**
     * 调用外部接口
     */
    callfunction(data?:any):void;
    /**
     * 小游戏初始化完毕
     */
    onInitComplete(data?:any):void;
}
