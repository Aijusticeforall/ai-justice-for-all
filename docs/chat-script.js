const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const chatHistoryEl = document.getElementById("chatHistory");
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebar");

let chats = JSON.parse(localStorage.getItem("aiJusticeChats") || "[]");
let currentChat = [];

function scrollToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addMessage(role, text) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.innerHTML = `<strong>${role === "user" ? "You" : "AI Justice"}</strong>${text}`;
  chatWindow.appendChild(msg);
  scrollToBottom();
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";
  userInput.focus();

  // Save to current session
  currentChat.push({ role: "user", text });

  // Fake AI response
  setTimeout(() => {
    const response = "This is a sample AI Justice response to: " + text;
    addMessage("ai", response);
    currentChat.push({ role: "ai", text: response });
    saveCurrentChat();
  }, 600);
}

function newChat() {
  if (currentChat.length > 0) {
    chats.push(currentChat);
    localStorage.setItem("aiJusticeChats", JSON.stringify(chats));
    currentChat = [];
  }
  chatWindow.innerHTML = "";
}

function loadChat(index) {
  chatWindow.innerHTML = "";
  currentChat = chats[index] || [];
  currentChat.forEach(entry => addMessage(entry.role, entry.text));
}

function populateHistory() {
  chatHistoryEl.innerHTML = "";
  chats.forEach((chat, index) => {
    const item = document.createElement("li");
    item.textContent = chat[0]?.text?.substring(0, 30) || "Chat " + (index + 1);
    item.onclick = () => loadChat(index);
    chatHistoryEl.appendChild(item);
  });
}

toggleSidebarBtn.onclick = () => {
  sidebar.classList.toggle("visible");
};

function saveCurrentChat() {
  localStorage.setItem("aiJusticeChats", JSON.stringify([...chats.slice(0, -1), currentChat]));
}

// Initial
populateHistory();
scrollToBottom();
