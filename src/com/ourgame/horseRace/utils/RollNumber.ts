class RollNumber {
    /**
     * 回调
     */
    private callBackFun: Function;
    private target: any;
    /**
     * 是否清0
     */
    private isClear: boolean;
    /**
     * 速度
     */
    private speed: number = 2;
    private myArray: number = 0;
    private isDecimal: boolean;
    private tween: TweenLite;

    /**
     * @param callBack 每次更新的回调
     * @param speed 速度
     * @param isDecimal 是否支持小数
     */
    public constructor(callBack: Function,call: any,speed?: number,isDecimal?: boolean) {
        //        TweenPlugin.activate([EndArrayPlugin]);
        this.isDecimal = isDecimal;
        this.callBackFun = callBack;
        this.myArray = 0;
        this.speed = speed ? speed : 2;
        this.target = call;
        //			tween=new TweenLite(myArray, speed, {autoPlay: false});
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public setNumber(value: number): void {
                TweenLite.to(this,this.speed,{ myArray: value,onUpdate: this.updateHandler,onUpdateParams: [this] });
//        egret.Tween.get(this,{ onChange: this.updateHandler,onChangeObj: this }).to({ myArray: value },this.speed).play();
    }

    public getNumber(): number {
        return this.myArray;
    }

    private updateHandler(self: RollNumber): void {
        if(self.isDecimal) {
            self.callBackFun(self.myArray);
        }
        else {
            self.callBackFun(Math.round(self.myArray));
        }
    }
}