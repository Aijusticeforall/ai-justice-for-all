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
  const chatWindow = document.querySelector(".chat-window");
  const inputContainer = document.getElementById("input-container");
  const backButton = document.getElementById("back-button");
  const plusBtn = document.getElementById("plus-button");
  const fileInput = document.getElementById("file-input");

  // Back to landing
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("close-modal");

// Add click event for any uploaded image
  document.addEventListener("click", function (e) {
  if (e.target.classList.contains("uploaded-image")) {
    modal.classList.remove("hidden");
    modalImg.src = e.target.src;
  }
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
  }
});

  chatInput.addEventListener("focus", () => {
    setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
    }, 100);
  });

  window.addEventListener("resize", () => {
    const activeEl = document.activeElement;
    if (activeEl === chatInput) {
      setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
      }, 100);
    }
  });

  // Theme toggle
  toggleTheme.onclick = () => {
    const isDark = document.body.classList.contains("dark");
    document.body.classList.toggle("dark", !isDark);
    document.body.classList.toggle("light", isDark);
  };

  // Sidebar toggle
  toggleSidebar.onclick = () => {
    const isCollapsed = sidebar.classList.toggle("collapsed");
    chatWindow.classList.toggle("expanded", isCollapsed);
  };

  // Export chat
  exportBtn.onclick = () => {
    const text = [...messages.children].map(m => m.textContent).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chat.txt";
    a.click();
  };

  // New chat
  newChat.onclick = () => {
    const li = document.createElement("li");
    li.className = "chat-item active";
    li.innerHTML = `Chat at ${new Date().toLocaleTimeString()} <button class="dots">⋮</button>`;

    chatList.querySelectorAll(".chat-item").forEach(item => item.classList.remove("active"));

    const menu = document.createElement("div");
    menu.className = "menu";
    menu.innerHTML = "<button class='rename'>Rename</button><button class='delete'>Delete</button>";
    li.appendChild(menu);

    li.querySelector(".dots").onclick = (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    };

    menu.querySelector(".rename").onclick = () => {
      const name = prompt("Rename chat:", li.firstChild.textContent.trim());
      if (name) li.firstChild.textContent = name + " ";
    };

    menu.querySelector(".delete").onclick = () => li.remove();

    li.onclick = () => {
      chatList.querySelectorAll(".chat-item").forEach(item => item.classList.remove("active"));
      li.classList.add("active");
      messages.innerHTML = "";
    };

    chatList.appendChild(li);
    messages.innerHTML = "";
  };

  // Swipe gesture for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 80;
    if (!sidebar) return;

    if (touchEndX - touchStartX > threshold) {
      sidebar.classList.add("active");
    }
    if (touchStartX - touchEndX > threshold) {
      sidebar.classList.remove("active");
    }
  }

  // ➕ button triggers file input
  if (plusBtn && fileInput) {
    plusBtn.addEventListener("click", () => {
      fileInput.click();
    });
  }

  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);
    files.forEach(file => {
      const fileMsg = document.createElement("div");
      fileMsg.className = "message user";

      if (file.type.startsWith("image/")) {
        const imgLink = document.createElement("a");
        imgLink.href = URL.createObjectURL(file);
        imgLink.target = "_blank";

        const img = document.createElement("img");
        img.src = imgLink.href;
        img.alt = file.name;
        img.style.maxWidth = "200px";
        img.style.borderRadius = "10px";
        img.style.marginTop = "8px";
        img.style.cursor = "pointer";

        imgLink.appendChild(img);
        fileMsg.appendChild(imgLink);
      } else {
        fileMsg.textContent = `📎 ${file.name}`;
      }

      messages.appendChild(fileMsg);
      messages.scrollTop = messages.scrollHeight;
    });

    fileInput.value = "";
  });

  // Send message
  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    const userBubble = document.createElement("div");
    userBubble.className = "message user";
    userBubble.textContent = msg;
    messages.appendChild(userBubble);

    const typingIndicator = document.createElement("div");
    typingIndicator.className = "message bot";
    typingIndicator.innerHTML = `
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
    messages.appendChild(typingIndicator);
    setTimeout(() => {
      messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
    }, 10);

    setTimeout(() => {
      typingIndicator.remove();
      const botBubble = document.createElement("div");
      botBubble.className = "message bot";
      botBubble.textContent = "This is a placeholder reply.";
      messages.appendChild(botBubble);
      messages.scrollTop = messages.scrollHeight;
    }, 1500);

    chatInput.value = "";
  }

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  inputContainer.onsubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };
});
