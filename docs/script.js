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
    chatPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  backButton.addEventListener("click", () => {
    chatPopup.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });

  sendButton.addEventListener("click", sendMessage);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.textContent = message;
    chatWindow.appendChild(userMsg);

    const aiMsg = document.createElement("div");
    aiMsg.className = "chat-message ai";
    aiMsg.textContent = "I'm AI Justice. How can I assist you today?";
    chatWindow.appendChild(aiMsg);

    chatInput.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
