

function ball_init()
{ 
  this.draw=drawBall;	
  this.tick=tickBall;	
  this.x*=canvasSize/100.0;
  this.y*=canvasSize/100.0;
  this.vx*=canvasSize/100.0;
  this.vy*=canvasSize/100.0;
  
  null_init.bind(this)();   
  
  if (this.world=="white") this.lineCol="#FFFFFF";
  if (this.world=="red") this.lineCol="#C00";
  if (this.world=="blue") this.lineCol="#00C";
}

function tickBall()
{
   var nx=this.x+this.vx*board.frameTime/1000.0;
   var ny=this.y+this.vy*board.frameTime/1000.0;   
   var hits=checkHits(this.x,this.y,nx,ny);
   if (hits) {
     for (var i=0;i<hits.length;i+=1) {
	   if (hits[i].type=='bounce') bounceBall.bind(this)(hits[i]);
	 };
   } else {
     this.x=nx;
	 this.y=ny;
   }   
}

function bounceBall(hit)
{
   //consider the bounce
   var ufact=(this.vx*hit.normalx+this.vy*hit.normaly)/(hit.normalx*hit.normalx+hit.normaly*hit.normaly);
   var ux=ufact*hit.normalx;
   var uy=ufact*hit.normaly;
   var wx=this.vx-ux;
   var wy=this.vy-uy;
   
   //reset the velocity for aftert he bounce
   this.vx=wx-ux;
   this.vy=wy-uy;   
}

function drawBall()
{
  var rad=random(5,20);
  
  board.ctx.strokeStyle=this.lineCol;	  
  board.ctx.lineWidth = 1;
  board.ctx.beginPath();
  //board.ctx.arc(this.x,this.y,rad,random(0,Math.PI*2),random(0,Math.PI*2),random(0,2)>1);
  board.ctx.arc(this.x,this.y,rad,0,Math.PI*2,true);
  board.ctx.stroke();	  
}
