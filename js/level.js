/*如果浏览器中没有地图数据创建初始数据*/
if(localStorage.getItem("mapData") == null){
	var mapData = [null]
	/**
	 * 地图数组示例
	 * 0：空地 1：砖墙 2：梯子 3：横杆 4：黄金 
	 */
	var newMap = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,2,3,3,3,3,3,3,2,1,1,1,1,1,1],
			[0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0],
			[0,0,0,4,0,0,2,0,4,0,0,4,0,2,0,0,4,0,0,0],
			[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],
			[0,2,0,0,0,4,0,0,0,0,0,0,0,0,4,0,0,0,2,0],
			[1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],
			[0,0,0,0,2,0,0,4,0,0,0,0,4,0,0,2,0,0,0,0],
			[0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0],
			[0,2,0,0,4,0,0,0,0,0,4,0,0,0,0,4,0,0,2,0],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		];
	mapData.push(newMap)
	localStorage.setItem("mapData",JSON.stringify(mapData))
}

function loadMaps(){
	/**
	 * AJAX获取json地图数据
	 * 依据地图的当前状态创建相应的地图数组
	 */
	/*var xmlhttp;
	if (window.XMLHttpRequest){
	//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}else{
	// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","gameMapServlet",true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
	  		Maps = eval(xmlhttp.responseText); 
	  		for(var i=1;i<=Maps.length;i++){
			  	if(Maps[i-1].status){
			  		maps[i] = eval(Maps[i-1].gameMapStr);
			  	}
			}
		}
	}*/


	/*直接从浏览器存储中拿数据*/
	maps = JSON.parse(localStorage.getItem("mapData"))
}

function SaveMaps(){
	/**
	 * AJAX发送json地图数据到后台
	 * 后台将json解析插入到数据库中
	 */
	/*var newMap = {
         "gameMapStr":JSON.stringify(maps[Level]),
         "name":"map"+Level
     }
	Maps.push(newMap);
	$.ajax({
		type:'POST', //GET
	    async:true,  //或false,是否异步
    	timeout:5000,
        url:"insert",
        data:newMap,
        dataType:"json",
        success:function(result){
           if(result.success == true){
             stage.drawSaveMap("yes");
             maps = [null];
             loadMaps();
           }else{
             stage.drawSaveMap("no");
           }
        }
    })*/

    /*直接把地图数据存储到浏览器中数据*/
  	localStorage.setItem("mapData",JSON.stringify(maps))
  	stage.drawSaveMap("yes");
	maps = [null];
	loadMaps();
}


function CreateMaps(){
	var tempMap = new Array();
	for(var i=0;i<11;i++){
		tempMap[i] = new Array();
		for(var j=0;j<20;j++){
			tempMap[i][j] = NULL;
		}
	}
	maps[Level] = tempMap;
}
var mapX = 0;
var mapY = 0;
var begin = false;
var over = false;
function ChangeMaps(Action){
	mapCtx.clearRect(0,0,1260,660);
	if(Action === ENTER){
		setZindex();
		begin = true;
		over = false;
		CreateMaps();
		stage.cleanStage();		
		map.drawCursor(mapX,mapY);
		initMap();
		player.initPlayer(570,180,0,0,playerImage);//player初始状态
		for (var i = 1; i <= npcNum; i++) {
			npc[i].initNpc(i);//npc初始状态	
		}	
	}else if(begin){
		switch(Action){	
	        case UP:     	
	        	if(mapY > 0){
	        		mapY-=60;
	        	}
	        	map.drawCursor(mapX,mapY);
	            break;
	        case DOWN:    	
	        	if(mapY < 600){
	        		mapY+=60;
	        	}
	        	map.drawCursor(mapX,mapY);
	            break;
	        case LEFT:     	
	        	if(mapX > 0){
	        		mapX-=60;
	        	}
	        	map.drawCursor(mapX,mapY);
	            break;
	        case RIGHT:        	
	        	if(mapX < 1140){
	        		mapX+=60;
	        	}
	        	map.drawCursor(mapX,mapY);
	            break;
	        case LEFTDIG:
	        	if(mapNum <= 0){
	                mapNum = 4;
	            }else{
	                mapNum--;
	            }
	            maps[Level][mapY/60][mapX/60] = mapNum;
	            break;
	        case RIGHTDIG:
	        	if(mapNum >= 4){
	                mapNum = 0;
	            }else{
	                mapNum++;
	            }         
	            maps[Level][mapY/60][mapX/60] = mapNum;
	            break;    
	    	}   
		initMap();
	}
	if(Action === ESC){
		begin = false;
		over = true;
		cleanAll();
		stage.drawSaveMap("save");	
	}else if(over){	
		switch(Action){
			case YES:
				cleanAll();
		       	SaveMaps();
		       	setTimeout(function(){
				    GAME_STATE = GAME_STATE_MENU;
				    setZindex();
				    Level = 1; 
				    maps = [null];
	             	loadMaps();     
			  	},3000);
		       	break;
			case NO:
				cleanAll();
			    GAME_STATE = GAME_STATE_MENU;
			    setZindex();
			    Level = 1; 
			    maps = [null];
             	loadMaps(); 	    
				break;	
	    } 
	}
}
