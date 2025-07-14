
document.getElementById("glow-button").addEventListener("click", () => {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("chat-app").classList.remove("hidden");
});

document.getElementById("back-home").addEventListener("click", () => {
  document.getElementById("landing").classList.remove("hidden");
  document.getElementById("chat-app").classList.add("hidden");
});

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chatHistory = document.getElementById("chat-history");
let chats = JSON.parse(localStorage.getItem("chats") || "[]");
let currentChat = [];

function saveChat() {
  if (currentChat.length === 0) return;
  chats.push(currentChat);
  localStorage.setItem("chats", JSON.stringify(chats));
  renderHistory();
}

function renderHistory() {
  chatHistory.innerHTML = "";
  chats.forEach((chat, i) => {
    const li = document.createElement("li");
    li.textContent = chat[0]?.content || "New Chat";
    li.onclick = () => {
      chatMessages.innerHTML = "";
      chat.forEach(msg => renderMessage(msg.sender, msg.content));
      currentChat = [...chat];
    };
    chatHistory.appendChild(li);
  });
}
renderHistory();

function renderMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-msg" : "ai-msg";
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderTypingDots() {
  const div = document.createElement("div");
  div.className = "ai-msg typing";
  div.innerHTML = "<span>●</span><span>●</span><span>●</span>";
  chatMessages.appendChild(div);
  return div;
}

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  renderMessage("user", message);
  currentChat.push({ sender: "user", content: message });
  chatInput.value = "";

  const dots = renderTypingDots();
  setTimeout(() => {
    dots.remove();
    const reply = "This is a placeholder AI reply.";
    renderMessage("ai", reply);
    currentChat.push({ sender: "ai", content: reply });
    saveChat();
  }, 1200);
});
