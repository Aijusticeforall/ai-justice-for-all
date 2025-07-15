
// chat-script.js — ChatGPT-style chat + sidebar + scroll fix for mobile

document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const backButton = document.getElementById("backButton");

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("visible");
    });
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  window.sendMessage = function () {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("You", message);
    userInput.value = "";

    setTimeout(() => {
      appendMessage("AI Justice", getAIResponse(message));
    }, 500);
  };

  function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.className = "message";
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(msg);

    // Mobile-safe scroll fix: only scroll the chat window, not the full page
    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 100);
  }

  function getAIResponse(userMessage) {
    return "Thanks for your message. I'm AI Justice.";
  }

  userInput.focus();
});
