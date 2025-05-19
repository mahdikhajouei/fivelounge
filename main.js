
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

let step = 0;
let userData = {};

const steps = [
  { q: "سلام خوش اومدی به فایو لانژ ✨\nالان چه حال‌وهوایی داری؟", key: "mood" },
  { q: "دوست داری چه تجربه‌ای داشته باشی؟ غذا 🍽️، نوشیدنی 🥤، قلیان 💨 یا دسر 🍰؟", key: "experience" },
  { q: "چه نوع غذاهایی رو بیشتر دوست داری؟ مثلا گوشتی، گیاهی، یا تند؟", key: "foodType", condition: "experience", values: ["غذا"] },
  { q: "برای نوشیدن چی بیشتر می‌پسندی؟ کلاسیک یا خاص؟ ترش یا شیرین؟", key: "drinkType", condition: "experience", values: ["نوشیدنی"] },
  { q: "قلیون سبک دوست داری یا سنگین؟ طعمی یا خاص؟", key: "hookahType", condition: "experience", values: ["قلیان"] },
  { q: "چیز خاصی توی ذهنت هست که همیشه دلت می‌خواد تو رستوران تجربه‌ش کنی؟", key: "specialWish" },
];

function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;
  appendMessage("شما", input);
  userInput.value = "";

  if (step < steps.length) {
    const currentStep = steps[step];
    if (!currentStep.condition || currentStep.values.includes(userData[currentStep.condition])) {
      userData[currentStep.key] = input;
    }
    step++;
    askNextQuestion();
  } else {
    giveSuggestion();
  }
}

function askNextQuestion() {
  while (step < steps.length) {
    const currentStep = steps[step];
    if (!currentStep.condition || currentStep.values.includes(userData[currentStep.condition])) {
      appendMessage("فایوبات", currentStep.q);
      break;
    }
    step++;
  }
  if (step >= steps.length) giveSuggestion();
}

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function giveSuggestion() {
  let suggestion = "";
  let reason = "";
  if (userData.experience === "نوشیدنی") {
    suggestion = "رد ای کولا 🍷";
    reason = "چون گفتی طعم خاص و حس ترش رو دوست داری، این انتخاب برات عالیه!";
  } else if (userData.experience === "غذا") {
    suggestion = "بیف سولاکی 🍖";
    reason = "یه غذای خاص و گوشتی که حس کلاس و طعم یونانی رو با هم ترکیب می‌کنه.";
  } else if (userData.experience === "قلیان") {
    suggestion = "قلیون دابل مینت نعنا و انگور 🍇🌿";
    reason = "با توجه به حال‌وهوات، این طعم خنک می‌تونه حسابی ریلکست کنه.";
  } else {
    suggestion = "تیرامیسو 🍰";
    reason = "چون دنبال یه حس لطیف و شیرین هستی، تیرامیسو انتخاب مناسبیه.";
  }
  appendMessage("فایوبات", `پیشنهاد من برات: ${suggestion}\n${reason}`);
}
