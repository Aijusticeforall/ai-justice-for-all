
document.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.getElementById("plus-button");
  const fileInput = document.getElementById("file-input");
  const messages = document.getElementById("messages");

  if (plusBtn && fileInput) {
    plusBtn.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          const img = document.createElement("img");
          img.src = evt.target.result;
          img.className = "uploaded-image";
          img.style.maxWidth = "100px";
          img.style.margin = "10px";
          img.style.cursor = "pointer";
          messages.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("close-modal");

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("uploaded-image")) {
      modal.classList.remove("hidden");
      modalImg.src = e.target.src;
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
