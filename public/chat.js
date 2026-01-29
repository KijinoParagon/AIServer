let input = document.querySelector("#messageInput");
let textChannel = document.querySelector("#textChannel");

let history = JSON.parse(localStorage.getItem('aiChatHistory'));
if(history == undefined){
    history = [];
}

document.addEventListener('DOMContentLoaded', ()=>{
    history.forEach(item => {
        let msg = document.createElement("div");
        msg.classList.add("message");
        msg.classList.add((item.role == 'system') ? 'chat' : 'user');
        msg.classList.add("text-" + ((item.role == 'system') ? prefs.chatColor : prefs.userColor));
        msg.textContent = item.content;
        textChannel.appendChild(msg);
    });
})

input.addEventListener("keydown", async (e) => {
  if (e.key == "Enter") {
    let message = input.value;
    input.value = "";

    let userMsg = document.createElement("div");
    userMsg.classList.add("message");
    userMsg.classList.add("user");
    userMsg.classList.add("text-" + prefs.userColor);
    userMsg.textContent = message;
    textChannel.appendChild(userMsg);

    history.push({role: 'user', content: message});

    input.disabled = true;
    fetch("api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: history.slice(-5)
      }),
    }).then((r)=>{return r.json()}).then((jsonR) => {
        let chatMsg = document.createElement("div");
        chatMsg.classList.add("message");
        chatMsg.classList.add("chat");
        chatMsg.classList.add("text-" + prefs.chatColor);
        chatMsg.textContent = jsonR.message.content;
        textChannel.appendChild(chatMsg);
        input.disabled = false;
        history.push({role: 'system', content: 'ur stupid'});
        localStorage.setItem('aiChatHistory', JSON.stringify(history));
    });
  }
});
