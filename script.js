const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const SBtn = document.querySelector('.SBtn');
const PBtn = document.querySelector('.PBtn');
const RBtn = document.querySelector('.RBtn');
const ReBtn = document.querySelector('.ReBtn');
const pomocount = document.querySelector('.pomocounts');

const work_time = 2 * 60;
const break_time = 0.1 * 60;
let timerID = null
let oneround = false
let totalround = 0;
let ispaused = false;


const updatetitle = (msg) =>{
    title.textContent = msg;
}

const savelocalcounts = () =>{
    let counts = JSON.parse(localStorage.getItem("pomocounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomocounts", JSON.stringify(counts));
}
const countdown = (time) => {
    return () => {
        const min = Math.floor(time/60).toString().padStart(2, '0');
        const sec = Math.floor(time % 60).toString().padStart(2, '0');
        timer.textContent = `${min}:${sec}`;
        // timer.textContent = time;
        time--;
        if(time < 0){
            stoptimer();
            if(!oneround){
                timerID = starttimer(break_time)
                oneround = true;
                updatetitle("Its break time")
            }else{
                updatetitle("completed 1 round of pomodoro technique")
                setTimeout(() => updatetitle("Start timer again!"), 2000);
                totalround++;
                savelocalcounts();
                showpomocounts();
            }

        }
    }
}


const starttimer = (starttime) =>{
    if(timerID !== null){
        stoptimer();
    }
    return setInterval(countdown(starttime), 1000);
}

const stoptimer = () =>{
    clearInterval(timerID)
    timerID = null
}

const getTimeInSec = (timerstring) =>{
    const [min, sec] = timerstring.split(":");
    return parseInt (min * 60) + parseInt (sec);
}

SBtn.addEventListener('click', ()=>{
    timerID = starttimer(work_time)
    updatetitle("Its work time!")
});

const showpomocounts = () =>{
    const counts = JSON.parse(localStorage.getItem("pomocounts"));
    if (counts > 0) {
        pomocount.style.display = "flex";
    }
    pomocount.firstElementChild.textContent = counts;
}

showpomocounts();


PBtn.addEventListener('click', () =>{
    stoptimer();
    ispaused = true;
    updatetitle("Timer paused");
});

RBtn.addEventListener('click', () =>{
    if(ispaused){
        const currenttime = getTimeInSec(timer.textContent);
        timerID = starttimer(currenttime);
        ispaused = false;
        (!oneround) ? updatetitle("Its work time") : updatetitle("Its break time");
    }
});

ReBtn.addEventListener('click', () =>{
    stoptimer();
    timer.textContent = "25:00"
    updatetitle("Click start to start timer")
});


