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
Relaxed:{color:"#56ab2f",quote:"Stillness restores your soul.",freq:200}

}

/* AI style mood detection */

function detectMood(text){

text=text.toLowerCase()

if(text.includes("happy")||text.includes("joy")) return "Happy"
if(text.includes("calm")||text.includes("peace")) return "Calm"
if(text.includes("sad")||text.includes("down")) return "Sad"
if(text.includes("stress")||text.includes("anxious")) return "Anxious"
if(text.includes("excited")) return "Excited"
if(text.includes("tired")||text.includes("sleepy")) return "Tired"
if(text.includes("love")) return "Loving"
if(text.includes("angry")) return "Angry"

return null

}