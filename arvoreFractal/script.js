let gerArvRecu = (posX,posY,tam,angIn,abt,qtdGal)=>{
  if(qtdGal<=0) return;
  
  let div = abt/2;
  
  let pofX = posX + tam * cos(angIn);
  let pofY = posY - tam * sin(angIn);
  
  line(posX,posY,pofX,pofY);
  
  let tamFin = tam * 0.7;
  
  gerArvRecu(pofX,pofY,tamFin,angIn+div,abt,qtdGal-1);
  gerArvRecu(pofX,pofY,tamFin,angIn-div,abt,qtdGal-1);
  
}

let slidAbt,slidGal;

function setup(){
  createCanvas(400,400);
  angleMode(DEGREES);
  
  slidGal = createSlider(0,12,4);
  slidGal.size(width/4);
  slidGal.position(width/3,height*1.1);
  
  
  slidAbt = createSlider(0,360,60);
  slidAbt.size(width);
  slidAbt.position(width/3,height);
  
  strokeWeight(3);
  
}

function draw(){
  background(125);
  
  let sAbt = slidAbt.value();
  let sGal = slidGal.value();
  
  gerArvRecu(width/2,height/2,height/8,90,sAbt,sGal);
  gerArvRecu(width/2,height/2,height/8,0,sAbt,sGal);
  gerArvRecu(width/2,height/2,height/8,180,sAbt,sGal);
  gerArvRecu(width/2,height/2,height/8,270,sAbt,sGal);
  
  console.log("-");
  console.log("--");
  console.log("---");
  console.log(`A abertua atual é ${sAbt}`);
  console.log(`A abertua atual é ${sGal}`);
  
}