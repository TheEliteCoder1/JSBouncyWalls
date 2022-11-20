let canvas = document.getElementById("canvas");
let body = document.getElementById("body");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;


canvas.width = window_width-100;
canvas.height = window_height-100;

canvas.style.background = "#000";
canvas.style.border = "1px solid #000";
canvas.addEventListener("mousemove", onMove, false);

var slider = document.getElementById("movementSpeedSlider");
var output = document.getElementById("movementSpeed");
var slider2 = document.getElementById("delaySlider");
var output2 = document.getElementById("delay");
output.innerHTML = `${slider.value}%`; // Display the default slider value
output2.innerHTML = `${slider2.value}ms`;


let squares = [];
let started = false;
var size = 30;  
var speed = 30;
let start = 0;
var delay = 10;
var theme = "DarkMode";
var mpos = {x: 0, y: 0};


// Update the current slider value (each time you drag the slider handle)
function updateMovementSpeed() {
    output.innerHTML = `${slider.value}%`;
    speed = 30 * (slider.value / 100);

    for ( var i = 0; i < squares.length; i++) {
        pos = squares[i];
        pos[2], pos[3] = 30 * (slider.value / 100), 30 * (slider.value / 100);
    }
}

function updateDelay() {
    output2.innerHTML = `${slider2.value}ms`;
    delay = slider2.value;
}

function numberInRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

context.lineWidth = 50;

context.shadowBlur = 10;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function onMove(evt) {
    mpos = getMousePos(canvas, evt);
}

function tick() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = `rgba(${numberInRange(0, 255)}, ${numberInRange(0, 255)}, ${numberInRange(0, 255)}, ${numberInRange(0.5, 1)})`;
    context.fillStyle = 'white';

    


    for (var i = 0; i < squares.length; i++) {
        pos = squares[i];
        if (pos[0] + size >= canvas.width || pos[0] + size <= 0){
            pos[2] *= -1;
            context.beginPath();
            context.moveTo(canvas.width, 0);
            context.lineTo(canvas.width, canvas.height);
            context.stroke();
        }

        if (pos[0] - size >= canvas.width || pos[0] - size <= 0){
            pos[2] *= -1;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, canvas.height);
            context.stroke();
        }
        
        if (pos[1] + size >= canvas.height || mpos[1] + size <= 0){
            pos[3] *= -1;
            context.beginPath();
            context.moveTo(0, canvas.height);
            context.lineTo(canvas.width, canvas.height);
            context.stroke();
        }

        if (pos[1] - size >= canvas.height || pos[1] - size <= 0){
            pos[3] *= -1;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(canvas.width, 0);
            context.stroke();
        }

        
        if (
            pos[0] <= mpos.x && mpos.x <= pos[0] + size &&
            pos[1] <= mpos.y && mpos.y <= pos[1] + size
        )
        {
            context.fillStyle = `rgba(${numberInRange(0, 255)}, ${numberInRange(0, 255)}, ${numberInRange(0, 255)}, ${numberInRange(0.5, 1)})`;
        }
    }
    
    // Paint objects
    squares.forEach(pos => {
        pos[0] += pos[2];
        pos[1] += pos[3];
        context.fillRect(pos[0], pos[1], size, size);
    });
}
  

function animate(timestamp) { 
  const elapsed = timestamp - start;
  if (elapsed > delay) {
    start = timestamp;
    tick(theme);
  }
  requestAnimationFrame(animate); 
}

function add() {
    // adds random square position
    speed = speed * (slider.value / 100)
    squares.push([numberInRange(0, canvas.width-size), numberInRange(0, canvas.height-size), speed, speed]);
  
    if (!started) {
      animate();
    }
}

function Delete() {
    squares.pop();
}