const quizQuestions = [
  { q: "Qual dessas atitudes ajuda a combater a dengue?", a: "Tampar a caixa d’água", options: ["Tampar a caixa d’água", "Deixar garrafas viradas para cima"] },
  { q: "Onde o mosquito Aedes aegypti se reproduz?", a: "Água parada", options: ["Água parada", "Água corrente"] },
  { q: "Qual é a melhor forma de evitar focos?", a: "Eliminar água acumulada", options: ["Colocar veneno na água", "Eliminar água acumulada"] },
];

function initQuiz() {
  const quizDiv = document.getElementById("quiz");
  if (!quizDiv) return;

  let score = 0;
  let answeredCount = 0; // contador de perguntas respondidas

  quizQuestions.forEach((q) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.q}</p>`;
    
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt;

      btn.onclick = () => {
        if (btn.disabled) return; // evita múltiplos cliques
        if (opt === q.a) score += 10;
        btn.disabled = true;

        // Desabilita todos os botões dessa pergunta
        const siblings = div.querySelectorAll("button");
        siblings.forEach(b => b.disabled = true);

        answeredCount++;
        document.getElementById("quizScore").innerText = "Pontuação: " + score;

        if (answeredCount === quizQuestions.length) {
          finishGame(score, 30);
        }
      };

      div.appendChild(btn);
    });

    quizDiv.appendChild(div);
  });
}


window.onload = initQuiz;
