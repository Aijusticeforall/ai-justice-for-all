
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("close-modal");
  const fileInput = document.getElementById("file-input");
  const messages = document.getElementById("messages");

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;
        img.classList.add("uploaded-image");
        img.style.maxWidth = "100px";
        img.style.margin = "5px";
        messages.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("uploaded-image")) {
      modal.classList.remove("hidden");
      modalImg.src = e.target.src;
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalImg.src = "";
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
      modalImg.src = "";
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modalImg.src = "";
    }
  });
});
