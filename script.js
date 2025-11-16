/* script.js
   - mood -> aura mapping
   - dark mode + sound toggle
   - save mood history in localStorage (last 6)
   - smooth animations and UI polish
*/

// mood -> gradient + quote + tone (frequency)
const MOODS = {
  happy:    { g: "radial-gradient(circle,#fff6a6,#ffd53e,#ff9b1f)", q: "Your joy radiates like sunlight.", f:440 },
  calm:     { g: "radial-gradient(circle,#d2fff3,#8fe9d7,#5ec4b3)", q: "Your peace is your power.", f:261.6 },
  sad:      { g: "radial-gradient(circle,#d0d6ff,#9ba7ff,#6272c9)", q: "It's okay to feel this way — gentleness helps.", f:220 },
  anxious:  { g: "radial-gradient(circle,#ffd6e6,#ff95ac,#c76f84)", q: "Breathe slowly — you've got this.", f:330 },
  excited:  { g: "radial-gradient(circle,#ffd3ff,#ff7ee0,#c349bb)", q: "Your energy is unstoppable — ride it!", f:520 },
  tired:    { g: "radial-gradient(circle,#ececff,#c3c3e6,#a0a0c0)", q: "Rest is progress — allow yourself to relax.", f:174.6 },
  grateful: { g: "radial-gradient(circle,#fff6f0,#ffd8b8,#ffb07a)", q: "Gratitude turns what we have into enough.", f:392 },
  motivated:{ g: "radial-gradient(circle,#fff3d6,#ffd07a,#ff8b3a)", q: "Take the first step — momentum follows.", f:466.16 },
  nostalgic:{ g: "radial-gradient(circle,#f3e6ff,#d8c4ff,#bfa0ff)", q: "Memory warms the heart; be kind to yourself.", f:293.66 },
  peaceful: { g: "radial-gradient(circle,#e6fff8,#bff3ea,#8fe6d7)", q: "Soft peace lives within you.", f:329.63 },
  lonely:   { g: "radial-gradient(circle,#f0f0f8,#d9d9e6,#bfbfd6)", q: "You are seen even in quiet times.", f:174.61 },
  dreamy:   { g: "radial-gradient(circle,#eaf2ff,#d6e6ff,#b7cffc)", q: "Let your imagination guide you gently.", f:392.00 },
  bored:    { g: "radial-gradient(circle,#fafaf6,#e6e6dd,#d0d0c2)", q: "Small curiosity can spark new joy.", f:196.00 },
  optimistic:{g: "radial-gradient(circle,#fff7e6,#ffd6a8,#ffb56e)", q:"Hope is a subtle, steady flame.", f:523.25 },
  angry:    { g: "radial-gradient(circle,#ffd6d6,#ff9a9a,#e84b4b)", q: "Acknowledge it; action can be gentle.", f:130.81 },
  loving:   { g: "radial-gradient(circle,#fff0f5,#ffd6ea,#ffb3d9)", q: "Love grows when shared.", f:349.23 },
  confident:{ g: "radial-gradient(circle,#fff7f0,#ffd9b8,#ffb47a)", q: "Confidence is quiet — it shows up as action.", f:440 },
  curious:  { g: "radial-gradient(circle,#f0fff7,#c8ffe8,#8ff0d0)", q: "Questions open doors — explore gently.", f:311.13 },
  playful:  { g: "radial-gradient(circle,#fff1ff,#ffd6ff,#ffb3ff)", q: "Play invites fresh perspective.", f:392.00 },
  relaxed:  { g: "radial-gradient(circle,#e9fff8,#bff3e6,#8feadd)", q: "Savor the quiet — you are okay.", f:261.63 }
};

// DOM
const moodSelect = document.getElementById('moodSelect');
const showAuraBtn = document.getElementById('showAuraBtn');
const saveMoodBtn = document.getElementById('saveMoodBtn');
const aura = document.getElementById('auraCircle');
const quoteText = document.getElementById('quoteText');
const glowRing = document.getElementById('glowRing');
const historyEl = document.getElementById('history');
const darkToggle = document.getElementById('darkToggle');
const audioToggle = document.getElementById('audioToggle');

// Web Audio API for simple ambient tone
let audioCtx, oscillator, gainNode;
function startTone(freq) {
  if (!audioToggle.checked) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  stopTone();
  oscillator = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  gainNode.gain.value = 0.0001;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  // gentle attack
  gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.4);
}
function stopTone() {
  if (gainNode) { try { gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3); } catch(e){} }
  if (oscillator) { try { oscillator.stop(audioCtx.currentTime + 0.35); } catch(e){} }
  oscillator = null;
  gainNode = null;
}

// apply initial theme from localStorage
if (localStorage.getItem('aure_dark') === '1') {
  document.body.classList.add('dark');
  darkToggle.checked = true;
}

// render history (last 6 moods)
function renderHistory(){
  const arr = JSON.parse(localStorage.getItem('aure_history') || '[]');
  historyEl.innerHTML = '';
  arr.slice().reverse().forEach(h=>{
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.textContent = `${h.mood} • ${h.time}`;
    historyEl.appendChild(pill);
  });
}
renderHistory();

// glow ring painter (CSS-based gradient update)
function updateGlow(moodKey){
  const m = MOODS[moodKey];
  if (!m) {
    glowRing.style.background = 'transparent';
    glowRing.style.opacity = 0;
    return;
  }
  // create a blurred gradient using CSS radial at center
  glowRing.style.background = `${m.g}`;
  glowRing.style.opacity = 0.95;
  // use transform to slightly pulse
  glowRing.style.transform = `scale(1)`;
  setTimeout(()=> {
    glowRing.style.opacity = 0.85;
  }, 200);
}

// show aura action
function showAuraAction() {
  const key = moodSelect.value;
  if (!key) {
    quoteText.textContent = "Please select a mood.";
    aura.style.background = "#ddd";
    glowRing.style.background = "transparent";
    stopTone();
    return;
  }
  const data = MOODS[key];
  aura.classList.add('fade-in');
  void aura.offsetWidth; // trigger reflow to restart animation
  aura.style.background = data.g;
  aura.style.transform = 'scale(1.02)';
  // gentle scale back
  setTimeout(()=> aura.style.transform = 'scale(1)', 650);

  // update glow ring (bigger, colored)
  glowRing.style.width = '360px'; glowRing.style.height = '360px';
  updateGlow(key);

  // set quote 
  quoteText.style.opacity = 0;
  setTimeout(()=> { quoteText.textContent = data.q; quoteText.style.opacity = 1; }, 200);

  // play tone
  stopTone();
  startTone(data.f);

  // save as last displayed in session (visual)
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
}

// save mood to localStorage history
function saveMood() {
  const key = moodSelect.value;
  if (!key) return alert('Select a mood first to save.');
  const arr = JSON.parse(localStorage.getItem('aure_history') || '[]');
  const now = new Date();
  const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  arr.push({ mood: key, time: timeStr });
  // keep last 6
  const keep = arr.slice(-6);
  localStorage.setItem('aure_history', JSON.stringify(keep));
  renderHistory();
  // small UI feedback
  saveMoodBtn.textContent = 'Saved ✓';
  setTimeout(()=> saveMoodBtn.textContent = 'Save', 900);
}

// dark mode toggle
darkToggle.addEventListener('change', ()=>{
  if (darkToggle.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('aure_dark','1');
  } else {
    document.body.classList.remove('dark');
    localStorage.removeItem('aure_dark');
  }
});

// audio toggle - stop sound immediately if turned off
audioToggle.addEventListener('change', ()=>{
  if (!audioToggle.checked) stopTone();
});

// button handlers
showAuraBtn.addEventListener('click', showAuraAction);
saveMoodBtn.addEventListener('click', saveMood);

// keyboard friendly: Enter shows
moodSelect.addEventListener('keydown', e=>{
  if (e.key === 'Enter') showAuraAction();
});

// Improve accessibility: announce changes (simple)
function announce(text) {
  const el = document.createElement('div');
  el.style.position='absolute'; el.style.left='-9999px';
  el.setAttribute('aria-live','polite'); el.textContent = text;
  document.body.appendChild(el);
  setTimeout(()=> document.body.removeChild(el), 1200);
}

// make aura and glow ring responsive to viewport changes
function adjustSizes(){
  const vw = Math.min(window.innerWidth, 420);
  const auraSize = vw > 390 ? 220 : (vw > 360 ? 190 : 160);
  const glowSize = auraSize + 120;
  aura.style.width = aura.style.height = auraSize + 'px';
  glowRing.style.width = glowRing.style.height = glowSize + 'px';
}
window.addEventListener('resize', adjustSizes);
adjustSizes();

// small perf: stop tone and cleanup on page hide
window.addEventListener('visibilitychange', () => {
  if (document.hidden) stopTone();
});
