var nums = new Array();
var score = 0;
var hasConflicted=new Array();  //已经已叠加，用来解决单元格重复叠加的问题
$(document).ready(function(){
	newgame();
});

// 开始新游戏
function newgame(){
	// init();

	initial();

	//在随机的两个单元格中生成数字
	generateOneNumber();
	generateOneNumber();
}

function initial(){
	// 初始化数组
	for(var i=0;i<4;i++){
		nums[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			nums[i][j]=0;
			hasConflicted[i][j] = false;
		}
	}


	//动态创建上层单元格并初始化
	updateView();
	score=0;
	updateScore(score);
}
// 更新上层单元格视图
function updateView(){
	//将上层单元格清空
	$('.number-cell').remove();
	//
	for (var i=0;i<4;i++) {
		for(var j=0;j<4;j++){
			$("#col-"+i+"-"+j).append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			
			var numberCell=$('#number-cell-'+i+'-'+j);

			if(nums[i][j]==0){
				numberCell.css({
					'width':'0px',
					'top':50,
					'left':50,
					'height':'0px'
				});
			}else{
				numberCell.css({
					'width':'100px',
					'height':'100px',
					'top':0,
					'left':0,
					'background-color':getNumberBackgroundColor(nums[i][j]),
					'color':getNumberColor(nums[i][j])
				}).text(nums[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
}
// 在随机单元格中生成一个随机数
function generateOneNumber(){
	//判断是否还有空间，如果没有空间则直接返回
	if(noSpace(nums)){
		return;
	}

	//随机一个位置
	var count=0;
	var temp=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				temp[count] = i*4+j;
				count++;
			}
		}
	}
	var pos=Math.floor(Math.random()*count);
	var randx=Math.floor(temp[pos]/4);
	var randy=Math.floor(temp[pos]%4);
	//随机一个数字
	var randNum=Math.random()<0.5?2:4;
	//在随机位置上显示随机数字
	nums[randx][randy]=randNum;
	showNumberWithAnimation(randx,randy,randNum);
}

//实现键盘响应
$(document).keydown(function(event){
	//阻止事件的默认动作
	event.preventDefault();

	switch(event.keyCode){
		case 37: //left
			//判断是否可以向左移动
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,200);

			}
			break;
		case 38: //up
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,200);
			}
			break;
		case 39: //right
			if(canMoveRight(nums)){
				moveRight();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,200);
			}
			break;
		case 40: //down
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,200);
			}
			break;	
		default:
			break;			
	}
});


/*
	向左移动
	需要对每一个数字的左边进行判断，选择落脚点，落脚点有两种情况：
		1.落脚点没有数字，并且移动路径中没有障碍物
		2.落脚点数字和自己相同，并且移动路径中没有障碍物
*/
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				for(var k=0;k<j;k++){
					if(nums[i][k]==0  && noBlockHorizontal(i,k,j,nums)){ //第i行的第k-j列之间是否有障碍物
						//移动操作
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,k,j,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						updateScore(score);

						hasConflicted[i][k]=true; //已经叠加
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
}

function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!=0){
				for(var k=3;k>j;k--){
					if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums)){   //第i行的第j-k列之间是否有障碍物
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						break;
					}
				}
			}	
		}
	}
	setTimeout(updateView,200); 
}
function moveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!=0){
				for(var k=0;k<i;k++){
					if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){ //第j列的第k-i行之间是否有障碍物
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k,i,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);	
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
}
function moveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){ //第j列的第i-k行之间是否有障碍物
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j]  && noBlockVertical(j,i,k,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
						break;
					}
				}	
			}
		}
	}
	setTimeout(updateView,200);
}