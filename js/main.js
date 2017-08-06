var ctx;//2d画布
var mapCtx;//砖墙画布
var characterCtx;//人物画布
var overCtx;//结束画布
var menu = null;//菜单
var menuNum = 1;//菜单选项序号
var stage = null;//舞台
var map = null;//地图对象
var Level = 1;//地图等级难度
var Maps = null;//地图json数据
var maps = [null];//地图数组数据
var mapNum = 1;//地图道具序号
var player = null;//玩家
var npc = [null];//npc数组
var npcNum = 2;  //npc数量
var time = [null];//计时器
var GAME_STATE = GAME_STATE_MENU //游戏初始状态状态
var AudioPlayed = false;//判断音乐是否播放过
var GameIsStart = false;//判断游戏是否已经开始
var GameIsWin = false;//判断游戏是否已经胜利
var GameIsOver = false;//判断游戏是否已经结束
window.onload=function(){
	initScreen();
	initObject();
	loadMaps();
	setInterval(gameLoop,20);
}
function initScreen(){//初始化窗口
	var canvas = $("#stageCanvas");
	ctx = canvas[0].getContext("2d");
	canvas.attr({"width":SCREEN_WIDTH+60});
	canvas.attr({"height":SCREEN_HEIGHT+30});
	mapCtx = $("#mapCanvas")[0].getContext("2d");	
	$("#mapCanvas").attr({"width":SCREEN_WIDTH});
	$("#mapCanvas").attr({"height":SCREEN_HEIGHT});
	playerCtx = $("#playerCanvas")[0].getContext("2d");
	$("#playerCanvas").attr({"width":SCREEN_WIDTH});
	$("#playerCanvas").attr({"height":SCREEN_HEIGHT});
	npcCtx = $("#npcCanvas")[0].getContext("2d");
	$("#npcCanvas").attr({"width":SCREEN_WIDTH});
	$("#npcCanvas").attr({"height":SCREEN_HEIGHT});
}
function initObject(){//初始化对象
	menu = new Menu(ctx);
	stage = new Stage(ctx);
	map = new Map(mapCtx);
	player = new Player();
	for (var i = 1; i <= npcNum; i++) {
		npc[i] = new Npc();
	}
}
function initMap(){	//初始化地图
	map.setMapLevel(Level);
	map.draw();
}
function initCharacter(){//初始化人物
	player.initPlayer(570,180,0,0,playerImage);//player初始状态
	for (var i = 1; i <= npcNum; i++) {
		npc[i].initNpc(i);//npc初始状态	
		NpcStart(i);//npc开始移动	
	}
}	
function gameLoop(){//实时状态监测
	switch(GAME_STATE){	
	case GAME_STATE_MENU:
		menu.drawMenu(menuNum);
		audioPlay(MENU_AUDIO);
		break;
	case GAME_STATE_INIT:
		MENU_AUDIO.pause();
		MENU_AUDIO.currentTime = 0;
		audioPlay(STAGE_AUDIO);
		stage.drawLevel();
		break;
	case GAME_STATE_START:
		if(GameIsStart){
			GameIsStart = false;
			STAGE_AUDIO.pause();
			STAGE_AUDIO.currentTime = 0;
			AudioPlayed = false;
	    	initMap();
	    	initCharacter();
			GAME_STATE = GAME_STATE_GAME;
		}
		break;
	case GAME_STATE_GAME:
		if(!player.isDie&&GAME_STATE == GAME_STATE_GAME){ 
			BGMUSIC_AUDIO.play();
		}else{
			BGMUSIC_AUDIO.pause();
			BGMUSIC_AUDIO.currentTime = 0;
		}
		if(!GameIsOver){
			for (var i = 1; i <= npcNum; i++){
				if(!CheckCollision(player,npc[i])){
					GameIsOver = true;
					player.playerAction(DIE,player);
					setTimeout(function(){
				    	GAME_STATE = GAME_STATE_OVER;	
				  },3000);	
				}
			}
			for (var j = 1; j <= npcNum; j++){
				for (var k = j+1; k <= npcNum; k++){	
					if(!CheckCollision(npc[j],npc[k])){
						npc[j].isStop = true;	
					}else{
						npc[j].isStop = false;
					}
				}
			}
		}
		if(GameIsWin){
			BGMUSIC_AUDIO.pause();
			BGMUSIC_AUDIO.currentTime = 0;
			GETALLGOLD_AUDIO.play();
			GameIsWin = false;
			setTimeout(function(){
			    GAME_STATE = GAME_STATE_WIN; 
			    setZindex();  
			},2500);
		}
		break;
	case GAME_STATE_WIN:
		if(!GameIsStart){
			BGMUSIC_AUDIO.pause();
			GETALLGOLD_AUDIO.pause();
			WIN_AUDIO.play();
			cleanAll();
			stage.drawGamewin();
			GameIsStart = true;
			setTimeout(function(){
				WIN_AUDIO.pause();
				GAME_STATE = GAME_STATE_START;
				setZindex();
				cleanAll();	
			},11000);
		}
		break;
	case GAME_STATE_OVER:
		if(GameIsOver){
			setZindex();
			GameIsOver = false;
			cleanAll();
			stage.drawGameover();
			setTimeout(function(){
				player.points = 0;
				cleanAll();
		    	GAME_STATE = GAME_STATE_MENU;
		    	setZindex();	
			},4000);
		}
		break;
	case GAME_STATE_CREATEMAP:
		MENU_AUDIO.pause();
		MENU_AUDIO.currentTime = 0;
		break;
	case GAME_STATE_ABOUT:
		MENU_AUDIO.pause();
		MENU_AUDIO.currentTime = 0;
		break;
	}
}
$(document).keydown(function(e){
	var Action=e.keyCode;//对应字母的ascii码
	if(GAME_STATE === GAME_STATE_INIT){
		switch(Action){
	        case UP:
	            if(Level <= 1){
	                Level = maps.length-1;
	            }else{
	                Level--;
	            }
	            break;
	        case DOWN:
	            if(Level >= maps.length-1){
	                Level = 1;
	            }else{
	                Level++;
	            }
	            break;
	        case ENTER:
        		stage.cleanStage(); 
                AudioPlayed = false;
                GameIsStart = true;
                GAME_STATE = GAME_STATE_START;
                setZindex(); 
				break;
			case ESC:
	        	GAME_STATE = GAME_STATE_MENU;
	        	setZindex();	
				break;
	    }   
	}
	if(GAME_STATE === GAME_STATE_CREATEMAP){
		ChangeMaps(Action);
	}
	if(GAME_STATE === GAME_STATE_ABOUT){
		if(Action === ESC){
			cleanAll();
			GAME_STATE = GAME_STATE_MENU;
		}
		switch(Action){
	        case UP:
	            stage.drawAbout("w");
	            break;
	        case DOWN:
	            stage.drawAbout("s");
	            break;
			case ESC:
	        	cleanAll();
				GAME_STATE = GAME_STATE_MENU;
				setZindex();
				break;
	    }
	}
	if(GAME_STATE === GAME_STATE_MENU){
		switch(Action){
	        case UP:
	            if(menuNum <= 1){
	                menuNum = 3;
	            }else{
	                menuNum--;
	            }
	            break;
	        case DOWN:
	            if(menuNum >= 3){
	                menuNum = 1;
	            }else{
	                menuNum++;
	            }
	            break;
	        case ENTER:
	        	if(menuNum == 1){
	        		menu.cleanMenu();	
	        		GAME_STATE = GAME_STATE_INIT;
	        		AudioPlayed = false;
	        	}else if(menuNum == 2){
	        		menu.cleanMenu();	
	        		GAME_STATE = GAME_STATE_CREATEMAP;
	        		Level = maps.length;
	        		stage.drawNewmaps();
	        	}else{
	        		menu.cleanMenu();
	        		GAME_STATE = GAME_STATE_ABOUT;
	        		stage.drawAbout("m");
	        	}
				break;
	    	}   
		}	
	if(GAME_STATE === GAME_STATE_GAME){
		if(Action === ESC){
			cleanAll();
			player.points = 0;
			GAME_STATE = GAME_STATE_MENU;
			setZindex();		
		}
		if(!player.isFloat && !player.isDie){
			player.isStop = false;	
			player.playerAction(Action,player);
		}
	}
});
$(document).keyup(function(e){
	if(GAME_STATE === GAME_STATE_GAME){
		if(!player.isDie){
			player.isStop = true;
			player.imgFlash(1,player.imageY,playerCtx,playerImage);	
		}
	}
});
function audioPlay(AUDIO){//音乐单次播放限制
	if(!AudioPlayed){
		AUDIO.play();
		AudioPlayed = true;
	}
}
function gameWin(){
	if(Level >= maps.length-1){
        Level = 1;
    }else{
        Level++;
    }
	GameIsWin = true;
}
function cleanAll(){
	map.clean(0,0,1200,660);
	stage.cleanStage();
	for (var i = 1; i <= npcNum; i++){
		window.clearInterval(time[i]);
		npc[i].clean(npcCtx);
		npc[i].isDie = true;
		npc[i].isFloat = false;
	}
	player.clean(playerCtx);
}
function setZindex(){
	if(GAME_STATE === GAME_STATE_GAME||GAME_STATE === GAME_STATE_START||GAME_STATE === GAME_STATE_CREATEMAP){
		zindex("stageCanvas",0);
		zindex("mapCanvas",1);
		zindex("playerCanvas",1);
		zindex("npcCanvas",1);
	}else{
		zindex("stageCanvas",1);
		zindex("mapCanvas",0);
		zindex("playerCanvas",0);
		zindex("npcCanvas",0);
	}
	function zindex(id,z){
		document.getElementById(id).style.zIndex = z;
	}
}