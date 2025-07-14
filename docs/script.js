function openChat() {
  const chatFrame = document.createElement("iframe");
  chatFrame.src = "chat.html";
  chatFrame.className = "chat-frame";
  chatFrame.allow = "clipboard-write; microphone;";
  document.body.appendChild(chatFrame);

  const backBtn = document.createElement("button");
  backBtn.innerText = "←";
  backBtn.className = "back-btn";
  backBtn.onclick = () => {
    chatFrame.remove();
    backBtn.remove();
  };
  document.body.appendChild(backBtn);
}
