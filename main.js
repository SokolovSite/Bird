//ИСХОДНИКИ

let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');


let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = 'img/bird.png';
bg.src = 'img/bird_bg.png';
fg.src = 'img/bird_fg.png';
pipeUp.src = 'img/bird_pipeUp.png';
pipeBottom.src = 'img/bird_pipeBottom.png';

//ЗВУК

let fly = new Audio();
let score_audio = new Audio();
let fuck = new Audio();
let muz = new Audio();

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';
fuck.src = 'audio/fuck.mp3';
muz.src = 'audio/muz.mp3'

let gap = 90;

//ДЕЙСТВИЕ

document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}
  

//БЛОКИ

let pipe =[];
pipe[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;

//ПОЗИЦИОНИРОВАНИЕ И ГРАВИТАЦИЯ ПТИЦЫ

let xPos = 10;
let yPos = 150;
let grav = 1.5;


function draw () {
    
    ctx.drawImage(bg, 0 ,0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 60) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        } 

        //ОТСЛЕЖИВАНИЕ ПРИКОСНОВНИЯ

       
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height) {
                location.reload();
            } //ПЕРЕЗАПУСК
         

        if(location) {
            muz.play();
        }

        if(pipe[i].x == 5) {
            score++;
            fuck.play();
        } //СЧЕТ
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = '#000';
    ctx.font = '24px Verdana';
    ctx.fillText('Счёт: ' + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;



