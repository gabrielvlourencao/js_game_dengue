function initExterminateWithSpray() {
  let score = 0;
  let spawned = 0;

  // Overlay escurecido
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.2)";
  overlay.style.zIndex = 998;
  document.body.appendChild(overlay);

  const popSound = new Audio("../assets/audio/point.mp3"); //mapeia o som de ponto
  const sprayingSound = new Audio("../assets/audio/spraying.mp3") //mapeia o som do spray

  // Função para criar partículas de fumaça verde
  function createSpray(x, y) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = Math.random() * 10 + 5 + "px";
    particle.style.height = Math.random() * 10 + 5 + "px";
    particle.style.borderRadius = "50%";
    particle.style.background = "rgba(0,255,0,0.6)";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = 1000;
    particle.style.transition = "all 0.5s linear";
    document.body.appendChild(particle);

    setTimeout(() => {
      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      particle.style.transform = `translate(${dx}px, ${dy}px)`;
      particle.style.opacity = 0;
    }, 10);

    setTimeout(() => particle.remove(), 500);

    // Checa colisão com mosquitos
    const mosquitoes = document.querySelectorAll('img');
    mosquitoes.forEach(m => {
      const rect = m.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        score += 4;
        document.getElementById("mosquitoScore").innerText = "Pontuação: " + score;
        m.remove();
        popSound.currentTime = 0; // reinicia o som caso esteja tocando
        popSound.play();          // toca o som
      }
    });
  }

  // Funções do spray
  let spraying = false;
  function onMouseDown() { spraying = true; }
  function onMouseUp() { spraying = false; }
  function onMouseMove(e) {
    if (spraying) {
      for (let i = 0; i < 3; i++) {
        sprayingSound.play();
        createSpray(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20);
      }
    }
  }

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("click", e => {
    for (let i = 0; i < 5; i++) {
      sprayingSound.play();
      createSpray(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20);
    }
  });

  // Spawn mosquitos aleatórios
  const spawnInterval = setInterval(() => {
    if (spawned >= 10) {
      clearInterval(spawnInterval);

      // Remove eventos do spray e cursor volta ao normal
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "auto";

      finishGame(score, 40);
      return;
    }

    const mosquito = document.createElement("img");
    mosquito.src = "../assets/icon/mosquito.png";
    mosquito.alt = "Mosquito";
    mosquito.style.position = "fixed";
    mosquito.style.width = "300px";
    mosquito.style.zIndex = 999;
    mosquito.style.left = Math.random() * (window.innerWidth - 300) + "px";
    mosquito.style.top = Math.random() * (window.innerHeight - 300) + "px";
    document.body.appendChild(mosquito);

    setTimeout(() => mosquito.remove(), 1400);
    spawned++;
  }, 1200);
}

window.onload = initExterminateWithSpray;
