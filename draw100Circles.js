var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var circles = [];
var total = 0;

var btn = document.getElementById('btn');
btn.onclick = add_100_Circles;
function Circle(x, y, r, color){
	
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
	this.isSelected = false;
}

function randomFromTo(x,y){
	
	var range = y - x;
	var rand = Math.random();
	var result = x + y*rand;
	return Math.floor(result);
}

function drawCircles(){
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.globalAlpha = 0.85;
	ctx.strokeStyle = "black";
	
	for(var i=0;i<circles.length;i++){
		
		var circle = circles[i];
		if(circle.isSelected == true){
			ctx.lineWidth = 5;
		}else{
			ctx.lineWidth = 1;
		}
		ctx.beginPath();
		ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2);
		ctx.fillStyle = circle.color;
		ctx.fill();
		ctx.stroke();
	}
}

function produceCircle(){
	
	var x = randomFromTo(canvas.offsetLeft,canvas.width+canvas.offsetLeft);
	var y = randomFromTo(canvas.offsetTop,canvas.height+canvas.offsetTop);
	var r = randomFromTo(0,250);
	
	var colors = ["green","red","yellow","magenta","blue","orange","brown","purple","pink"];
	var color = colors[randomFromTo(0,8)];
	
	var circle = new Circle(x,y,r,color);
	return circle;
	
}
function add_100_Circles(){
	while(total < 100){
		var circle = produceCircle();
		if(hasCollision(circle) == false){
			circles.push(circle);
			total++;
		}
	}
	drawCircles();
}
function hasCollision(circle){
	
	if(circles.length == 0){
		if((circle.x<circle.r)||((canvas.width-circle.x)<circle.r)||(circle.y<circle.r)||((canvas.height-circle.y)<circle.r)){
			return true;
		}
		return false;
	}else{
		
		for(var i=0;i<circles.length;i++){
		
			if((Math.sqrt(Math.pow(circle.x-circles[i].x,2)+Math.pow(circle.y-circles[i].y,2))<(circle.r+circles[i].r))||(circle.x<circle.r)||((canvas.width-circle.x)<circle.r)||(circle.y<circle.r)||((canvas.height-circle.y)<circle.r)){
			return true;
			}
		}
		return false;
	}
	
	
}
