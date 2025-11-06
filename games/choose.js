const items = [
    { name: "Pneu com água", danger: true, img: "../assets/imgs/pneu_agua.jpg" },
    { name: "Copo vazio", danger: false, img: "../assets/imgs/copo_vazio.jpg" },
    { name: "Planta com pratinho", danger: true, img: "../assets/imgs/planta.jpg" },
    { name: "Sofá", danger: false, img: "../assets/imgs/sofa.jpg" },
    { name: "Caixa d'água aberta", danger: true, img: "../assets/imgs/caixa-dagua-.jpg" },
    { name: "Cadeira", danger: false, img: "../assets/imgs/cadeira.jpg" },
];


function initChooseGame() {
    const grid = document.getElementById("itemsGrid");
    if (!grid) return;

    let score = 0;
    let clicks = 0;
    let errors = 0;
    const maxScore = 30;
    const maxErrors = 3;
    let gameFinished = false;

    // Adiciona display de chances
    const chancesDisplay = document.createElement("p");
    chancesDisplay.id = "chances";
    chancesDisplay.style.fontSize = "1.1em";
    chancesDisplay.style.fontWeight = "600";
    chancesDisplay.style.color = "#dc3545";
    chancesDisplay.style.marginTop = "10px";
    chancesDisplay.innerText = `⚠️ Chances restantes: ${maxErrors - errors}`;
    grid.parentNode.insertBefore(chancesDisplay, grid.nextSibling);

    items.forEach(item => {
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;
        img.width = 20;
        img.onclick = () => {
            // Não permite clicar se o jogo já terminou ou se o item já foi clicado
            if (gameFinished || img.classList.contains("success") || img.classList.contains("error")) {
                return;
            }

            if (item.danger) {
                // Acertou - é um foco
                score += 10;
                img.classList.add("success");
            } else {
                // Errou - não é um foco
                errors++;
                if (score > 0) score -= 5;
                img.classList.add("error");
                
                // Atualiza display de chances
                chancesDisplay.innerText = `⚠️ Chances restantes: ${maxErrors - errors}`;
                
                // Se atingiu o limite de erros, finaliza o jogo
                if (errors >= maxErrors) {
                    gameFinished = true;
                    chancesDisplay.innerText = "❌ Você esgotou suas chances!";
                    chancesDisplay.style.color = "#dc3545";
                    
                    // Desabilita todos os itens restantes
                    const allImages = grid.querySelectorAll("img");
                    allImages.forEach(img => {
                        if (!img.classList.contains("success") && !img.classList.contains("error")) {
                            img.style.opacity = "0.5";
                            img.style.cursor = "not-allowed";
                        }
                    });
                    
                    // Finaliza o jogo após um breve delay
                    setTimeout(() => {
                        const finalScore = Math.max(0, score);
                        finishGame(finalScore, maxScore);
                    }, 1000);
                    return;
                }
            }

            // Garante que o score não ultrapasse o máximo
            if (score > maxScore) score = maxScore;
            if (score < 0) score = 0;

            document.getElementById("score").innerText = "Pontuação: " + score;
            clicks++;
            
            // Finaliza quando atingir a pontuação máxima (30 pontos)
            if (score >= maxScore && !gameFinished) {
                gameFinished = true;
                chancesDisplay.innerText = "🎉 Parabéns! Você encontrou todos os focos!";
                chancesDisplay.style.color = "#28a745";
                
                // Desabilita todos os itens restantes
                const allImages = grid.querySelectorAll("img");
                allImages.forEach(img => {
                    if (!img.classList.contains("success") && !img.classList.contains("error")) {
                        img.style.opacity = "0.5";
                        img.style.cursor = "not-allowed";
                    }
                });
                
                // Pequeno delay para mostrar feedback visual
                setTimeout(() => {
                    finishGame(maxScore, maxScore);
                }, 800);
                return;
            }
        };
        grid.appendChild(img);
    });
}

window.onload = initChooseGame;