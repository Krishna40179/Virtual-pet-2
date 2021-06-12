//Create variables here
var dog,dogImg,dogImg1;
 
var database;
var foodObj,lastFed;
var milk,milkimg;
 var foodS,foodStock;
var feed,addFood

 function preload(){
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
  milkimg=loadImage("images/Milk.png")
 }

//Function to set initial environment
function setup() {
 database=firebase.database();
 createCanvas(700,500);
 
 dog=createSprite(250,300,150,150);
 dog.addImage(dogImg);
 dog.scale=0.15;

 foodStock=database.ref('Food');
 foodStock.on("value",readStock);

 feed=createButton("Feed the dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood=createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);

 foodObj=new Food();
}

// function to display UI
function draw() {
 background(46,150,127);
 foodObj.display();

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });
 
 

 fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 200,90);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 200,90);
   }
 drawSprites();
}

//Function to read values from DB
function readStock(data){
 foodS=data.val();
 foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg1);
  milk=createSprite(180,320,10,10);
  milk.addImage(milkimg);
  milk.scale=0.1;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


