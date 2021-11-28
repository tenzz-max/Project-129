song1 = "";
song2 = "";
leftWrist = "0";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("NGE.mp3");
}

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
	leftWrist = results[0].pose.leftWrist.y;
	scoreleftWrist = Number(leftWrist);
	ScoreleftWrist = scoreleftWrist/500;


	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);	
  }
}

function draw() {
    image(video, 0, 0, 600, 500);

	fill('#FF0000');
	stroke('FF0000')
	song1status = song1.isPlaying();
	song2status = song2.isPlaying();

	if(ScoreleftWrist > 0.2)
	{
		circle(leftWristX, leftWristY, 20);
		song2.stop();

		if(song1status == false)
		{
			song1.play()
			document.getElementById("song_name").innerHTML = "Harry Potter Theme Is Playing";
		}
	}

}