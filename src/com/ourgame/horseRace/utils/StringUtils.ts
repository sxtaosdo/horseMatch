class StringUtils {
    /**
     * 截取字符，中文算2格，英文算1格
     * @param   str
     * @param   length
     * @return
     */
    public static cutStr(str: string = "",length: number = 6): string {
        var res: string = "";
        var i: number = 0;
        var n: number = 0;
        var str_length: number = 0;
        while(i < str.length && n < length * 2) {
            if(str.charCodeAt(i) > 192) {
                n = n + 2;
            }
            else {
                n++;
            }
            res += str.charAt(i);
            i++;
        }
        if(res.length < str.length) {
            res += "...";
        }
        return res;
    }
		
    /**
     * 三位分节法   1,000
     * @param value
     * @return
     * Edit by aj
     */
    public static numSection(value: number = 0): string {
        var numStr: string = value.toString();  //金额转换为字符格式
        var newStr: string = "";                 //金额转换为加分隔符的字符格式
        for(var i: number = 0;i < numStr.length;i++) {
            if(((numStr.length - i) % 3 == 0) && i != 0) {
                newStr = newStr + ",";
            }
            newStr = newStr + numStr.charAt(i);
        }
        return newStr;
    }

    /**
     * 数字转换显示：13034555600 =》30亿3455万<br/>
     * 规则4：有亿则不显示个位数，   例：13034555600   规则：130亿3455万<br/>
     * 无亿则显示万和个位数，  例：1303455  规则：130万3455
     */
    public static getStrByUnits(money: number): string {
        if(money <= 0)
            return "0";

        var yi: number = money / 100000000;
        var wan: number = (money % 100000000) / 10000;
        var ge: number = money % 10000;

        var backStr: string = "";
        if(yi != 0)
            backStr = backStr + yi + "亿";
        if(wan != 0)
            backStr = backStr + wan + "万";
        if(yi == 0 && ge != 0)
            backStr = backStr + ge;

        return backStr;
    }
		
		
    /**
     * 随机一个汉字
     * @return 
     */
   public static randomChinese(): string {
       return String.fromCharCode(Math.floor(Math.random() * (0x9000 - 0x5000)) + 0x5000);
   }
}