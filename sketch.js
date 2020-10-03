//Create variables here
var dog;
var dogIMG
var happyDog;
var happyDogIMG
var database;
var foodS;
var foodStock;
var feedPet;
var addFood;
var fedTime;
var lastFed;
var foodObj;
function preload()
{
  //load images here
  dogIMG = loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage("irdk1",dogIMG);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("Feed the Dog");
  feed.position(350,95);
  feed.mousePressed(feedPet);
  addFood = createButton("Add Food");
  addFood.position(150,95);
  addFood.mousePressed(foodS);

}


function draw() {  
background(46,139,87);
fedTime = database.ref('FeedTime');
fedTime.on("value",function (data) {
  lastFed=data.val();
})
fill("black");
textSize(50);
text("Milk Left:"+foodS,125,50);
  drawSprites();
  //add styles here
  food.display();
}

function readStock(data){
foodS = data.val();
}

function writeStock(value){
  if(value<=0){
    value = 0;
  }else{
    value=value-1;
  }
  database.ref('/').update({Food:value})
  }

  function feedDog() {
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      feedTime:hour()
    });
  }

  function addFoods() {
    foodS++;
    database.ref('/').update({
      Food:foodS
    });
  }