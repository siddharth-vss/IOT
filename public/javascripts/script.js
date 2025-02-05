const socket = io();

let outputColor = document.querySelector("#output-color span");
let output = document.getElementById("output");
let input = document.getElementById("input");
let genBtn = document.getElementById("gen-btn");
let sendBtn = document.getElementById("send");
let copyBtn = document.getElementById("copy-btn");
let customAlert = document.querySelector(".custom-alert");
let sendMsg = document.querySelector(".send");
let reciveMsg = document.querySelector(".recive");
let hexString = "0123456789abcdef";

let genHexCode = () => {
  let hexCode = "#";
  for (i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
  output.value = hexCode;
  outputColor.classList.remove("show-color");
  setTimeout(() => {
    outputColor.classList.add("show-color");
  }, 10);
  outputColor.style.backgroundColor = hexCode;
};

copyBtn.addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
  customAlert.style.transform = "translateX(0)";
  setTimeout(() => {
    customAlert.style.transform = "translateX( calc( 100% + 10px ))";
  }, 2000);
});

window.onload = genHexCode;
genBtn.addEventListener("click", genHexCode);

sendBtn.addEventListener("click", () => {
  socket.emit("send", { color: input.value });
  sendMsg.style.transform = "translateX(0)";
  setTimeout(() => {
    sendMsg.style.transform = "translateX(calc(100% + 10px))";
  }, 2000);
});

socket.on("ACK", (data) => {
    reciveMsg.style.transform ="translateX(0)";
    setTimeout(() => {
        reciveMsg.style.transform = "translateX(calc(100% + 10px))";
      }, 2000);
});
