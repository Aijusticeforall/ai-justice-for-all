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

  // === Chat Rename if first message ===
  function renameFirstChatIfNeeded(text) {
    const chatTitles = document.querySelectorAll('#chat-list .chat-title');
    if (chatTitles.length && chatTitles[chatTitles.length - 1].innerText.startsWith("Chat at")) {
      const newTitle = text.slice(0, 30) + (text.length > 30 ? "..." : "");
      chatTitles[chatTitles.length - 1].innerText = newTitle;
    }
  }

  // === Open / Close chat view ===
  glowButton.addEventListener("click", () => {
    chatPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  backButton.addEventListener("click", () => {
    chatPopup.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  // === Send message by button or Enter key ===
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

  // === Toggle Sidebar Collapse ===
  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // === Toggle Light/Dark Theme ===
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleTheme.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
  });

  // === Export Chat Text ===
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

  // === New Chat Button ===
  document.querySelector('.new-chat-btn').addEventListener('click', () => {
    // Clear chat
    chatWindow.innerHTML = '';
    chatInput.value = '';

    const newMessage = document.createElement('div');
    newMessage.className = 'user';
    newMessage.textContent = 'New chat started...';
    chatWindow.appendChild(newMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Create a new chat list item with proper structure
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="chat-title">Chat at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <div class="chat-menu">
        <span class="dots">⋯</span>
        <div class="menu-options hidden">
          <div class="rename">Rename</div>
          <div class="delete">Delete</div>
        </div>
      </div>
    `;
    chatList.appendChild(li);
  });

  // === Handle ⋯ Menu Toggle
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots")) {
      const menu = e.target.nextElementSibling;
      menu.classList.toggle("hidden");
    } else {
      document.querySelectorAll(".menu-options").forEach(menu => {
        if (!menu.contains(e.target)) menu.classList.add("hidden");
      });
    }
  });

  // === Rename Chat
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("rename")) {
      const chatTitle = e.target.closest("li").querySelector(".chat-title");
      const newName = prompt("Enter new chat name:", chatTitle.innerText);
      if (newName) chatTitle.innerText = newName;
    }
  });

  // === Delete Chat
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const chatItem = e.target.closest("li");
      if (confirm("Are you sure you want to delete this chat?")) {
        chatItem.remove();
      }
    }
  });

  // === Search Filter
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const items = document.querySelectorAll("#chat-list li");
    items.forEach(item => {
      const title = item.querySelector(".chat-title").innerText.toLowerCase();
      item.style.display = title.includes(term) ? "flex" : "none";
    });
  });
});
