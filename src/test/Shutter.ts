class Shutter extends egret.Sprite {
	private armature: dragonBones.Armature;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onresize, this);
		var dragonbonesData = RES.getRes("kuaimen_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

        this.armature = dragonbonesFactory.buildArmature("armatureName");
        dragonBones.WorldClock.clock.add(this.armature);
        this.armature.animation.stop();
        var dis: egret.DisplayObject = (<egret.DisplayObject>this.armature.display);
        dis.x = 630;
        dis.y = 357;
		this.addChild(this.armature.display);
		// this.armature.animation.gotoAndPlay("kuaimen");
		this.armature.animation.play("kuaimen", 999);
		TimerManager.instance.doFrameLoop(1, () => {
            dragonBones.WorldClock.clock.advanceTime(-1);
        }, this);
	}


	private onresize(): void {
		(<egret.DisplayObject>this.armature.display).scaleX = this.stage.stageWidth / this.armature.display.width;
		(<egret.DisplayObject>this.armature.display).scaleY = this.stage.stageHeight / this.armature.display.height;
	}
}