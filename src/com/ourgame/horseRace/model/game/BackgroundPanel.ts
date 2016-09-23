/**背景 */
class BackgroundPanel extends egret.Sprite implements IBase {

	/**赛道 */
	private trackGroup: ImageGroup;;
	/**近景背景 */
	private image1Group: ImageGroup;
	/**远景背景 */
	private image2Group: ImageGroup;
	/**天空背景 */
	private image3Group: ImageGroup;



	public constructor() {
		super();
		this.image3Group = new ImageGroup(this, "bg_image3_png");
		this.image2Group = new ImageGroup(this, "bg_image2_png", 70);
		this.image1Group = new ImageGroup(this, "bg_image1_png", 24);
		this.trackGroup = new ImageGroup(this, "bg_track_png", 187 - 37);
	}

	public enter(data?: any): void {
		this.image1Group.enter();
		this.image2Group.enter();
		this.image3Group.enter();
		this.trackGroup.enter();
	}

	public exit(): void {
		this.image1Group.exit();
		this.image2Group.exit();
		this.image3Group.exit();
		this.trackGroup.exit();
	}

	public execute(data?: any): void {
		this.image1Group.execute(data);
		this.image2Group.execute(data * 0.3);
		this.image3Group.execute(0);
		this.trackGroup.execute(data);
	}


}