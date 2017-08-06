var Character = function(){  
        this.x = 0;      	// 在characterCanvas中的x坐标
        this.y = 0;		// 在characterCanvas中的y坐标
        this.imageX = 0;    // 图像在图片中X坐标
        this.imageY = 0;	// 图像在图片中Y坐标
		this.imgMinX =0;	// 图像在图片中X最小值
		this.imgMaxX =240;	// 图像在图片中X最大值
        this.width = 60;    // 图像显示区域宽度
       	this.height = 60;	// 图像显示区域高度
		this.fps = 2;		//图像刷新频率(数字越小，刷新越快)
		this.speed = 4;		//人物移动速度
		this.isFloat = false;//判断人物是否浮动状态
        this.isStop = false;  //判断人物是否停止
        this.isDie = true; //判断人物是否死亡
    	this.i = 0;
	this.clean = function(characterCtx) {// 清除画布
        characterCtx.clearRect(this.x-5, this.y-50,this.width+10, this.height+65);
    }
	this.drawCharacter = function(characterCtx,characterImage) {// 画出人物
		characterCtx.drawImage(characterImage,this.imageX, this.imageY, this.width, this.height, this.x, this.y, this.width,this.height);		
	}
	this.imgFlash = function(fps,imageY,characterCtx,characterImage) {//人物动画刷新
		if(!this.isStop){	
			if(this.i%fps==0){	
				this.imageX +=this.width;
			}
			this.i++;
		}else{
			this.i = 0;
			this.imageX = this.imgMinX;
		}
		if (this.imageX >= this.imgMaxX) {
			this.imageX = this.imgMinX;
		}	
		this.imageY = imageY;
		this.clean(characterCtx);
		this.drawCharacter(characterCtx,characterImage);	
	}
	this.characterUp = function(fps,speed,imageY,characterCtx,characterImage){//人物向上移动
		this.imgFlash(fps,imageY,characterCtx,characterImage);
		if(!this.isStop){	
			this.y -= speed;
		}		
	}
	this.characterDown = function(fps,speed,imageY,characterCtx,characterImage){//人物向下移动
		this.imgFlash(fps,imageY,characterCtx,characterImage);
		if(!this.isStop){	
			this.y += speed;
		}		
	}
	this.characterLeft = function(fps,speed,imageY,characterCtx,characterImage) {//人物向左移动
		this.imgFlash(fps,imageY,characterCtx,characterImage);
		if(!this.isStop){	
			this.x -= speed;
		}				
	}
	this.characterRight = function(fps,speed,imageY,characterCtx,characterImage) {//人物向右移动
		this.imgFlash(fps,imageY,characterCtx,characterImage);
		if(!this.isStop){	
			this.x += speed;
		}       	
	}
	this.characterDrop = function(fps,speed,imageY,characterCtx,characterImage) {//人物自由下落
		this.imgFlash(fps,imageY,characterCtx,characterImage);
		if(!this.isStop){	
			this.y += speed;
		} 
	}
	this.characterLclimb = function(fps,speed,imageY,characterCtx,characterImage) {//人物向左爬横杆
		this.imgFlash(fps,imageY,characterCtx,characterImage);
		if(!this.isStop){	
			this.x -= speed;
		}			
	}
	this.characterRclimb = function(fps,speed,imageY,characterCtx,characterImage) {//人物向右爬横杆
		this.imgFlash(fps,imageY,characterCtx,characterImage);
		if(!this.isStop){	
			this.x += speed;
		} 
	}
	this.characterDie = function(imageY,characterCtx,characterImage) {//人物死亡
		var dieX =this.x;
		var dieY =this.y;
		for (var time=0,imageX = 0;time < 5;time++){
			(function(time){
			  setTimeout(function(){
			    characterCtx.clearRect(dieX-5,dieY-5,70,70);
				characterCtx.drawImage(characterImage,imageX,imageY,60,60,dieX,dieY,60,60);
				imageX +=60;
			  },time*1000);
			})(time);
		}	
	}
	this.characterIsDie = function() {
    	this.characterDie(360,playerCtx,playerImage);
		this.isStop = true;
		this.isDie = true;
		DIE_AUDIO.play();
    }
}
var Player = function(){
	this.points = 0;
	this.initPlayer = function(initX,initY,imageX,imageY,characterImage){// 初始化player
		this.x = initX;
		this.y = initY;	
		this.imageX = imageX;
		this.imageY = imageY;
		this.isDie = false;
		this.clean(playerCtx);
		this.drawCharacter(playerCtx,characterImage);	
	}
	this.playerAction = function(Action,player) {
		if(!this.isDie){
			var PlayerAction = characterMapCollision(this.x,this.y,Action,player);
			if(PlayerAction === DIE){//判定player死亡
				this.isDie = true;
			}
			if(PlayerAction === DROP){//player自由下落判断
				this.isFloat = true;
				this.isStop = false;
			 	this.characterDrop(8,2,180,playerCtx,playerImage);
			 	audioPlay(DROP_AUDIO)
			 	setTimeout(function () {
				   player.playerAction(Action,player);   
				  }, 30);
			}else{
				this.isFloat = false;
				AudioPlayed = false;
				if(PlayerAction === STARTCLIMB){//player开始爬杆判断	
					if(Action === LEFT||Action === UP){
						this.clean(playerCtx);
						this.y=this.y+45;
						this.characterLclimb(3,5,300,playerCtx,playerImage);
					}else if(Action === RIGHT){
						this.clean(playerCtx);
						this.y=this.y+45;
						this.characterRclimb(3,5,240,playerCtx,playerImage);	
					}
				}		
			}
			if(Action === LEFTDIG||Action === RIGHTDIG){
				characterMapCollision(this.x,this.y,Action,player);	
			}	
	        switch(Action){//player四个方向移动
	        	case DIE:
	        		this.characterDie(360,playerCtx,playerImage);
	        		this.isStop = true;
	        		this.isDie = true;
	        		DIE_AUDIO.play();
	        		break; 
	            case UP:		
					if(PlayerAction === UP){//判断是否可以在此方向移动
						this.characterUp(2,5,120,playerCtx,playerImage);
						UDMOVE_AUDIO.play();
					}
	                break;    
	            case DOWN:		         
					if(PlayerAction === DOWN){  
						this.characterDown(2,5,120,playerCtx,playerImage);
						UDMOVE_AUDIO.play();
					}
	                break;	
	            case LEFT:
					if (PlayerAction === LEFT){
						this.characterLeft(3,5,60,playerCtx,playerImage);
						LRMOVE_AUDIO.play();	
					}
					if (PlayerAction === CLIMB){
						this.y=this.y-this.y%60+45;
						this.characterLclimb(4,5,300,playerCtx,playerImage);
						LRCLIMB_AUDIO.play();			
					}	
	                break;
				case RIGHT:				
					if (PlayerAction === RIGHT){		
						this.characterRight(3,5,0,playerCtx,playerImage);
						LRMOVE_AUDIO.play();
					}
					if (PlayerAction === CLIMB){
						this.y=this.y-this.y%60+45;	
						this.characterRclimb(3,5,240,playerCtx,playerImage);
						LRCLIMB_AUDIO.play();
					}
	                break;
				};		
        	return {x: this.x, y: this.y};	
        }
    }
}
Player.prototype = new Character();
var Npc = function(){
	this.disLR = 1200;
	this.npcLRX = 0;
	/*this.canLeft = true;
	this.canRight = true;
	this.canUp = false;
	this.canDown = false;*/
	this.initNpc= function(i){// 初始化npc
		if(this.isDie){
			this.x = (i-1)*(1140/(npcNum-1));
			this.y = 0;	
			this.isDie = false;
			this.isFloat = false;
			var BornX = this.x;
			var BornY = this.y;
			var BornImageX = 0;
			var BornImageY = 360;
			var time;
			for (time=0;time < 5;time++){//npc出生动画
				if(time < 4){
					(function(time){
						setTimeout(function(){
						drawNpcBorn(BornImageX,BornImageY);
						BornImageX+=60;
						},time*500);
					})(time);
				}
				if(time == 4){
					(function(time){
						setTimeout(function(){
							BornImageX = 0;
							if(BornX <= 570){
								BornImageY = 0;
							}else{
								BornImageY = 60;
							}
							drawNpcBorn(BornImageX,BornImageY);
							BornImageX+=60;
						},time*500);
					})(time);
				}	
			}	
		}		
		function drawNpcBorn(BornImageX,BornImageY){
			npcCtx.clearRect(BornX,BornY,60,60);
			npcCtx.drawImage(npcImage,BornImageX,BornImageY,60,60,BornX,BornY,60,60);
		}
	}
	this.npcAction = function(Action,npc) {
		if(!this.isDie){
			var NpcAction = characterMapCollision(this.x,this.y,Action,npc);
			if(NpcAction === DIE){//判定player死亡
				this.isDie = true;
			}
			if(NpcAction === DROP){	
				this.isFloat = true;
				this.isStop = false;
			 	this.characterDrop(8,2,180,npcCtx,npcImage);
			 	setTimeout(function(){
			 		npc.npcAction(Action,npc);
				}, 40); 
			}else{
				this.isFloat = false;
				if(NpcAction === STARTCLIMB){	
					if(Action === LEFT||Action === UP){
						this.clean(npcCtx);
						this.y=this.y+45;
						this.characterLclimb(3,5,300,npcCtx,npcImage);
					}else if(Action === RIGHT){
						this.clean(npcCtx);
						this.y=this.y+45;
						this.characterRclimb(3,5,240,npcCtx,npcImage);	
					}
				}		
			}	
	        switch(Action){
	            case UP:		
					if(NpcAction === UP){
						this.characterUp(2,3,120,npcCtx,npcImage);
					}
	                break;    
	            case DOWN:		         
					if(NpcAction === DOWN){  
						this.characterDown(2,3,120,npcCtx,npcImage);
					}
	                break;	
	            case LEFT:
					if (NpcAction === LEFT){
						this.characterLeft(3,5,60,npcCtx,npcImage);	
					}
					if (NpcAction === CLIMB){
						this.y=this.y-this.y%60+45;
						this.characterLclimb(3,5,300,npcCtx,npcImage);			
					}	
	                break;
				case RIGHT:				
					if (NpcAction === RIGHT){		
						this.characterRight(3,5,0,npcCtx,npcImage);
					}
					if (NpcAction === CLIMB){
						this.y=this.y-this.y%60+45;	
						this.characterRclimb(3,5,240,npcCtx,npcImage);
					}
	                break;
				};		
	        return {x: this.x, y: this.y};	
	    }
    }
	
}
Npc.prototype = new Character();