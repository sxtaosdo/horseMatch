class ResultVo {
    public id: number;
    public rank: number;
    public name: string;
    public award: number;
    public bet: number;
    public double: number;

    public constructor(data?: any) {
        if (data) {
            this.setDate(data);
        }
    }

    public setDate(data: any): void {
        this.id = data.hId;
        this.rank = data.rank;
        this.name = ConfigModel.instance.horseList[data.hId - 1].name;
        this.double = data.odds;
    }

    /**投注金额 */
    public setBetData(money: number): void {
        if (money) {
            this.award = money;
            this.bet = money;
        } else {
            this.award = 0;
            this.bet = 0;
        }
    }
}