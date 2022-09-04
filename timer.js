// Grab element handles
const breakLength = document.getElementById('break-length')
const breakIncrement = document.getElementById('break-increment')
const breakDecrement = document.getElementById('break-decrement')
const sessionLength = document.getElementById('session-length')
const sessionIncrement = document.getElementById('session-increment')
const sessionDecrement = document.getElementById('session-decrement')
const timeLeft = document.getElementById('time-left')
const controlBtn = document.getElementById('start_stop')
const reset = document.getElementById('reset')
const beep = document.getElementById('beep')
const timerLabel = document.getElementById('timer-label')
const body = document.getElementById('root')
const bg = document.getElementById('bg') 



// initializations
let breakCount = 5
let sessionCount = 25
let seconds = 00.toLocaleString('en-US',{minimumIntegerDigits:2})
let timerInterval = null;
let breakInterval = null;
let id = null;
let beepSound;
let pos = 0;
let active = false;
let isPaused = false;
let sessionCounter;
let breakCounter;
let newTime;

// load function
function load(){
    breakLength.innerText=breakCount
    sessionLength.innerText=sessionCount
    timeLeft.innerText = `${sessionCount}:${seconds}`
}

document.onload = load()

// add event listeners
controlBtn.addEventListener('click', switchClass=()=>{
    if(controlBtn.classList.contains('fa-play')){ 
         controlBtn.classList.remove('fa-play')
         controlBtn.classList.add('fa-pause')
         startTimer()
         active = true
         if(isPaused){
            continueTimer()
            isPaused = false
         }else{
            startTimer()
         }
         bg.setAttribute('src', './activebg.gif')
         bg.classList.add('bg-extra')
         body.style.color = 'white'
    }
    else if(controlBtn.classList.contains('fa-pause') && timerLabel.innerText == 'Session'){
        controlBtn.classList.remove('fa-pause')
        controlBtn.classList.add('fa-play')
        clearInterval(timerInterval)
        clearInterval(breakInterval)
        active = false
        isPaused = true
        bg.setAttribute('src', './inactivebg.gif')
        bg.classList.remove('bg-extra')
        body.style.color = 'black'
    }
})

reset.addEventListener('click', resetFunc=()=>{
    id= setInterval(rotate, 3);
    pos = 0;
    if(controlBtn.classList.contains('fa-pause')){
        controlBtn.classList.remove('fa-pause')
        controlBtn.classList.add('fa-play')
    }
    clearInterval(beepSound)
    clearInterval(timerInterval)
    clearInterval(breakInterval)
    breakCount = 5
    sessionCount = 25
    seconds = 00.toLocaleString('en-US',{minimumIntegerDigits:2})
    breakLength.innerText = breakCount 
    sessionLength.innerText = sessionCount 
    timerLabel.innerText = 'Timer'
    timeLeft.innerText = `${sessionCount}:${seconds}`
    active =false
    bg.setAttribute('src', './inactivebg.gif')
    bg.classList.remove('bg-extra')
    body.style.color = 'black'
})

function rotate(){
    if(pos == 360){
        clearInterval(id)
    } else{
        pos++;
        reset.style.transform = `rotate(${pos}deg`;
    }
}

// conditional eventlisteners

// functions
function decrement(){
    if(breakCount != 1){
        breakCount--
        seconds = 00.toLocaleString('en-US', {minimumIntegerDigits:2})
    }
    breakLength.innerText = breakCount 
}

function increment(){
    if(breakCount < 60){
       breakCount++
       seconds = 00.toLocaleString('en-US', {minimumIntegerDigits:2})
       breakLength.innerText = breakCount 
    }
}

function increase(){
    if(sessionCount < 60){
        sessionCount++
        seconds=00.toLocaleString('en-US', {minimumIntegerDigits:2})
        sessionLength.innerText = sessionCount 
        timeLeft.innerText = `${sessionCount}:${seconds}`
    }
}

function decrease(){
    if(sessionCount != 1){
        sessionCount--
    }
    sessionLength.innerText = sessionCount 
    seconds=00.toLocaleString('en-US', {minimumIntegerDigits:2})
    timeLeft.innerText = `${sessionCount}:${seconds}`
}

setInterval(function(){
    if(!active){
    breakDecrement.addEventListener('click', decrement)

    breakIncrement.addEventListener('click', increment)

    sessionIncrement.addEventListener('click', increase)

    sessionDecrement.addEventListener('click', decrease)
}else{
    breakDecrement.removeEventListener('click', decrement)

    breakIncrement.removeEventListener('click', increment)

    sessionIncrement.removeEventListener('click', increase)

    sessionDecrement.removeEventListener('click', decrease)

}
},1000)

// Timer Running function

startTimer=()=>{
    clearInterval(timerInterval);
                sessionCounter = sessionCount;
                sessionCounter-=1;
                seconds = 59;
                timerInterval=setInterval(function(){
                timerLabel.innerText = 'Session'
                timeLeft.innerText=`${sessionCounter.toLocaleString('en-US',{minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US',{minimumIntegerDigits:2})}`
                if(seconds == 0){
                    if(sessionCounter == 0){
                        clearInterval(timerInterval);
                        beepSound = setInterval(function(){beep.play()},1000)
                        setTimeout(function(){clearInterval(beepSound)}, 10000)
                        breakCounter = breakCount
                        timeLeft.innerText=`${breakCounter.toLocaleString('en-US',{minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US',{minimumIntegerDigits:2})}`
                        timerLabel.innerText = 'Break'
                        breakTimer()
                    }
                    sessionCounter--;
                    seconds = 60;
                }
            seconds--;
    }, 1000);
};

breakTimer=()=>{
    clearInterval(breakInterval);
        breakCounter = breakCount;
        breakCounter -= 1;
        breakInterval=setInterval(function(){
                timerLabel.innerText = 'Break'
                timeLeft.innerText=`${breakCounter.toLocaleString('en-US',{minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US',{minimumIntegerDigits:2})}`
                if(seconds == 0){
                    if(breakCounter == 0){
                    clearInterval(breakInterval);
                    beepSound = setInterval(function(){beep.play()},1000)
                    setTimeout(function(){clearInterval(beepSound)}, 5000)
                    timerLabel.innerText = 'Session'
                    startTimer()
                }
                breakCounter--;
                seconds = 60;
            }
            seconds--;
    }, 1000);
};

continueTimer=()=>{
    clearInterval(timerInterval);
    newTime = timeLeft.innerText.split(':')
    sessionCounter = newTime[0];
    seconds = newTime[1];
    timerInterval=setInterval(function(){
    timerLabel.innerText = 'Session'
    timeLeft.innerText=`${sessionCounter.toLocaleString('en-US',{minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US',{minimumIntegerDigits:2})}`
    if(seconds == 0){
        if(sessionCounter == 0){
            clearInterval(timerInterval);
            beepSound = setInterval(function(){beep.play()},1000)
            setTimeout(function(){clearInterval(beepSound)}, 10000)
            breakCounter = breakCount
            timeLeft.innerText=`${breakCounter.toLocaleString('en-US',{minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US',{minimumIntegerDigits:2})}`
            timerLabel.innerText = 'Break'
            breakTimer()
        }
        sessionCounter--;
        seconds = 60;
    }
            seconds--;
    }, 1000);
};