/* particles.js
   - background soft floating particles
   - rotating orbit glow ring (glowing particles)
   - mobile-aware (less particles on small screens)
*/

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function fitCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
fitCanvas();
window.addEventListener('resize', fitCanvas);

// background particles
let bgParticles = [];
const bgCount = Math.max(25, Math.floor(window.innerWidth / 24));

function initBg() {
  bgParticles = [];
  for (let i = 0; i < bgCount; i++) {
    bgParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 0.6,
      a: Math.random() * 0.6 + 0.1,
      vx: (Math.random() - 0.5) * 0.2,
      vy: - (Math.random() * 0.25 + 0.05)
    });
  }
}
initBg();

// orbit ring particles (glow)
let orbitParticles = [];
const orbitCount = 32;
function initOrbit() {
  orbitParticles = [];
  for (let i = 0; i < orbitCount; i++) {
    orbitParticles.push({
      angle: (Math.PI * 2 / orbitCount) * i,
      speed: 0.002 + Math.random() * 0.003,
      dist: 120 + Math.random() * 40,
      r: 3 + Math.random() * 3,
      hueOffset: Math.random()
    });
  }
}
initOrbit();

// animation loop
let t = 0;
function animate() {
  t += 0.5;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw bg particles
  for (let p of bgParticles) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -10) p.y = canvas.height + 10;
    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;
  }

  // find center for orbit (center of viewport — matches centered card)
  const cx = canvas.width / 2;
  const cy = canvas.height / 2 + 10; // slight visual lift

  // orbit ring - draw ambient glow ring (behind)
  const grd = ctx.createRadialGradient(cx, cy, 40, cx, cy, 260);
  grd.addColorStop(0, 'rgba(255,255,255,0.02)');
  grd.addColorStop(1, 'rgba(120,120,160,0.03)');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(cx, cy, 260, 0, Math.PI * 2);
  ctx.fill();

  // draw orbit particles
  for (let i = 0; i < orbitParticles.length; i++) {
    const op = orbitParticles[i];
    op.angle += op.speed * (1 + Math.sin(t / 200) * 0.3);
    const x = cx + Math.cos(op.angle) * op.dist;
    const y = cy + Math.sin(op.angle) * op.dist;

    const hue = (t / 8 + i * 7 + op.hueOffset * 50) % 360;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${hue},80%,65%,0.12)`;
    ctx.arc(x, y, op.r, 0, Math.PI * 2);
    ctx.fill();

    // brighter core
    ctx.beginPath();
    ctx.fillStyle = `hsla(${hue},85%,65%,0.22)`;
    ctx.arc(x, y, op.r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}
animate();
