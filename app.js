let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"];
let h2 = document.querySelector("h2");
let started = false;
let highscore = 0;
let level = 0;
document.addEventListener("keypress",function() {
    if(started == false){
        console.log("Game started");
        started = true;
        levelup();
    }
})
document.addEventListener("click",function() {
    if(started == false){
        console.log("Game started");
        started = true;
        levelup();
    }
})

function levelup(){
    userseq = [];
    level++;
    if(highscore < level) highscore = level;
    h2.innerHTML = `Level ${level}<br>New Highscore::${highscore}`;

    //choose a random colour
    let randidx = Math.floor(Math.random()*3);
    let randcolor = btns[randidx];
    gameseq.push(randcolor);
    let randbtn = document.querySelector(`.${randcolor}`);
    console.log(gameseq);
    // console.log(randidx);
    // console.log(randcolor);
    btnflash(randbtn);
}

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

function checkans(idx){
    // let idx = level - 1;
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else{
        if(highscore < level) highscore = level;
        h2.innerHTML = `Game over! Your score is <b>${level}.</b><br>Press any key to restart.<br>Highscore::${highscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200)
        reset();
    }
}

function btnpress(){
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    console.log(userseq);
    checkans(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset() {
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}