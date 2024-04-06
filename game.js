var gamePattern = [];
var userClickPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameRes = false;
    
$(document).keypress(function(){
    if(!gameRes){
        nextSequence();
        gameRes = true;
    }
});

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");

    userClickPattern.push(userChosenColor);
    
    animatePress(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickPattern.length-1);
});


function nextSequence(){
    
    userClickPattern = [];

    var randomSelect = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomSelect];

    gamePattern.push(randomChosenColor);
   
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    
    $("h1").text("level "+level);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(lastCall){
    if(gamePattern[lastCall] === userClickPattern[lastCall]){
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("GAME OVER, Press Any Key to Restart");
        
        playSound("wrong");

        restartGame();
    }
}

function restartGame(){
    level = 0;
    gamePattern = [];
    gameRes = false;
}

