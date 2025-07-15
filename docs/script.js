console.log("✅ Script loaded");

const glowButton = document.getElementById("glow-button");
const chatPopup = document.getElementById("chat-popup");
const backButton = document.getElementById("back-to-landing");
const sendButton = document.getElementById("send-button");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");
const toggleSidebar = document.getElementById("toggle-sidebar");
const sidebar = document.getElementById("chat-sidebar");
const toggleTheme = document.getElementById("toggle-theme");

glowButton.addEventListener("click", () => {
  chatPopup.classList.remove("hidden");
  document.querySelector(".landing").classList.add("hidden");
  simulateTyping("Welcome. I'm AI Justice. How can I assist you today?");
});

backButton.addEventListener("click", () => {
  chatPopup.classList.add("hidden");
  document.querySelector(".landing").classList.remove("hidden");
});

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

function simulateTyping(text) {
  const msg = document.createElement("div");
  msg.innerText = text;
  chatWindow.appendChild(msg);
}

sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  const msg = document.createElement("div");
  msg.innerText = "You: " + text;
  chatWindow.appendChild(msg);
  chatInput.value = "";
  simulateTyping("AI: I'm here to help.");
}
