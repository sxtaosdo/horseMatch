
class GameDispatcher extends egret.EventDispatcher {
    private static _instance: GameDispatcher;
    private static evtMap: any = new Object(); //对象池

    public constructor() {
        super(null);
    }

    public static get instance(): GameDispatcher {
        if(GameDispatcher._instance == null) {
            GameDispatcher._instance = new GameDispatcher();
        }
        return GameDispatcher._instance;
    }

    public static send(event: any): void {
        if(event instanceof egret.Event) {
            GameDispatcher.instance.dispatchEvent(event);
        }
        else {
            if(GameDispatcher.evtMap[event] == null) {
                GameDispatcher.evtMap[event] = new egret.Event(event);
            }
            GameDispatcher.instance.dispatchEvent(GameDispatcher.evtMap[event]);
        }
    }

    public static addEventListener(type: string,callback: Function,self:any): void {
        GameDispatcher.instance.addEventListener(type,callback,self);
    }

    public static removeEventListener(type: string,callback: Function,self:any): void {
        GameDispatcher.instance.removeEventListener(type,callback,self);
    }
}
