let mobilenet;
let classifier;
let video;
let label = '';
let satyam;
let mayank;
let trainButton;

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Completed');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  satyam = createButton('Object:1').addClass('satyam');
 
  satyam.mousePressed(function() {
    classifier.addImage('satyam');
  });

  mayank = createButton('Object:2').addClass('mayank');
  
  mayank.mousePressed(function() {
    classifier.addImage('mayank');
  });

  trainButton = createButton('train').addClass('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });


}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}
