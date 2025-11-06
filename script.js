// Sistema de Ranking
function getRanking() {
  const ranking = JSON.parse(localStorage.getItem("chikungunyaRanking")) || [];
  return ranking.sort((a, b) => b.score - a.score);
}

function saveToRanking(playerName, score) {
  const ranking = getRanking();
  const timestamp = new Date().toISOString();
  
  // Normaliza o nome para comparação (remove espaços extras e converte para minúsculas)
  const normalizedName = playerName.trim().toLowerCase();
  
  // Procura se já existe um jogador com o mesmo nome
  const existingIndex = ranking.findIndex(player => 
    player.name.trim().toLowerCase() === normalizedName
  );
  
  if (existingIndex !== -1) {
    // Se já existe, atualiza apenas se a nova pontuação for maior
    if (score > ranking[existingIndex].score) {
      ranking[existingIndex].score = score;
      ranking[existingIndex].date = timestamp;
    }
    // Se a pontuação for menor ou igual, mantém a antiga (não atualiza)
  } else {
    // Se não existe, adiciona novo jogador
    ranking.push({
      name: playerName.trim(),
      score: score,
      date: timestamp
    });
  }
  
  // Mantém apenas os top 50
  const sorted = ranking.sort((a, b) => b.score - a.score).slice(0, 50);
  localStorage.setItem("chikungunyaRanking", JSON.stringify(sorted));
}

function displayTopRanking(count = 5) {
  const ranking = getRanking();
  const topRankingDiv = document.getElementById("topRanking");
  
  if (!topRankingDiv) return;
  
  if (ranking.length === 0) {
    topRankingDiv.innerHTML = '<p class="no-ranking">Nenhum jogo ainda. Seja o primeiro!</p>';
    return;
  }
  
  const top = ranking.slice(0, count);
  topRankingDiv.innerHTML = top.map((player, index) => `
    <div class="ranking-item">
      <span class="rank">#${index + 1}</span>
      <span class="name">${player.name}</span>
      <span class="score">${player.score} pts</span>
    </div>
  `).join('');
}

function showRanking() {
  const ranking = getRanking();
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content ranking-modal-content">
      <h2>🏆 Ranking Completo</h2>
      <div id="fullRanking"></div>
      <button class="btn-secondary" onclick="this.closest('.modal').remove()">Fechar</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const fullRankingDiv = document.getElementById("fullRanking");
  if (ranking.length === 0) {
    fullRankingDiv.innerHTML = '<p class="no-ranking">Nenhum jogo ainda. Seja o primeiro!</p>';
  } else {
    fullRankingDiv.innerHTML = ranking.map((player, index) => {
      const date = new Date(player.date);
      const dateStr = date.toLocaleDateString('pt-BR');
      return `
        <div class="ranking-item">
          <span class="rank">#${index + 1}</span>
          <span class="name">${player.name}</span>
          <span class="score">${player.score} pts</span>
          <span style="font-size: 0.85em; color: #999; margin-left: 10px;">${dateStr}</span>
        </div>
      `;
    }).join('');
  }
}

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
  // Verifica se é a última etapa (exterminate) que não tem botão de próximo
  const isLastGame = !document.querySelector('button[onclick*="goToNextGame"]');
  
  const successSound = new Audio("../assets/audio/success.mp3");

  let total = parseInt(localStorage.getItem("score")) || 0;
  total += localScore;
  if (total > 100) total = 100;
  localStorage.setItem("score", total);

  const modal = document.getElementById("modal");
  if (modal) {
    document.getElementById("finalMessage").innerText =
      `🎉 Você ganhou ${Math.round(localScore)}/${maxScore} pontos!\n📊 Pontuação total: ${total}/100`;
    modal.classList.remove("hidden");

    createFireworks();
    successSound.play();

    // Se for o último jogo, finaliza completamente. Senão, apenas mostra o modal
    if (isLastGame) {
      setTimeout(() => {
        endGame();
      }, 2000);
    }
  } else {
    // Se não houver modal, apenas finaliza
    endGame();
  }
}

function goToNextGame(nextPage) {
  window.location.href = nextPage;
}

function endGame() {
  const playerName = localStorage.getItem("playerName") || "Jogador";
  const finalScore = parseInt(localStorage.getItem("score")) || 0;
  
  // Salva no ranking
  saveToRanking(playerName, finalScore);
  
  // Mostra mensagem de fim de jogo
  const message = `🎮 Fim do jogo!\n\n👤 Jogador: ${playerName}\n🏆 Pontuação final: ${finalScore}/100\n\nSeu resultado foi salvo no ranking!`;
  alert(message);
  
  // Limpa o score temporário
  localStorage.removeItem("score");
  localStorage.removeItem("playerName");
  
  window.location.href = "../index.html";
}

// Carrega ranking ao abrir a página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', displayTopRanking);
} else {
  displayTopRanking();
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