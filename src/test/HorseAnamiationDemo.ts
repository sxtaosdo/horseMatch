class HorseAnamiationDemo extends egret.Sprite {
    private static list: Array<string> = [AnimationType.IDEL, AnimationType.RUN, AnimationType.JUMP, AnimationType.FALL, AnimationType.DROWN];

    private factoryList: Array<dragonBones.EgretFactory>;
    private armatureList: Array<dragonBones.Armature>;

    private currentIndex: number = 0;

    public constructor() {
        super();
        this.init();
        this.run();
    }

    private init(): void {
        this.factoryList = new Array<dragonBones.EgretFactory>();
        this.armatureList = new Array<dragonBones.Armature>();
        for (let i: number = 1; i < 6; i++) {
            let dragonbonesData = RES.getRes("donghua" + i + "_json");
            let textureData = RES.getRes("texture" + i + "_json");
            let texture = RES.getRes("texture" + i + "_png");
            if (!dragonbonesData) {
                dragonbonesData = RES.getRes("donghua" + 4 + "_json");
                textureData = RES.getRes("texture" + 4 + "_json");
                texture = RES.getRes("texture" + 4 + "_png");
            }

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

                armature.display.x = (i + 1) * 200;
                armature.display.y = (i + 1) * 130;
                this.addChild(armature.display);

                this.factoryList.push(dragonbonesFactory);
                this.armatureList.push(armature);
            }
        }
        TimerManager.instance.doFrameLoop(1, () => {
            dragonBones.WorldClock.clock.advanceTime(-1);
        }, this);
    }

    private run(): void {
        TimerManager.instance.doLoop(3000, () => {
            if (this.currentIndex >= HorseAnamiationDemo.list.length) {
                this.currentIndex = 0;
            }
            for (let i: number = 0; i < 5; i++) {
                this.changeAnimation(i, HorseAnamiationDemo.list[this.currentIndex]);
            }
            // this.changeAnimation(0, HorseAnamiationDemo.list[this.currentIndex]);
            this.currentIndex++;
        }, this)
    }

    public changeAnimation(i: number, name: string): void {
        let armature = this.armatureList[i];
        let dragonbonesFactory = this.factoryList[i];
        if (armature) {
            dragonBones.WorldClock.clock.remove(armature);
            if (armature.display.parent) {
                armature.display.parent.removeChild(armature.display);
            }

            armature = dragonbonesFactory.buildArmature(name);
            dragonBones.WorldClock.clock.add(armature);
            armature.animation.gotoAndPlay(name);
            if (armature.display) {
                this.addChild(armature.display);
                armature.display.x = (i + 1) * 200;
                armature.display.y = (i + 1) * 130;
                this.armatureList[i] = armature;
                this.factoryList[i] = dragonbonesFactory;
            } else {
                console.log(armature);
            }
        }
    }
}