const glowButton = document.getElementById("glow-button");
const chatPopup = document.getElementById("chat-popup");
const backButton = document.getElementById("back-to-landing");
const sendButton = document.getElementById("send-button");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");

function createMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function simulateTyping(text, delay = 30) {
  let i = 0;
  let typedText = "";
  const interval = setInterval(() => {
    typedText += text[i];
    if (i === 0) createMessage("", "ai");
    chatWindow.lastChild.innerText = typedText;
    i++;
    if (i >= text.length) clearInterval(interval);
  }, delay);
}

glowButton.addEventListener("click", () => {
  chatPopup.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    simulateTyping("Welcome. I'm AI Justice. How can I assist you today?");
  }, 300);
});

backButton.addEventListener("click", () => {
  chatPopup.classList.add("hidden");
  document.body.style.overflow = "auto";
  chatWindow.innerHTML = "";
  chatInput.value = "";
});

sendButton.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  createMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => {
    simulateTyping("I'm here to help. Please tell me more.");
  }, 1000);
});
