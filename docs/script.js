function goToChat() {
  window.location.href = "chat.html";
}
function goBack() {
  window.location.href = "index.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = (sidebar.style.display === 'none') ? 'block' : 'none';
}

function sendMessage() {
  const box = document.getElementById('chat-box');
  const messages = document.getElementById('chat-messages');
  const text = box.value.trim();
  if (text === '') return;

  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  box.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Typing dots
  const aiTyping = document.createElement('div');
  aiTyping.className = 'ai-msg';
  aiTyping.innerHTML = "<em>AI Justice is typing<span class='dots'>...</span></em>";
  messages.appendChild(aiTyping);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    aiTyping.innerHTML = "This is a sample response from AI Justice.";
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

function handleKey(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}

function startNewChat() {
  document.getElementById('chat-messages').innerHTML = '';
}
