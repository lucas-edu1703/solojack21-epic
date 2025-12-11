// Variáveis de estado
let somaDealer = 0;
let somaJogador = 0;

let contadorAsDealer = 0;
let contadorAsJogador = 0;

let cartaEscondida;
let baralho = [];

let podePedir = true; // permite pedir carta enquanto somaJogador <= 21

// Chaves de localStorage (consistentes entre arquivos)
const ULTIMO_JOGO = 'ultimoResultado';
const HISTORICO_JOGOS = 'historicoJogos';

window.onload = function() {
    construirBaralho();
    embaralharBaralho();
    iniciarJogo();
    carregarHistorico();
    
    document.getElementById("limpar-historico").addEventListener("click", limparHistorico);
    document.getElementById("pedir").addEventListener("click", pedirCarta);
    document.getElementById("parar").addEventListener("click", parar);
    document.getElementById("reiniciar").addEventListener("click", () => {
        window.location.reload();
    });
    document.getElementById("sair").addEventListener("click", () => {
        window.location.href = "../pages/telainicial.html"; 
    });
}

function construirBaralho() {
    let valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let naipes = ["C", "D", "H", "S"];
    baralho = [];

    for (let i = 0; i < naipes.length; i++) {
        for (let j = 0; j < valores.length; j++) {
            baralho.push(valores[j] + "-" + naipes[i]);
        }
    }
}

function embaralharBaralho() {
    for (let i = 0; i < baralho.length; i++) {
        let j = Math.floor(Math.random() * baralho.length);
        let temp = baralho[i];
        baralho[i] = baralho[j];
        baralho[j] = temp;
    }
    console.log(baralho);
}

function iniciarJogo() {
    // ----- CARTA ESCONDIDA DO DEALER -----
    cartaEscondida = baralho.pop();
    somaDealer += valorCarta(cartaEscondida);
    contadorAsDealer += verificarAs(cartaEscondida);

    const imgVerso = document.createElement("img");
    imgVerso.id = "carta-escondida";
    imgVerso.src = "../cards/BACK.png";
    document.getElementById("cartas-dealer").append(imgVerso);

    // ----- CARTA VISÍVEL DO DEALER -----
    let cartaDealerVisivel = baralho.pop();
    somaDealer += valorCarta(cartaDealerVisivel);
    contadorAsDealer += verificarAs(cartaDealerVisivel);

    const imgDealer = document.createElement("img");
    imgDealer.src = "../cards/" + cartaDealerVisivel + ".png";
    document.getElementById("cartas-dealer").append(imgDealer);

    // ----- DUAS CARTAS DO JOGADOR -----
    for (let i = 0; i < 2; i++) {
        let carta = baralho.pop();
        somaJogador += valorCarta(carta);
        contadorAsJogador += verificarAs(carta);

        const imgJog = document.createElement("img");
        imgJog.src = "../cards/" + carta + ".png";
        document.getElementById("cartas-jogador").append(imgJog);
    }

    // ----- AJUSTAR ÁS -----
    somaDealer = reduzirAs(somaDealer, contadorAsDealer);
    somaJogador = reduzirAs(somaJogador, contadorAsJogador);

    atualizarSomasVisuais();
}

function pedirCarta() {
    if (!podePedir) return;

    let imgCarta = document.createElement("img");
    let carta = baralho.pop();
    imgCarta.src = "../cards/" + carta + ".png";
    somaJogador += valorCarta(carta);
    contadorAsJogador += verificarAs(carta);
    document.getElementById("cartas-jogador").append(imgCarta);

    atualizarSomasVisuais();

    if (reduzirAs(somaJogador, contadorAsJogador) > 21) {
        podePedir = false;
        // jogador estourou, finalizar rodada automaticamente chamando parar
        setTimeout(parar, 500);
    }
}

function parar() {
    // Revela a carta escondida do dealer e realiza a lógica do dealer (pedir até 17)
    // Primeiro aplica ajuste de As para as somas atuais
    somaDealer = reduzirAs(somaDealer, contadorAsDealer);
    somaJogador = reduzirAs(somaJogador, contadorAsJogador);

    podePedir = false;

    // Revela a carta escondida
    const imgEscondida = document.getElementById("carta-escondida");
    if (imgEscondida) {
        imgEscondida.src = "../cards/" + cartaEscondida + ".png";
    } else {
        // caso não exista (defensivo), cria a imagem
        const nova = document.createElement("img");
        nova.src = "../cards/" + cartaEscondida + ".png";
        document.getElementById("cartas-dealer").append(nova);
    }

    // Dealer compra cartas até atingir pelo menos 17
    while (somaDealer < 17) {
        let img = document.createElement("img");
        let carta = baralho.pop();
        img.src = "../cards/" + carta + ".png";
        somaDealer += valorCarta(carta);
        contadorAsDealer += verificarAs(carta);
        document.getElementById("cartas-dealer").append(img);
        somaDealer = reduzirAs(somaDealer, contadorAsDealer);
    }

    // Recalcula após possível compra do dealer
    somaDealer = reduzirAs(somaDealer, contadorAsDealer);
    somaJogador = reduzirAs(somaJogador, contadorAsJogador);

    atualizarSomasVisuais();

    let mensagem = "";
    let resultado = "";

    if (somaJogador > 21) {
        mensagem = "Você Perdeu!";
        resultado = "derrota";
    } else if (somaDealer > 21) {
        mensagem = "Você Ganhou!";
        resultado = "vitoria";
    } else if (somaJogador == somaDealer) {
        mensagem = "Empate!";
        resultado = "empate";
    } else if (somaJogador > somaDealer) {
        mensagem = "Você Ganhou!";
        resultado = "vitoria";
    } else if (somaJogador < somaDealer) {
        mensagem = "Você Perdeu!";
        resultado = "derrota";
    }
    
    // Salvar resultado no localStorage (usando chaves em português)
    salvarResultadoJogo(resultado, somaJogador, somaDealer);

    // Aguarda 1s e vai para tela de resultado
    setTimeout(() => {
        window.location.href = '../pages/resultado.html';
    }, 5000);
}

function valorCarta(carta) {
    let dados = carta.split("-"); // "4-C" -> ["4", "C"]
    let valor = dados[0];

    if (isNaN(valor)) { // A J Q K
        if (valor == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(valor);
}

function verificarAs(carta) {
    if (carta[0] == "A") {
        return 1;
    }
    return 0;
}

function reduzirAs(soma, contadorAs) {
    while (soma > 21 && contadorAs > 0) {
        soma -= 10;
        contadorAs -= 1;
    }
    return soma;
}

// Funções de localStorage e histórico (com nomes em pt)
function salvarResultadoJogo(resultado, somaJog, somaDeal) {
    const jogo = {
        resultado: resultado, // 'vitoria' | 'derrota' | 'empate'
        somaJogador: somaJog,
        somaDealer: somaDeal,
    };

    // salva o último jogo
    localStorage.setItem(ULTIMO_JOGO, JSON.stringify(jogo));

    // adiciona ao histórico
    let historico = JSON.parse(localStorage.getItem(HISTORICO_JOGOS)) || [];
    historico.unshift(jogo); // adiciona no início

    // limitar histórico a 50 itens
    if (historico.length > 50) {
        historico = historico.slice(0, 50);
    }

    localStorage.setItem(HISTORICO_JOGOS, JSON.stringify(historico));
}

function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem(HISTORICO_JOGOS)) || [];
    const lista = document.getElementById('lista-historico');

    if (historico.length === 0) {
        lista.innerHTML = '<div class="no-history">Nenhuma partida jogada ainda</div>';
        return;
    }

    // atualizar estatísticas
    let vitorias = 0, derrotas = 0, empates = 0;
    historico.forEach(jogo => {
        if (jogo.resultado === 'vitoria') vitorias++;
        else if (jogo.resultado === 'derrota') derrotas++;
        else if (jogo.resultado === 'empate') empates++;
    });

    document.getElementById('total-vitorias').textContent = vitorias;
    document.getElementById('total-derrotas').textContent = derrotas;
    document.getElementById('total-empates').textContent = empates;

    // exibir histórico (últimas 10 partidas)
    lista.innerHTML = '';
    const display = historico.slice(0, 10);

    display.forEach(jogo => {
        const item = document.createElement('div');
        item.className = `history-item ${jogo.resultado === 'vitoria' ? 'win' : jogo.resultado === 'derrota' ? 'loss' : 'tie'}`;

        let textoResultado = '';
        if (jogo.resultado === 'vitoria') textoResultado = 'Vitória';
        else if (jogo.resultado === 'derrota') textoResultado = 'Derrota';
        else textoResultado = 'Empate';

        item.innerHTML = `
            <div class="history-item-result">${textoResultado}</div>
            <div class="history-item-score">Você: ${jogo.somaJogador} | Dealer: ${jogo.somaDealer}</div>
        `;
        lista.appendChild(item);
    });
}

function limparHistorico() {
    if (confirm('Deseja realmente limpar todo o histórico?')) {
        localStorage.removeItem(HISTORICO_JOGOS);
        localStorage.removeItem(ULTIMO_JOGO);
        carregarHistorico();
    }
}

function atualizarSomasVisuais() {
    const spanDealer = document.getElementById("soma-dealer");
    const spanJogador = document.getElementById("soma-jogador");

    // Enquanto a carta do dealer estiver escondida, mostramos "?" ou deixamos vazio.
    const imgEscondida = document.getElementById("carta-escondida");
    if (imgEscondida) {
        // mostra nada ou "?" — decidi manter vazio para não entregar informação
        spanDealer.textContent = "";
    } else {
        spanDealer.textContent = somaDealer;
    }

    // Soma do jogador mostra o total atual (após reduzir ásses)
    spanJogador.textContent = reduzirAs(somaJogador, contadorAsJogador);
}
