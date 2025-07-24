document.addEventListener("DOMContentLoaded", () => {
  const glowButton = document.getElementById("glow-button");
  const landing = document.querySelector(".landing");
  const chatPopup = document.getElementById("chat-popup");
  const backToLanding = document.getElementById("back-to-landing");
  const toggleTheme = document.getElementById("toggle-theme");
  const exportBtn = document.getElementById("export-chat");
  const newChatBtn = document.querySelector(".new-chat-btn");
  const toggleSidebar = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("chat-sidebar");
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const caseToggleBtn = document.getElementById("case-type-toggle");
  const caseWrapper = document.getElementById("case-select-wrapper");
  const caseSelect = document.getElementById("case-type-select");

  // === Landing Transition ===
  glowButton.addEventListener("click", () => {
    landing.style.display = "none";
    chatPopup.classList.remove("hidden");
  });

  backToLanding.addEventListener("click", () => {
    chatPopup.classList.add("hidden");
    landing.style.display = "block";
  });

  // === Theme Toggle ===
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
  });

  // === Export Chat ===
  exportBtn.addEventListener("click", () => {
    const messages = document.querySelectorAll(".chat-window > div");
    let content = "";
    messages.forEach((msg) => content += msg.textContent + "\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  // === Sidebar Toggle ===
  toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    if (sidebar.classList.contains("collapsed")) {
      caseWrapper.classList.add("hidden");
    }
  });

  // === Case Dropdown Toggle ===
  caseToggleBtn.addEventListener("click", () => {
    caseWrapper.classList.toggle("hidden");
  });

  // === Case Dropdown Fill Input ===
  if (caseSelect) {
    caseSelect.addEventListener("change", (e) => {
      const readable = caseSelect.options[caseSelect.selectedIndex].text;
      if (readable) {
        chatInput.value = `I want help with: ${readable}`;
      }
    });
  }

  // === Send Message Logic ===
  function sendMessage() {
    const input = chatInput.value.trim();
    if (input === "") return;

    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = input;
    chatWindow.appendChild(userMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    const typing = document.createElement("div");
    typing.className = "ai typing";
    typing.innerHTML = "<span class='dots'><span>.</span><span>.</span><span>.</span></span>";
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const reply = document.createElement("div");
      reply.className = "ai";
      reply.textContent = "This is a placeholder reply.";
      chatWindow.appendChild(reply);
      chatWindow.scrollTop = chatWindow.scrollHeight;
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

  // === New Chat (Simple Logic) ===
  newChatBtn.addEventListener("click", () => {
    chatWindow.innerHTML = "";
    chatInput.value = "";
  });

});
