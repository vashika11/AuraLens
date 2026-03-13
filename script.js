const moodData={

Happy:{color:"#ffd200",particle:"✨",quote:"Joy is the sunlight of the soul."},
Calm:{color:"#6dd5ed",particle:"💫",quote:"Peace begins when you slow down."},
Sad:{color:"#4facfe",particle:"💧",quote:"Even the darkest night will end."},
Anxious:{color:"#8e2de2",particle:"⚡",quote:"Breathe. This moment will pass."},
Excited:{color:"#ff512f",particle:"🔥",quote:"Your excitement lights the world."},
Tired:{color:"#485563",particle:"🌙",quote:"Rest is the fuel of tomorrow."},
Motivated:{color:"#38ef7d",particle:"🚀",quote:"Keep going. You are closer."},
Dreamy:{color:"#764ba2",particle:"⭐",quote:"Dreams shape your future."},
Lonely:{color:"#414345",particle:"🌧",quote:"You are never truly alone."},
Angry:{color:"#ef473a",particle:"🔥",quote:"Turn your fire into strength."},
Loving:{color:"#ff0844",particle:"❤️",quote:"Love is the brightest aura."},
Confident:{color:"#f7971e",particle:"🌟",quote:"Believe in your power."},
Curious:{color:"#396afc",particle:"🔍",quote:"Curiosity opens new worlds."},
Playful:{color:"#ff9a9e",particle:"🎉",quote:"Let joy dance freely."},
Relaxed:{color:"#56ab2f",particle:"🍃",quote:"Stillness restores your soul."}

}

function detectMood(text){

text=text.toLowerCase()

if(text.includes("happy")||text.includes("joy")) return "Happy"
if(text.includes("calm")||text.includes("peace")) return "Calm"
if(text.includes("sad")) return "Sad"
if(text.includes("stress")||text.includes("anxious")) return "Anxious"
if(text.includes("excited")) return "Excited"

return null

}

function showAura(){

let mood=document.getElementById("mood").value
const note=document.getElementById("note").value

const detected=detectMood(note)

if(detected){
mood=detected
document.getElementById("mood").value=mood
}

const data=moodData[mood]

document.getElementById("aura").style.background=data.color
document.getElementById("glow").style.background=data.color

createParticles(data)

const q=document.getElementById("quote")
q.innerText=data.quote
q.classList.add("show")

playSound(mood)
updateNebula(data.color)

}

/* audio */

let audioCtx
let soundEnabled=true

document.getElementById("soundToggle")
.addEventListener("change",(e)=>{
soundEnabled=e.target.checked
})

function playSound(mood){

if(!soundEnabled) return

if(!audioCtx)
audioCtx=new(window.AudioContext||window.webkitAudioContext)()

const osc=audioCtx.createOscillator()
const gain=audioCtx.createGain()

osc.frequency.value=220+Math.random()*200
gain.gain.value=0.04

osc.connect(gain)
gain.connect(audioCtx.destination)

osc.start()
osc.stop(audioCtx.currentTime+2)

}