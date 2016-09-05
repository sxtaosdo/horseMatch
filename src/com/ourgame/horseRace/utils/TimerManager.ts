class TimerManager {
    private static _instance: TimerManager;

    private _shape: egret.Shape = new egret.Shape();
    private _pool: Array<TimerHandler> = new Array<TimerHandler>();
    private _handlers: Object = new Object();
    private _currTimer: number = egret.getTimer();
    private _currFrame: number = 0;
    private _count: number = 0;
    private _index: number = 0;

    public constructor() {
        this._shape.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private onEnterFrame(e: Event): void {
        this._currFrame++;
        this._currTimer = egret.getTimer();
        var k: any;
        for (k in this._handlers) {
            if (k != "undefined") {
                var handler: TimerHandler = this._handlers[k];
                var t: number = handler.userFrame ? this._currFrame : this._currTimer;
                if (t >= handler.exeTime) {
                    var method: Function = handler.method;
                    var args: Array<any> = handler.args;
                    if (handler.repeat) {
                        while (t >= handler.exeTime && k in this._handlers) {
                            handler.exeTime += handler.delay;
                            method.apply(handler.thisObj, args);

                        }
                    }
                    else {
                        method.apply(handler.thisObj, args);
                        this.clearTimer(k);
                    }
                }
            } else {
                //                egret.Logger.info(k);
                console.log(k);
            }
        }
    }

    private create(useFrame: boolean, repeat: boolean, delay: number, method: Function, thisObj: any = null, args: Array<any> = null, cover: boolean = true): any {
        var key: any;
        if (cover) {
            //先删除相同函数的计时
            this.clearTimer(method);
            key = method;
        }
        else {
            key = this._index++;
        }

        //如果执行时间小于1，直接执行
        if (delay < 1) {
            method.apply(null, args)
            return -1;
        }
        var handler: TimerHandler = this._pool.length > 0 ? this._pool.pop() : new TimerHandler();
        handler.userFrame = useFrame;
        handler.repeat = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.thisObj = thisObj;

        handler.args = args;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
        this._handlers[key] = handler;
        this._count++;
        return key;
    }

    /**定时执行一次
     * @params	delay  延迟时间(单位毫秒)
     * @params	method 结束时的回调方法
     * @params	args   回调参数
     * @params	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
    public doOnce(delay: number, method: Function, thisObj: any = null, args: Array<any> = null, cover: boolean = true): any {
        return this.create(false, false, delay, method, thisObj, args, cover);
    }

    /**定时重复执行
     * @params	delay  延迟时间(单位毫秒)
     * @params	method 结束时的回调方法
     * @params	args   回调参数
     * @params	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
    public doLoop(delay: number, method: Function, thisObj: any = null, args: Array<any> = null, cover: boolean = true): any {
        return this.create(false, true, delay, method, thisObj, args, cover);
    }

    /**定时执行一次(基于帧率)
     * @params	delay  延迟时间(单位为帧)
     * @params	method 结束时的回调方法
     * @params	args   回调参数
     * @params	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
    public doFrameOnce(delay: number, method: Function, thisObj: any = null, args: Array<any> = null, cover: boolean = true): any {
        return this.create(true, false, delay, method, thisObj, args, cover);
    }

    /**定时重复执行(基于帧率)
     * @params	delay  延迟时间(单位为帧)
     * @params	method 结束时的回调方法
     * @params	args   回调参数
     * @params	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，否则返回唯一ID，均用来作为clearTimer的参数*/
    public doFrameLoop(delay: number, method: Function, thisObj: any = null, args: Array<any> = null, cover: boolean = true): any {
        return this.create(true, true, delay, method, thisObj, args, cover);
    }

    /**定时器执行数量*/
    public get count(): number {
        return this._count;
    }

    /**清理定时器
     * @params	method 创建时的cover=true时method为回调函数本身，否则method为返回的唯一ID
     */
    public clearTimer(method: any): void {
        var handler: TimerHandler = this._handlers[method];
        if (handler != null) {
            delete this._handlers[method];
            handler.clear();
            this._pool.push(handler);
            this._count--;
        }
    }

    public destroy(): void {
        this._shape.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    /**
     * 方法是否在定时器的队列中
     */
    public running(method: any): boolean {
        if (this._handlers[method] != null) {
            return true;
        }
        return false;
    }

    /**
     * 通过方法名删除定时器
     * @params fun
     */
    public clearTimerByFun(fun: Function): void {
        this.clearTimer(fun);
        //			for each (var item:TimerHandler in _handlers)
        //			{
        //				if (item.method == fun)
        //				{
        //					delete _handlers[item.method];
        //					item.clear();
        //					_pool.push(item);
        //					_count--;
        //					return;
        //				}
        //			}
    }

    public static get instance(): TimerManager {
        if (TimerManager._instance == null) {
            TimerManager._instance = new TimerManager();
        }
        return TimerManager._instance;
    }

}
class TimerHandler {
    /**执行间隔*/
    public delay: number = 0;
    /**是否重复执行*/
    public repeat: boolean;
    /**是否用帧率*/
    public userFrame: boolean;
    /**执行时间*/
    public exeTime: number = 0;
    /**处理方法*/
    public method: Function;
    /**参数*/
    public args: Array<any>;
    /**this对象 */
    public thisObj: any;

    /**清理*/
    public clear(): void {
        this.method = null;
        this.args = null;
        this.thisObj = null;
    }
}


