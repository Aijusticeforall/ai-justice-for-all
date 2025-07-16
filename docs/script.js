document.addEventListener("DOMContentLoaded", () => {
  const glowButton = document.getElementById("glow-button");
  const chatPopup = document.getElementById("chat-popup");

  glowButton.addEventListener("click", () => {
    alert("🎉 Glow button was clicked!");
    chatPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});
