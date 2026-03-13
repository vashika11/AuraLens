const moodData={

Happy:{color:"#ffd200",freq:520,quote:"Joy is the sunlight of the soul."},
Calm:{color:"#6dd5ed",freq:220,quote:"Peace begins when you slow down."},
Sad:{color:"#4facfe",freq:180,quote:"Even the darkest night will end."},
Anxious:{color:"#8e2de2",freq:300,quote:"Breathe. This moment will pass."},
Excited:{color:"#ff512f",freq:620,quote:"Your excitement lights the world."},
Tired:{color:"#485563",freq:140,quote:"Rest is the fuel of tomorrow."},
Motivated:{color:"#38ef7d",freq:480,quote:"Keep going. You are closer."},
Dreamy:{color:"#764ba2",freq:260,quote:"Dreams shape your future."},
Lonely:{color:"#414345",freq:200,quote:"You are never truly alone."},
Angry:{color:"#ef473a",freq:650,quote:"Turn your fire into strength."},
Loving:{color:"#ff0844",freq:350,quote:"Love is the brightest aura."},
Confident:{color:"#f7971e",freq:600,quote:"Believe in your power."},
Curious:{color:"#396afc",freq:420,quote:"Curiosity opens new worlds."},
Playful:{color:"#ff9a9e",freq:520,quote:"Let joy dance freely."},
Relaxed:{color:"#56ab2f",freq:200,quote:"Stillness restores your soul."},
Grateful:{color:"#fbc531",freq:340,quote:"Gratitude turns what we have into enough."},
Optimistic:{color:"#00d2ff",freq:400,quote:"Hope lights the path ahead."},
Nostalgic:{color:"#c471f5",freq:260,quote:"Memories warm the heart."},
Peaceful:{color:"#00b894",freq:210,quote:"Peace lives in quiet moments."},
Bored:{color:"#636e72",freq:170,quote:"Sometimes boredom invites creativity."}

}

let audioCtx=null
let oscillator=null
let gainNode=null
let soundEnabled=true

function startAudio(freq){

if(!soundEnabled) return

if(!audioCtx)
audioCtx=new(window.AudioContext||window.webkitAudioContext)()

stopAudio()

oscillator=audioCtx.createOscillator()
gainNode=audioCtx.createGain()

oscillator.frequency.value=freq
oscillator.type="sine"

gainNode.gain.value=0.04

oscillator.connect(gainNode)
gainNode.connect(audioCtx.destination)

oscillator.start()

}

function stopAudio(){

if(oscillator){
oscillator.stop()
oscillator.disconnect()
oscillator=null
}

}

function showAura(){

let mood=document.getElementById("mood").value

const data=moodData[mood]

if(!data) return

document.getElementById("aura").style.background=data.color
document.getElementById("glow").style.background=data.color

document.getElementById("quote").innerText=data.quote

document.getElementById("edgeGlow")
.classList.add("edge-active")

startAudio(data.freq)

updateNebula(data.color)

}

function saveMood(){

stopAudio()

document.getElementById("edgeGlow")
.classList.remove("edge-active")

}

/* toggles */

document.getElementById("soundToggle")
.addEventListener("change",(e)=>{

soundEnabled=e.target.checked

if(!soundEnabled){
stopAudio()
}

})

document.getElementById("themeToggle")
.addEventListener("change",()=>{

document.body.classList.toggle("light")

})

/* nebula */

const nebula=document.getElementById("nebula")
const ctx=nebula.getContext("2d")

nebula.width=window.innerWidth
nebula.height=window.innerHeight

function updateNebula(color){

const gradient=ctx.createRadialGradient(
window.innerWidth/2,
window.innerHeight/2,
100,
window.innerWidth/2,
window.innerHeight/2,
600
)

gradient.addColorStop(0,color)
gradient.addColorStop(1,"transparent")

ctx.clearRect(0,0,nebula.width,nebula.height)

ctx.fillStyle=gradient
ctx.fillRect(0,0,nebula.width,nebula.height)

}