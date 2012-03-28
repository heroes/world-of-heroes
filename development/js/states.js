
Laro.register('PD.$states', function (La) {
	var pkg = this;

	// Loading states
	this.Loading = La.BaseState.extend(function () {
		this.barW = 650;
		this.barH = 28;
		
	}).methods({
		enter: function (msg, fromState) {
			console.log('loading', fromState)
			this._t = 0;
			this.font = new La.Font(g_data.font.loading);
			this.title = this.font.generateCanvas('大侠的世界');

			this.progress = 0;
			this.done = false;
			this.doneT = -1;

			this.delayAfter = 0.5;

			var images = [
				'images/map.jpg',
				'images/BG2.jpg',
				'images/role/role-right.png',
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
				'images/comic/comic1.jpg',
				'images/comic/comic2.jpg',
				'images/comic/comic3.jpg',
				'images/start-bg.jpg',
				'images/start-btn.png',
				'images/end.jpg',
				'images/GO.png',
				'images/s_skill.png',
				'images/boss_left.png',

				//sound
				'OGG/stage1_sound.ogg',
				'OGG/role_attack.ogg',
				'OGG/role_skill1.ogg',
				'OGG/role_skill2.ogg',
				'OGG/master_die.ogg',

			];

			PD.loader.preload(images, La.curry(this.resourceLoadCallback, this));
			PD.LOAD_IMAGE = document.getElementById('load-image');
			
		},
		resourceLoadCallback: function (p) {
			this.progress = Math.min(1, p);
			if (p >= 1) {
				this.done = true;
				this.doneT = this._t;
			}
		},
		leave: function () {
		
		},
		update: function (dt) {
			this._t += dt;
		},
		draw: function (render) {
			var rw = render.getWidth(),
				rh = render.getHeight();
		//	render.drawFillScreen('#000');
			render.drawText(this.title, (rw-this.title.width)/2, rh/3 - this.title.height, 1);
			
			//render.drawText(this.desc, (rw)/2 + this.desc.height, rh/3 - this.title.height, 1);

			this.drawProgressBar(render);
		},
		drawProgressBar: function (render) {
			var x0 = (render.getWidth()-this.barW)/2,
				y0 = (render.getHeight()/2),
				x1 = (render.getWidth()+this.barW)/2,
				y1 = render.getHeight()/2 + this.barH;
			render.drawRect(x0, y0, x1, y1, '#F5D74F');
			render.context.drawImage(PD.LOAD_IMAGE, 0, 0, this.progress*this.barW, this.barH, x0, y0, this.progress*this.barW, this.barH);
			render.context.drawImage(PD.LOAD_IMAGE, 0, this.barH, 248, 166, x0 + this.progress*this.barW - 175, y0 - 108, 248, 166);
		},
		transition: function () { 
			if (this.done && this.doneT >= 0 && this._t > this.doneT + this.delayAfter) {
				this.host.setState(3);
			}
		}
	});
	
	this.Comic1 = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			console.log('comic1');

			this._t = 0;
			this.delay = 2;
			this.frameCount = 2;

			PD.loader.loadedImages['images/comic/comic1.jpg'];
			PD.textures['comic1'] = PD.loader.loadImage('images/comic/comic1.jpg');
			//get resources 放在全局 PD 里，以便其他类调用
			
			this.cameras = [
				[0,0,960,640],
				[704,0,960,640],
				[704,640,960,640],
				[0,560,960,640],
				[0,640,960,640]
			];
			this.currentCamera = 0;
			this.nextCamera = 1;
			this.currentArr = this.cameras[this.currentCamera].slice(0);
		},
		leave: function () {
			
		},
		update: function (dt) {
			this._t += dt;
			if(this._t > this.delay){
				if(this.delay){
					this.delay = 0;
					this._t = 0;
				}

				if(this.currentArr[0] == this.cameras[this.nextCamera][0] &&
					this.currentArr[1] == this.cameras[this.nextCamera][1] &&
					this.currentArr[2] == this.cameras[this.nextCamera][2] &&
					this.currentArr[3] == this.cameras[this.nextCamera][3]
				){
					if(this._t >= this.frameCount*2){
						this.currentCamera += 1;
						this.nextCamera+= 1;
						this._t = 0;
						console.log(this.nextCamera);			
					}
				}else{
					for(var i = 0;i < 4;i++){
						this.currentArr[i] = this.cameras[this.currentCamera][i] + (this._t/this.frameCount>=1? 1 :this._t/this.frameCount) * (this.cameras[this.nextCamera][i] - this.cameras[this.currentCamera][i]);
					}
				}
			}
		},
		draw: function (render) {
			var rw = render.getWidth(),
				rh = render.getHeight();
			render.context.drawImage(PD.textures['comic1'], this.currentArr[0],this.currentArr[1],this.currentArr[2],this.currentArr[3],0,0,rw,rh)
		},
		transition: function () {
			if (this.nextCamera == this.cameras.length) {
				this.host.setState(2);
			}
		}
	})

	this.Begin = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
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
					this.y = y-128;
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
		leave: function () {
			
		},
		update: function (dt) {
			this._t += dt;
			
		},
		draw: function (render) {
			var rw = render.getWidth(),
				rh = render.getHeight();
			render.context.drawImage(PD.textures['begin_bg'], 0, 0, rw, rh);
			render.context.drawImage(PD.textures['begin_btn'], 0, 0, 171, 150, rw - 350, rh - 200, 171, 150);
		},
		transition: function () {
			if (PD.isBegin) {
				this.host.setState(1);
			}
		}
	})

	this.END = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			console.log('end');

            PD.textures['end'] = PD.loader.loadImage('images/end.jpg');
		},	
		leave: function () {
			
		},
		update: function (dt) {
			this._t += dt;
			
		},
		draw: function (render) {
			var rw = render.getWidth(),
				rh = render.getHeight();
			render.context.drawImage(PD.textures['end'], 0, 0, rw, rh);
		},
		transition: function () {
			if (PD.isBegin) {
				this.host.setState(1);
			}
		}
	})

	// Stage1
	this.Stage1 = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
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

			PD.$role = new PD.Role(100, 400);
			PD.$role.setState(0);
			
			this.createMonsters(2);
			
			// add skill icon
			PD.curRole = 'one';
			PD.toggleSkillIcon();

			this.music = PD.$res.getSound('OGG/stage1_sound.ogg');
			this.music.setVolume(0.3);
            this.music.play('default', true);

		},
		createMonsters: function (n) {
			for (var i = 0; i < n ; i ++) {
				var x = Math.random()* 900,
					y = Math.random()*400 + 200;
				PD.$monsters.push(new PD.Master(x, y));
			}
		},
		updateMonsters: function (dt) {
			PD.$monsters.sort(function (a, b) { return a.y - b.y });
			var hasNear = false;
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				mo.update(dt);
				if (mo.x < 50) {mo.x = 50}
				if (mo.x > 900) {mo.x = 900}
			}
			
		},
		drawMonsters: function (render) {
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				mo.draw(render);
			}
		},
		leave: function () {
			
		},
		update: function (dt) {
			this._t += 0;
			PD.$role.update(dt);
			this.updateMonsters(dt);
		},
		draw: function (render) {
			var cx = render.getWidth()/2,
				cy = render.getHeight()/2;

			render.drawImage(PD.textures['map1'], cx, cy, 0, 1, 1, false, false);
			
			// 画控制人物的圆饼
			PD.showCircle && this.drawPie(render);
			PD.$role.draw(render);
			this.drawMonsters(render);

		},
		drawPie: function (render) {
			var x = PD.roleMousedown ? PD.MOUSEDOWN_X : PD.pieX;
			var y = PD.roleMousedown ? PD.MOUSEDOWN_Y : PD.pieY;
			if (y < 170) { y = 170 }
			
			render.drawImage(PD.textures['pie'], x, y, 0, 1, 1, false, false);
			// 连接线
			var ctx = render.context;
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(PD.$role.x, PD.$role.y);
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 5;
			ctx.stroke();
			ctx.restore();
			
			// 判断 左右
			if (x >= PD.$role.x) {
				PD.roleFaceRight = 1;
			} else {
				PD.roleFaceRight = 0;
			}
		},
		transition: function () {
		
		}
	});
	
// 第二场景
	this.Stage2 = La.BaseState.extend(function () {
	
	}).methods({
		enter: function (msg, fromState) {
			console.log('stage1');

			this._t = 0;
			//get resources 放在全局 PD 里，以便其他类调用
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

			PD.$role = new PD.Role(200, 400);
			PD.$role.setState(0);
			
			PD.$boss = new PD.Boss(800, 400);
			PD.$boss.id = 'boss';
			PD.$boss.heath = PD.$boss.fullHeath = 2000;
			PD.$boss.bloodBarW = 200;
			PD.$boss.bloodBarOffset = -80;
			
			this.createMonsters(3);
			
			// add skill icon
			PD.curRole = 'one';
			PD.toggleSkillIcon();

		},
		createMonsters: function (n) {
			for (var i = 0; i < n ; i ++) {
				var x = Math.random()* 900,
					y = Math.random()*400 + 200;
				PD.$monsters.push(new PD.Master(x, y));
			}
			PD.$monsters.push(PD.$boss);
		},
		updateMonsters: function (dt) {
			PD.$monsters.sort(function (a, b) { return a.y - b.y });
			var hasNear = false;
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				mo.update(dt);
				if (mo.x < 50) {mo.x = 50}
				if (mo.x > 900) {mo.x = 900}
			}

		},
		drawMonsters: function (render) {
			for (var i = 0; i < PD.$monsters.length; i ++) {
				var mo = PD.$monsters[i];
				mo.draw(render);
			}
		},
		leave: function () {
			
		},
		update: function (dt) {
			this._t += 0;
			PD.$role.update(dt);
			PD.$boss.update(dt);
			this.updateMonsters(dt);
		},
		draw: function (render) {
			var cx = render.getWidth()/2,
				cy = render.getHeight()/2;

			render.drawImage(PD.textures['map2'], cx, cy, 0, 1, 1, false, false);
			
			// 画控制人物的圆饼
			PD.showCircle && this.drawPie(render);
			
			PD.$boss.draw(render);
			PD.$role.draw(render);
			this.drawMonsters(render);
			
		},
		drawPie: function (render) {
			var x = PD.roleMousedown ? PD.MOUSEDOWN_X : PD.pieX;
			var y = PD.roleMousedown ? PD.MOUSEDOWN_Y : PD.pieY;
			if (y < 170) { y = 170 }
			
			render.drawImage(PD.textures['pie'], x, y, 0, 1, 1, false, false);
			// 连接线
			var ctx = render.context;
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(PD.$role.x, PD.$role.y);
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 5;
			ctx.stroke();
			ctx.restore();
			
			// 判断 左右
			if (x >= PD.$role.x) {
				PD.roleFaceRight = 1;
			} else {
				PD.roleFaceRight = 0;
			}
		},
		transition: function () {
		
		}
	});
	
		this.GoNext = La.BaseState.extend(function () {
		this.nn = 0;
	}).methods({
		enter: function (msg, fromState) {
			this._t  = 0;
			this.rw = PD.render.getWidth();
			this.rh = PD.render.getHeight();
			this.pos = 0;
			if (this.nn < 2) this.nn += 1;
		},
		leave: function () {
			
		},
		update: function (dt) {
			this._t += dt;
			this.pos += 300*dt;

		},
		draw: function (render) {
			var cx = render.getWidth()/2,
				cy = render.getHeight()/2;

			render.drawImage(PD.textures['map'+this.nn], cx, cy, 0, 1, 1, false, false);
			render.drawImage(PD.textures['GO'], this.pos, cy-50, 0, 1, 1, false, false);
		},
		transition: function () {
			if (this.pos >= this.rw) {
				this.host.setState(5)
			}
		}
	})
});

