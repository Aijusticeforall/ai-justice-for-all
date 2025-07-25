document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleSidebar = document.getElementById("toggle-sidebar");
  const newChatBtn = document.getElementById("new-chat");
  const chatList = document.getElementById("chat-list");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const messages = document.getElementById("messages");
  const fileInput = document.getElementById("file-input");
  const toggleTheme = document.getElementById("toggle-theme");
  const exportChat = document.getElementById("export-chat");

  let currentChatId = null;
  let chats = {};

  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  });

  exportChat.addEventListener("click", () => {
    if (!currentChatId || !chats[currentChatId]) return;
    const content = chats[currentChatId].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat.txt";
    link.click();
  });

  function sendMessage(text) {
    if (!text.trim()) return;

    const userMessage = createMessageBubble(text, "user");
    messages.appendChild(userMessage);
    chats[currentChatId].push(`User: ${text}`);
    chatInput.value = "";
    scrollToBottom();

    setTimeout(() => {
      const reply = createMessageBubble("This is a simulated reply", "assistant");
      messages.appendChild(reply);
      chats[currentChatId].push("AI: This is a simulated reply");
      scrollToBottom();
    }, 300);
  }

  function createMessageBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = "message " + sender;
    bubble.textContent = text;
    return bubble;
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener("click", () => {
    sendMessage(chatInput.value);
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  newChatBtn.addEventListener("click", () => {
    const chatId = Date.now().toString();
    chats[chatId] = [];
    currentChatId = chatId;

    const li = document.createElement("li");
    li.className = "chat-item";
    li.dataset.id = chatId;
    li.innerHTML = `
      <span class="chat-name">New Chat</span>
      <div class="menu">
        <button class="menu-btn">⋮</button>
        <div class="dropdown">
          <button class="rename-btn">Rename</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
    chatList.appendChild(li);
    updateChatUI(chatId);
  });

  function updateChatUI(chatId) {
    [...chatList.children].forEach(item => item.classList.remove("active"));
    const chatItem = [...chatList.children].find(item => item.dataset.id === chatId);
    chatItem.classList.add("active");

    currentChatId = chatId;
    messages.innerHTML = "";
    chats[chatId].forEach(msg => {
      const [sender, ...text] = msg.split(": ");
      messages.appendChild(createMessageBubble(text.join(": "), sender.toLowerCase()));
    });
    scrollToBottom();
  }

  chatList.addEventListener("click", (e) => {
    const target = e.target;
    const chatItem = target.closest(".chat-item");
    if (!chatItem) return;
    const chatId = chatItem.dataset.id;

    if (target.classList.contains("rename-btn")) {
      const newName = prompt("Rename chat:");
      if (newName) chatItem.querySelector(".chat-name").textContent = newName;
    } else if (target.classList.contains("delete-btn")) {
      if (confirm("Delete this chat?")) {
        chatList.removeChild(chatItem);
        delete chats[chatId];
        if (chatId === currentChatId) {
          messages.innerHTML = "";
          currentChatId = null;
        }
      }
    } else {
      updateChatUI(chatId);
    }
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const modal = document.createElement("div");
        modal.className = "image-modal";
        modal.innerHTML = \`
          <span class="close-button">&times;</span>
          <img src="\${reader.result}" alt="Preview" />
        \`;
        document.body.appendChild(modal);

        modal.querySelector(".close-button").addEventListener("click", () => {
          document.body.removeChild(modal);
        });
      };
      reader.readAsDataURL(file);
    }
  });
});