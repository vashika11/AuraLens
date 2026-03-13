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