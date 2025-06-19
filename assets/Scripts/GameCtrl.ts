import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type:Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: 'results go here'
    })
    public result: Results;

    @property({
        type: Bird,
        tooltip: 'this is a bird'
    })
    public bird: Bird;

    @property({
        type: PipePool,
        tooltip: 'Pipepool'
    })
    public pipeQueue: PipePool;

    @property({
        type:BirdAudio
    })
    public clip: BirdAudio;

    @property({
        type: CCInteger
    })
    public speed: number = 320;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 200;

    public isOver: boolean;

    onLoad() {
        this.initListener();
        this.result.resetScore();
        this.isOver = true;
        director.pause();
    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(Node.EventType.TOUCH_START, () => {
            if(this.isOver == true) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }

            if(this.isOver == false){
                this.bird.fly();
                this.clip.onAudioQueue(0);
            }
        })
    }

    //testing method DELETE In FINAL VERSION
    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            // //case KeyCode.KEY_A:
            //     this.gameOver();
            // break;
            // case KeyCode.KEY_P:
            //     this.result.addScore();
            // break;
            // case KeyCode.KEY_Q:
            //     this.resetGame();
            //     this.bird.resetBird();
        }
    }

    startGame() {
        this.result.hideResults();
        director.resume();
    }

    gameOver() {
        this.result.showResults();
        this.isOver = true;
        this.clip.onAudioQueue(3);
        director.pause();
    }

    resetGame() {
        this.pipeQueue.reset();
        this.result.resetScore();
        this.isOver = false;
        this.startGame();
        this.ground.startUp();
    }

    passPipe() {
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    contactGroundPipe() {
        let collider = this.bird.getComponent(Collider2D);

        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck() {
        this.contactGroundPipe();

        if (this.bird.hitSomething == true) {
            this.gameOver();
        }
    }

    update() {
        if(this.isOver == false) {
            this.birdStruck();
        }
    }
}


