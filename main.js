var song = "";
var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

var scoreLeftWrist;
var scoreRightWrist; 


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(410, 230);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);


}

function modelLoaded(){
    console.log("Modelo OK!");
}

function draw(){
    image(video, 0, 0, 400, 400);

    fill("blue");
if(scoreRightWrist > 0.2){

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Velocidad = 0.5";
        song.rate(0.5);
    }

    if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Velocidad = 1";
        song.rate(1);
    }

    if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Velocidad = 1.5";
        song.rate(1.5);
    }

    if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Velocidad = 2";
        song.rate(2);
    }

    if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Velocidad = 2.5";
        song.rate(2.5);
    }

}

    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 15);

    InNumberleftWristY = Number(leftWristY);
    removeDecimals = floor(InNumberleftWristY);
    volume = removeDecimals/500;
    
    document.getElementById("volume").innerHTML = "Volume: ";
    song.setVolume(volume);
    }

}

function start(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;


    }
}