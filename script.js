const buttonColors=["red","blue","green","yellow"]

let gamePattern=[] //system generated random colors
let userClickedPattern=[] //user clicked colors

let started= false;
let level= 0;

document.addEventListener("keypress", function(){
 if (!started) {
          //started == false i.e ! denotes false
    document.querySelector("#level-title").innerHTML=`level ${level}`;
    started= true;
    nextSequence();
 }
});

document.querySelectorAll(".btn").forEach(function (item){
    item.addEventListener("click",function(event){
      let userChosenColor= event.target.id;
      userClickedPattern.push(userChosenColor);

      animatePress(userChosenColor);
      playSound(userChosenColor);

      checkAnswer(userClickedPattern.length-1);
    });
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000)

        }
    }
    else{
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.getElementById("level-title").innerHTML ="Game over, Press any key to restart";
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        }, 300);
        startOver();
    }

}

function fadeIn(time,id){
    let fade=document.getElementById(id);
    setTimeout(function(){
        fade.style.opacity=0.1;
    },time);
  }

  function fadeOut(time,id){
    let fade=document.getElementById(id);
    setTimeout(function(){
        fade.style.opacity=1;
    },time);
  }
function nextSequence(){
    userClickedPattern=[];
    level++;
    document.querySelector("#level-title").innerHTML=`level ${level}`;
    let randomNumber= Math.floor(Math.random() * 4); //To round off the decimal values
    let randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    fadeIn(500,randomChosenColor);
    fadeOut(700,randomChosenColor);

    playSound(randomChosenColor);
}

function playSound(name){
    let audio= new Audio("sounds/"+ name +'.mp3')
    audio.play();
}

function animatePress(currentColor){
    document.getElementById(currentColor).classList.add("pressed");

    setTimeout(function(){
        document.getElementById(currentColor).classList.remove("pressed");

    },500)
}

function startOver(){
    level=0;
    gamePattern= [];
    started= false;
}