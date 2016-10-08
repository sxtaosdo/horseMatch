class HttpService implements ISocket {

	private static passTime: number = 25;

	private call: Function;
	private callThis: any;

	private data: any;
	private globalTime: number = HttpService.passTime;

	public constructor(callback?: Function, callThis?: any) {
		this.call = callback;
		this.callThis = callThis;
		if (ConfigModel.instance.debug) {
			RES.getResAsync("tempContent_json", (e) => {
				this.data = e;
				ConnectionManager.instance.sendHelper.gameInfo();
			}, this);
		}
		TimerManager.instance.doLoop(1000, this.onTimer, this);
	}

	private onTimer(): void {
		if (this.globalTime > 60) {
			this.globalTime = HttpService.passTime;
		}
		this.globalTime++;
	}

	public conn(ip: string, port: number): void {

	}

    public send(type: any, byts?: any): void {
		// console.log("HttpService收到消息：" + type);

		switch (type) {
			case "/hrb/draw":
				var temp: string = type;
				if (type.lastIndexOf("/") > -1) {
					temp = type.substr(temp.lastIndexOf("/") + 1);
				}
				var data: any = this.data[type];
				if (data) {
					if (data.cdTime) {
						data.cdTime = (30 - this.globalTime) * 1000;
					}
					if (data.leftTime) {
						data.leftTime = (60 - this.globalTime) * 1000;
					}
					data.matchInfo.forEach(element => {
						// let key: any;
						// for (key in ClientModel.instance.operationObj) {
						// 	if (element.hId == (key + 1)) {
						// 		element.bet = ClientModel.instance.operationObj[key+1];
						// 	}
						// }
						if (ClientModel.instance.operationObj[element.hId-1]) {
							element.bet = ClientModel.instance.operationObj[element.hId-1];
						}
					});
					let key: any
					for (key in ClientModel.instance.operationObj) {
						ClientModel.instance.operationObj[key] = 0;
					}
					try {
						// console.log("server time:" + this.globalTime + "\t type:" + type + "\t this.callThis:" + this.callThis + "\t" + egret.getTimer());
						this.call.apply(this.callThis, [temp, data]);
					} catch (e) {
						console.error(e);
					}
				}
				break;
			default:
				var temp: string = type;
				if (type.lastIndexOf("/") > -1) {
					temp = type.substr(temp.lastIndexOf("/") + 1);
				}
				var data: any = this.data[type];
				if (data) {
					if (data.cdTime) {
						data.cdTime = (30 - this.globalTime) * 1000;
					}
					if (data.leftTime) {
						data.leftTime = (60 - this.globalTime) * 1000;
					}
					this.call.apply(this.callThis, [temp, data]);
				}
				break;
		}

	}

    public isConnected(): boolean {
		return true;
	}

    public close(): void {

	}
}