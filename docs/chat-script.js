
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  const chatWindow = document.getElementById("chatWindow");

  const userBubble = document.createElement("div");
  userBubble.className = "user-message";
  userBubble.textContent = message;
  chatWindow.appendChild(userBubble);

  input.value = "";

  // Simulate bot thinking
  const typing = document.createElement("div");
  typing.className = "typing-indicator";
  typing.textContent = "AI is thinking...";
  chatWindow.appendChild(typing);

  // Scroll to bottom after sending
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const aiBubble = document.createElement("div");
    aiBubble.className = "ai-message";
    aiBubble.textContent = "Thanks for your message. I'm AI Justice.";
    chatWindow.appendChild(aiBubble);

    // Scroll to bottom again after bot reply
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 800);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
}

function newChat() {
  document.getElementById("chatWindow").innerHTML = "";
}

function goBack() {
  window.location.href = "index.html";
}
