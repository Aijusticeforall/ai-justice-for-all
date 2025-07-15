
function goBack() {
  window.location.href = "index.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
}

function newChat() {
  document.getElementById("chatWindow").innerHTML = '';
  localStorage.removeItem("aiChatHistory");
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatWindow");
  const text = input.value.trim();
  if (!text) return;

  const msg = document.createElement("div");
  msg.textContent = "You: " + text;
  msg.style.marginBottom = "10px";
  chat.appendChild(msg);
  input.value = "";

  // Simulate AI typing
  const typing = document.createElement("div");
  typing.className = "typing-indicator";
  typing.textContent = "AI Justice is typing...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const ai = document.createElement("div");
    ai.textContent = "AI: This is a simulated response.";
    chat.appendChild(ai);
    chat.scrollTop = chat.scrollHeight;

    // Save chat
    localStorage.setItem("aiChatHistory", chat.innerHTML);
  }, 1500);
}

window.onload = () => {
  const chat = document.getElementById("chatWindow");
  const saved = localStorage.getItem("aiChatHistory");
  if (saved) chat.innerHTML = saved;
};
