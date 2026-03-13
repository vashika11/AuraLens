const moodData={

Happy:{color:"#ffd200",quote:"Joy is the sunlight of the soul.",freq:520},
Calm:{color:"#6dd5ed",quote:"Peace begins when you slow down.",freq:220},
Sad:{color:"#4facfe",quote:"Even the darkest night will end.",freq:180},
Anxious:{color:"#8e2de2",quote:"Breathe. This moment will pass.",freq:300},
Excited:{color:"#ff512f",quote:"Your excitement lights the world.",freq:620},
Tired:{color:"#485563",quote:"Rest is the fuel of tomorrow.",freq:140},
Motivated:{color:"#38ef7d",quote:"Keep going. You are closer.",freq:480},
Dreamy:{color:"#764ba2",quote:"Dreams shape your future.",freq:260},
Lonely:{color:"#414345",quote:"You are never truly alone.",freq:200},
Angry:{color:"#ef473a",quote:"Turn your fire into strength.",freq:650},
Loving:{color:"#ff0844",quote:"Love is the brightest aura.",freq:350},
Confident:{color:"#f7971e",quote:"Believe in your power.",freq:600},
Curious:{color:"#396afc",quote:"Curiosity opens new worlds.",freq:420},
Playful:{color:"#ff9a9e",quote:"Let joy dance freely.",freq:520},
Relaxed:{color:"#56ab2f",quote:"Stillness restores your soul.",freq:200},
Grateful:{color:"#fbc531",quote:"Gratitude turns what we have into enough.",freq:340},
Optimistic:{color:"#00d2ff",quote:"Hope lights the path ahead.",freq:400},
Nostalgic:{color:"#c471f5",quote:"Memories warm the heart.",freq:260},
Peaceful:{color:"#00b894",quote:"Peace lives in quiet moments.",freq:210},
Bored:{color:"#636e72",quote:"Sometimes boredom invites creativity.",freq:170}

}

/* AI mood detection */

function detectMood(text){

text=text.toLowerCase()

if(text.includes("happy")||text.includes("joy")) return "Happy"
if(text.includes("calm")||text.includes("peace")) return "Calm"
if(text.includes("sad")||text.includes("down")) return "Sad"
if(text.includes("stress")||text.includes("anxious")) return "Anxious"
if(text.includes("excited")) return "Excited"
if(text.includes("tired")||text.includes("sleep")) return "Tired"
if(text.includes("motivat")) return "Motivated"
if(text.includes("dream")) return "Dreamy"
if(text.includes("lonely")) return "Lonely"
if(text.includes("angry")) return "Angry"
if(text.includes("love")) return "Loving"
if(text.includes("confident")) return "Confident"
if(text.includes("curious")) return "Curious"
if(text.includes("play")) return "Playful"
if(text.includes("relax")) return "Relaxed"
if(text.includes("grateful")||text.includes("thank")) return "Grateful"
if(text.includes("optimistic")||text.includes("hope")) return "Optimistic"
if(text.includes("nostalgia")||text.includes("memory")) return "Nostalgic"
if(text.includes("peaceful")) return "Peaceful"
if(text.includes("bored")) return "Bored"

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