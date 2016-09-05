class BaseGameEntity {

	private static index: number = 0;

	protected stateMachine: StateMachine;

	public sid: string;
	public name: string;
	public entityType: number;
    public displayObject: egret.DisplayObject;
	public isDestroy: boolean;
	public EntityType:number;
	

	public constructor() {
		this.sid = BaseGameEntity.index + "";
		BaseGameEntity.index++;
	}
}