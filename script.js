const moodData={

Happy:{color:"#ffd200",quote:"Joy is the sunlight of the soul.",freq:520},
Calm:{color:"#6dd5ed",quote:"Peace begins when you slow down.",freq:220},
Sad:{color:"#4facfe",quote:"Even the darkest night will end.",freq:180},
Anxious:{color:"#8e2de2",quote:"Breathe. This moment will pass.",freq:300},
Excited:{color:"#ff512f",quote:"Your excitement lights the world.",freq:620},
Relaxed:{color:"#56ab2f",quote:"Stillness restores your soul.",freq:200}

}

/* AI mood detection */

function detectMood(text){

text=text.toLowerCase()

if(text.includes("happy")||text.includes("joy")) return "Happy"
if(text.includes("calm")) return "Calm"
if(text.includes("sad")) return "Sad"
if(text.includes("stress")||text.includes("anxious")) return "Anxious"
if(text.includes("excited")) return "Excited"

return null
}

let audioCtx
let oscillator
let soundEnabled=true

function playSound(freq){

if(!soundEnabled) return

if(!audioCtx)
audioCtx=new(window.AudioContext||window.webkitAudioContext)()

if(oscillator) oscillator.stop()

oscillator=audioCtx.createOscillator()
const gain=audioCtx.createGain()

oscillator.frequency.value=freq
gain.gain.value=0.04

oscillator.connect(gain)
gain.connect(audioCtx.destination)

oscillator.start()

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

document.getElementById("edgeGlow")
.classList.add("edge-active")

const q=document.getElementById("quote")
q.innerText=data.quote
q.classList.add("show")

playSound(data.freq)

updateNebula(data.color)

}

function saveMood(){

if(oscillator) oscillator.stop()

document.getElementById("edgeGlow")
.classList.remove("edge-active")

}

/* theme */

document.getElementById("themeToggle")
.addEventListener("change",()=>{
document.body.classList.toggle("light")
})

document.getElementById("soundToggle")
.addEventListener("change",(e)=>{
soundEnabled=e.target.checked
})

/* nebula */

const nebula=document.getElementById("nebula")
const n=nebula.getContext("2d")

nebula.width=window.innerWidth
nebula.height=window.innerHeight

function updateNebula(color){

const gradient=n.createRadialGradient(
window.innerWidth/2,
window.innerHeight/2,
100,
window.innerWidth/2,
window.innerHeight/2,
600
)

gradient.addColorStop(0,color)
gradient.addColorStop(1,"transparent")

n.clearRect(0,0,nebula.width,nebula.height)

n.fillStyle=gradient
n.fillRect(0,0,nebula.width,nebula.height)

}