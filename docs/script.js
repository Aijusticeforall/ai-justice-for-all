document.addEventListener("DOMContentLoaded", () => {
  const toggleTheme = document.getElementById("toggle-theme");
  const exportBtn = document.getElementById("export-chat");
  const newChat = document.getElementById("new-chat");
  const chatList = document.getElementById("chat-list");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const messages = document.getElementById("messages");
  const toggleSidebar = document.getElementById("toggle-sidebar");
  const sidebar = document.querySelector(".sidebar");
  const inputContainer = document.getElementById("input-container");
  const fileInput = document.getElementById("file-input");

  // 🌗 Theme toggle
  toggleTheme.onclick = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  };

  // ☰ Sidebar toggle
  toggleSidebar.onclick = () => {
    sidebar.classList.toggle("collapsed");
  };

  // ➕ New chat
  newChat.onclick = () => {
    const li = document.createElement("li");
    li.className = "chat-item active";
    li.innerHTML = `Chat ${chatList.children.length + 1} <div class="menu"><button class="rename-btn">Rename</button><button class="delete-btn">Delete</button></div><button class="menu-btn">⋮</button>`;

    chatList.querySelectorAll(".chat-item").forEach(item => item.classList.remove("active"));
    chatList.appendChild(li);
    messages.innerHTML = "";

    // Rename
    li.querySelector(".rename-btn").onclick = (e) => {
      e.stopPropagation();
      const name = prompt("Rename chat:", li.childNodes[0].textContent.trim());
      if (name) li.childNodes[0].textContent = name + " ";
    };

    // Delete
    li.querySelector(".delete-btn").onclick = (e) => {
      e.stopPropagation();
      li.remove();
    };

    // Menu toggle
    li.querySelector(".menu-btn").onclick = (e) => {
      e.stopPropagation();
      const menu = li.querySelector(".menu");
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    };

    li.onclick = () => {
      chatList.querySelectorAll(".chat-item").forEach(item => item.classList.remove("active"));
      li.classList.add("active");
      messages.innerHTML = "";
    };
  };

  // 📨 Send message
  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    const userBubble = document.createElement("div");
    userBubble.className = "message user";
    userBubble.textContent = msg;
    messages.appendChild(userBubble);

    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerHTML = `
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const botBubble = document.createElement("div");
      botBubble.className = "message bot";
      botBubble.textContent = "This is a simulated reply.";
      messages.appendChild(botBubble);
      messages.scrollTop = messages.scrollHeight;
    }, 1500);

    chatInput.value = "";
  }

  sendButton.onclick = sendMessage;
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // ➕ File upload
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;
        img.style.maxWidth = "100%";
        const imgWrap = document.createElement("div");
        imgWrap.className = "message user";
        imgWrap.appendChild(img);
        messages.appendChild(imgWrap);
        messages.scrollTop = messages.scrollHeight;
      };
      reader.readAsDataURL(file);
    }
  });

  // 📱 Swipe gesture
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 80;
    if (touchEndX - touchStartX > threshold) {
      sidebar.classList.add("active");
    }
    if (touchStartX - touchEndX > threshold) {
      sidebar.classList.remove("active");
    }
  });

  // 🔧 Fix scroll when keyboard appears on mobile
  chatInput.addEventListener("focus", () => {
    setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
    }, 100);
  });

  window.addEventListener("resize", () => {
    if (document.activeElement === chatInput) {
      setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
      }, 100);
    }
  });
});
