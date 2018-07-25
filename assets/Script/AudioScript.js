// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        isOpen: true,
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    checkMusic: function(){
        return isOpen;
    },

    setCp: function(pos){
        var rec = cc.rectContainsPoint(this.node.getBoundingBoxToWorld(), pos);
        if (rec) {
            if (this.isOpen) {
                cc.audioEngine.pauseMusic();
                console.log('pause music');
                this.isOpen = false;
            } else {
                cc.audioEngine.resumeMusic();
                console.log('resume music');
                this.isOpen = true;
            }
        } 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('bg music load');
        
        this.isOpen = true;
        cc.audioEngine.playMusic(this.gameAudio, true);
    },

    start () {

    },

    onDestroy() {
        // console.log('audio destroy');
    },

    // update (dt) {},
});
