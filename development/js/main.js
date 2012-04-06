Laro.register('PD', function (La) {

    var pkg = this;

    this.score = 0;
    this.textures = {};
    this.skillHash = {
        'one':['skill1', 'skill2', 'skill3'],
        'two':['skill3', 'skill4', 'skill5']
    };
    this.curRole = 'one';

    this.render = null;
    this.getUid = function () {
        var id = 0;
        return function () {
            return id++;
        }
    }();

    this.init = function (cvsId, w, h) {
        this.canvasId = cvsId;
        this.w = w;
        this.h = h;
        this.canvas = document.getElementById(cvsId);
        this.createRender();

        this.$fsm.init();
        this.$loop.init();
        this.stage = new La.$stage(this.canvas);
        this.stage.CONFIG.isClear = false;

        //标记当前精灵
        this.currentRole = '';

        this.stage.addEventListener('mouseup', function (x, y) {
            if ((PD.$role && PD.$role.fsm.currentState != 1)
                || (PD.$role && PD.$role.fsm.currentState == 1 && PD.roleMousedown)) {
                if (PD.roleMousedown) {
                    PD[PD.currentRole].startMove = true;
                    PD[PD.currentRole].pieX = x;
                    PD[PD.currentRole].pieY = y;
                }
            }

            PD.roleMousedown = false;
        });
        this.stage.addEventListener('touchend', function (x, y) {
            if ((PD.$role && PD.$role.fsm.currentState != 1)
                || (PD.$role && PD.$role.fsm.currentState == 1 && PD.roleMousedown)) {
                if (PD.roleMousedown) {
                    PD[PD.currentRole].startMove = true;
                    PD[PD.currentRole].pieX = x;
                    PD[PD.currentRole].pieY = y;
                }
            }
            PD.roleMousedown = false;
        });
        this.stage.addEventListener('mousemove', function (x, y) {
            PD.MOUSEDOWN_X = x;
            PD.MOUSEDOWN_Y = y;
        });
        this.stage.addEventListener('touchmove', function (x, y) {
            PD.MOUSEDOWN_X = x;
            PD.MOUSEDOWN_Y = y;
        });

//		this.keyboard = new La.Keyboard();

    };

    this.createRender = function () {
        this.oldRender = this.render;
        var oldCanvas = document.getElementById(this.canvasId);
        var canvasParent = oldCanvas.parentNode;

        var canvas = document.createElement('canvas');
        canvas.width = this.w;
        canvas.height = this.h;
        canvas.id = this.canvasId;

        this.render = new La.CanvasRender(canvas, 1, false);
        canvasParent.replaceChild(canvas, oldCanvas);
        this.canvas = canvas;


    };

    // findScreenTransition
    this.findScreenTransition = function (from, to, out) {

    };

    // 画工具栏
    this.drawSkillBar = function (render) {
        var skillList = this.skillHash[this.curRole];
        for (var i = 0; i < skillList.length; i++) {
            var imgW = PD.textures[skillList[i]];
            render.drawImage(imgW, 20 + i * 100, 20, 0, 0, 1, false, false);
            render.drawImage(PD.textures['skill_hl'], 20 + i * 100, 20, 0, 0, 1, false, false);
        }

    };
    this.toggleSkillIcon = function () {
        //先remove不属于当前role的技能icon
        for (var i = 0; i < PD.stage.children.length; i++) {
            var child = PD.stage.children[i];
            if (child.type == 'skillIcon') {
                PD.stage.children.splice(i, 1);
                i--;
            }
        }
        // 添加对应的icon
        var skillList = this.skillHash[this.curRole];
        for (var i = 0; i < skillList.length; i++) {
            var tid = skillList[i];
            var skIcon = new La.$sprite(PD.stage.ctx, function () {
                this.type = 'skillIcon';
                this.belongTo = this.curRole;
                this.x = 20 + i * 100;
                this.y = 20;
                this.width = 80;
                this.height = 80;
                this.draw = function (tid) {
                    return function (render) {
                        render.drawImage(PD.textures[tid], 0, 0, 0, 0, 1, false, false);
                        render.drawImage(PD.textures['skill_hl'], 0, 0, 0, 0, 1, false, false);
                    }
                }(tid);

            });
            skIcon.addEventListener('mouseover', function () {
                document.body.style['cursor'] = 'pointer';
                PD.mouseOnIcon = true;
            });
            skIcon.addEventListener('mouseout', function () {
                document.body.style['cursor'] = 'default';
                PD.mouseOnIcon = false;
            });
            skIcon.addEventListener('click', function (tid) {
                return function () {
                    PD.$skill[tid]();
                }
            }(tid));
            skIcon.addEventListener('touchstart', function (tid) {
                return function () {
                    PD.$skill[tid]();
                }
            }(tid));
            PD.stage.addChild(skIcon);
        }
    }

    this.screenTransition = null;
    this._c = 255;
    this.screenTransitionDefaultIn = new La.ScreenTransitionFade(new La.Pixel32(this._c, this._c, this._c, 255), new La.Pixel32(this._c, this._c, this._c, 0), 1);
    this.screenTransitionDefaultOut = new La.ScreenTransitionFade(new La.Pixel32(this._c, this._c, this._c, 0), new La.Pixel32(this._c, this._c, this._c, 255), 1);

    this.loader = new La.ResourceLoader();


    this.$monsters = [];

    this.Star_Fall = function (result) {
        var name = result.Name,
            score = result.Score;
        var cvs = document.getElementById('big_skill');
        if (name == 'star') {
            cvs.style['display'] = 'none';
            PD.$loop.$.resume();
            PD.$role.setState(6);
        } else {
            // 技能释放失败
            cvs.style['display'] = 'none';
            PD.$loop.$.resume();
        }

    }

});


/* 技能 */
Laro.register('PD.$skill', function (La) {

    this['skill1'] = function () {
        PD.$role && PD.$role.setState(4)
    }

    this['skill2'] = function () {
        PD.$role && PD.$role.setState(5)
    }

    this['skill3'] = function () {
        var cvs = document.getElementById('big_skill');
        cvs.style['display'] = 'block';
        PD.$loop.$.stop();
    }
});

/**
 * resource
 * 从g_data 里面拿数据
 */
Laro.register('PD.$res', function (La) {
    var pkg = this;

    this.EMBImages = {};

    // 获取经包装过的image资源
    // 默认是取第一帧相关数据
    this.getImage = function (name, frame) {
        if (frame == undefined) {
            frame = 0;
        }

        var emb = this.EMBImages[name];
        if (!!emb) {
            return emb[frame];
        }
        for (var k in g_data.imageW) {
            if (name == k) {
                this.EMBImages[k] = {};
                for (var i = 0; i < g_data.imageW[k].data.length; i++) {
                    var data = g_data.imageW[k],
                        source = data.data[i],
                        filename = data.filename;
                    this.EMBImages[k][i] = this.getEMBImage(source, filename);
                }
                return this.EMBImages[name][frame];
            }
        }
    };

    this.getEMBImage = function (source, filename) {
        var width = source[2] - source[0] + 1;
        var height = source[3] - source[1] + 1;

        var xOffset = source[0] - source[4];
        var yOffset = source[1] - source[5];

        var textureWidth = xOffset + width + source[6] - source[2];
        var textureHeight = yOffset + height + source[7] - source[3];

        var image = PD.loader.loadImage(filename);
        return new La.EMBImage(image, source[0], source[1], width, height, xOffset, yOffset, textureWidth, textureHeight);

    };

    this.getSound = function (filename) {
        var loader = PD.loader;
        var loadedSounds = loader.loadedSounds;
        return loadedSounds[filename];
    }

})


// looper
Laro.register('PD.$loop', function (La) {
    var pkg = this;
    this.init = function () {
        this.$ = new La.Loop(this.looper, this);
    };
    this.looper = function (dt) {
        this.update(dt);
        this.draw();
    };
    this.update = function (dt) {
        if (PD.$fsm.stateMode == PD.$fsm.stateModes.kStateActive) { //属于状态机状态转换
            PD.$fsm.$.update(dt);
        } else {
            !!PD.screenTransition && PD.screenTransition.update(dt);
            if (PD.screenTransition.isDone) {
                if (PD.$fsm.stateMode == PD.$fsm.stateModes.kTransitionOut) {
                    var st = PD.screenTransitionDefaultIn;

                    st.reset();
                    PD.screenTransition = st;
                    PD.$fsm.stateMode = PD.$fsm.stateModes.kTransitionIn;
                    PD.$fsm.$.setState(PD.$fsm.newState, PD.$fsm.newMessage);
                } else {
                    PD.screenTransition = null;
                    PD.$fsm.stateMode = PD.$fsm.stateModes.kStateActive;
                }
            }
        }

    };
    this.draw = function () {
        PD.render.clear();
        PD.$fsm.$.draw(PD.render);
        PD.screenTransition && PD.screenTransition.draw(PD.render);
        PD.stage && PD.stage.render(PD.render);
        PD.render.flush();
    }

});