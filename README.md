## Chikungunya Game 🦟

Este repositório abriga um jogo educativo criado para apoiar o trabalho de faculdade da minha namorada na área social. A experiência foi desenvolvida com foco em conscientização sobre Chikungunya, dengue e prevenção de focos do mosquito, combinando atividades lúdicas com informações práticas. Todo o desenvolvimento contou com o apoio de ferramentas de Inteligência Artificial, que auxiliaram na ideação, organização e implementação do código.

### Contexto
- **Objetivo social**: servir como material interativo para ações de sensibilização com a comunidade atendida no projeto acadêmico.
- **Público-alvo**: participantes das oficinas conduzidas pela minha namorada, que precisam de uma abordagem leve, acessível e envolvente.
- **Formato**: aplicação web simples, executada em navegador, que pode ser utilizada offline em sala ou em campo.

### Estrutura do jogo
- **Tela inicial** (`index.html`): apresenta regras, ranking local e início rápido da experiência.
- **Etapa 1 – Identificação de focos** (`games/choose.html` + `choose.js`): os jogadores analisam imagens do cotidiano para marcar ambientes com risco de proliferação do mosquito.
- **Etapa 2 – Quiz educativo** (`games/quiz.html` + `quiz.js`): perguntas objetivas reforçam boas práticas de prevenção.
- **Etapa 3 – Extermínio lúdico** (`games/exterminate.html` + `exterminate.js`): minigame de ação que simula a eliminação de mosquitos e reforça a importância do combate ativo.
- **Assets** (`assets/`): imagens, ícones e áudios que tornam a experiência mais imersiva e divertida.

### Como jogar
1. Abra o arquivo `index.html` diretamente no navegador (basta dar duplo clique ou usar um servidor estático de sua preferência).
2. Informe um nome no campo de jogador e clique em “Começar Jogo”.
3. Complete as três etapas para acumular até 100 pontos:
   - 30 pontos ao identificar corretamente os focos;
   - 30 pontos ao acertar as perguntas do quiz;
   - 40 pontos ao eliminar os mosquitos no minigame final.
4. Ao término, consulte o ranking para acompanhar as melhores pontuações registradas no dispositivo.

### Tecnologias utilizadas
- HTML5 e CSS3 para estrutura e estilo.
- JavaScript puro para lógica de jogo, ranking e interações.
- Recursos multimídia (imagens, ícones e áudios) para reforçar o engajamento.
- Suporte de ferramentas de IA (como assistentes de código) em todas as etapas de concepção e implementação.

### Como executar localmente
- **Opção rápida**: abra `index.html` no navegador.
- **Opção com servidor**: utilize um servidor estático (por exemplo, `npx serve`, extensão “Live Server” do VS Code ou `python -m http.server`) para manter os caminhos relativos e assets funcionando perfeitamente.
- **Deploy**: qualquer serviço de hospedagem estática (GitHub Pages, Netlify, Vercel) é suficiente para disponibilizar o jogo online.

### Agradecimentos
Este projeto só ganhou forma pela colaboração próxima com minha namorada, que direcionou as necessidades pedagógicas e o conteúdo social, e pelo apoio contínuo de ferramentas de IA que aceleraram a criação de código, textos e ideias.
