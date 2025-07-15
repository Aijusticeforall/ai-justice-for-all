function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  // Simulate AI response
  setTimeout(() => {
    appendMessage("ai", "Thanks for your message. I'm AI Justice.");
  }, 800);
}

function appendMessage(sender, text) {
  const chatWindow = document.getElementById("chatWindow");
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.innerText = text;
  chatWindow.appendChild(messageDiv);

  // Scroll to latest
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function goBack() {
  window.location.href = "index.html";
}

document.getElementById("sidebarToggle").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
});
