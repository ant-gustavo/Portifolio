let esc;
let tam;
let qtd = 12;

let score = 0;
let tempo = 0;

let estadoChar;
const VIVO = 0;
const DANO = 1;
const MORTO = 2;
const GANHOU = 3;

let charX,charY,charVel;

let carroCor = [];
let carroX = [];
let carroY = [];
let carroVel = [];
let vel = 1;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100);
  
  score = 0;
  vel = 1;
  tempo = 0;
 
  esc = width/qtd;
  tam = esc/2;
  
  estadoChar = VIVO;
  charX = width/4;
  charY = height-1*esc;
  charVel = (esc/qtd/2);
  
  geraCarros();
}

function draw() {
  background(0);
  
  reset();
  
  mefChar();
  
  fill(0,100,100);
  text(`Sua pontuação atual: ${score}`,0,height/30);
  
}

function reset(){
  rectMode(CORNER);
  strokeWeight(4);
  fill(0);
}

function timesec(a){
  return a*=60;
}

let desenhaRua = function(){
    for(let i = 0; i < qtd; i++) {
        for(let j = 0; j < qtd; j++) {
            strokeWeight(1);
            stroke(0, 0, 25);
            fill(0, 0, 25);
            rect(i * esc, j * esc, i * esc + esc, j * esc + esc);
        }
    }
}

let desenhaCalçada = function(){
    strokeWeight(2);
    stroke(0);
    fill(0,0,50);
    rect(0-5,1+1/2*esc,width+5,1/2*esc);
    rect(0-5,height-1*esc,width+5,1/2*esc);
}
let desenhaFaixas = function(){
  for(let i=1;i<qtd;i++){
    noFill();
    strokeWeight(2);
    stroke(45,100,100);
    line(i*esc,width/2-2,i*esc-(esc/2),width/2-2);
    line(i*esc,width/2+2,i*esc-(esc/2),width/2+2);
    for(let I=2;I<qtd-1;I++){
      stroke(0,0,75);
      if(I==qtd/2){}
      else
      line(i*esc,I*esc,i*esc-(esc/2),I*esc);
    }
  }
}
function desenhaCenário(){
  desenhaRua();
  desenhaCalçada();
  desenhaFaixas();
}

let geraCarros =function(){
  for(i=1;i<qtd-1;i++){
    carroCor[i] = random(0,360);
    carroX[i] = random(0,width-esc);
    carroVel[i] = vel;
  }
}
function carros(){
  
  for(i=1;i<qtd-1;i++){
    carroY[i] = i*esc+esc/4;
    
    rectMode(CORNER);
    fill(carroCor[i],50,75);
    rect(carroX[i],carroY[i],esc/2,esc/2);
    
    
    if(i*esc<height/2)
    carroX[i]-=carroVel[i];
    else
    carroX[i]+=carroVel[i];
    
    if(carroX[i]>=width+esc) carroX[i]=0;
    if(carroX[i]<=0-esc) carroX[i]=width;
    
    if(charX + tam >= carroX[i] &&
      charX <= carroX[i] + tam &&
      charY <= carroY[i] + tam &&
      charY + tam >= carroY[i] &&
      tempo==0){
      estadoChar=DANO;
    }
    
  }
}

let moveChar = function(){
    if(keyIsDown(UP_ARROW)&&
      charY>0+1+1/2*esc){
      charY-=charVel;
    }
    if(keyIsDown(DOWN_ARROW)&&
      charY<height-1-1/2*esc-esc/2){
      charY+=charVel;
    }
}
let desenhaChar = function(){
  fill(45,50,75);
  noStroke();
  rect(charX,charY,esc/2,esc/2);
}
function mefChar(){
  switch(estadoChar){
    case VIVO:{
      desenhaCenário();
      moveChar();
      desenhaChar();
      carros();
      if(charY<=esc/2+width/50){
        score+=vel;
        estadoChar = GANHOU;
        tempo = 0;
        vel += 1;
      }}
      break
      case DANO:{
      desenhaCenário();
      desenhaChar();
      carros();
      if(charY+esc/2<=height-1/2*esc){
        charY+=1;
      }
      else{
        estadoChar = MORTO;
      }
      tempo++;
      if(tempo>=timesec(1.5)){
      estadoChar = VIVO
      tempo=0;
      }}
      break
      case MORTO:{
      tempo++;
      stroke(360);
      text("VOCÊ PERDEU, SUA PONTUAÇÃO FOI: " + score,0,height/2)
      if(tempo>=300){
        setup();
      }}
      break
      case GANHOU:{
      geraCarros();
      charX = width/4;
      charY = height-1*esc;
      estadoChar = VIVO;
      tempo = 0
      break
      }
    }
  }