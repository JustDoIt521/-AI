var chess;
var context;
var me;
var over;
var myWin;
var computerWin;
var chessBoard;
//win array origin
var wins=[];
for(var i=0;i<15;i++)
{
	wins[i]=[];
	for(var j=0;j<15;j++)
		wins[i][j]=[];

}
var count=0;
for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
for(var i=0;i<15;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[j+k][i][count]=true;
		}
		count++;
	}
}

for(var i=0;i<11;i++)
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
for(var i=0;i<11;i++)
{
	for(var j=14;j>3;j--)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
var newGame=function()
{

	var m=document.getElementById("box");
	m.innerHTML='<canvas id="chess" width="450" height="450"></canvas>';
	chess=document.getElementById("chess");
	context=chess.getContext('2d');
	me=true;
	over=false;
	myWin=[];
	computerWin=[];
	chessBoard=[];
	//=======chessData origin
	for(var i=0;i<15;i++)
	{
		chessBoard[i]=[];
		for(var j=0;j<15;j++)
			chessBoard[i][j]=0;
	}
	//=====chess origin
	context.strokeStyle="#BFBFBF";
	for(var i=0;i<15;i++)
	{
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.moveTo(15, 15+i*30);
		context.lineTo(435, 15+i*30);
		context.stroke();		
	}
	//=====Score origin
	for(var i=0;i<count;i++)
	{
		myWin[i]=0;
		computerWin[i]=0;
	}
	chess.onclick=function(e)
	{
		click(e);
	}
}

function click(e)
{
	if(over)
	{
		e
	}
	if(!me)
	{
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBoard[i][j]==0)
	{
		onestep(i,j,me);
		chessBoard[i][j]=1;
		for(var k=0;k<count;k++)
		{
			if(wins[i][j][k])
			{
				myWin[k]++;  
				computerWin[k]=6;
				if(myWin[k]==5)
				{
					window.alert("you win,congratulations!");
					over=true;
				}
			}
		}
		if(!over)
		{
			me=!me;
			computerAI();
		}	
	}
}

var onestep=function(i,j,me)
{
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,13,0,2*Math.PI);
	var gradient=context.createRadialGradient(17+i*30,13+j*30,13,17+i*30,13+j*30,0);
	if(me)
	{
	    gradient.addColorStop(0,"#0A0A0A");
	    gradient.addColorStop(1,"#636766");
	}
	else
	{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	} 
	context.fillStyle=gradient;
	context.fill();	
	context.closePath();
}

function computerAI()
{
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for(var i=0;i<15;i++)
	{
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++)
		{
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for(var i=0;i<15;i++)
	{
		for(j=0;j<15;j++)
		{
			if(chessBoard[i][j]==0)
			{
				for(var k=0;k<count;k++)
				{
					if(wins[i][j][k])
					{
						switch(myWin[k])
						{
							case 1:myScore[i][j]+=200;break;
							case 2:myScore[i][j]+=400;break;
							case 3:myScore[i][j]+=2000;break;
							case 4:myScore[i][j]+=10000;break;
						}
						switch(computerWin[k])
						{
							case 1:myScore[i][j]+=220;break;
							case 2:myScore[i][j]+=420;break;
							case 3:myScore[i][j]+=2100;break;
							case 4:myScore[i][j]+=20000;break;
						}
					}
					if(myScore[i][j]>max)
					{
						max=myScore[i][j];
						u=i;
						v=j;
					}else if(myScore[i][j]==max)
					{
						if(computerScore[i][j]>computerScore[u][v])
						{
							u=i;
							v=j;
						}
					}
					if(computerScore[i][j]>max)
					{
						max=computerScore[i][j];
						u=i;
						v=j;
					}else if(computerScore[i][j]==max)
					{
						if(myScore[i][j]>myScore[u][v])
						{
							u=i;
							v=j;
						}
					}
				}
			}
		}
	}
	onestep(u,v,false);
	chessBoard[u][v]=2;
	for(var k=0;k<count;k++)
	{
		if(wins[u][v][k])
		{
			myWin[k]=6;  
			computerWin[k]++;
			if(computerWin[k]==5)
			{
				window.alert("computer win,congratulations!");
				over=true;
			}
		}
	}
	if(!over)
	{
		me=!me;
	}
}

window.onload=function()
{
	newGame();
}

function Repain()
{
	newGame();
}