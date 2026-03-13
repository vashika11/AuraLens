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

function saveMood(){

const mood=document.getElementById("mood").value
const note=document.getElementById("note").value
const time=new Date().toLocaleString()

document.getElementById("badge").innerText=mood+" • "+time

localStorage.setItem("AuraMood",JSON.stringify({mood,note,time}))

}

document.getElementById("themeToggle")
.addEventListener("change",()=>{

document.body.classList.toggle("light")

})