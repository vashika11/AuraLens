function createParticles(data){

createRing("orbit1",data.particle,6,7)
createRing("orbit2",data.particle,8,10)
createRing("orbit3",data.particle,10,14)

}

function createRing(id,particle,count,speed){

const orbit=document.getElementById(id)
orbit.innerHTML=""

for(let i=0;i<count;i++){

let p=document.createElement("div")
p.className="particle"

p.innerText=particle

p.style.animationDuration=(speed+Math.random()*3)+"s"

p.style.transform="rotate("+(i*(360/count))+"deg)"

orbit.appendChild(p)

}

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