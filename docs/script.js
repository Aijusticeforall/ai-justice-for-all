const glowButton = document.getElementById("glowButton");
const chatOverlay = document.getElementById("chatOverlay");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

function renderMessages() {
  chatMessages.innerHTML = '';
  history.forEach(msg => {
    const div = document.createElement("div");
    div.className = `message ${msg.sender}`;
    div.textContent = msg.text;
    chatMessages.appendChild(div);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(sender, text) {
  history.push({ sender, text });
  localStorage.setItem("chatHistory", JSON.stringify(history));
  renderMessages();
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage("user", text);
  userInput.value = "";
  setTimeout(() => {
    addMessage("bot", `🔎 Processing your input: "${text}"`);
  }, 600);
}

glowButton.onclick = () => {
  chatOverlay.style.display = "flex";
  renderMessages();
};

closeChat.onclick = () => {
  chatOverlay.style.display = "none";
};

sendBtn.onclick = sendMessage;
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
