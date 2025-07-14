function enterChat() {
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('chat-section').classList.remove('hidden');
}

function returnHome() {
  document.getElementById('chat-section').classList.add('hidden');
  document.getElementById('landing').classList.remove('hidden');
}
