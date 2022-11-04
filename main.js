//Variables

var Status
var Canvas
var Webcam
var Detector
var Objective
var Result = []
var Value
var xyz
//Functions

function setup() {
    Canvas = createCanvas(550, 350)
    Canvas.center()
    Canvas.background("red")

    Webcam = createCapture(VIDEO)
    Webcam.size(550, 350)
    Webcam.hide()
}
function modelLoaded() {
    console.info("Model Loaded")
    Status = true
}
function Start() {
    Detector = ml5.objectDetector('cocossd', modelLoaded);
    Objective = document.getElementById('name').value
    document.getElementById('Status').innerHTML = 'Detecting Object';
}
function draw() {
    translate(Webcam.width, 0);
    scale(-1, 1);
    image(Webcam, 0, 0, 550, 350);


    if (Status != "") {
        model.detect(video, Results);
        for (i = 0; i < Result.length; i++) {
            Value = Math.floor(Result[i].confidence * 100)
            fill("red");
            text(Result[i].label + " " + Value + "%", Result[i].x, Result[i].y);
            noFill();
            stroke("red");
            rect(Result[i].x, Result[i].y, Result[i].width, Result[i].height);
            if (Result[i].label == Objective) {
                Detector.detect(Result)
                Webcam.stop()
                document.getElementById('Status').innerHTML = 'Detected Object';
                document.getElementById('Position').classList.remove('btn-danger');
                document.getElementById('Position').classList.add('btn-success');
                document.getElementById('Position').innerHTML = 'Object Found!'
                var synth = window.speechSynthesis;
                speak_data = `${objects[i].label} Found!`;
                synth.speak(speak_data)
            }
        }
    }
}
function Results(error, result) {
    if (error) {
        console.error(error)
    }
    else {
        console.info(result)
        Result = result
    }
}