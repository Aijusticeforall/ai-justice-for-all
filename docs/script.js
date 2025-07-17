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
  const toggleTheme = document.getElementById("toggle-theme");
  const exportBtn = document.getElementById("export-chat");

  // Open chat
  glowButton.addEventListener("click", () => {
    chatPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // Close chat
  backButton.addEventListener("click", () => {
    chatPopup.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  // Send on button click
  sendButton.addEventListener("click", sendMessage);

  // Send on Enter (without Shift)
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Toggle Sidebar
 toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

  // Toggle Dark/Light Theme
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleTheme.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
  });

  // Export Chat
  exportBtn.addEventListener("click", () => {
    const text = Array.from(chatWindow.children)
      .map(el => el.textContent)
      .join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chat.txt";
    a.click();
  });

  // Send Message
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = text;
    chatWindow.appendChild(userMsg);

    chatInput.value = "";

    const aiMsg = document.createElement("div");
    aiMsg.className = "ai";
    aiMsg.textContent = getAIResponse(text);
    chatWindow.appendChild(aiMsg);

    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function getAIResponse(input) {
    // Dummy response
    if (input.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you?";
    }
    return "I'm AI Justice. How can I assist you today?";
  }
  
document.querySelector('.new-chat-btn').addEventListener('click', () => {
  document.getElementById('chat-window').innerHTML = '';
});
