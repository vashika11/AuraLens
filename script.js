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

/* aura */

function showAura(){

const mood=document.getElementById("mood").value
const data=moodData[mood]

document.getElementById("aura").style.background=data.color
document.getElementById("glow").style.background=data.color

createParticles(data)

const q=document.getElementById("quote")
q.innerText=data.quote
q.classList.add("show")

}

/* orbit particles */

function createParticles(data){

const orbit=document.getElementById("orbit")
orbit.innerHTML=""

for(let i=0;i<10;i++){

let p=document.createElement("div")
p.className="particle"

p.innerText=data.particle

p.style.animationDuration=(6+Math.random()*4)+"s"

p.style.transform="rotate("+(i*36)+"deg)"

orbit.appendChild(p)

}

}

/* save */

function saveMood(){

const mood=document.getElementById("mood").value
const note=document.getElementById("note").value
const time=new Date().toLocaleString()

document.getElementById("badge").innerText=mood+" • "+time

localStorage.setItem("AuraMood",
JSON.stringify({mood,note,time}))

}

/* theme */

document.getElementById("themeToggle")
.addEventListener("change",()=>{

document.body.classList.toggle("light")

})

/* sound */

let ctx
let soundEnabled=true

document.getElementById("soundToggle")
.addEventListener("change",(e)=>{

soundEnabled=e.target.checked

})

function playTone(){

if(!soundEnabled) return

if(!ctx) ctx=new(window.AudioContext||window.webkitAudioContext)()

const osc=ctx.createOscillator()
const gain=ctx.createGain()

osc.frequency.value=300+Math.random()*300
gain.gain.value=0.05

osc.connect(gain)
gain.connect(ctx.destination)

osc.start()
osc.stop(ctx.currentTime+2)

}

/* stars */

const canvas=document.getElementById("stars")
const c=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let stars=[]

for(let i=0;i<120;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2
})
}

function draw(){

c.clearRect(0,0,canvas.width,canvas.height)

c.fillStyle="white"

stars.forEach(s=>{
c.beginPath()
c.arc(s.x,s.y,s.r,0,Math.PI*2)
c.fill()

s.y+=0.2
if(s.y>canvas.height) s.y=0

})

requestAnimationFrame(draw)

}

draw()