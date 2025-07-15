console.log("✅ script.js is connected!");
const glowButton = document.getElementById("glow-button");
const chatPopup = document.getElementById("chat-popup");
const backButton = document.getElementById("back-to-landing");
const sendButton = document.getElementById("send-button");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");
const toggleSidebar = document.getElementById("toggle-sidebar");
const sidebar = document.getElementById("chat-sidebar");
const chatList = document.getElementById("chat-list");

let currentChat = "Untitled Chat";

// === LocalStorage Helpers ===
function saveChatToStorage() {
  const messages = [...chatWindow.querySelectorAll(".message")].map(m => ({
    sender: m.classList.contains("user") ? "user" : "ai",
    text: m.innerText
  }));
  localStorage.setItem(`chat-${currentChat}`, JSON.stringify(messages));
  loadChatList();
}

function loadChatList() {
  chatList.innerHTML = "";

  // "New Chat" button at top
  const newBtn = document.createElement("li");
  newBtn.classList.add("chat-item", "new-chat");
  newBtn.innerText = "+ New Chat";
  newBtn.onclick = () => startNewChat();
  chatList.appendChild(newBtn);

  Object.keys(localStorage)
    .filter(key => key.startsWith("chat-"))
    .forEach(key => {
      const name = key.replace("chat-", "");
      
      const li = document.createElement("li");
      li.classList.add("chat-item");
      if (name === currentChat) li.classList.add("active");

      const span = document.createElement("span");
      span.innerText = name;
      span.onclick = () => loadChat(name);

      const renameBtn = document.createElement("button");
      renameBtn.innerText = "✏️";
      renameBtn.classList.add("rename-chat");
      renameBtn.onclick = (e) => {
        e.stopPropagation();
        const newName = prompt("Rename chat:", name);
        if (newName && newName !== name) {
          const data = localStorage.getItem(`chat-${name}`);
          localStorage.removeItem(`chat-${name}`);
          localStorage.setItem(`chat-${newName}`, data);
          if (currentChat === name) currentChat = newName;
          loadChatList();
        }
      };

      const delBtn = document.createElement("button");
      delBtn.innerText = "🗑️";
      delBtn.classList.add("delete-chat");
      delBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm(`Delete "${name}"?`)) {
          localStorage.removeItem(`chat-${name}`);
          if (currentChat === name) {
            chatWindow.innerHTML = "";
          }
          loadChatList();
        }
      };

      li.appendChild(span);
      li.appendChild(renameBtn);
      li.appendChild(delBtn);
      chatList.appendChild(li);
    });
}


function loadChat(name) {
  const data = localStorage.getItem(`chat-${name}`);
  if (!data) return;
  currentChat = name;
  chatWindow.innerHTML = "";
  const messages = JSON.parse(data);
  messages.forEach(msg => createMessage(msg.text, msg.sender));
  chatPopup.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// === Chat UI ===
function createMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  saveChatToStorage();
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

// === Event Listeners ===
glowButton.addEventListener("click", () => {
  const timestamp = new Date().toLocaleString();
  currentChat = "Chat " + timestamp;
  chatWindow.innerHTML = "";
  chatPopup.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  simulateTyping("Welcome. I'm AI Justice. How can I assist you today?");
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

// Sidebar toggle
toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  document.getElementById("chat-overlay").classList.toggle("sidebar-open");
});

loadChatList();
