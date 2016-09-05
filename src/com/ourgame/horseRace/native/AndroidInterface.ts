/**
 * 安卓平台实现
 * @author sxt
 *
 */
class AndroidInterface implements INative{
    
	public constructor() {
    	
	}
	
	public closeApp(data?:any):void{
        egret.ExternalInterface.call("2N","quit");
        console.log("执行了条用外部方法：退出应用");
	}
	
    public recharge(data?: any): void {

    }

    public scan(data?: any): void {
        egret.ExternalInterface.call("2N","scan");
        console.warn("执行了条用外部方法:扫码");
    }
    
    public onSocketClose(data?: any): void {
        ClientModel.instance.openAlert(2);
    }
    
    public onLoadeBegin(data?:any):void{
        
    }
    
    public onLoadeComplete(data?:any):void{
        
    }
    
    public  onLoadeError(data?:any):void{
        
    }

    public callfunction(data?: any): void {
        
    }

    public onInitComplete(data?: any): void {
        
    }
}
