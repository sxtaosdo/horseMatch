class HttpService implements ISocket {

	private call: Function;
	private callThis: any;

	private data: any;
	private globalTime: number = 10;

	public constructor(callback?: Function, callThis?: any) {
		this.call = callback;
		this.callThis = callThis;
		if (ConfigModel.instance.debug) {
			RES.getResAsync("tempContent_json", (e) => {
				this.data = e;
			}, this);
		}
		TimerManager.instance.doLoop(1000, this.onTimer, this);
	}

	private onTimer(): void {
		if (this.globalTime > 60) {
			this.globalTime = 0;
		}
		this.globalTime++;
	}

	public conn(ip: string, port: number): void {

	}

    public send(type: any, byts?: any): void {
		switch (type) {
			default:
				var temp: string = type;
				if (type.lastIndexOf("/") > -1) {
					temp = type.substr(temp.lastIndexOf("/") + 1);
				}
				var data: any = this.data[type];
				if (data.cdTime) {
					data.cdTime = (30 - this.globalTime) * 1000;
				}
				if (data.leftTime) {
					data.leftTime = (60 - this.globalTime) * 1000;
				}
				this.call.apply(this.callThis, [temp, data]);
				break;
		}
	}

    public isConnected(): boolean {
		return true;
	}

    public close(): void {

	}
}