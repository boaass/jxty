// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import HeroPlayer from "HeroPlayer";
var MoveBg = require("BgMove");
var bgmu = require("AudioScript");

cc.Class({
    extends: cc.Component,

    properties: {
        bgmusic: {
            default: null,
            type: cc.Node
        },
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },
        gameOverAudio: {
            default: null,
            url: cc.AudioClip
        },
        hitAudio: {
            default: null,
            url: cc.AudioClip
        },
        player: {
            default: null,
            type: cc.Node
        },
        bgsprite1: {
            default: null,
            type: cc.Node
        },
        bgsprite2: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
    },

    eventControl: function(){
        var self = this;
        var mus = this.bgmusic.getComponent(bgmu);
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            var hero = self.player.getComponent(HeroPlayer);
            mus.setCp(event.touch.getLocation());
            hero.node.runAction(hero.jumpUpAction());
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            var bg1 = self.bgsprite1.getComponent(MoveBg);
            var bg2 = self.bgsprite2.getComponent(MoveBg);
            // console.log('position y-----', self.player.getPositionY());
            if (self.player.getPositionY() > 0) {
                var height = self.player.getPositionY();
                self.player.setPositionY(height/2);
                self.gainScore();
    
                bg1.node.runAction(bg1.moveAction(height));
                bg2.node.runAction(bg2.moveAction(height));
            }
        }, this);
        this.node.on('BarrierLeftBreak', function(event){
            self.resignTouchEvent();
        });
        this.node.on('BarrierRightBreak', function(event){
            self.resignTouchEvent();
        });
    },

    bgMoveCreate: function(){
        if (this.bgsprite1.getPositionY() < -350) {
            this.bgsprite2.setPositionY(this.bgsprite1.getPositionY()+this.bgsprite1.getContentSize().height);
        }
        if (this.bgsprite2.getPositionY() < -350) {
            this.bgsprite1.setPositionY(this.bgsprite2.getPositionY()+this.bgsprite2.getContentSize().height);
        }
    },

    gainScore: function(){
        this.score += 1;
        this.scoreDisplay.string = this.score.toString();

        cc.sys.localStorage.setItem('ScoreDis', this.scoreDisplay.string);
    },

    gameOver: function(){
        this.player.stopAllActions();
        cc.director.loadScene('GameOver');
        if (this.bgmusic.getComponent(bgmu).isOpen) {
            cc.audioEngine.play(this.gameOverAudio, false, 0.5);   
        }
        cc.audioEngine.pauseMusic();
        // cc.eventManager.removeAllListeners();
    },
    resignTouchEvent: function(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
        this.node.off('BarrierLeftBreak');
        this.node.off('BarrierRightBreak');
        if (this.bgmusic.getComponent(bgmu).isOpen) {
            cc.audioEngine.play(this.hitAudio, false, 0.5);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score = 0;
        this.isMoving = true;
        cc.audioEngine.setEffectsVolume(0.2);
        // cc.audioEngine.play(this.gameAudio, false, 0.2);
    },

    onDestroy() {
        // console.log('game destroy');
        
    },

    start () {
        this.eventControl();
    },

    update (dt) {
        this.bgMoveCreate();
        if (this.player.getPositionY() <= -cc.view.getVisibleSize().height/2) {
            this.unscheduleAllCallbacks();
            
            if (this.isMoving) {
                this.isMoving = false;
                this.gameOver();
            }
        }
    },
});
