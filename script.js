function generateAura() {
    const mood = document.getElementById("moodSelect").value;
    const aura = document.getElementById("auraCircle");
    const quoteText = document.getElementById("quoteText");

    const auraStyles = {
        happy: "radial-gradient(circle, #fffb96, #ffcc00, #ff9a00)",
        calm: "radial-gradient(circle, #b2f1e5, #6ed3cf, #3b9ea1)",
        sad: "radial-gradient(circle, #9bb5ff, #6a82fb, #4b5dab)",
        anxious: "radial-gradient(circle, #ffd6e0, #ff9a9e, #c76f7d)",
        excited: "radial-gradient(circle, #ffb3fe, #ff63d8, #c44bc9)",
        tired: "radial-gradient(circle, #d7d6f5, #b5b4d4, #908fa8)"
    };

    const quotes = {
        happy: "Your joy is glowing — keep shining!",
        calm: "Peace flows through you today.",
        sad: "It’s okay to feel like this. Brighter days are coming.",
        anxious: "Take a deep breath. You are stronger than you think.",
        excited: "Your energy is electric. Chase your dreams!",
        tired: "Rest is also progress. Take it slow today."
    };

    if (!mood) {
        aura.style.background = "#ccc";
        quoteText.innerHTML = "Please select a mood!";
        return;
    }

    aura.style.background = auraStyles[mood];
    aura.style.boxShadow = `0 0 50px 25px rgba(0,0,0,0.15)`;
    quoteText.innerHTML = quotes[mood];
}
