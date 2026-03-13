document.addEventListener("DOMContentLoaded",()=>{

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

let audioCtx
let oscillator
let soundEnabled=true

const aura=document.getElementById("aura")
const glow=document.getElementById("glow")
const quote=document.getElementById("quote")
const moodSelect=document.getElementById("mood")

function detectMood(text){

text=text.toLowerCase()

if(text.includes("stress")) return "Anxious"
if(text.includes("happy")) return "Happy"
if(text.includes("sad")) return "Sad"
if(text.includes("calm")) return "Calm"

return null
}

window.showAura=function(){

let mood=moodSelect.value

const note=document.getElementById("note").value
const detected=detectMood(note)

if(detected){
mood=detected
moodSelect.value=mood
}

const data=moodData[mood]

if(!data) return

aura.style.background=data.color
glow.style.background=data.color
quote.innerText=data.quote

document.getElementById("edgeGlow").classList.add("edge-active")

playSound(data.freq)

updateNebula(data.color)

}

window.saveMood=function(){

if(oscillator){
oscillator.stop()
oscillator=null
}

document.getElementById("edgeGlow").classList.remove("edge-active")

}

function playSound(freq){

if(!soundEnabled) return

if(!audioCtx)
audioCtx=new(window.AudioContext||window.webkitAudioContext)()

if(oscillator){
oscillator.stop()
}

oscillator=audioCtx.createOscillator()

const gain=audioCtx.createGain()

oscillator.frequency.value=freq
gain.gain.value=0.04

oscillator.connect(gain)
gain.connect(audioCtx.destination)

oscillator.start()

}

document.getElementById("soundToggle").addEventListener("change",(e)=>{
soundEnabled=e.target.checked
})

document.getElementById("themeToggle").addEventListener("change",()=>{
document.body.classList.toggle("light")
})

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

})