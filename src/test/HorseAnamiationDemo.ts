class HorseAnamiationDemo extends egret.Sprite {
    private horseMcList: Array<any>;

    public constructor() {
        super();
        this.init();
        this.run();
    }

    private init(): void {
        this.horseMcList = new Array<any>();
        for (let i: number = 0; i < 5; i++) {
            let dragonbonesData = RES.getRes("donghua" + 4 + "_json");
            let textureData = RES.getRes("texture" + 4 + "_json");
            let texture = RES.getRes("texture" + 4 + "_png");

            if (dragonbonesData) {
                let dragonbonesFactory = new dragonBones.EgretFactory();
                dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
                dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

                let armature = dragonbonesFactory.buildArmature(AnimationType.IDEL);
                dragonBones.WorldClock.clock.add(armature);
                armature.animation.gotoAndPlay(AnimationType.IDEL);

                // this.armature = this.dragonbonesFactory.buildArmature("armatureName");
                // dragonBones.WorldClock.clock.add(this.armature);
                // this.armature.animation.gotoAndPlay(AnimationType.IDEL);

                this.horseMcList.push(dragonbonesFactory);
                armature.display.x = i * 100;
                this.addChild(armature.display);
            }
        }
        TimerManager.instance.doFrameLoop(1, () => {
            dragonBones.WorldClock.clock.advanceTime(-1);
        }, this);
    }

    private run(): void {
        TimerManager.instance.doFrameLoop(1, () => {

        }, this)


    }
}