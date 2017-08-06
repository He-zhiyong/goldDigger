/**
 * 检测2个物体是否碰撞
 * @param object1 物体1
 * @param object2 物体2
 * @returns {Boolean} 如果碰撞了，返回true
 */
/**
 * 人物与人物碰撞
 */
function CheckCollision(character1,character2){
 	var distanceX = Math.abs(character1.x - character2.x);
 	var distanceY = Math.abs(character1.y - character2.y);
	if(character1 != player&&character2!= player){
		if((distanceX < 60&&distanceY == 0)||(distanceY < 60&&distanceX == 0)){
			return false;
		}else{
			return true;
		}
	}else if(character1 === player||character2 === player){
		if((distanceY < 30&&distanceX < 30)||(distanceY < 60&&distanceX == 0)||(distanceY == 0&&distanceX <60)){
			return false;
		}else{
			return true;
		}
	}
}
/**
 * 人物与地图块碰撞
 */
function characterMapCollision(tempX,tempY,Action,character){
	var i = parseInt((tempY+1)/60);
	var j = parseInt((tempX+1)/60);
	var I = parseInt((tempY+59)/60);
	var J = parseInt((tempX+59)/60);
	if(character == player&&map.mapLevel[i][j] == GOLD&&map.mapLevel[I][J] == GOLD){//捡起金块
		GETGOLD_AUDIO.play();
		map.clean(tempX+1,tempY,58,59);
		map.mapLevel[i][j] = NULL;
		map.goldNum--;
		if(map.goldNum === 0){
			gameWin();
		}
		player.points +=100;
	}
	if((map.mapLevel[i][j-1] == WALL&&map.mapLevel[i][j] == NULL&&character != player)||(map.mapLevel[i][j+1] == WALL&&map.mapLevel[i][j] == NULL&&character != player)){
		//判断NPC死亡
			map.mapLevel[i][j] = WALL;
			return DIE;
	}
	if ((map.mapLevel[i][j] == NULL&&map.mapLevel[i][J] == NULL&&map.mapLevel[i+1][j] == NULL&&map.mapLevel[i+1][J] == NULL)||
		(map.mapLevel[i][j] == NULL&&map.mapLevel[i][J] == NULL&&map.mapLevel[i+1][j] == ROD&&map.mapLevel[i+1][J] == ROD)||
		((map.mapLevel[i][j] == WALL&&map.mapLevel[I][J] == NULL)||(map.mapLevel[i][J] == WALL&&map.mapLevel[I][j] == NULL))||
		(map.mapLevel[i][j] == NULL&&map.mapLevel[i][J] == NULL&&map.mapLevel[i+1][j] == GOLD)||
		(map.mapLevel[i][j] == NULL&&map.mapLevel[i][J] == NULL&&map.mapLevel[i+1][J] == GOLD)) {
		if((map.mapLevel[i][j-1] == WALL&&map.mapLevel[i][j] == NULL&&character != player)||(map.mapLevel[i][j+1] == WALL&&map.mapLevel[i][j] == NULL&&character != player)){
			//判断NPC死亡
			map.mapLevel[i][j] = WALL;
			return DIE;
		}else{//判断人物自由下落
			return DROP;
		}	
		
	}
	if((map.mapLevel[I][J] == WALL||map.mapLevel[i][j] == WALL)&&player.isFloat&&character == player){//判断人物死亡
		character.characterIsDie();
		GameIsOver = true;
		cleanAll();
		setTimeout(function(){
	    	GAME_STATE = GAME_STATE_OVER;
	    	setZindex();	
	    },3000);    
		return DIE;
	}
	if(map.mapLevel[i][j] == ROD&&map.mapLevel[i][J] == ROD){
		if(map.mapLevel[I][j] == NULL&&map.mapLevel[I][J] == NULL&&Action != DOWN){
			return CLIMB;
		}else if(map.mapLevel[I][j] == NULL&&map.mapLevel[I][J] == NULL&&Action == DOWN){
			return DROP;
		}else{
			return STARTCLIMB;
		}
	}	
	switch(Action){
		case UP:
			if (tempY < 5) {	
				return false;
			};			
			if(map.mapLevel[I][J] == LADDER&&map.mapLevel[I][j] == LADDER){
				return UP;
			}
			break;    
		case DOWN:		
			if (tempY>= 600) {
				return false;
			};	         
			if(map.mapLevel[i+1][J] == LADDER&&map.mapLevel[i+1][j] == LADDER){  
				return DOWN;
			}
			break;		
		case LEFT:
			if (tempX < 5) {
				return false;
			};
			if(map.mapLevel[I][J] == LADDER&&map.mapLevel[I+1][J-1] == NULL){  
				return LEFT;
			}
			if(map.mapLevel[i][J-1] != WALL&&map.mapLevel[I][J-1] != WALL){				
				return LEFT;
			}
			break;
		case RIGHT:
			if (tempX>= 1140) {
				return false;
			};
			if(map.mapLevel[I][j] == LADDER&&map.mapLevel[I+1][j+1] == NULL){  
				return RIGHT;
			}
			if(map.mapLevel[i][j+1] != WALL&&map.mapLevel[I][j+1] != WALL) {	
				return RIGHT;
			}
			break;
		case LEFTDIG:
			if((map.mapLevel[i+1][J-1] == WALL&&map.mapLevel[i+1][j-1] == WALL)
				&&(map.mapLevel[i][J-1] != LADDER&&map.mapLevel[i][j-1] != LADDER)
				&&(map.mapLevel[i][J-1] != GOLD&&map.mapLevel[i][j-1] != GOLD)){	
				map.drawDigWall(i+1,j-1);
				DIG_AUDIO.play();
			}
			break;
		case RIGHTDIG:
			if((map.mapLevel[i+1][J+1] == WALL&&map.mapLevel[i+1][j+1] == WALL)
				&&(map.mapLevel[i][J+1] != LADDER&&map.mapLevel[i][j+1] != LADDER)
				&&(map.mapLevel[i][J+1] != GOLD&&map.mapLevel[i][j+1] != GOLD)){
				map.drawDigWall(i+1,J+1);
				DIG_AUDIO.play();
			}
			break;
	};		
}

