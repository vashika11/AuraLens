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