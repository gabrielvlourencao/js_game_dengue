// Início do jogo
function startGame() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) {
    alert("Digite seu nome para começar!");
    return;
  }
  localStorage.setItem("playerName", name);
  localStorage.setItem("score", 0);
  window.location.href = "games/choose.html";
}

// Finalização de cada jogo
function finishGame(localScore, maxScore) {

  const successSound = new Audio("../assets/audio/success.mp3");


  let total = parseInt(localStorage.getItem("score")) || 0;
  total += localScore;
  if (total > 100) total = 100;
  localStorage.setItem("score", total);

  document.getElementById("finalMessage").innerText =
    `Você ganhou ${localScore}/${maxScore} pontos! Pontuação total: ${total}`;
  document.getElementById("modal").classList.remove("hidden");

  createFireworks();
  successSound.play();

  setTimeout(() => {
    endGame()
  }, 2000)
}

function goToNextGame(nextPage) {
  window.location.href = nextPage;
}

function endGame() {
  alert(`Fim do jogo! Pontuação final: ${localStorage.getItem("score")}/100`);
  window.location.href = "../index.html";
}

//Style
function createFireworks() {
  const modal = document.getElementById("modal");
  for (let i = 0; i < 200; i++) { // cria 15 partículas por “fogos”
    const firework = document.createElement("div");
    firework.style.position = "absolute";
    firework.style.left = Math.random() * modal.offsetWidth + "px";
    firework.style.top = Math.random() * modal.offsetHeight + "px";
    firework.style.width = "10px";
    firework.style.height = "10px";
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    firework.style.borderRadius = "50%";
    firework.style.zIndex = 2000;
    firework.style.pointerEvents = "none";
    modal.appendChild(firework);

    // anima a partícula
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;
    firework.style.transition = "all 2s ease-out";
    setTimeout(() => {
      firework.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
      firework.style.opacity = 0;
    }, 50);

    setTimeout(() => firework.remove(), 1000);
  }
}