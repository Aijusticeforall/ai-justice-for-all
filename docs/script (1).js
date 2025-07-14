
function openChat() {
  window.location.href = 'chat.html';
}

function goBack() {
  window.location.href = 'index.html';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
}

function newChat() {
  const container = document.getElementById('chat-messages');
  container.innerHTML = '';
}

function sendMessage() {
  const box = document.getElementById('chat-box');
  const container = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.textContent = box.value;
  msg.style.marginBottom = '10px';
  container.appendChild(msg);
  box.value = '';
}
