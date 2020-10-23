var dog,happyDog,database,foodS,foodStock;

function preload()
{
  Dog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog=createSprite(200,200,10,10);
  dog.addImage(Dog);
  dog.scale = 0.4;

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}
drawSprites();

textSize(19);
fill("black");
text("Press UP_ARROW Key To Feed Drago Milk! " , 80,40);
text("Food remaining:"+ foodS ,200,400);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
 
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



