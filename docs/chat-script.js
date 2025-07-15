function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  const chatWindow = document.getElementById("chatWindow");

  const userDiv = document.createElement("div");
  userDiv.classList.add("message");
  userDiv.innerHTML = `<strong>You:</strong> ${message}`;
  chatWindow.appendChild(userDiv);

  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    const replyDiv = document.createElement("div");
    replyDiv.classList.add("message");
    replyDiv.innerHTML = `<strong>AI Justice:</strong> Thanks for your message. I'm AI Justice.`;
    chatWindow.appendChild(replyDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 600);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.display === "none" || !sidebar.style.display) {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
}

document.getElementById("toggleSidebar").addEventListener("click", toggleSidebar);

function newChat() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.innerHTML = "";
}
