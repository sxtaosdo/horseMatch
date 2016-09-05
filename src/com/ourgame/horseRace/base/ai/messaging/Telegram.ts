/**
 *
 * @author 
 *
 */
class Telegram implements ICompositor {
    /**
     * these telegrams will be stored in a priority queue. Therefore the >
     * operator needs to be overloaded so that the PQ can sort the telegrams
     * by time priority. Note how the times must be smaller than
     * SmallestDelay apart before two Telegrams are considered unique.
     */
    private SmallestDelay: number = 0.25;
    /**
     * the entity that sent this telegram
     */
    public Sender: string;
    /**
     * the entity that is to receive this telegram
     */
    public Receiver: string;
    /**
     * the message itself. These are all enumerated in the file
     * @see "MessageTypes.h"
     */
    public Msg: number;
    /**
     * 消息可以立即发送或延迟指定的金额时间。
     * 如果一个延迟是必要的，这个字段是加盖的时间应发送消息。
     */
    public DispatchTime: number;

    public time: number;

    public constructor(time: number, sender: string, receiver: string, msg: number, info: any = null) {
        this.Sender = sender;
        this.Receiver = receiver;
        this.Msg = msg;
        this.DispatchTime = time;
        this.time = egret.getTimer();
    }

	/**
	 * any additional information that may accompany the message
	 * 任何额外的信息，可能伴随的信息
	 */
    public ExtraInfo(): void {

    }

    public get sortSerial(): number {
        return this.DispatchTime;
    }
}
