function NpcStart(i){
	(function(i){
		setTimeout(function(){	
			time[i] = setInterval(function(){
				NpcAction(i)
			},40); 
		},3000);
	})(i);	
}
function NpcAction(i){	
	if(!npc[i].isDie&&!npc[i].isFloat){
		npc[i].disLR = 1200;
		var j = parseInt(npc[i].y/60);
		var J = parseInt((npc[i].y+59)/60);
		if(npc[i].y < player.y){	
			for(var k=0;k<map.mapLevel[j].length;k++){
				if(map.mapLevel[j+1][k] == LADDER||map.mapLevel[j+1][k] == ROD){
					if(Math.abs(npc[i].x - k*60)<=npc[i].disLR){
					    npc[i].disLR = Math.abs(npc[i].x - k*60);
					    npc[i].npcLRX = k*60;
					}
				}		
			}
			if(npc[i].disLR != 0){
				if(npc[i].x < npc[i].npcLRX){
					npc[i].npcAction(RIGHT,npc[i]);
				}else{
					npc[i].npcAction(LEFT,npc[i]);
				}
			}else{
				npc[i].npcAction(DOWN,npc[i]);
			}
			
		}else if(npc[i].y > player.y){
			for(var k=0;k<map.mapLevel[j].length;k++){
				if(map.mapLevel[J][k] == LADDER||map.mapLevel[J][k] == ROD){
					if(Math.abs(npc[i].x - k*60)<=npc[i].disLR){
					    npc[i].disLR = Math.abs(npc[i].x - k*60);
					    npc[i].npcLRX = k*60;
					}
				}		
			}
			if(npc[i].disLR != 0){
				if(npc[i].x < npc[i].npcLRX){
					npc[i].npcAction(RIGHT,npc[i]);
				}else{
					npc[i].npcAction(LEFT,npc[i]);
				}
			}else{
				npc[i].npcAction(UP,npc[i]);
			}
		}else{
			if(npc[i].x < player.x){
				npc[i].npcAction(RIGHT,npc[i]);
			}else{
				npc[i].npcAction(LEFT,npc[i]);
			}
		}	
	}
	if(npc[i].isDie){
    	player.points +=500;
    	window.clearInterval(time[i]);		
		(function(i){
			setTimeout(function(){
				npc[i].clean(npcCtx);
				npc[i].initNpc(i);
				NpcStart(i); 
			},3000);
		})(i);
    }
}
