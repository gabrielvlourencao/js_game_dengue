const quizQuestions = [
  { q: "Qual dessas atitudes ajuda a prevenir a Chikungunya?", a: "Tampar a caixa d'água", options: ["Tampar a caixa d'água", "Deixar garrafas viradas para cima"] },
  { q: "Onde o mosquito Aedes aegypti (transmissor da Chikungunya) se reproduz?", a: "Água parada", options: ["Água parada", "Água corrente"] },
  { q: "Qual é a melhor forma de evitar focos do mosquito transmissor da Chikungunya?", a: "Eliminar água acumulada", options: ["Colocar veneno na água", "Eliminar água acumulada"] },
  { q: "Qual sintoma é característico da Chikungunya?", a: "Dores nas articulações", options: ["Dores nas articulações", "Tosse constante"] },
  { q: "Como podemos identificar um foco do mosquito da Chikungunya?", a: "Água acumulada em recipientes", options: ["Água acumulada em recipientes", "Plantas secas"] },
];

function initQuiz() {
  const quizDiv = document.getElementById("quiz");
  if (!quizDiv) return;

  let score = 0;
  let answeredCount = 0; // contador de perguntas respondidas
  const maxScore = 30;
  const pointsPerQuestion = maxScore / quizQuestions.length;

  quizQuestions.forEach((q) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.q}</p>`;
    
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt;

      btn.onclick = () => {
        if (btn.disabled) return; // evita múltiplos cliques
        
        // Marca visualmente se acertou ou errou
        if (opt === q.a) {
          score += pointsPerQuestion;
          btn.style.background = "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
        } else {
          btn.style.background = "linear-gradient(135deg, #dc3545 0%, #c82333 100%)";
        }
        
        btn.disabled = true;

        // Desabilita todos os botões dessa pergunta
        const siblings = div.querySelectorAll("button");
        siblings.forEach(b => {
          b.disabled = true;
          if (b.innerText === q.a && b !== btn) {
            b.style.background = "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
          }
        });

        answeredCount++;
        const finalScore = Math.round(score);
        document.getElementById("quizScore").innerText = "Pontuação: " + finalScore;

        // Quando todas as perguntas forem respondidas, finaliza imediatamente
        if (answeredCount === quizQuestions.length) {
          // Pequeno delay para mostrar feedback visual da última resposta
          setTimeout(() => {
            finishGame(Math.round(score), maxScore);
          }, 600);
        }
      };

      div.appendChild(btn);
    });

    quizDiv.appendChild(div);
  });
}


window.onload = initQuiz;
