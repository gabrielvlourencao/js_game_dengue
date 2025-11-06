function initExterminateWithSpray() {
  let score = 0;
  let spawned = 0;
  let gameFinished = false;
  const maxScore = 40;
  const totalMosquitoes = 10;

  const popSound = new Audio("../assets/audio/point.mp3");
  const sprayingSound = new Audio("../assets/audio/spraying.mp3");

  // Função para criar partículas de spray melhoradas
  function createSpray(x, y) {
    // Cria múltiplas partículas para efeito mais realista
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.left = x + (Math.random() - 0.5) * 30 + "px";
      particle.style.top = y + (Math.random() - 0.5) * 30 + "px";
      particle.style.width = Math.random() * 8 + 4 + "px";
      particle.style.height = Math.random() * 8 + 4 + "px";
      particle.style.borderRadius = "50%";
      particle.style.background = `rgba(${Math.random() * 50 + 200}, ${Math.random() * 50 + 200}, 0, 0.8)`;
      particle.style.pointerEvents = "none";
      particle.style.zIndex = 1000;
      particle.style.boxShadow = "0 0 10px rgba(200, 255, 0, 0.5)";
      document.body.appendChild(particle);

      setTimeout(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 40;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        particle.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        particle.style.opacity = 0;
      }, 10);

      setTimeout(() => particle.remove(), 600);
    }

    // Checa colisão com mosquitos
    if (gameFinished) return;
    
    const mosquitoes = document.querySelectorAll('.mosquito');
    mosquitoes.forEach(m => {
      const rect = m.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      
      if (distance < 80) {
        hitMosquito(m);
      }
    });
  }
  
  function hitMosquito(mosquito) {
    if (!mosquito.parentElement || mosquito.classList.contains('hit')) return;
    
    mosquito.classList.add('hit', 'mosquito-hit');
    score += 4;
    if (score > maxScore) score = maxScore;
    document.getElementById("mosquitoScore").innerText = "Pontuação: " + score;
    
    popSound.currentTime = 0;
    popSound.play();
    
    setTimeout(() => {
      if (mosquito.parentElement) {
        mosquito.remove();
      }
    }, 300);
  }

  // Funções do spray
  let spraying = false;
  let sprayInterval = null;
  let lastMouseX = 0;
  let lastMouseY = 0;
  
  function onMouseDown(e) {
    if (gameFinished) return;
    e.preventDefault();
    spraying = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    sprayingSound.play();
    
    // Previne seleção de texto
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
    
    // Cria spray contínuo enquanto arrasta
    sprayInterval = setInterval(() => {
      if (spraying && !gameFinished) {
        createSpray(lastMouseX + (Math.random() - 0.5) * 30, lastMouseY + (Math.random() - 0.5) * 30);
      }
    }, 50);
  }
  
  function onMouseUp() {
    spraying = false;
    if (sprayInterval) {
      clearInterval(sprayInterval);
      sprayInterval = null;
    }
  }
  
  function onMouseMove(e) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    if (spraying && !gameFinished) {
      createSpray(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20);
    }
  }

  document.addEventListener("mousedown", onMouseDown, { passive: false });
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("click", e => {
    if (gameFinished) return;
    e.preventDefault();
    createSpray(e.clientX, e.clientY);
    sprayingSound.play();
  }, { passive: false });
  
  // Previne seleção de texto em toda a página
  document.addEventListener("selectstart", (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  // Atualiza pontuação inicial
  document.getElementById("mosquitoScore").innerText = "Pontuação: 0";
  
  // Spawn mosquitos aleatórios com melhor distribuição
  const spawnInterval = setInterval(() => {
    if (spawned >= totalMosquitoes) {
      clearInterval(spawnInterval);
      
      // Verifica se ainda há mosquitos na tela
      const checkMosquitoes = setInterval(() => {
        const remainingMosquitoes = document.querySelectorAll('.mosquito:not(.hit)');
        if (remainingMosquitoes.length === 0 || gameFinished) {
          clearInterval(checkMosquitoes);
          if (!gameFinished) {
            gameFinished = true;
            
            // Remove eventos do spray e cursor volta ao normal
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
            document.body.style.cursor = "auto";
            
            if (sprayInterval) {
              clearInterval(sprayInterval);
            }

            // Garante que o score não ultrapasse o máximo
            const finalScore = Math.min(score, maxScore);
            
            // Pequeno delay para garantir que animações terminem
            setTimeout(() => {
              finishGame(finalScore, maxScore);
            }, 500);
          }
        }
      }, 500);
      
      // Timeout de segurança - máximo 3 segundos após último spawn
      setTimeout(() => {
        clearInterval(checkMosquitoes);
        if (!gameFinished) {
          gameFinished = true;
          
          document.removeEventListener("mousedown", onMouseDown);
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("mousemove", onMouseMove);
          document.body.style.cursor = "auto";
          
          if (sprayInterval) {
            clearInterval(sprayInterval);
          }

          const finalScore = Math.min(score, maxScore);
          finishGame(finalScore, maxScore);
        }
      }, 3000);
      return;
    }

    const mosquito = document.createElement("img");
    mosquito.src = "../assets/icon/mosquito.png";
    mosquito.alt = "Mosquito da Chikungunya";
    mosquito.className = "mosquito";
    mosquito.style.position = "fixed";
    mosquito.style.width = "100px";
    mosquito.style.height = "auto";
    mosquito.style.zIndex = 999;
    
    // Evita spawnar muito próximo das bordas e do header
    const margin = 100;
    mosquito.style.left = Math.random() * (window.innerWidth - margin * 2) + margin + "px";
    mosquito.style.top = Math.random() * (window.innerHeight - margin * 2 - 150) + margin + 150 + "px";
    
    // Previne cursor de texto e seleção
    mosquito.style.userSelect = "none";
    mosquito.style.webkitUserSelect = "none";
    mosquito.style.mozUserSelect = "none";
    mosquito.style.msUserSelect = "none";
    mosquito.style.khtmlUserSelect = "none";
    mosquito.setAttribute("draggable", "false");
    mosquito.setAttribute("unselectable", "on");
    mosquito.onselectstart = () => false;
    mosquito.onmousedown = (e) => {
      if (e.detail > 1) e.preventDefault(); // Previne duplo clique selecionar
    };
    
    // Animação de entrada
    mosquito.style.opacity = "0";
    mosquito.style.transform = "scale(0)";
    mosquito.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    
    // Permite clicar diretamente no mosquito
    mosquito.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!gameFinished && !mosquito.classList.contains('hit')) {
        hitMosquito(mosquito);
      }
      return false;
    };
    
    // Previne arrastar
    mosquito.ondragstart = (e) => {
      e.preventDefault();
      return false;
    };
    
    const gameArea = document.getElementById("gameArea") || document.body;
    gameArea.appendChild(mosquito);
    
    // Animação de entrada
    setTimeout(() => {
      mosquito.style.opacity = "1";
      mosquito.style.transform = "scale(1)";
    }, 10);
    
    // Movimento aleatório mais suave
    let moveInterval = setInterval(() => {
      if (mosquito.parentElement && !mosquito.classList.contains('hit')) {
        const currentLeft = parseFloat(mosquito.style.left) || 0;
        const currentTop = parseFloat(mosquito.style.top) || 0;
        const newLeft = currentLeft + (Math.random() - 0.5) * 30;
        const newTop = currentTop + (Math.random() - 0.5) * 30;
        
        // Mantém dentro da tela
        const maxLeft = window.innerWidth - 100;
        const maxTop = window.innerHeight - 100;
        const minTop = 150;
        
        mosquito.style.left = Math.max(0, Math.min(maxLeft, newLeft)) + "px";
        mosquito.style.top = Math.max(minTop, Math.min(maxTop, newTop)) + "px";
      } else {
        clearInterval(moveInterval);
      }
    }, 300);

    // Remove o mosquito após 4 segundos se não foi eliminado
    setTimeout(() => {
      if (mosquito.parentElement && !mosquito.classList.contains('hit')) {
        mosquito.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        mosquito.style.opacity = "0";
        mosquito.style.transform = "scale(0)";
        setTimeout(() => {
          if (mosquito.parentElement) {
            clearInterval(moveInterval);
            mosquito.remove();
          }
        }, 500);
      }
    }, 4000);
    
    spawned++;
  }, 1500);
}

window.onload = initExterminateWithSpray;
