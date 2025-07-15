// chat-script.js

document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarBtn = document.getElementById("toggleSidebar");
  const backToLandingBtn = document.getElementById("backToLanding");
  const chatHistory = document.getElementById("chatHistory");

  // Load saved chats
  loadChatHistory();

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    userInput.value = "";
    scrollToBottom();

    setTimeout(() => {
      addMessage("Thinking...", "ai", true); // Placeholder
      scrollToBottom();

      setTimeout(() => {
        removeTypingIndicator();
        addMessage("This is a simulated AI response.", "ai");
        scrollToBottom();
        saveChat();
      }, 1000);
    }, 400);
  });

  toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });

  backToLandingBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  function addMessage(text, sender, isTyping = false) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = isTyping ? "..." : text;
    msg.setAttribute("data-type", isTyping ? "typing" : "msg");
    chatBox.appendChild(msg);
  }

  function removeTypingIndicator() {
    const typing = [...chatBox.querySelectorAll(".message.ai")].find(el =>
      el.getAttribute("data-type") === "typing"
    );
    if (typing) typing.remove();
  }

  function scrollToBottom() {
    setTimeout(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
  }

  function saveChat() {
    const allMessages = [...chatBox.querySelectorAll(".message")].map(m =>
      m.textContent
    );
    localStorage.setItem("aiJusticeChat", JSON.stringify(allMessages));
    renderHistory();
  }

  function loadChatHistory() {
    const saved = JSON.parse(localStorage.getItem("aiJusticeChat") || "[]");
    saved.forEach((msg, i) => {
      const sender = i % 2 === 0 ? "user" : "ai";
      addMessage(msg, sender);
    });
    scrollToBottom();
  }

  function renderHistory() {
    chatHistory.innerHTML = "";
    const saved = JSON.parse(localStorage.getItem("aiJusticeChat") || "[]");
    if (saved.length === 0) return;

    const item = document.createElement("li");
    item.textContent = `Chat with ${Math.ceil(saved.length / 2)} exchanges`;
    item.style.cursor = "pointer";
    item.onclick = () => {
      chatBox.innerHTML = "";
      loadChatHistory();
    };
    chatHistory.appendChild(item);
  }
});
