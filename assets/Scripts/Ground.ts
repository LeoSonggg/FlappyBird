import { _decorator, Component, Node, Vec3, UITransform, director, Canvas} from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl'

@ccclass('Ground')
export class Ground extends Component {
    @property({
        type:Node,
        tooltip:'Ground 1 is here'
    })

    public ground1: Node;

    @property({
        type:Node,
        tooltip:'Ground 2 is here'
    })

    public ground2: Node;

    @property({
        type:Node,
        tooltip:'Ground 3 is here'
    })

    public ground3: Node;

    //Create ground width variables
    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLoc1 = new Vec3;
    public tempStartLoc2 = new Vec3;
    public tempStartLoc3 = new Vec3;

    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed;

    onLoad() {
        this.startUp();
    }

    startUp() {
        this.groundWidth1 =this.ground1.getComponent(UITransform).width;
        this.groundWidth2 =this.ground2.getComponent(UITransform).width;
        this.groundWidth3 =this.ground3.getComponent(UITransform).width;

        this.tempStartLoc1.x = 0;
        this.tempStartLoc2.x = this.groundWidth1;
        this.tempStartLoc3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLoc1);
        this.ground2.setPosition(this.tempStartLoc2);
        this.ground3.setPosition(this.tempStartLoc3);
    }

    update(deltaTime: number) {
        this.gameSpeed = this.gameCtrlSpeed.speed;
        
        this.tempStartLoc1 = this.ground1.position;
        this.tempStartLoc2 = this.ground2.position;
        this.tempStartLoc3 = this.ground3.position;

        //get the speed and subtract from x
        this.tempStartLoc1.x -= this.gameSpeed * deltaTime;
        this.tempStartLoc2.x -= this.gameSpeed * deltaTime;
        this.tempStartLoc3.x -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        if(this.tempStartLoc1.x <= (0 - this.groundWidth1)) {
            this.tempStartLoc1.x = this.tempStartLoc1.x + this.groundWidth1 + canvas.getComponent(UITransform).width;
        }

        if(this.tempStartLoc2.x <= (0 - this.groundWidth2)) {
            this.tempStartLoc2.x = this.tempStartLoc2.x + this.groundWidth2 + canvas.getComponent(UITransform).width;
        }

        if(this.tempStartLoc3.x <= (0 - this.groundWidth3)) {
            this.tempStartLoc3.x = this.tempStartLoc3.x + this.groundWidth3 + canvas.getComponent(UITransform).width;
        }

        this.ground1.setPosition(this.tempStartLoc1);
        this.ground2.setPosition(this.tempStartLoc2);
        this.ground3.setPosition(this.tempStartLoc3);
    }
}


