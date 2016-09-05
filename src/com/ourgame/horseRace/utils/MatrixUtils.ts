class MatrixUtils {

	/**增加亮度 */
	public static colorMatrix = [
		1, 0, 0, 0, 100,
		0, 1, 0, 0, 100,
		0, 0, 1, 0, 100,
		0, 0, 0, 1, 0
	];

	/** 颜色值由下面的公式决定：
	*redResult   = (a[0] * srcR)  + (a[1] * srcG)  + (a[2] * srcB)  + (a[3] * srcA)  + a[4];
	*greenResult = (a[5] * srcR)  + (a[6] * srcG)  + (a[7] * srcB)  + (a[8] * srcA)  + a[9];
	*blueResult  = (a[10] * srcR) + (a[11] * srcG) + (a[12] * srcB) + (a[13] * srcA) + a[14];
	*alphaResult = (a[15] * srcR) + (a[16] * srcG) + (a[17] * srcB) + (a[18] * srcA) + a[19];
	*/
	/**
	 * 绿色加倍 
	 * 如果想使绿色通道加倍,colorMatrix[6] 加倍即可：
	 * */
	public static greenx2 = [
		1, 0, 0, 0, 0,
		0, 2, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0
	]
	/**
	 * 红色偏移量
	 * 在颜色矩阵中直接设置每一行中最后一个值即可设置偏移量
	 *  */
	public static red = [
		1, 0, 0, 0, 100,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0
	]

	/**
	 * 红色决定蓝色值
	 * 如果你要使结果图像中的蓝色与原图的红色数量相等，将colorMatrix[10]设为1， colorMatrix[12]设为0 ,即结果的蓝色值完全由原始的红色值决定：
	 */
	public static change = [
		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 2, 0, 0,
		0, 0, 0, 1, 0
	];

	/**模糊滤镜 */
	public static get blurFliter(): egret.BlurFilter {
		return new egret.BlurFilter(1, 1);
	}
}