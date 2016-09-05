/**
 *
 * @author sxt
 *
 */
class ButtonUtils {

    public constructor() {
    }
	
	/**
	 * 模拟点击
	 */
    public static simulateClick(btn: any): void {
        if((btn != null)) {
            btn.currentState = "down";
            // TimerManager.instance.doOnce(100,function(btn: eui.Button,state: string): void { btn.currentState = state },[btn,"up"],true);
        }
    }
}
