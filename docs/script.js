document.addEventListener("DOMContentLoaded", () => {
  const toggleSidebar = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("chat-sidebar");
  const newChatBtn = document.querySelector(".new-chat-btn");
  const sendButton = document.getElementById("send-button");
  const chatInput = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");
  const plusButton = document.createElement("button");
  plusButton.textContent = "+";
  plusButton.id = "plus-button";
  plusButton.title = "Upload";
  plusButton.style.marginRight = "8px";
  document.addEventListener("DOMContentLoaded", () => {
  const glowButton = document.getElementById("glow-button");
  const landing = document.querySelector(".landing");
  const chatPopup = document.getElementById("chat-popup");

  if (glowButton) {
    glowButton.addEventListener("click", () => {
      landing.classList.add("hidden");
      chatPopup.classList.remove("hidden");
    });
  }

  // ...rest of your code continues
});

  // Insert plus button before chat input
  const chatInputWrapper = document.querySelector(".chat-input-inner");
  chatInputWrapper.insertBefore(plusButton, chatInputWrapper.firstChild);

  // Sidebar toggle
  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // New Chat
  newChatBtn.addEventListener("click", () => {
    const li = document.createElement("li");
    li.innerHTML = \`
      <span class="chat-title">New Chat</span>
      <div class="chat-menu">
        <span class="dots" title="Options">⋯</span>
        <div class="menu-options">
          <div class="rename">Rename</div>
          <div class="delete">Delete</div>
        </div>
      </div>\`;
    document.getElementById("chat-list").appendChild(li);
  });

  // Send message
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    const msg = document.createElement("div");
    msg.className = "user";
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatInput.value = "";

    const aiReply = document.createElement("div");
    aiReply.className = "ai typing";
    aiReply.textContent = "Thinking";
    chatWindow.appendChild(aiReply);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      aiReply.classList.remove("typing");
      aiReply.textContent = "This is a simulated reply.";
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
  }

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // File input logic
  plusButton.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = () => {
      const file = fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "200px";
        chatWindow.appendChild(img);
      };
      reader.readAsDataURL(file);
    };
  });
});
