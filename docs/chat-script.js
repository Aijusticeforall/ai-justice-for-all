const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("You", message);
  userInput.value = "";

  // Simulated response
  setTimeout(() => {
    appendMessage("AI Justice", getAIResponse(message));
  }, 500);
}

function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatWindow.appendChild(messageElement);

  // Scroll to latest message after DOM updates
  setTimeout(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 100);
}

function getAIResponse(userMessage) {
  return "Thanks for your message. I'm AI Justice.";
}

window.onload = () => {
  userInput.focus();
};
