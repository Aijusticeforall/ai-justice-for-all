document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const messages = document.getElementById("messages");
  const fileInput = document.getElementById("file-input");
  const plusBtn = document.querySelector(".upload-label");
  const sidebarToggle = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("sidebar");
  const newChatBtn = document.getElementById("new-chat");

  // Image modal logic
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("close-modal");

  // Toggle sidebar
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Send message
  sendButton.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (text !== "") {
      const msg = document.createElement("div");
      msg.textContent = text;
      messages.appendChild(msg);
      chatInput.value = "";
    }
  });

  // File/image upload
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("uploaded-image");
        messages.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });

  // Image enlarge click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("uploaded-image")) {
      modal.classList.remove("hidden");
      modalImg.src = e.target.src;
    }
  });

  // Close modal on X
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close modal on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
    }
  });

  // Click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
