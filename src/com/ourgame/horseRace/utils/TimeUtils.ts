class TimeUtils {
    /**
     * 获取时间戳
     */
    public static timestampDate(): any {
        return Math.round(new Date().getTime() / 1000);
    }

    public static get printTime(): string {
        return (TimeUtils.formatDate(TimeUtils.timestampDate()));
    }

    /**
     *  时间戳转换时间
     */
    public static formatDate(Num): any {

        var Day = new Date(parseInt(Num) * 1000).toLocaleTimeString().replace("上午", '').replace("下午", '').replace(":", '').replace(":", '');
        var DayBy = new Date(parseInt(Num) * 1000).toLocaleTimeString().replace("上午", '').replace("下午", '');
        var DayDal = new Date(parseInt(Num) * 1000).toLocaleTimeString();
        var Text = DayDal.substr(0, 1);
        var DayA = Day;
        var DayB = Day;
        var DayC = Day;
        var DayH;
        var DayM;
        var DayS;
        var DateDal = new Date(parseInt(Num) * 1000).toLocaleDateString().replace(/\//gi, '-');


        if (Text == "下") {
            for (var i = 0; i < 4; i++) {
                DayA = DayA.substring(0, DayA.length - 1);
            }

            if (Number(DayA) >= 1 && Number(DayA) <= 9) {
                DayB = DayB.substring(1);
                for (var ic = 0; ic < 3; ic++) {
                    DayC = DayC.substring(1);
                }
            } else {
                for (var ib = 0; ib < 2; ib++) {
                    DayB = DayB.substring(1);
                }
                for (var ia = 0; ia < 4; ia++) {
                    DayC = DayC.substring(1);
                }
            }
            for (var id = 0; id < 2; id++) {
                DayB = DayB.substring(0, DayB.length - 1)
            }

            if (Number(DayA) == 12) {
                DayH = "12";
            } else {
                DayH = 12 + Number(DayA);
            }
        } else {
            for (var i = 0; i < 4; i++) {
                DayA = DayA.substring(0, DayA.length - 1);
            }

            if (Number(DayA) >= 0 && Number(DayA) <= 9) {
                DayB = DayB.substring(1);
                for (var ic = 0; ic < 3; ic++) {
                    DayC = DayC.substring(1);
                }
            } else {
                for (var ib = 0; ib < 2; ib++) {
                    DayB = DayB.substring(1);
                }
                for (var ia = 0; ia < 4; ia++) {
                    DayC = DayC.substring(1);
                }
            }
            for (var id = 0; id < 2; id++) {
                DayB = DayB.substring(0, DayB.length - 1)
            }
            if (Number(DayA) == 12) {
                DayH = "00";
            } else if (Number(DayA) >= 10 && Number(DayA) <= 11) {
                DayH = "0" + Number(DayA);
            } else {
                DayH = Number(DayA);
            }
        }
        DayM = DayB;
        DayS = DayC;
        DayBy = DateDal + " " + DayH + ":" + DayM + ":" + DayS;
        return DayBy;
    }
}