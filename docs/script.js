console.log("✅ script.js is connected!");

document.addEventListener("DOMContentLoaded", () => {
  const glowButton = document.getElementById("glow-button");
  const chatPopup = document.getElementById("chat-popup");
  const backButton = document.getElementById("back-to-landing");
  const sendButton = document.getElementById("send-button");
  const chatInput = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");
  const toggleSidebar = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("chat-sidebar");
  const toggleTheme = document.getElementById("toggle-theme");
  const exportBtn = document.getElementById("export-chat");
  const chatList = document.getElementById("chat-list");
  const searchInput = document.getElementById("chat-search");
  const landing = document.querySelector(".landing");

  // Show chat, hide landing
  glowButton.addEventListener("click", () => {
    landing.style.display = "none";
    chatPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // Back to landing
  backButton.addEventListener("click", () => {
    chatPopup.classList.add("hidden");
    landing.style.display = "block";
    document.body.style.overflow = "auto";
  });

  // Expand sidebar when magnifier clicked
  const searchIcon = document.querySelector(".search-icon");
  searchIcon.addEventListener("click", () => {
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
      searchInput.focus();
    }
  });

  // Rename first chat title if unnamed
  function renameFirstChatIfNeeded(text) {
    const chatTitles = document.querySelectorAll('#chat-list .chat-title');
    if (chatTitles.length && chatTitles[chatTitles.length - 1].innerText.startsWith("Chat at")) {
      const newTitle = text.slice(0, 30) + (text.length > 30 ? "..." : "");
      chatTitles[chatTitles.length - 1].innerText = newTitle;
    }
  }

  // Send message
  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = text;
    chatWindow.appendChild(userMsg);

    chatInput.value = "";

    const aiMsg = document.createElement("div");
    aiMsg.className = "ai";
    aiMsg.textContent = getAIResponse(text);
    chatWindow.appendChild(aiMsg);

    chatWindow.scrollTop = chatWindow.scrollHeight;
    renameFirstChatIfNeeded(text);
  }

  function getAIResponse(input) {
    if (input.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you?";
    }
    return "I'm AI Justice. How can I assist you today?";
  }

  // Sidebar toggle
  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Theme toggle
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleTheme.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
  });

  // Export chat
  exportBtn.addEventListener("click", () => {
    const text = Array.from(chatWindow.children)
      .map(el => el.textContent)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chat.txt";
    a.click();
  });

  // New Chat
  document.querySelector('.new-chat-btn').addEventListener('click', () => {
    chatWindow.innerHTML = '';
    chatInput.value = '';

    const newMessage = document.createElement('div');
    newMessage.className = 'user';
    newMessage.textContent = 'New chat started...';
    chatWindow.appendChild(newMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="chat-title">Chat at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <div class="chat-menu">
        <span class="dots">⋯</span>
        <div class="menu-options">
          <div class="rename">Rename</div>
          <div class="delete">Delete</div>
        </div>
      </div>
    `;
    chatList.appendChild(li);
  });

  // Unified click listener for menu toggle, rename, delete
  document.addEventListener("click", (e) => {
    const isDots = e.target.classList.contains("dots");
    const isRename = e.target.classList.contains("rename");
    const isDelete = e.target.classList.contains("delete");

    // Handle menu toggle
    document.querySelectorAll(".menu-options").forEach(menu => {
      const parent = menu.previousElementSibling;
      if (parent && parent.contains(e.target)) {
        menu.classList.toggle("show");
      } else if (!menu.contains(e.target)) {
        menu.classList.remove("show");
      }
    });

    // Rename chat
    if (isRename) {
      const chatTitle = e.target.closest("li").querySelector(".chat-title");
      const newName = prompt("Enter new chat name:", chatTitle.innerText);
      if (newName) chatTitle.innerText = newName;
    }

    // Delete chat
    if (isDelete) {
      const chatItem = e.target.closest("li");
      if (confirm("Are you sure you want to delete this chat?")) {
        chatItem.remove();
      }
    }
  });

  // Search
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const items = document.querySelectorAll("#chat-list li");
    items.forEach(item => {
      const title = item.querySelector(".chat-title").innerText.toLowerCase();
      item.style.display = title.includes(term) ? "flex" : "none";
    });
  });
});
