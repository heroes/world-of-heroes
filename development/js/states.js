var next_tag = 7;
Laro.register('PD.$states', function (La) {
    var pkg = this;

    // Loading states
    this.Loading = La.BaseState.extend(
        function () {
            this.barW = 650;
            this.barH = 28;
        }).methods({
            enter:function (msg, fromState) {
                console.log('loading', fromState)
                this._t = 0;
                this.font = new La.Font(g_data.font.loading);
                this.title = this.font.generateCanvas('大侠的世界');

                this.progress = 0;
                this.done = false;
                this.doneT = -1;

                this.delayAfter = 0.5;

                var images = [
                    'favicon.png',
                    'images/map.jpg',
                    'images/BG2.jpg',
                    'images/BG3.jpg',
                    'images/role/role-right.png',
                    'images/role/role2.png',
                    'images/circle.png',
                    'images/pie.png',
                    'images/skillicon/1.png',
                    'images/skillicon/2.png',
                    'images/skillicon/3.png',
                    'images/skillicon/4.png',
                    'images/skillicon/5.png',
                    'images/skillicon/highlight.png',
                    'images/skillanim/skill1.png',
                    'images/skillanim/skill2.png',
                    'images/monster/left.png',
                    'images/monster/right.png',
                    'images/monster/monster.png',
                    'images/comic/comic1.jpg',
                    'images/comic/comic2.jpg',
                    'images/comic/comic3.jpg',
                    'images/start-bg.jpg',
                    'images/start-btn.png',
                    'images/end.jpg',
                    'images/GO.png',
                    'images/s_skill.png',
                    'images/s_skill_1.png',
                    'images/3s_skill.png',
                    'images/4s_skill.png',
                    'images/3s_skill_1.png',
                    'images/4s_skill_1.png',
                    'images/monster/boss_left.png',
					'images/monster/boss_lightning.png',
					'images/monster/boss_skill1.png',
					'images/monster/boss_2.png',
					'images/monster/stone.png',
					'images/monster/buff.png',
					
					'images/skillanim/role_recover.png',
					'images/skillanim/role_defense.png',
					'images/role/role2_skill.png',

                    //sound
                    'OGG/stage1_sound.ogg',
                    'OGG/role_attack.ogg',
                    'OGG/role_skill1.ogg',
                    'OGG/role_skill2.ogg',
                    'OGG/master_die.ogg',
					'OGG/Bossbattle.ogg',
					'OGG/star_fall.ogg'
                ];

                PD.loader.preload(images, La.curry(this.resourceLoadCallback, this));
                PD.LOAD_IMAGE = document.getElementById('load-image');

            },
            resourceLoadCallback:function (p) {
                this.progress = Math.min(1, p);
                if (p >= 1) {
                    this.done = true;
                    this.doneT = this._t;
                }
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
            },
            draw:function (render) {
                var rw = render.getWidth(),
                    rh = render.getHeight();
                //	render.drawFillScreen('#000');
                render.drawText(this.title, (rw - this.title.width) / 2, rh / 3 - this.title.height, 1);

                //render.drawText(this.desc, (rw)/2 + this.desc.height, rh/3 - this.title.height, 1);

                this.drawProgressBar(render);
            },
            drawProgressBar:function (render) {
                var x0 = (render.getWidth() - this.barW) / 2,
                    y0 = (render.getHeight() / 2),
                    x1 = (render.getWidth() + this.barW) / 2,
                    y1 = render.getHeight() / 2 + this.barH;
                render.drawRect(x0, y0, x1, y1, '#F5D74F');
                render.context.drawImage(PD.LOAD_IMAGE, 0, 0, this.progress * this.barW, this.barH, x0, y0, this.progress * this.barW, this.barH);
                render.context.drawImage(PD.LOAD_IMAGE, 0, this.barH, 248, 166, x0 + this.progress * this.barW - 175, y0 - 108, 248, 166);
            },
            transition:function () {
                if (this.done && this.doneT >= 0 && this._t > this.doneT + this.delayAfter) {
                    //this.host.setState(3);
                    
					//调试用，把前面的四格漫画屏蔽了
                    this.host.setState(5);
                }
            }
        });

    this.Comic1 = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                console.log('comic1');

                this._t = 0;
                this.delay = 2;
                this.frameCount = 2;

                PD.loader.loadedImages['images/comic/comic1.jpg'];
                PD.textures['comic1'] = PD.loader.loadImage('images/comic/comic1.jpg');
                //get resources 放在全局 PD 里，以便其他类调用

                this.cameras = [
                    [0, 0, 960, 640],
                    [704, 0, 960, 640],
                    [704, 606, 960, 640],
                    [0, 560, 960, 640],
                    [0, 606, 960, 640]
                ];
                this.currentCamera = 0;
                this.nextCamera = 1;
                this.currentArr = this.cameras[this.currentCamera].slice(0);
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
                if (this._t > this.delay) {
                    if (this.delay) {
                        this.delay = 0;
                        this._t = 0;
                    }

                    if (this.currentArr[0] == this.cameras[this.nextCamera][0] &&
                        this.currentArr[1] == this.cameras[this.nextCamera][1] &&
                        this.currentArr[2] == this.cameras[this.nextCamera][2] &&
                        this.currentArr[3] == this.cameras[this.nextCamera][3]
                        ) {
                        if (this._t >= this.frameCount * 2) {
                            this.currentCamera += 1;
                            this.nextCamera += 1;
                            this._t = 0;
                            console.log(this.nextCamera);
                        }
                    } else {
                        for (var i = 0; i < 4; i++) {
                            this.currentArr[i] = this.cameras[this.currentCamera][i] + (this._t / this.frameCount >= 1 ? 1 : this._t / this.frameCount) * (this.cameras[this.nextCamera][i] - this.cameras[this.currentCamera][i]);
                        }
                    }
                }
            },
            draw:function (render) {
                var rw = render.getWidth(),
                    rh = render.getHeight();
                render.context.drawImage(PD.textures['comic1'], this.currentArr[0], this.currentArr[1], this.currentArr[2], this.currentArr[3], 0, 0, rw, rh)
            },
            transition:function () {
                if (this.nextCamera == this.cameras.length) {
                    this.host.setState(2);
                }
            }
        });

    this.Comic2 = La.BaseState.extend(
        function () {
        }).methods({
            enter:function (msg, fromState) {
                console.log('comic2');
                for (var i = 0; i < PD.stage.children.length; i++) {
                    var child = PD.stage.children[i];
                    if (child.type == 'skillIcon') {
                        PD.stage.children.splice(i, 1);
                        i--;
                    }
                }
                //PD.curRole = '';
                //PD.toggleSkillIcon();
                this._t = 0;
                this.delay = 2;
                this.frameCount = 2;

                PD.loader.loadedImages['images/comic/comic2.jpg'];
                PD.textures['comic2'] = PD.loader.loadImage('images/comic/comic2.jpg');
                //get resources 放在全局 PD 里，以便其他类调用

                this.cameras = [
                    [0, 0, 303, 202],
                    [0, 0, 531, 354],
                    [0, 116, 534, 356],
                    [566, 0, 534, 356],
                    [0, 443, 653, 435],
                    [408, 355, 692, 461],
                    [0, 819, 603, 402],
                    [497, 819, 603, 402]
                ];
                this.currentCamera = 0;
                this.nextCamera = 1;
                this.currentArr = this.cameras[this.currentCamera].slice(0);
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
                if (this._t > this.delay) {
                    if (this.delay) {
                        this.delay = 0;
                        this._t = 0;
                    }

                    if (this.currentArr[0] == this.cameras[this.nextCamera][0] &&
                        this.currentArr[1] == this.cameras[this.nextCamera][1] &&
                        this.currentArr[2] == this.cameras[this.nextCamera][2] &&
                        this.currentArr[3] == this.cameras[this.nextCamera][3]
                        ) {
                        if (this._t >= this.frameCount * 2) {
                            this.currentCamera += 1;
                            this.nextCamera += 1;
                            this._t = 0;
                            console.log(this.nextCamera);
                        }
                    } else {
                        for (var i = 0; i < 4; i++) {
                            this.currentArr[i] = this.cameras[this.currentCamera][i] + (this._t / this.frameCount >= 1 ? 1 : this._t / this.frameCount) * (this.cameras[this.nextCamera][i] - this.cameras[this.currentCamera][i]);
                        }
                    }
                }
            },
            draw:function (render) {
                var rw = render.getWidth(),
                    rh = render.getHeight();
                //console.log(PD.textures['comic2'].width);
                //console.log(PD.textures['comic2'].height);
                //render.context.drawImage(PD.textures['comic2'], 0, 0, rw, rh, 0, 0, rw, rh);
                render.context.drawImage(PD.textures['comic2'], this.currentArr[0], this.currentArr[1], this.currentArr[2], this.currentArr[3], 0, 0, rw, rh)
            },
            transition:function () {
                if (this.nextCamera == this.cameras.length) {
                    this.host.setState(5);
                }
            }
        });

//第三幅漫画
    this.Comic3 = La.BaseState.extend(
        function () {
        }).methods({
            enter:function (msg, fromState) {
                console.log('comic3');
                for (var i = 0; i < PD.stage.children.length; i++) {
                    var child = PD.stage.children[i];
                    if (child.type == 'skillIcon') {
                        PD.stage.children.splice(i, 1);
                        i--;
                    }
                }
                //PD.curRole = '';
                //PD.toggleSkillIcon();
                this._t = 0;
                this.delay = 2;
                this.frameCount = 2;

                PD.loader.loadedImages['images/comic/comic3.jpg'];
                PD.textures['comic3'] = PD.loader.loadImage('images/comic/comic3.jpg');
                //get resources 放在全局 PD 里，以便其他类调用

                this.cameras = [
                    [0, 0, 960, 640],
                    [303, 0, 960, 640],
                    [0, 640, 594, 396],
                    [594, 640, 621, 414],
                    [290, 1035, 970, 646]
                ];
                this.currentCamera = 0;
                this.nextCamera = 1;
                this.currentArr = this.cameras[this.currentCamera].slice(0);
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
                if (this._t > this.delay) {
                    if (this.delay) {
                        this.delay = 0;
                        this._t = 0;
                    }

                    if (this.currentArr[0] == this.cameras[this.nextCamera][0] &&
                        this.currentArr[1] == this.cameras[this.nextCamera][1] &&
                        this.currentArr[2] == this.cameras[this.nextCamera][2] &&
                        this.currentArr[3] == this.cameras[this.nextCamera][3]
                        ) {
                        if (this._t >= this.frameCount * 2) {
                            this.currentCamera += 1;
                            this.nextCamera += 1;
                            this._t = 0;
                            console.log(this.nextCamera);
                        }
                    } else {
                        for (var i = 0; i < 4; i++) {
                            this.currentArr[i] = this.cameras[this.currentCamera][i] + (this._t / this.frameCount >= 1 ? 1 : this._t / this.frameCount) * (this.cameras[this.nextCamera][i] - this.cameras[this.currentCamera][i]);
                        }
                    }
                }
            },
            draw:function (render) {
                var rw = render.getWidth(),
                    rh = render.getHeight();
                render.context.drawImage(PD.textures['comic3'], this.currentArr[0], this.currentArr[1], this.currentArr[2], this.currentArr[3], 0, 0, rw, rh)
            },
            transition:function () {
                if (this.nextCamera == this.cameras.length) {
                    this.host.setState(4);
                }
            }
        });

    this.Begin = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                console.log('enter');

                this.music = PD.$res.getSound('OGG/stage1_sound.ogg');
                this.music.setVolume(0.3);
                this.music.play('default', true);

                PD.textures['begin_bg'] = PD.loader.loadImage('images/start-bg.jpg');
                PD.textures['begin_btn'] = PD.loader.loadImage('images/start-btn.png');

                this.checkSprite = new La.$sprite(PD.stage.ctx, function () {
                    this.x = 960 - 350;
                    this.y = 640 - 200;
                    this.width = 171;
                    this.height = 150;
                    this.draw = function () {
                        /*	this.ctx.beginPath();
                         this.ctx.rect(0, 0, this.width, this.height);
                         this.ctx.closePath();
                         this.ctx.strokeStyle = 'black';
                         this.ctx.stroke(); */
                    };
                    this.setPos = function (x, y) {
                        this.x = x - 53;
                        this.y = y - 128;
                    }
                });
                PD.stage.addChild(this.checkSprite);
                this.checkSprite.addEventListener('mousedown', function (x, y) {
                    PD.isBegin = true;

                });
                this.checkSprite.addEventListener('touchstart', function (x, y) {
                    PD.isBegin = true;
                });
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;

            },
            draw:function (render) {
                var rw = render.getWidth(),
                    rh = render.getHeight();
                render.context.drawImage(PD.textures['begin_bg'], 0, 0, rw, rh);
                render.context.drawImage(PD.textures['begin_btn'], 0, 0, 171, 150, rw - 350, rh - 200, 171, 150);
            },
            transition:function () {
                if (PD.isBegin) {
                    this.host.setState(1);
                }
            }
        });

    this.END = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                console.log('end');

                PD.textures['end'] = PD.loader.loadImage('images/end.jpg');
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;

            },
            draw:function (render) {
                var rw = render.getWidth(),
                    rh = render.getHeight();
                render.context.drawImage(PD.textures['end'], 0, 0, rw, rh);
            },
            transition:function () {
                //if (PD.isBegin) {
                //this.host.setState(0);
                //}
            }
        });

    // Stage1
    this.Stage1 = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                console.log('stage1');

                this._t = 0;
                //get resources 放在全局 PD 里，以便其他类调用
                PD.textures['map1'] = PD.$res.getImage('map1');
                PD.textures['circle'] = PD.$res.getImage('circle');
                PD.textures['pie'] = PD.$res.getImage('pie');
                PD.textures['skill1'] = PD.$res.getImage('skill1');
                PD.textures['skill2'] = PD.$res.getImage('skill2');
                PD.textures['skill3'] = PD.$res.getImage('skill3');
                PD.textures['skill4'] = PD.$res.getImage('skill4');
                PD.textures['skill5'] = PD.$res.getImage('skill5');
                PD.textures['skill_hl'] = PD.$res.getImage('skill_hl');
                PD.textures['GO'] = PD.$res.getImage('GO');
                PD.textures['skill_rain'] = PD.$res.getImage('skill_rain');
                PD.textures['boss'] = PD.$res.getImage('boss');

                PD.$roles[0] = new PD.Role('$role', 100, 400,'one',0);
                PD.$roles[0].setState(0);

                this.createMonsters(2);

                PD.skillHash = {
			        'one':['skill1', 'skill2']
			    };

                // add skill icon
                PD.curRole = 'one';
                PD.toggleSkillIcon();

                this.music = PD.$res.getSound('OGG/stage1_sound.ogg');
                this.music.setVolume(0.3);
                this.music.play('default', true);

            },
            createMonsters:function (n) {
                for (var i = 0; i < n; i++) {
                    var x = Math.random() * 900,
                        y = Math.random() * 400 + 200;
                    PD.$monsters.push(new PD.Master(x, y));
                }
            },
            updateMonsters:function (dt) {
                PD.$monsters.sort(function (a, b) {
                    return a.y - b.y
                });
                var hasNear = false;
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    mo.update(dt);
                    if (mo.x < 50) {
                        mo.x = 50
                    }
                    if (mo.x > 900) {
                        mo.x = 900
                    }
                }

            },
            drawMonsters:function (render) {
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    mo.draw(render);
                }
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += 0;
                PD.$roles[0].update(dt);
                this.updateMonsters(dt);
            },
            draw:function (render) {
                var cx = render.getWidth() / 2,
                    cy = render.getHeight() / 2;

                render.drawImage(PD.textures['map1'], cx, cy, 0, 1, 1, false, false);

                // 画控制人物的圆饼
                PD.currentRole !== '' && PD.$roles[PD.currentRole].showCircle && this.drawPie(render);
                PD.$roles[0].draw(render);
                this.drawMonsters(render);

            },
            drawPie:function (render) {
                var x = PD.roleMousedown ? PD.MOUSEDOWN_X : PD.$roles[PD.currentRole].pieX;
                var y = PD.roleMousedown ? PD.MOUSEDOWN_Y : PD.$roles[PD.currentRole].pieY;
                if (y < 170) {
                    y = 170
                }

                render.drawImage(PD.textures['pie'], x, y, 0, 1, 1, false, false);
                // 连接线
                var ctx = render.context;
                ctx.save();
                ctx.shadowColor = '#00FFFF';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.moveTo(PD.$roles[PD.currentRole].x, PD.$roles[PD.currentRole].y);
                ctx.lineTo(x, y);
                ctx.closePath();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.restore();

                // 判断 左右
                if (x >= PD.$roles[0].x) {
                    PD.$roles[PD.currentRole].roleFaceRight = 1;
                } else {
                    PD.$roles[PD.currentRole].roleFaceRight = 0;
                }
            },
            transition:function () {

            }
        });

// 第二关
    this.Stage2 = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                console.log('stage1');
                next_tag = 9;//将下一场景设置为场景3
                this._t = 0;
                
				this.music = PD.$res.getSound('OGG/Bossbattle.ogg');
                this.music.setVolume(0.3);
                this.music.play('default', true);
				
                PD.textures['map1'] = PD.$res.getImage('map1');
                PD.textures['map2'] = PD.$res.getImage('map2');
                PD.textures['circle'] = PD.$res.getImage('circle');
                PD.textures['pie'] = PD.$res.getImage('pie');
                PD.textures['skill1'] = PD.$res.getImage('skill1');
                PD.textures['skill2'] = PD.$res.getImage('skill2');
                PD.textures['skill3'] = PD.$res.getImage('skill3');
                PD.textures['skill4'] = PD.$res.getImage('skill4');
                PD.textures['skill5'] = PD.$res.getImage('skill5');
                PD.textures['skill_hl'] = PD.$res.getImage('skill_hl');
                PD.textures['GO'] = PD.$res.getImage('GO');
                PD.textures['skill_rain'] = PD.$res.getImage('skill_rain');

                PD.skillHash = {
			        'one':['skill1', 'skill2', 'skill3'],
			        'two':['skill4', 'skill5']
			    };
				
				PD.$roles[0] = new PD.Role('$role', 200, 400,'one',0);
                PD.$roles[0].setState(0);

                PD.$roles[1] = new PD.Role2('$role2', 500, 400,'two',1);
                PD.$roles[1].setState(0);
                
				PD.$boss = new PD.Boss(800, 400);
				PD.$boss.id='boss';
				PD.$boss.heath = PD.$boss.fullHeath = 2000;
				PD.$boss.attack= 80;
                PD.$boss.bloodBarW = 200;
                PD.$boss.bloodBarOffset = -80;
				
				PD.$boss.setState(0);

                this.createMonsters(0);

                // add skill icon
                PD.curRole = 'one';
                PD.toggleSkillIcon();

            },
            createMonsters:function (n) {
                for (var i = 0; i < n; i++) {
                    var x = Math.random() * 900,
                        y = Math.random() * 400 + 200;
                    PD.$monsters.push(new PD.Master(x, y));
                }
                PD.$monsters.push(PD.$boss);
            },
            updateMonsters:function (dt) {
                PD.$monsters.sort(function (a, b) {
                    return a.y - b.y
                });
                var hasNear = false;
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    mo.update(dt);
                    if (mo.x < 50) {
                        mo.x = 50
                    }
                    if (mo.x > 900) {
                        mo.x = 900
                    }
                }

            },
            drawMonsters:function (render) {
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    mo.draw(render);
                }
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
				if(this._t>6){
					if(Math.random()*2>1){
						PD.$boss.setState(6);
					}
					else
					{
						PD.$boss.setState(7);
					}
				this._t=0;	
				}
                for(var i = 0,role;role = PD.$roles[i++];){
                   role.update(dt);
                }
                PD.$boss.update(dt);
                this.updateMonsters(dt);
            },
            draw:function (render) {
                var cx = render.getWidth() / 2,
                    cy = render.getHeight() / 2;

                render.drawImage(PD.textures['map2'], cx, cy, 0, 1, 1, false, false);

                // 画控制人物的圆饼
                PD.currentRole !== '' && PD.$roles[PD.currentRole].showCircle && this.drawPie(render);

                PD.$boss.draw(render);
                for(var i = 0,role;role = PD.$roles[i++];){
                   role.draw(render);
                }
                this.drawMonsters(render);

            },
            drawPie:function (render) {
                var x = PD.roleMousedown ? PD.MOUSEDOWN_X : PD.$roles[PD.currentRole].pieX;
                var y = PD.roleMousedown ? PD.MOUSEDOWN_Y : PD.$roles[PD.currentRole].pieY;
                if (y < 170) {
                    y = 170
                }

                render.drawImage(PD.textures['pie'], x, y, 0, 1, 1, false, false);
                // 连接线
                var ctx = render.context;
                ctx.save();
                ctx.shadowColor = '#00FFFF';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.moveTo(PD.$roles[PD.currentRole].x, PD.$roles[PD.currentRole].y);
                ctx.lineTo(x, y);
                ctx.closePath();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.restore();

                // 判断 左右
                if (x >= PD.$roles[PD.currentRole].x) {
                    PD.$roles[PD.currentRole].roleFaceRight = 1;
                } else {
                    PD.$roles[PD.currentRole].roleFaceRight = 0;
                }
            },
            transition:function () {

            }
        });
    //场景三
    this.Stage3 = La.BaseState.extend(
        function () {

        }).methods({
            enter:function (msg, fromState) {
                next_tag = 8;//将下一场景设置为漫画三
                this._t = 0;
				PD.skillHash = {
			        'one':['skill1', 'skill2', 'skill3'],
			        'two':['skill4', 'skill5']
			    };
                //get resources 放在全局 PD 里，以便其他类调用
                PD.textures['map1'] = PD.$res.getImage('map1');
                PD.textures['map2'] = PD.$res.getImage('map2');
                PD.textures['map3'] = PD.$res.getImage('map3');
                PD.textures['circle'] = PD.$res.getImage('circle');
                PD.textures['pie'] = PD.$res.getImage('pie');
                PD.textures['skill1'] = PD.$res.getImage('skill1');
                PD.textures['skill2'] = PD.$res.getImage('skill2');
                PD.textures['skill3'] = PD.$res.getImage('skill3');
                PD.textures['skill4'] = PD.$res.getImage('skill4');
                PD.textures['skill5'] = PD.$res.getImage('skill5');
                PD.textures['skill_hl'] = PD.$res.getImage('skill_hl');
                PD.textures['GO'] = PD.$res.getImage('GO');
                PD.textures['skill_rain'] = PD.$res.getImage('skill_rain');

                PD.$roles[0] = new PD.Role('$role', 200, 400,'one',0);
                PD.$roles[0].setState(0);

                PD.$roles[1] = new PD.Role2('$role2', 500, 400,'two',1);
                PD.$roles[1].setState(0);

                PD.$boss = new PD.Boss2(800, 400);
				PD.$boss.id='boss_2';
				PD.$boss.heath = PD.$boss.fullHeath = 3000;
				PD.$boss.attack= 80;
                PD.$boss.bloodBarW = 200;
                PD.$boss.bloodBarOffset = -80;
				PD.$boss.setState(6);

                this.createMonsters(3);

                // add skill icon
                PD.curRole = 'one';
                PD.toggleSkillIcon();

            },
            createMonsters:function (n) {
                for (var i = 0; i < n; i++) {
                    var x = Math.random() * 900,
                        y = Math.random() * 400 + 200;
                    PD.$monsters.push(new PD.Master(x, y));
                }
                PD.$monsters.push(PD.$boss);
            },
            updateMonsters:function (dt) {
                PD.$monsters.sort(function (a, b) {
                    return a.y - b.y
                });
                var hasNear = false;
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    mo.update(dt);
                    if (mo.x < 50) {
                        mo.x = 50
                    }
                    if (mo.x > 900) {
                        mo.x = 900
                    }
                }

            },
            drawMonsters:function (render) {
                for (var i = 0; i < PD.$monsters.length; i++) {
                    var mo = PD.$monsters[i];
                    mo.draw(render);
                }
            },
            leave:function () {

            },
            update:function (dt) {
				this._t += dt;
				if(this._t>6){
				  PD.$boss.setState(6);
				this._t=0;	
				}
                for(var i = 0,role;role = PD.$roles[i++];){
                   role.update(dt);
                }
                PD.$boss.update(dt);
                this.updateMonsters(dt);
            },
            draw:function (render) {
                var cx = render.getWidth() / 2,
                    cy = render.getHeight() / 2;

                render.drawImage(PD.textures['map3'], cx, cy, 0, 1, 1, false, false);

                // 画控制人物的圆饼
                PD.currentRole !== '' && PD.$roles[PD.currentRole].showCircle && this.drawPie(render);

                PD.$boss.draw(render);
                for(var i = 0,role;role = PD.$roles[i++];){
                   role.draw(render);
                }
                this.drawMonsters(render);

            },
            drawPie:function (render) {
                var x = PD.roleMousedown ? PD.MOUSEDOWN_X : PD.$roles[PD.currentRole].pieX;
                var y = PD.roleMousedown ? PD.MOUSEDOWN_Y : PD.$roles[PD.currentRole].pieY;
                if (y < 170) {
                    y = 170
                }

                render.drawImage(PD.textures['pie'], x, y, 0, 1, 1, false, false);
                // 连接线
                var ctx = render.context;
                ctx.save();
                ctx.beginPath();
                ctx.shadowColor = '#00FFFF';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 8;
                ctx.moveTo(PD.$roles[PD.currentRole].x, PD.$roles[PD.currentRole].y);
                ctx.lineTo(x, y);
                ctx.closePath();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.restore();

                // 判断 左右
                if (x >= PD.$roles[PD.currentRole].x) {
                    PD.$roles[PD.currentRole].roleFaceRight = 1;
                } else {
                    PD.$roles[PD.currentRole].roleFaceRight = 0;
                }
            },
            transition:function () {

            }
        });
    this.GoNext = La.BaseState.extend(
        function () {
            this.nn = 0;
        }).methods({
            enter:function (msg, fromState) {
                this._t = 0;
                this.rw = PD.render.getWidth();
                this.rh = PD.render.getHeight();
                this.pos = 0;
                if (this.nn < 3) this.nn += 1;
                //删除大招动画
                document.getElementById("big_skill_1").className="big_skill";
            },
            leave:function () {

            },
            update:function (dt) {
                this._t += dt;
                this.pos += 300 * dt;

            },
            draw:function (render) {
                var cx = render.getWidth() / 2,
                    cy = render.getHeight() / 2;

                render.drawImage(PD.textures['map' + this.nn], cx, cy, 0, 1, 1, false, false);
                render.drawImage(PD.textures['GO'], this.pos, cy - 50, 0, 1, 1, false, false);
            },
            transition:function () {
                if (this.pos >= this.rw) {
                    this.host.setState(next_tag)
                }
            }
        })
});

//状态管理
Laro.register('PD.$fsm', function (La) {
    var pkg = this;

    var statesList = [
        0, PD.$states.Loading,
        1, PD.$states.Comic1,
        2, PD.$states.Stage1,
        3, PD.$states.Begin,
        4, PD.$states.END,
        5, PD.$states.Stage2,
        6, PD.$states.GoNext,
        7, PD.$states.Comic2,
        8, PD.$states.Comic3,
        9, PD.$states.Stage3
    ];
    //stateModes
    this.stateModes = {
        kStateActive:0,
        kTransitionOut:1,
        kTransitionIn:2
    };
    this.stateMode = this.stateModes.kStateActive;


    this.init = function () {
        this.$ = new La.AppFSM(this, statesList);
        this.setState(0);
    };
    this.setState = function (state, msg, suspendCurrent) {
        this.newState = state;
        this.newMessage = msg;

        if (suspendCurrent || state == -1 || this.$.isSuspended(state)) {
            this.$.setState(state, msg, suspendCurrent);
        } else {
            var st = PD.screenTransitionDefaultOut;
            st.reset();

            this.stateMode = this.stateModes.kTransitionOut;
            PD.screenTransition = st;
        }
    }

});
