# solojack21-epic

# SoloJack 21

**SoloJack 21** é uma versão online e minimalista do Blackjack (“21”), feita com HTML, CSS e JavaScript puros — sem frameworks.  

## 🎯 Objetivo  
Criar uma aplicação web funcional que permita ao jogador:  
- iniciar uma partida contra o dealer;  
- pedir cartas, parar;  
- seguir as regras clássicas de Blackjack;  
- ver cartas visíveis/escondidas corretamente;  
- ver o histórico de partidas com pontuações e resultados.  

## 📦 Tecnologias  
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- localStorage (para histórico de partidas)  

## 🧩 Estrutura de arquivos  
projeto_blackjack2/ ← pasta raiz do projeto

├── pages/ ← páginas HTML

│ ├── telainicial.html ← tela inicial

│ ├── jogo.html ← tela de jogo

│ └── resultado.html ← tela de resultados

├── style/ ← arquivos CSS

│ ├── telainicial.css ← estilização página inicial

│ ├── jogo2.css ← estilização página de jogo

│ └── resultado.css ← estilização página de resultados

├── script/ ← arquivos JavaScript

│ ├── modal.js ← código/lógica do modal

│ ├── script2.js ← código/lógica do jogo (botões, funções)

│ └── resultado.js código da lógica da tela de resultado

├── cards/ ← imagens das cartas de baralho 

│ 

└── README.md ← este arquivo de documentação


## 🚀 Como usar / testar  

1. Baixe o projeto clicando no botão **Download ZIP** (se estiver no GitHub) ou recebendo a pasta do projeto diretamente.
2. Descompacte a pasta (se for um ZIP) para qualquer lugar do seu computador.
3. Certifique-se de que a pasta `cards/` está presente com todas as imagens das cartas.
4. Abra o arquivo `telainicial.html` com um navegador moderno (Chrome, Edge, Firefox ou Brave).
5. Clique em **INICIAR JOGO** para começar.
6. Durante o jogo, use os botões **Pedir** e **Parar** para jogar.
7. Ao final da rodada, a tela de resultado será exibida.
8. O histórico de partidas é salvo automaticamente no navegador `localStorge` e aparece na tela de jogo.


## ✅ Funcionalidades implementadas  

- Embaralhamento aleatório do baralho  
- Distribuição inicial correta: jogador recebe 2 cartas; dealer recebe 1 visível + 1 escondida  
- Lógica de Ás (vale 11 ou 1 conforme necessário)  
- Dealer compra cartas automaticamente até atingir pelo menos 17  
- Detecção de vitória, derrota e empate  
- Histórico de partidas, com resultado e pontuações salvas via localStorage  
- Modal de regras explicando as regras do jogo  
- Interface visual com cartas, design responsivo, estilo coerente  
- Botões para reiniciar partida ou voltar ao menu  


## 🤝 Autores  
- Lucas Eduardo / le5691864@gmail.com / @lucass.soars
- Manoela Caterini / manoelacaterinibrito@gmail.com / @caaterini
