const boxes = document.querySelectorAll(".box"); 
const startBtn = document.querySelector(".start");
const clickbox = document.querySelector(".clickbox");
const pointshower = document.querySelector(".pointshower");
const inputs = document.querySelectorAll(".input");
const inputAantalKleuren = document.querySelector(".ak");
const stopBtn = document.querySelector(".stop");

let currentloop = 0;
let moeilijkheid = parseInt(document.getElementById("moeilijkheid").value);
let running = false; let points = 0;
let clicked = false;
let sec = 2000;
let colors = ["red","lightblue","lightgreen","yellow","orange","purple","pink","crimson","lime","aqua","silver"];

boxes.forEach(box => {box.addEventListener("click", click);});
startBtn.addEventListener("click", startgame);
stopBtn.addEventListener("click", stopgame);
function generateanswer(){
    let random = Math.floor(Math.random()* 9 +1);
    let answer = document.querySelector(".b"+random).style.backgroundColor;
    clickbox.style.backgroundColor = answer;
}
function click() {
    clicked = true;
    if (this.style.backgroundColor == clickbox.style.backgroundColor) {
    points++; 
    pointshower.innerHTML = points;
    } else {
        points = points - moeilijkheid;
    pointshower.innerHTML = points;
    }
}
function shuffle(){
    if (running){
        currentloop++;
        if (currentloop >= loops) {
            console.log("LOOP OVER");
            running = false;
            stopgame();
        } else {
            console.log(currentloop);
            console.log("Current loop is niet groter dan loops value" + loops + ">" + currentloop);
        }
        clicked = false;
        switch (true) {
            case (points > 40):
                sec = 2000 - (moeilijkheid * 1200);
                break;
            case (points > 30):
                sec = 2000 - (moeilijkheid * 900);
                break;
            case (points >= 20):
                sec = 2000 - (moeilijkheid * 700);
                break;
            case (points >= 15):
                sec = 2000 - (moeilijkheid * 500);
                break;
                case (points >= 10):
                    sec = 2000 - (moeilijkheid * 300);
                    break;
                case (points >= 5):
                    sec = 2000 - (moeilijkheid * 100);
                    break;
        }
        aantalKleuren = parseInt(document.getElementById("ak").value);
        aantalKleuren = (aantalKleuren == 0) ? 9 : aantalKleuren;
        boxes.forEach(box => {
            let random = Math.floor(Math.random()* aantalKleuren +1);
            box.style.backgroundColor = colors[random];
        });
        generateanswer()
        inputs.forEach(input => {
            input.setAttribute('readonly', false);
        })
    }
}
function update() {
    pointshower.innerHTML = (points >0) ? points : 0;
    pointshower.innerHTML = points;
}
function checkClick() {
    if (clicked == false) {
        points = points - moeilijkheid;
        update();
    }
}
function startgame(){
    loops = parseInt(document.querySelector("#loops").value);
    points = 0;
    if (!running) {
        running = true;
        setInterval(() => {
            checkClick();
            shuffle();
        }, sec);
    }
}
function stopgame() {
    console.log("In stop game");
    running = false;
    inputs.forEach(input => {
        input.removeAttribute('readonly', true);
    })
    boxes.forEach(box => {
        box.style.backgroundColor = "grey";
    })
    clickbox.style.backgroundColor = "grey";
    points = 0;
    update();
}

