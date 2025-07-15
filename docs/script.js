console.log("✅ script.js is connected!");

document.addEventListener("DOMContentLoaded", () => {
  const glowButton = document.getElementById("glow-button");
  const chatPopup = document.getElementById("chat-popup");
  const backButton = document.getElementById("back-to-landing");
  const sendButton = document.getElementById("send-button");
  const chatInput = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");
  const toggleSidebar = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("chat-sidebar");

  glowButton.addEventListener("click", () => {
    const lastChat = localStorage.getItem("last-chat");
    if (lastChat && localStorage.getItem(`chat-${lastChat}`)) {
      loadChat(lastChat);
    } else {
      startNewChat();
    }
  });

  backButton.addEventListener("click", () => {
    chatPopup.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    document.getElementById("chat-overlay").classList.toggle("sidebar-open");
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    createMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      simulateTyping("I'm AI Justice. Please continue.");
    }, 800);
  }

  function createMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function simulateTyping(text) {
    const msg = document.createElement("div");
    msg.classList.add("message", "ai");
    chatWindow.appendChild(msg);

    let i = 0;
    const interval = setInterval(() => {
      msg.innerText += text[i++];
      if (i >= text.length) clearInterval(interval);
    }, 30);
  }

  function startNewChat() {
    chatWindow.innerHTML = "";
    chatPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    simulateTyping("Welcome. I'm AI Justice. How can I assist you?");
    localStorage.setItem("last-chat", "temp");
  }

  function loadChat(name) {
    // Placeholder — you can fill this in later if you're doing full chat save/load
    chatWindow.innerHTML = "";
    chatPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    simulateTyping("Loaded chat: " + name);
  }
});
