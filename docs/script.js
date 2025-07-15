
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
    const msg = document.createElement("div");
    msg.className = "message user";
    msg.innerText = text;
    chatWindow.appendChild(msg);
    chatInput.value = "";
    setTimeout(() => {
      const reply = document.createElement("div");
      reply.className = "message ai";
      reply.innerText = "AI Justice: I understand. Please go on.";
      chatWindow.appendChild(reply);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 800);
  }
});
