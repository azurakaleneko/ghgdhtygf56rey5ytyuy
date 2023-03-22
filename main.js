song="";

scoreLeftWrist=0
scoreRightWrist=0

muñecaIzquierdaX=0
muñecaIzquierdaY=0
muñecaDerechaX=0
muñecaDerechaY=0

function preload(){
    song=loadSound("Mother Mother.mp3")
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    
    video= createCapture(VIDEO);
    video.hide();


    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet ya ta'");
}


function gotPoses(results)
{
    if(results.length>0){
        console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
console.log("miku xd" + scoreLeftWrist);
console.log("miku xd" + scoreRightWrist);

        muñecaIzquierdaX=results[0].pose.leftWrist.x;
        muñecaIzquierdaY=results[0].pose.leftWrist.y;
        console.log("XD?:"+muñecaIzquierdaX+"YD:"+muñecaIzquierdaY);
        muñecaDerechaX=results[0].pose.rightWrist.x;
        muñecaDerechaY=results[0].pose.rightWrist.y;
        console.log("XD?:"+muñecaDerechaX+"YD:"+muñecaDerechaY);
    }
}




function draw() {
    image(video, 0, 0, 600, 500);

    if(scoreRightWrist>0.2){
    fill("#8e97d1");
    stroke("#8e97d1");
    circle(muñecaDerechaX, muñecaDerechaY, 30);

    if(muñecaDerechaY>0 && muñecaDerechaY<=100){
      document.getElementById("speed").innerHTML="Velocidad es 0.5x";
      song.rate(0.5);  
    } 
    else if(muñecaDerechaY>100 && muñecaDerechaY<=200){
        document.getElementById("speed").innerHTML="Velocidad es 1x";
      song.rate(1); 
    }

    else if(muñecaDerechaY>200 && muñecaDerechaY<=300){
        document.getElementById("speed").innerHTML="Velocidad es 1.5x";
      song.rate(1.5); 
    }

    else if(muñecaDerechaY>300 && muñecaDerechaY<=400){
        document.getElementById("speed").innerHTML="Velocidad es 2x";
      song.rate(2); 
    }

    else if(muñecaDerechaY>400 && muñecaDerechaY<=500){
        document.getElementById("speed").innerHTML="Velocidad es 2.5x";
      song.rate(2.5); 
    }
}

    if(scoreLeftWrist>0.2){
    fill("#4c8a3a");
    stroke("#4c8a3a");
    circle(muñecaIzquierdaX, muñecaIzquierdaY, 30);
    InNumberMuñecaIzquierdaY = Number(muñecaIzquierdaY)
    remove_decimals=floor(InNumberMuñecaIzquierdaY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volumen" + volume;
    song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}