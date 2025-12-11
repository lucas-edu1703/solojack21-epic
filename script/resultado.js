window.onload = function() {
    const ultimo = JSON.parse(localStorage.getItem('ultimoResultado'));
    
    if (!ultimo) {
        window.location.href = '../pages/telainicial.html';
        return;
    }

    const caixaResultado = document.getElementById('result-box');
    const titulo = document.getElementById('titulo-resultado');
    const pontJog = document.getElementById('pontuacao-jogador');
    const pontDeal = document.getElementById('pontuacao-dealer');

    pontJog.textContent = ultimo.somaJogador;
    pontDeal.textContent = ultimo.somaDealer;

    if (ultimo.resultado === 'vitoria') {
        titulo.textContent = 'Você Ganhou!';
        caixaResultado.classList.add('win');
    } else if (ultimo.resultado === 'derrota') {
        titulo.textContent = 'Você Perdeu!';
        caixaResultado.classList.add('loss');
    } else {
        titulo.textContent = 'Empate!';
        caixaResultado.classList.add('tie');
    }
};
