class RandomUtil extends egret.HashObject {

	public constructor() {
		super();
	}

	public static randNumber(min: number, max: number): number {
		return min + Math.random() * (max - min);
	}

	/**
	 * ForDight(Dight,How):数值格式化函数，Dight要格式化的 数字，How要保留的小数位数。
	 * 这里的方法是先乘以10的倍数，然后去掉小数，最后再除以10的倍数。
	 */
	public static randInt(min: number, max: number): number {
		return min + Math.round(Math.random() * (max - min));
	}

	public static randColor(): number {
		return Math.random() * 0x666666;
	}

	public static randPt(x0: number, y0: number, x1: number, y1: number): egret.Point {
		return new egret.Point(x0 + Math.random() * (x1 - x0), y0 + Math.random() * (y1 - y0));
	}

}

