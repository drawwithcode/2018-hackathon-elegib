var mySongF;
var myVelocitaX = 100;
var myVelocitaY = 150;
var myVolumeX = 100;
var myVolumeY = 300;
var analyzer;
var click = 1;
var distanza;
var volumebar = 0;
var t = 5;
var c;
var balls = []; // creo un array

function preload() {

  mySongF = loadSound('./assets/friends.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mySongF.loop();
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySongF);

  var ballNumber = windowWidth;
   for(var i = 0; i < windowWidth-400; i+= 50) {
      for(var a = 0; a < windowHeight; a+= 50) {
     var myBall = new Ball(200 + i, 25 + a, 10);
     balls.push(myBall);



}}}

function draw() {
   background('black');



   distanza = dist(mouseX, mouseY, windowWidth/2, windowHeight/2);

   if(click == 1 ) {
     background(200);
   mySongF.pause();}
   else{if(mySongF.isPlaying() == false) {
   mySongF.play()}}

 // trasformo i toni in spazio
  var volume = analyzer.getLevel();
  var volume1 = map(volume, 0, 1,50, width/2);
  ellipse(windowWidth/2-10, windowHeight/2, 100);

if(click == -1) {

/*  for (var x = 25; x < width; x+=50) {
     //ellipse(x, 25, 25);
     for(var y = 25; y < height; y+= 50) {

       var myHue = x / width * 255; // così fa la sfumatura lunga tanto quanto il canvas, il colore cambia lungo l x
       var mySaturation = y / height * 255; // fa la sfumatura alta quanto il canvas, la saturazione cambia lungo la y
       var diameter = x+y
       fill(myHue, mySaturation, 255);
       stroke(mySaturation);
       ellipse(x, y, volume1/5);
     }  }*/

for (var j = 0; j < balls.length; j++ ) {
     balls[j].change();

      balls[j].display();
      balls[j].diameter = volume1/5;
      var myRate = map(t, 1, 10,0,2);
      mySongF.rate(myRate);
      colorMode(HSB)
      var myColor = map(volume, 0, 1,70, 255);
     balls[j].hue = myColor;
     balls[j].saturation = myColor;
     balls[j].brightness = myColor;

}}
  var volume = 2;
  var myVolume = map(volume, 2, 10, 2,20);
  mySongF.amp(myVolume);

  push();
  rectMode(CENTER);

  textAlign(CENTER);
  textSize(20);
  fill('white')
  text('Normal Rate', 100, 100)
    fill('red')
   rect(myVelocitaX,myVelocitaY,50,50)
   if(((myVelocitaX - mouseX) ** 2) + ((myVelocitaY - mouseY) ** 2) < 600 && t>5) {t = t- 0.5}

   rect(myVolumeX,myVolumeY,50,50)
   if(((myVolumeX - mouseX) ** 2) + ((myVolumeY - mouseY) ** 2) < 600 ) {volume = volume+ 1}
   console.log(volume)

  pop();


}

function Ball(_x, _y, _diameter) {
    var volume = analyzer.getLevel();
  var myColor = map(volume, 0, 1,70, 255);

  this.x = _x;
  this.y = _y;
  this.diameter = _diameter;
  this.hue = myColor;
  this.saturation = 255;
  this.brightness = 255;

  this.tocco = 1;
  noStroke();

 var yDir = 1;
 var xDir = 1;

 this.touch = function() {
       var cambia =  ((this.x - mouseX) ** 2) + ((this.y - mouseY) ** 2) < 100;
       return cambia;
   };

   this.change = function() {if(this.touch() && this.tocco == 1 && mouseIsPressed == true ) {this.hue = 0; t = t+ 0.5; this.tocco = 0;
}}





  this.display = function() {
      fill(this.hue, this.saturation, this.brightness); // creo una nupva caratteristica senza inserirla nelle parentesi della funzione
      ellipse (this.x, this.y, this.diameter);
        }
}
function mousePressed() {
  if( distanza < 30){
  click = click * -1
}}
