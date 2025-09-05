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

    items.forEach(item => {
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;
        img.width = 20;
        img.onclick = () => {
            if (!img.classList.contains("success") && !img.classList.contains("error")) {
                if (item.danger) {
                    score += 10;
                    img.classList.add("success");
                }
                else {
                    score -= 10;
                    img.classList.add("error");
                }

                document.getElementById("score").innerText = "Pontuação: " + score;
                clicks ++;
            }

            if (clicks == items.length || score == 30) {
                finishGame(score, 30);
            }
        }
        grid.appendChild(img);
    });
}

window.onload = initChooseGame;