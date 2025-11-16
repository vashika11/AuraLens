function generateAura() {
    const mood = document.getElementById("moodSelect").value;
    const aura = document.getElementById("auraCircle");
    const quoteText = document.getElementById("quoteText");

    const auraStyles = {
        happy: "radial-gradient(circle, #fff6a3, #ffd53e, #ff9f1c)",
        calm: "radial-gradient(circle, #d1fff3, #89e6d9, #55bfb0)",
        sad: "radial-gradient(circle, #d0d6ff, #9ba7ff, #6272c9)",
        anxious: "radial-gradient(circle, #ffd6e6, #ff8aa1, #c56b7c)",
        excited: "radial-gradient(circle, #ffcdfd, #ff7ee0, #c249b5)",
        tired: "radial-gradient(circle, #e8e8fb, #bfbfe4, #8f8fbb)",
    };

    const quotes = {
        happy: "Your joy radiates like sunlight.",
        calm: "Your peace is your superpower.",
        sad: "It’s okay to feel this way — healing takes time.",
        anxious: "Breathe. You are safe. You are capable.",
        excited: "Your energy is magnetic — embrace it!",
        tired: "Rest. Recharge. You deserve it.",
    };

    if (!mood) {
        quoteText.innerHTML = "Please select a mood.";
        aura.style.background = "#ccc";
        return;
    }

    aura.style.background = auraStyles[mood];
    quoteText.innerHTML = quotes[mood];
}
