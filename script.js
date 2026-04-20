const moodSelect = document.getElementById("moodSelect");

const generateBtn = document.getElementById("generateBtn");
const anotherBtn = document.getElementById("anotherBtn");
const clearBtn = document.getElementById("clearBtn");

const message = document.getElementById("message");

const moodMessage = document.getElementById("moodMessage");
const activityText = document.getElementById("activityText");
const tipText = document.getElementById("tipText");
const typeText = document.getElementById("typeText");
const quoteText = document.getElementById("quoteText");

const moodData = {
  stressed: {
    message: "Take a deep breath. Slow down.",
    activities: [
      "Go for a short walk",
      "Drink water",
      "Stretch for 5 minutes"
    ],
    tips: [
      "Close your eyes for 10 seconds",
      "Relax your shoulders",
      "Take a deep breath"
    ]
  },
  tired: {
    message: "Your body needs rest.",
    activities: [
      "Take a short nap",
      "Close your eyes for 2 minutes",
      "Drink something warm"
    ],
    tips: [
      "Avoid your phone for a bit",
      "Sit comfortably",
      "Rest your eyes"
    ]
  },
  overthinking: {
    message: "Not everything needs an answer now.",
    activities: [
      "Write your thoughts down",
      "Take a break from your phone",
      "Listen to calm music"
    ],
    tips: [
      "Focus on one thing only",
      "Breathe slowly",
      "Let thoughts pass"
    ]
  },
  unmotivated: {
    message: "Start small. Just one step.",
    activities: [
      "Do 1 simple task",
      "Clean your desk",
      "Set a tiny goal"
    ],
    tips: [
      "Start for 2 minutes only",
      "Don’t think, just start",
      "Small steps matter"
    ]
  }
};

async function getQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data.content || "Stay calm. You got this.";
  } catch (error) {
    return "Stay calm. You got this.";
  }
}

function setCardText(element, text) {
  element.textContent = "";
  element.style.opacity = "0";

  requestAnimationFrame(() => {
    element.textContent = text;
    element.style.transition = "opacity 0.25s ease";
    element.style.opacity = "1";
  });
}

async function generate() {
  const mood = moodSelect.value;

  if (mood === "") {
    message.textContent = "Please select a mood.";
    return;
  }

  message.textContent = "Loading...";

  const moodInfo = moodData[mood];

  const randomActivity =
    moodInfo.activities[Math.floor(Math.random() * moodInfo.activities.length)];

  const randomTip =
    moodInfo.tips[Math.floor(Math.random() * moodInfo.tips.length)];

  const quote = await getQuote();

  setCardText(moodMessage, moodInfo.message);
  setCardText(activityText, randomActivity);
  setCardText(tipText, randomTip);
  setCardText(typeText, mood);
  setCardText(quoteText, quote);

  message.textContent = "Done ✔";
}

function clearAll() {
  moodSelect.value = "";

  moodMessage.textContent = "-";
  activityText.textContent = "-";
  tipText.textContent = "-";
  typeText.textContent = "-";
  quoteText.textContent = "-";

  message.textContent = "Choose your mood to begin";
}

generateBtn.addEventListener("click", generate);
anotherBtn.addEventListener("dblclick", generate);
clearBtn.addEventListener("click", clearAll);

moodSelect.addEventListener("change", function () {
  message.textContent = "Mood selected.";
});