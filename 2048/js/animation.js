//通过动画显示数字
function showNumberWithAnimation(i,j,randNumber){
	var numberCell=$('#number-cell-'+i+'-'+j);
	numberCell.css({
		'background-color': getNumberBackgroundColor(randNumber),
		'color':getNumberColor(randNumber)
	}).text(randNumber).animate({
		top:0,
		left:0,
		width:'100px',
		height:'100px'
	}, 500);
}


//通过动画显示移动
/*function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(fromx,tox),//(3,0)
		left:getPosLeft(fromy,toy),
 		width:'100px',
		height:'100px'
	}, 200);
}*/
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	var numberCell1=$('#number-cell-'+tox+'-'+toy);
	numberCell1.text(numberCell.text()).css({
		'background-color':'#fff',
		'color':getNumberColor(numberCell.text())
	}).animate({
		top:'0px',//(3,0)
		left:'0px',
 		width:'100px',
		height:'100px'
	}, 200);
	numberCell.animate({
		top:'50px',//(3,0)
		left:'50px',
 		width:'0px',
		height:'0px'
	}, 200);	
}

