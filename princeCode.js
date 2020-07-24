window.onload=showFirst;	  //載入就執行
var rdmArray = [50];          //儲存地圖陣列
var CardName=[0,0,0,0,0];     //出牌id
var rdmcard = [100];          //儲存一般手牌陣列
var ifcard = [10];            //儲存條件手牌陣列
var nowCard=-1;               //當前一般手牌陣列位置
var nowIfCard=-1;             //當前條件手牌陣列位置
var picindex=0;               //手牌圖片檔名
var strCard;                  //一般手牌文字說明
var CardFlag=[0,0,0,0,0,0,0]; //目前手牌
var emptyCard=0;              //( 5 - 當前一般手牌)
var emptyPlayingCard=0;       //( 5 - 當前要出的手牌)
var state=1;                  //遊玩狀態 ( 出牌 or 抽牌 )
var cardCount=0;              //補牌數
var character=1;              //角色狀態
var x=5,y=0;                  //角色位置
var nextMap;                  //下一張地圖
var nowtMap;                  //目前地圖   
var moveFlag=0;               //移動條件手牌判定
var delayInMilliseconds = 600; //0.6 second
var count=0;                   //迴圈執行次數
var errorMessage='';           //無法移動之錯誤訊息
var MapText;                   //地圖文字
var outputFlag = false;        //角色是否執行動作
var IfLoop = false;            //判定是否出條件手牌

function getRandomMap(maxnum , n) 
{    //隨機產生不重覆的n個數字
	for(var i=1; i<n; i++) {
		var rdm = 0;        //暫存的亂數
		do {
				var exist = false;          //此亂數是否已存在
				rdm = Math.floor(Math.random()*maxnum)+1;    //取得亂數
				//檢查亂數是否存在於陣列中，若存在則繼續迴圈
				if(rdmArray.indexOf(rdm) != -1) exist = true;
			} while (exist);    //產生沒出現過的亂數時離開迴圈
				
			rdmArray[i] = rdm;
	}
	return rdmArray;
}
	
function showmap()  //地圖顯示
{
	for(var j=1; j<47; j++)
	{
		//var k=j+1;
		var id='map'+j;
		var index;
		elementimg=document.getElementById(id);
		
		if(rdmArray[j] <= 9 ) { index=1; }
		else if(rdmArray[j] > 9  && rdmArray[j] <= 18 ) { index=2; }
		else if(rdmArray[j] > 18 && rdmArray[j] <= 27 ) { index=3; }
		else if(rdmArray[j] > 27 && rdmArray[j] <= 34 ) { index=4; }
		else if(rdmArray[j] > 34 && rdmArray[j] <= 41 ) { index=5; }
		else if(rdmArray[j] > 41 && rdmArray[j] <= 48 ) { index=6; }
		else if(rdmArray[j] > 48 && rdmArray[j] <= 55 ) { index=7; }
		else if(rdmArray[j] > 55 && rdmArray[j] <= 62 ) { index=8; }
		else if(rdmArray[j] > 62 && rdmArray[j] <= 69 ) { index=9; }
		else if(rdmArray[j] > 69 && rdmArray[j] <= 76 ) { index=10; }
		else if(rdmArray[j] > 76 && rdmArray[j] <= 83 ) { index=11; }
		else if(rdmArray[j] > 83 && rdmArray[j] <= 90 ) { index=12; }
		else if(rdmArray[j] > 90 && rdmArray[j] <= 93 ) { index=13; }
		else if(rdmArray[j] > 93 && rdmArray[j] <= 96 ) { index=14; }
		else if(rdmArray[j] > 96 && rdmArray[j] <= 100 ) { index=15; }
		else if(rdmArray[j] == 101 ) { index=1; }
		else if(rdmArray[j] == 102 ) { index=2; }
		else if(rdmArray[j] == 103 ) { index=3; }
		
		elementimg.src="ImgMap/"+index+".png";
	}
	rdmArray[47]=1001;
}
	
function showFirst()  //初始化
{
	getRandomMap(100,47) ;
	showmap();
	getRandomCard(100,99);
	getRandomIfCard(10,9);
	showbox();
	StartCard();
	document.getElementById("loading").style =  "display:none;" ;
	document.getElementById("btnGetCard").style.display="inline"; 
	document.getElementById("btnClean").style.display="none"; 
	document.getElementById("btnQuit").style.display="none";
	document.getElementById("btnPath").style.display="none";		
	document.getElementById("btnPathQuit").style.display="none";
	document.getElementById("IfCard2").style.display="none";
	document.getElementById("IfCard3").style.display="none";
	document.getElementById("IfCard4").style.display="none";
	document.getElementById("IfCard5").style.display="none";
	document.getElementById("IfCard6").style.display="none";
	document.getElementById("IfCard7").style.display="none";
	document.getElementById("IfCard8").style.display="none";	
	document.getElementById("IfCard9").style.display="none";	
}

function AllowDrop(event)
{
	event.preventDefault();
}

function Drag(event)
{
	event.dataTransfer.setData("text",event.currentTarget.id);
}

function Drop(event)
{
	event.preventDefault();
	var data=event.dataTransfer.getData("text");	
	if(data <= 100  && document.getElementById(event.currentTarget.id).children.length == 0)
	{
		event.currentTarget.appendChild(document.getElementById(data));
		switch(event.currentTarget.id) {
			case 'Box1':
				CardName[5]=data;
				break;
			case 'Box2':
				CardName[0]=data;
				break;
			case 'Box3':
				CardName[1]=data;
				break;
			case 'Box4':
				CardName[2]=data;
				break;
			case 'Box5':
				CardName[3]=data;
				break;
			case 'Box6':
				CardName[4]=data;
				break;
			default:
				break;			
		}
		showbox();
	}
	
}

function Drop2(event)
{
	event.preventDefault();
	var data=event.dataTransfer.getData("text");	
	if(data > 100  && document.getElementById(event.currentTarget.id).children.length == 0)
	{
		event.currentTarget.appendChild(document.getElementById(data));
		switch(event.currentTarget.id) {
			case 'Box1':
				CardName[5]=data;
				break;
			case 'Box2':
				CardName[0]=data;
				break;
			case 'Box3':
				CardName[1]=data;
				break;
			case 'Box4':
				CardName[2]=data;
				break;
			case 'Box5':
				CardName[3]=data;
				break;
			case 'Box6':
				CardName[4]=data;
				break;
			default:
				break;			
		}
		showbox();
	}
}
function trash(event)  //棄牌區
{
	event.preventDefault();
	var data=event.dataTransfer.getData("text");
	event.currentTarget.appendChild(document.getElementById(data));
	document.getElementById("trashcan").innerHTML='';
}

function getRandomCard(maxnum , n) 
{    //隨機產生不重覆的n個數字
	for(var i=0; i<n; i++) 
	{
		var rdm = 0;        //暫存的亂數

		do {
			var exist = false;          //此亂數是否已存在
			rdm = Math.floor(Math.random()*maxnum)+1;    //取得亂數
			
			//檢查亂數是否存在於陣列中，若存在則繼續迴圈
			if(rdmcard.indexOf(rdm) != -1) exist = true;
			
		} while (exist);    //產生沒出現過的亂數時離開迴圈
		
		rdmcard[i] = rdm;
	}
	return rdmcard;
}

function getRandomIfCard(maxnum , n) 
{    //隨機產生不重覆的n個數字
	for(var i=0; i<n; i++) 
	{
		var rdm = 0;        //暫存的亂數

		do {
			var exist = false;          //此亂數是否已存在
			rdm = Math.floor(Math.random()*maxnum)+101;    //取得亂數
			
			//檢查亂數是否存在於陣列中，若存在則繼續迴圈
			if(ifcard.indexOf(rdm) != -1) exist = true;
			
		} while (exist);    //產生沒出現過的亂數時離開迴圈
		
		ifcard[i] = rdm;
	}
	return ifcard;
}

function IfCardData()  //條件手牌資訊
{
	nowIfCard = nowIfCard+1;
	if(ifcard[nowIfCard] > 100 && ifcard[nowIfCard] <= 103)
	{
		picindex = 11;
	}
	else if(ifcard[nowIfCard] > 103 && ifcard[nowIfCard] <= 106)
	{
		picindex = 12;
	}
	else if(ifcard[nowIfCard] > 106)
	{
		picindex = 13;
	}
}

function nextMapText(nextMap)
{
	if(nextMap <= 9 ) { MapText='紅色一般道路'; }
	else if(nextMap > 9  && nextMap <= 18 ) { MapText='綠色一般道路'; }
	else if(nextMap > 18 && nextMap <= 27 ) { MapText='藍色一般道路'; }
	else if(nextMap > 27 && nextMap <= 34 ) { MapText='紅色斷橋'; }
	else if(nextMap > 34 && nextMap <= 41 ) { MapText='綠色斷橋'; }
	else if(nextMap > 41 && nextMap <= 48 ) { MapText='藍色斷橋'; }
	else if(nextMap > 48 && nextMap <= 55 ) { MapText='紅色湖泊'; }
	else if(nextMap > 55 && nextMap <= 62 ) { MapText='綠色湖泊'; }
	else if(nextMap > 62 && nextMap <= 69 ) { MapText='藍色湖泊'; }
	else if(nextMap > 69 && nextMap <= 76 ) { MapText='紅色怪獸'; }
	else if(nextMap > 76 && nextMap <= 83 ) { MapText='綠色怪獸'; }
	else if(nextMap > 83 && nextMap <= 90 ) { MapText='藍色怪獸'; }
	else if(nextMap > 90 && nextMap <= 93 ) { MapText='紅色寶箱'; }
	else if(nextMap > 93 && nextMap <= 96 ) { MapText='綠色寶箱'; }
	else if(nextMap > 96 && nextMap <= 100 ) { MapText='藍色寶箱'; }
	else if(nextMap == 101 ) { MapText='紅色一般道路'; }
	else if(nextMap == 102 ) { MapText='綠色一般道路'; }
	else if(nextMap == 103 ) { MapText='藍色一般道路'; }
	else {MapText='邊界'}
}

function CardData()  //一般手牌資訊
{
	nowCard=nowCard+1;
	if(rdmcard[nowCard] <= 16)
		{ picindex = 1; strCard = "通過道路及寶箱,前進一格。" }
	else if(rdmcard[nowCard] > 16 && rdmcard[nowCard] <= 31)
		{ picindex = 2; strCard = "原地右轉。" }
	else if(rdmcard[nowCard] > 31 && rdmcard[nowCard] <= 46)
		{ picindex = 3; strCard = "原地左轉。" }
	else if(rdmcard[nowCard] > 46 && rdmcard[nowCard] <= 61)
		{ picindex = 4; strCard = "無視障礙 , 後退一格。" }
	else if(rdmcard[nowCard] > 61 && rdmcard[nowCard] <= 72)
		{ picindex = 5; strCard = "木板 , 可通過斷橋及寶箱。" }
	else if(rdmcard[nowCard] > 72 && rdmcard[nowCard] <= 83)
		{ picindex = 6; strCard = "小船 , 可通過湖泊及寶箱。" }
	else if(rdmcard[nowCard] > 83 && rdmcard[nowCard] <= 94)
		{ picindex = 7; strCard = "甜品 , 可通過怪獸及寶箱。" }
	else if(rdmcard[nowCard] > 94 && rdmcard[nowCard] <= 98)
		{ picindex = 8; strCard = "通過道路及寶箱,前進兩格。" }
	else if(rdmcard[nowCard] > 98 && rdmcard[nowCard] <= 100)
		{ picindex = 9; strCard = "無視障礙 , 前進一步。" }
}

function StartCard()   //起手卡牌
{
	IfCardData();
	document.getElementById("IfCard1").innerHTML=
		'<div class="card border-warning mb-3" style="width: 108px; height:68px" id="'+ifcard[nowIfCard]+'" draggable="true" ondragstart="Drag(event)">'+
		'<img src="ImgCard/'+picindex+'.png" class="card-img-top" style="width: 108px; height:68px;" alt="" >'+
	'</div>';
	CardData();
	document.getElementById("card1").innerHTML=
		'<div class="card border-warning mb-3" style="width: 108px; height:132px" id="'+rdmcard[nowCard]+'" draggable="true" ondragstart="Drag(event)">'+
		'<img src="ImgCard/'+picindex+'.jpg" class="card-img-top" style="width: 110px; height:60px;" alt="" >'+
		'<div class="card-body" style="padding-left: 10px;padding-right: 10px; ">'+
		'<p class="card-text" style="font-size:85%">'+strCard+'</p>'+
		'</div>'+
	'</div>';
	CardData();
	document.getElementById("card2").innerHTML=
		'<div class="card border-warning mb-3" style="width: 108px; height:132px" id="'+rdmcard[nowCard]+'" draggable="true" ondragstart="Drag(event)">'+
		'<img src="ImgCard/'+picindex+'.jpg" class="card-img-top" style="width: 110px; height:60px;" alt="" >'+
		'<div class="card-body" style="padding-left: 10px;padding-right: 10px; ">'+
		'<p class="card-text" style="font-size:85%">'+strCard+'</p>'+
		'</div>'+
	'</div>';
	CardData();
	document.getElementById("card3").innerHTML=
		'<div class="card border-warning mb-3" style="width: 108px; height:132px" id="'+rdmcard[nowCard]+'" draggable="true" ondragstart="Drag(event)">'+
		'<img src="ImgCard/'+picindex+'.jpg" class="card-img-top" style="width: 110px; height:60px;" alt="" >'+
		'<div class="card-body" style="padding-left: 10px;padding-right: 10px; ">'+
		'<p class="card-text" style="font-size:85%">'+strCard+'</p>'+
		'</div>'+
	'</div>';
}

function checkCard() //確認目前手牌
{
	emptyCard = 0;
	if(document.getElementById("card1").children.length > 0) { CardFlag[0]=1; }
	else { CardFlag[0]=0; emptyCard+=1; }
	
	if(document.getElementById("card2").children.length > 0) { CardFlag[1]=1; }
	else { CardFlag[1]=0; emptyCard+=1; }
	
	if(document.getElementById("card3").children.length > 0) { CardFlag[2]=1; }
	else { CardFlag[2]=0; emptyCard+=1; }
	
	if(document.getElementById("card4").children.length > 0) { CardFlag[3]=1; }
	else { CardFlag[3]=0; emptyCard+=1; }
	
	if(document.getElementById("card5").children.length > 0) { CardFlag[4]=1; }
	else { CardFlag[4]=0; emptyCard+=1; }
	
	if(document.getElementById("card6").children.length > 0) { CardFlag[5]=1; }
	else { CardFlag[5]=0; emptyCard+=1; }
}

function checkIfBox() //檢查條件手牌
{
	if(document.getElementById("IfCard1").children.length == 0 && document.getElementById("IfCard2").children.length == 0 && document.getElementById("IfCard3").children.length == 0 && 
		document.getElementById("IfCard4").children.length == 0 && document.getElementById("IfCard5").children.length == 0 && document.getElementById("IfCard6").children.length == 0 && 
		document.getElementById("IfCard7").children.length == 0 && document.getElementById("IfCard8").children.length == 0 && document.getElementById("IfCard9").children.length == 0) { document.getElementById("IfCard1").style.display="inline"; }
	else
	{
		if(document.getElementById("IfCard1").children.length == 0) { document.getElementById("IfCard1").style.display="none"; }
	}	
	if(document.getElementById("IfCard2").children.length == 0) { document.getElementById("IfCard2").style.display="none"; }
	
	if(document.getElementById("IfCard3").children.length == 0) { document.getElementById("IfCard3").style.display="none"; }
	
	if(document.getElementById("IfCard4").children.length == 0) { document.getElementById("IfCard4").style.display="none"; }
	
	if(document.getElementById("IfCard5").children.length == 0) { document.getElementById("IfCard5").style.display="none"; }
	
	if(document.getElementById("IfCard6").children.length == 0) { document.getElementById("IfCard6").style.display="none"; }
	
	if(document.getElementById("IfCard7").children.length == 0) { document.getElementById("IfCard7").style.display="none"; }
	
	if(document.getElementById("IfCard8").children.length == 0) { document.getElementById("IfCard8").style.display="none"; }
	
	if(document.getElementById("IfCard9").children.length == 0) { document.getElementById("IfCard9").style.display="none"; }
}

function showButton()
{
	if(state == 1)
	{
		document.getElementById("btnGetCard").style.display="inline"; 
		document.getElementById("btnClean").style.display="none"; 
		document.getElementById("btnQuit").style.display="none"; 
		document.getElementById("btnPath").style.display="none";
		document.getElementById("btnPathQuit").style.display="none";
	}
	else if(state == 2)
	{
		document.getElementById("btnGetCard").style.display="none"; 
		document.getElementById("btnClean").style.display="inline"; 
		document.getElementById("btnQuit").style.display="inline";
		document.getElementById("btnPath").style.display="inline";		
		document.getElementById("btnPathQuit").style.display="none";
	}
	else
	{
		document.getElementById("btnGetCard").style.display="none"; 
		document.getElementById("btnClean").style.display="none"; 
		document.getElementById("btnQuit").style.display="none";
		document.getElementById("btnPath").style.display="none";
		document.getElementById("btnPathQuit").style.display="inline";
	}
}

function checkBox() //檢查出牌區
{
	emptyPlayingCard = 0;
	if(document.getElementById("Box2").children.length == 0) { CardName[0]=0; }
	else{emptyPlayingCard +=1; }
	
	if(document.getElementById("Box3").children.length == 0) { CardName[1]=0; }
	else{emptyPlayingCard +=1; }

	if(document.getElementById("Box4").children.length == 0) { CardName[2]=0; }
	else{emptyPlayingCard +=1; }

	if(document.getElementById("Box5").children.length == 0) { CardName[3]=0; }
	else{emptyPlayingCard +=1; }
	
	if(document.getElementById("Box6").children.length == 0) { CardName[4]=0; }
	else{emptyPlayingCard +=1; }
	
	if(document.getElementById("Box1").children.length == 0) { CardName[5]=0; }
}

function getCard()  //抽牌判定
{
	if(state == 1)
	{
		checkCard();
		var EmptyCareID;
		var newCard=0;
		if(emptyCard < 2 )
		{
			Swal.fire({
			  type: 'error',
			  title: 'Oops...',
			  text: '手牌超過上限!',
			})
		}
		else
		{
			if(cardCount<49)
			{
				for (var i=0;i<6;i++)
				{
					if(CardFlag[i] == 0 && newCard < 2 )
					{
						var j=i+1;
						EmptyCareID = "card" + j;
						CardData();
						document.getElementById(EmptyCareID).innerHTML=
							'<div class="card border-warning mb-3" style="width: 108px; height:132px" id="'+rdmcard[nowCard]+'" draggable="true" ondragstart="Drag(event)">'+
							'<img src="ImgCard/'+picindex+'.jpg" class="card-img-top" style="width: 110px; height:60px;" alt="" >'+
							'<div class="card-body" style="padding-left: 10px;padding-right: 10px; ">'+
							'<p class="card-text" style="font-size:85%">'+strCard+'</p>'+
							'</div>'+
						'</div>';
						newCard += 1;
						emptyCard -= 1;
					}
					else if (emptyCard <= 0)
					{ 
						break; 
					}
				}
				cardCount += 1;
			}
			else
			{
				Swal.fire({
				  type: 'error',
				  title: 'Oops...',
				  text: '遊戲結束!',
				})
			}
			
		}
		state = 2;
		showButton();
	}
	else
	{
		Swal.fire({
			type: 'error',
			title: 'Oops...',
			text: '需先出牌或棄牌!',
		})
	}
}

function moveState(i)
{
	if(state != 4 ){ getNowtMap(); }
	getNextMap();
	nextMapText(nextMap);
	var j = i+1;
	if(x == 1215 && y == 330)
	{
		x = 1215;
		y = 330;
	}
	else
	{
		if(CardName[i] <= 16 && CardName[i] > 0)   //前進1格
		{ 
			if(nextMap <= 27 || (nextMap > 90 && nextMap < 103)|| nextMap ==1001)
			{
				outputFlag = true;
				switch(character){
					case 1:
						if(y < 330) {y += 110;}
						else {y=330;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=1;
						break;
					case 2:
						if(y > 0) {y -= 110;}
						else {y=0;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=2;
						break;
					case 3:
						if(x < 1215) {x += 110;}
						else {x=1215;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=3;
						break;
					case 4:
						if(x > 5) {x -= 110;}
						else {x=5;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=4;
						break;
				}
			}
			else
			{
				moveFlag = 4;
				errorMessage +='下一張地圖為'+MapText+ '，第'+j+'張手牌只能通過十字及寶箱地圖\n';
			}
			
		}
		else if(CardName[i] > 16 && CardName[i] <= 31)   //原地右轉
		{ 
			outputFlag = true;
			switch(character){
				case 1:
					charterPic.src="ImgCharter/princeright.png";
					character=4;
					break;
				case 2:
					charterPic.src="ImgCharter/princeleft.png";
					character=3;
					break;
				case 3:
					charterPic.src="ImgCharter/princefront.png";
					character=1;
					break;
				case 4:
					charterPic.src="ImgCharter/princeback.png";
					character=2;
					break;
			}
		
		}
		else if(CardName[i] > 31 && CardName[i] <= 46)   //原地左轉
		{ 
			outputFlag = true;
			switch(character){
				case 1:
					charterPic.src="ImgCharter/princeleft.png";
					character=3;
					break;
				case 2:
					charterPic.src="ImgCharter/princeright.png";
					character=4;
					break;
				case 3:
					charterPic.src="ImgCharter/princeback.png";
					character=2;
					break;
				case 4:
					charterPic.src="ImgCharter/princefront.png";
					character=1;
					break;
			}
			
		}
		else if(CardName[i] > 46 && CardName[i] <= 61)   //後退1格
		{ 
			outputFlag = true;
			switch(character){
				case 1:
					if(y > 0) {y -= 110;}
					else {y = 0;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=1;
					break;
				case 2:
					if(y < 330) {y += 110;}
					else {y=330;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=2;
					break;
				case 3:
					if(x > 5) {x -= 110;}
					else {x=5;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=3;
					break;
				case 4:
					if(x < 1215) {x += 110;}
					else {x=1215;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=4;
					break;
			}
		}
		else if(CardName[i] > 94 && CardName[i] <= 98)   //前進2格
		{
			outputFlag = true;
			if(nextMap <= 27 || (nextMap > 90 && nextMap < 103)|| nextMap ==1001)
			{
				switch(character){
					case 1:
						if(y < 330) {y += 110;}
						else {y=330;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=1;
						break;
					case 2:
						if(y > 0) {y -= 110;}
						else {y=0;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=2;
						break;
					case 3:
						if(x < 1215) {x += 110;}
						else {x=1215;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=3;
						break;
					case 4:
						if(x > 5) {x -= 110;}
						else {x=5;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=4;
						break;
				}
				getNowtMap();
				switch(character){
					case 1:
						if(y < 330) {y += 110;}
						else {y=330;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=1;
						break;
					case 2:
						if(y > 0) {y -= 110;}
						else {y=0;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=2;
						break;
					case 3:
						if(x < 1215) {x += 110;}
						else {x=1215;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=3;
						break;
					case 4:
						if(x > 5) {x -= 110;}
						else {x=5;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=4;
						break;
				}
			}
			else
			{
				moveFlag = 4;
				errorMessage +='下一張地圖為'+MapText+ '，第'+j+'張手牌只能通過十字及寶箱地圖\n';
			}
		}
		else if(CardName[i] > 61 && CardName[i] <= 72)   //木板
		{
			outputFlag = true;
			if((nextMap > 27 && nextMap <= 48) ||(nextMap > 90 && nextMap < 101)|| nextMap ==1001)
			{
				switch(character){
					case 1:
						if(y < 330) {y += 110;}
						else {y=330;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=1;
						break;
					case 2:
						if(y > 0) {y -= 110;}
						else {y=0;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=2;
						break;
					case 3:
						if(x < 1215) {x += 110;}
						else {x=1215;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);	
						character=3;
						break;
					case 4:
						if(x > 5) {x -= 110;}
						else {x=5;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=4;
						break;
				}
			}
			else
			{
				moveFlag = 4;
				errorMessage += '下一張地圖為'+MapText+ '，第'+j+'張手牌只能通過斷橋及寶箱地圖\n';
			}
		}
		else if(CardName[i] > 72 && CardName[i] <= 83)   //小船
		{
			outputFlag = true;
			if((nextMap > 48 && nextMap <= 69) ||(nextMap > 90 && nextMap < 101)|| nextMap ==1001)
			{
				switch(character){
					case 1:
						if(y < 330) {y += 110;}
						else {y=330;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=1;
						break;
					case 2:
						if(y > 0) {y -= 110;}
						else {y=0;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=2;
						break;
					case 3:
						if(x < 1215) {x += 110;}
						else {x=1215;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);	
						character=3;
						break;
					case 4:
						if(x > 5) {x -= 110;}
						else {x=5;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=4;
						break;
				}
			}
			else
			{
				moveFlag = 4;
				errorMessage += '下一張地圖為'+MapText+ '，第'+j+'張手牌只能通過湖泊及寶箱地圖\n';
			}
		}
		else if(CardName[i] > 83 && CardName[i] <= 94)   //甜品
		{
			outputFlag = true;
			if((nextMap > 69 && nextMap <= 90) ||(nextMap > 90 && nextMap < 101)|| nextMap ==1001)
			{
				switch(character){
					case 1:
						if(y < 330) {y += 110;}
						else {y=330;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=1;
						break;
					case 2:
						if(y > 0) {y -= 110;}
						else {y=0;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=2;
						break;
					case 3:
						if(x < 1215) {x += 110;}
						else {x=1215;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);	
						character=3;
						break;
					case 4:
						if(x > 5) {x -= 110;}
						else {x=5;}
						charterPic.style.setProperty('--x', x);
						charterPic.style.setProperty('--y', y);
						character=4;
						break;
				}
			}
			else
			{
				moveFlag = 4;
				errorMessage += '下一張地圖為'+MapText+ '，第'+j+'張手牌只能通過怪獸及寶箱地圖\n';
			}
		}
		else if(CardName[i] > 98 && CardName[i] <= 100)   //金牌
		{
			outputFlag = true;
			switch(character){
				case 1:
					if(y < 330) {y += 110;}
					else {y=330;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=1;
					break;
				case 2:
					if(y > 0) {y -= 110;}
					else {y=0;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=2;
					break;
				case 3:
					if(x < 1215) {x += 110;}
					else {x=1215;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=3;
					break;
				case 4:
					if(x > 5) {x -= 110;}
					else {x=5;}
					charterPic.style.setProperty('--x', x);
					charterPic.style.setProperty('--y', y);
					character=4;
					break;
			}
		}
	}
	
}

function showbox()
{
	if(document.getElementById("Box1").children.length <= 0)
	{
		document.getElementById("Box3").style.display="none"; 
		document.getElementById("Box4").style.display="none"; 
		document.getElementById("Box5").style.display="none"; 
		document.getElementById("Box6").style.display="none"; 
	}
	else
	{
		document.getElementById("Box3").style.display="inline"; 
		document.getElementById("Box4").style.display="inline"; 
		document.getElementById("Box5").style.display="inline"; 
		document.getElementById("Box6").style.display="inline"; 
	}
}

//計算每次迴圈執行次數
function counter()
{
	if(moveFlag == 1) {count +=1;}
}


function checkIfCard()
{
	getNextMap();
	
	if(document.getElementById("Box1").children.length == 0 && emptyPlayingCard == 1) { moveFlag = 2; IfLoop = true;}
	else if(document.getElementById("Box1").children.length == 0 && (emptyPlayingCard >= 2 || emptyPlayingCard ==0)) { moveFlag = 3; }
	else
	{
		if(((nextMap < 10) || (nextMap >=28 && nextMap < 35) || (nextMap >=49 && nextMap < 56) || (nextMap >=70 && nextMap < 77) || (nextMap >=91 && nextMap < 94)|| nextMap == 101 || nextMap ==1001) 
		&& (CardName[5] > 100 && CardName[5] <= 103))
		{
			moveFlag=1;
		}
		
		else if(((nextMap >=10 && nextMap < 19) || (nextMap >=35 && nextMap < 42) || (nextMap >=56 && nextMap < 63) || (nextMap >=77 && nextMap < 84) || (nextMap >=94 && nextMap < 97)|| nextMap == 102 || nextMap ==1001) 
			&& (CardName[5] > 103 && CardName[5] <= 106))
		{
			moveFlag=1;
		}
		
		else if(((nextMap >=19 && nextMap < 28) || (nextMap >=42 && nextMap < 49) || (nextMap >=63 && nextMap < 70) || (nextMap >=84 && nextMap < 91) || (nextMap >=97 && nextMap < 101)  || nextMap == 103 || nextMap ==1001) 
			&& (CardName[5] > 106) )
		{
			moveFlag=1;
		}
		
		else
		{
			moveFlag=0;
			errorMessage = '迴圈條件判斷錯誤'; 
		}
	}
}
function showCharter(callback)  //角色移動判定
{
	charterPic=document.getElementById("character");
	checkIfCard();
	if(state != 4 ){getNowtMap();}
	var whileCallback = function () {
		counter();
		if (count > 15) 
		{
			Swal.fire({
			  title: '遊戲失敗',
			  allowOutsideClick:false,
			  showConfirmButton:false,
			  html: 
			  '<h5>已進入無限迴圈!</h5>  <a href="prince.html" class="btn btn-primary">Back</a>'
			})
			
		}
		else
		{
			setTimeout(function() {
				Swal.fire({
				  imageUrl: 'walk.gif',
				  imageWidth: 350,
				  imageHeight: 270,
				  imageAlt: 'Custom image',
				  backdrop:false,
				  allowOutsideClick:false,
				  showConfirmButton:false
				})
				moveState(0);
				setTimeout(function() {
					moveState(1);
					setTimeout(function() {
						moveState(2);
						setTimeout(function() {
							moveState(3);
								setTimeout(function() {
								moveState(4);
								if(moveFlag == 2) 
								{
									clearCard();
									state = 1;
									showButton();
								}
								if(moveFlag == 4) {
									callback && callback();
									if(state == 4 )
									{
										Swal.fire({
										  type: 'success',
										  title: '移動完畢',
										  showConfirmButton: false,
										  timer: 1500
										})
									}
									Swal.fire({
									  type: 'error',
									  title: 'Oops...',
									  html: '<pre>'+errorMessage+'</pre>',
									})
									if(x == 1215 && y == 330 && state != 4)  //終點動畫
									{
										Swal.fire({
										  title: '恭喜!完成遊戲',
										  width: 600,
										  padding: '3em',
										  background: '#fff ',
										  backdrop: `
											rgba(0, 11, 61,0.5)
											url("firewoke1.gif")
											center top
											no-repeat
										  `,
										  html:
											'<a href="game.html" class="btn btn-primary">Back</a> ',
											showCancelButton: false,
											showConfirmButton:false,
										})
										clearCard();
									}
									if(x == 1215 && y == 330 && state == 4)
									{
										Swal.fire({
										  type: 'success',
										  title: '已達終點',
										})
									}
								}
								else
								{
									if(x == 1215 && y == 330 && state != 4)  //終點動畫
									{
										Swal.fire({
										  title: '恭喜!完成遊戲',
										  width: 600,
										  padding: '3em',
										  background: '#fff ',
										  backdrop: `
											rgba(0, 11, 61,0.5)
											url("firewoke1.gif")
											center top
											no-repeat
										  `,
										  html:
											'<a href="game.html" class="btn btn-primary">Back</a> ',
											showCancelButton: false,
											showConfirmButton:false,
										})
										clearCard();
									}
									else if(x == 1215 && y == 330 && state == 4)
									{
										Swal.fire({
										  type: 'success',
										  title: '已達終點',
										})
									}
									else
									{
										checkIfCard();
										if(moveFlag == 1) {
											whileCallback();
										}
										else
										{
											callback && callback();
											Swal.fire({
											  type: 'success',
											  title: '移動完畢',
											  showConfirmButton: false,
											  timer: 1500
											})
										}
									}
									
								}
							//your code to be executed after 1 second
							}, delayInMilliseconds);
						//your code to be executed after 1 second
						}, delayInMilliseconds);
						//your code to be executed after 1 second
					}, delayInMilliseconds);
					//your code to be executed after 1 second
				}, delayInMilliseconds);
			  //your code to be executed after 1 second
			}, delayInMilliseconds);
		}
		
	}
	if(moveFlag != 3) {  //出條件卡且可成功移動
		whileCallback();
	}

	if(moveFlag == 3)
	{
		Swal.fire({
			type: 'error',
			title: 'Oops...',
			text: '尚未出任何卡牌',
		}) 
	}
}

function getNextMap()  //取得角色面向之下一張地圖id
{
	var i;
	switch(character){
		case 1:
			i = ((x-5)/110)+((y/110)*12)+12;
			break;
		case 2:
			i = ((x-5)/110)+((y/110)*12)-12;
			break;
		case 3:
			i = ((x-5)/110)+((y/110)*12)+1;
			break;
		case 4:
			i = ((x-5)/110)+((y/110)*12)-1;
			break;
	}
	if(i<0)
	{
		nextMap=1000;
	}
	else
	{
		nextMap = rdmArray[i];
	}
}

function getNowtMap()  //取得角色目前地圖id and 偵測寶箱給予條件手牌
{
	var i;
	i = ((x-5)/110)+((y/110)*12);
	nowtMap = rdmArray[i];
	if(nowtMap > 90 && nowtMap < 94)   //紅寶箱
	{
		IfCardData();
		var Ifid="IfCard"+(nowIfCard+1);
		document.getElementById(Ifid).style.display="inline";
		document.getElementById(Ifid).innerHTML=
			'<div class="card border-warning mb-3" style="width: 108px; height:68px" id="'+ifcard[nowIfCard]+'" draggable="true" ondragstart="Drag(event)">'+
			'<img src="ImgCard/'+picindex+'.png" class="card-img-top" style="width: 108px; height:68px;" alt="" >'+
		'</div>';
		rdmArray[i]=101;
	}
	
	else if(nowtMap > 93 && nowtMap < 97)   //綠寶箱
	{
		IfCardData();
		var Ifid="IfCard"+(nowIfCard+1);
		document.getElementById(Ifid).style.display="inline";
		document.getElementById(Ifid).innerHTML=
			'<div class="card border-warning mb-3" style="width: 108px; height:68px" id="'+ifcard[nowIfCard]+'" draggable="true" ondragstart="Drag(event)">'+
			'<img src="ImgCard/'+picindex+'.png" class="card-img-top" style="width: 108px; height:68px;" alt="" >'+
		'</div>';
		rdmArray[i]=102;
	}
	
	else if(nowtMap > 96 && nowtMap <= 100)   //藍寶箱
	{
		IfCardData();
		var Ifid="IfCard"+(nowIfCard+1);
		document.getElementById(Ifid).style.display="inline";
		document.getElementById(Ifid).innerHTML=
			'<div class="card border-warning mb-3" style="width: 108px; height:68px" id="'+ifcard[nowIfCard]+'" draggable="true" ondragstart="Drag(event)">'+
			'<img src="ImgCard/'+picindex+'.png" class="card-img-top" style="width: 108px; height:68px;" alt="" >'+
		'</div>';
		rdmArray[i]=103;
	}
	showmap();
	checkIfBox();
}

function clearCard()  //清除出牌區
{
	if(moveFlag != 3)
	{
		document.getElementById("Box1").innerHTML='';
		document.getElementById("Box2").innerHTML='';
		document.getElementById("Box3").innerHTML='';
		document.getElementById("Box4").innerHTML='';
		document.getElementById("Box5").innerHTML='';
		document.getElementById("Box6").innerHTML='';
	}
}

function getCardClear()  //出牌判定
{
	if(state == 2)
	{
		checkCard();
		checkIfBox();
		if(emptyCard < 2) { 
			Swal.fire({
				type: 'error',
				title: 'Oops...',
				text: '手牌超過上限4張, 需再出牌或棄牌!',
			})
		}
		else
		{
			checkBox();
			count = 0;
			errorMessage = '';
			outputFlag = false;
			IfLoop = false;
			showCharter(function() {
				if(moveFlag != 3 )
				{
					if(outputFlag && !IfLoop){clearCard();
					getNextMap();
					getNowtMap();
					for(var i=0;i<6;i++){CardName[i]=0;}
					state = 1;}
					showButton();
				}
			})
			if(moveFlag != 3 )
			{
				showButton();
			}
		}
	}
	else
	{
		showButton(); 
		Swal.fire({
			type: 'error',
			title: 'Oops...',
			text: '需先抽牌!',
		})
	}
}

function noPlayingCard()  //不出牌判定
{
	if(state == 2)
	{
		checkCard();
		checkIfBox();
		if(emptyCard < 2) { 
		Swal.fire({
			type: 'error',
			title: 'Oops...',
			text: '手牌超過上限5張, 需再出牌或棄牌!',
		})
		}
		else 
		{ 
			state = 1; 
			showButton();	
		}
	}
	else
	{
		Swal.fire({
			type: 'error',
			title: 'Oops...',
			text: '需先抽牌!',
		})
	}
}

var xori,yori,charori;
function hintPath()
{
	state = 4;
	showButton();
	errorMessage = '';
	checkBox();
	getNextMap();
	checkIfCard();
	charterPic=document.getElementById("character");
	xori = x;yori = y;charori=character;
	if(moveFlag == 3) 
	{ 
		Swal.fire({
			type: 'error',
			title: 'Oops...',
			text: '請放置卡牌至出牌區!',
		}) 
	}
	else
	{
		showCharter(function() {})
	}
}

function pathReset()
{
	x = xori;y = yori;character = charori;
	document.getElementById("character").style.setProperty('--x', x);
	document.getElementById("character").style.setProperty('--y', y);
	switch(character){
		case 1:
			charterPic.src="ImgCharter/princefront.png";
			break;
		case 2:
			charterPic.src="ImgCharter/princeback.png";
			break;
		case 3:
			charterPic.src="ImgCharter/princeleft.png";
			break;
		case 4:
			charterPic.src="ImgCharter/princeright.png";
			break;
	}
	state = 2;
	showButton();
}