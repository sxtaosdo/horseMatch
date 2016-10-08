/**
 *
 * @author 
 *
 */
class MessageDispatcher {
    private static _instance: MessageDispatcher;
    private SEND_MSG_IMMEDIATELY: number = 0;
    private NO_ADDITIONAL_INFO: number = 0;
    private PriorityQ: TreeSet<Telegram>;
    private showList: Array<Telegram>;

    public constructor() {
        this.PriorityQ = new TreeSet<Telegram>();
        this.showList = new Array<Telegram>();
    }

    public static get instance(): MessageDispatcher {
        if (this._instance == null) {
            this._instance = new MessageDispatcher();
        }
        return this._instance;
    }
    /**
     * 设置用作延迟消息的容器由于自动分类和避免的好处重复的。
     * 消息按他们的调度时间进行排序。
     */


    /**
     * 这种方法是通过向窗口发送消息或dispatchdelayedmessages利用。
     * 此方法调用接收的消息处理成员函数实体，空，与新创建的电报
     */
    public Discharge(pReceiver: IBaseGameEntity, telegram: Telegram): void {
        this.showList.push(telegram);
        if (!pReceiver.handleMessage(telegram)) {
            // console.log("消息被处理,Receiver：" + EntityManager.instance.GetEntityFromID(telegram.Receiver).property.name);
        }
    }

    public get showListData(): Array<Telegram> {
        return this.showList;
    }

    /**
     * send a message to another agent. Receiving agent is referenced by ID.
     * 发送消息到另一个代理。接收代理是由身份证引用。
     */
    public DispatchMessage(delay: number, sender: string, receiver: string, msg: number, info: any = null): void {
        //        View.instance.addText(BACKGROUND_RED | FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
        var pSender: IBaseGameEntity = EntityManager.instance.getEntityFromID(sender);
        var pReceiver: IBaseGameEntity = EntityManager.instance.getEntityFromID(receiver);
        if (pReceiver == null) {
            console.warn("\nWarning! No Receiver with ID of " + receiver + " found");
            return;
        }
        //create the telegram
        var telegram: Telegram = new Telegram(0, sender, receiver, msg, info);
        //if there is no delay, route telegram immediately                       
        if (delay <= 0.0) {
            //            console.log("\nInstant telegram dispatched at time: " + egret.getTimer()+" by " + GetNameOfEntity(pSender ->ID()) + " for " + GetNameOfEntity(pReceiver ->ID())+ ". Msg is " + MsgToStr(msg);
            //send the telegram to the recipient
            this.Discharge(pReceiver, telegram);
        } else {
            telegram.DispatchTime = egret.getTimer();
            this.PriorityQ.add(telegram);
        }
        //        console.log("\nDelayed telegram from " + GetNameOfEntity(pSender ->ID()) + " recorded at time "+ Clock ->GetCurrentTime() + " for " + GetNameOfEntity(pReceiver ->ID())+ ". Msg is " + MsgToStr(msg));

    }

    /**
     * 发送任何延迟的消息。这种方法被称为每一次通过
     * 主游戏循环。
     */
    public DispatchDelayedMessages(): void {
        while ((!this.PriorityQ.isEmpty) && (this.PriorityQ.first.DispatchTime <= egret.getTimer()) && (this.PriorityQ.first.DispatchTime > 0)) {
            var telegram: Telegram = this.PriorityQ.first;
            var pReceiver: IBaseGameEntity = EntityManager.instance.getEntityFromID(telegram.Receiver);

            this.Discharge(pReceiver, telegram);
            this.PriorityQ.remove(this.PriorityQ.first);
        }
    }

    public DispatchSimpleMessage(sender: IBaseGameEntity, receiver: IBaseGameEntity, info: any = null): void {
        var pSender: IBaseGameEntity = sender;
        var pReceiver: IBaseGameEntity = receiver;
        if (pReceiver == null) {
            console.warn("\nWarning! No Receiver with ID of " + receiver + " found");
            return;
        }
        var telegram: Telegram = new Telegram(0, pSender.sid, receiver.sid, 0, info);
        // console.log("[" + DateUtils.s2d(telegram.time) + "]" + (<SkillEntity>sender).source.name + " 对" + receiver.property.name + " 使用了 " + (<SkillEntity>sender).name + "\t造成伤害:" + (<SkillEntity>sender).damageHurt);
        this.Discharge(pReceiver, telegram);

    }
}
