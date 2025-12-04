// Variáveis de Estado do Jogo
const statusDisplay = document.getElementById('status');
const reiniciarBtn = document.getElementById('reiniciar');
const celulas = document.querySelectorAll('.celula');

let jogoAtivo = true;
let jogadorAtual = 'X';
let estadoJogo = ['', '', '', '', '', '', '', '', '']; // Representa as 9 células

// Combinações Vencedoras (índices no array estadoJogo)
const combinacoesVencedoras = [
    [0, 1, 2], // Linha 1
    [3, 4, 5], // Linha 2
    [6, 7, 8], // Linha 3
    [0, 3, 6], // Coluna 1
    [1, 4, 7], // Coluna 2
    [2, 5, 8], // Coluna 3
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
];

// Mensagens
const mensagemVitoria = (jogador) => `🎉 Jogador ${jogador} Venceu!`;
const mensagemEmpate = () => `🤝 O jogo terminou em Empate!`;
const mensagemTurno = (jogador) => `Vez do Jogador ${jogador}`;

statusDisplay.innerHTML = mensagemTurno(jogadorAtual);

// -----------------------------------------------------
// FUNÇÕES DE LÓGICA
// -----------------------------------------------------

/**
 * Atualiza o HTML da célula e o estado do jogo.
 * @param {HTMLElement} celulaClicada - O elemento div da célula.
 * @param {number} indiceClicado - O índice da célula (0 a 8).
 */
function handleJogada(celulaClicada, indiceClicado) {
    // 1. Preencher a célula no estadoJogo
    estadoJogo[indiceClicado] = jogadorAtual;
    
    // 2. Atualizar o visual da célula
    celulaClicada.innerHTML = jogadorAtual;
    celulaClicada.classList.add(jogadorAtual);
}

/**
 * Checa se o jogo terminou em vitória ou empate.
 */
function checarResultado() {
    let venceu = false;
    
    // 1. Checar por vitória
    for (let i = 0; i < combinacoesVencedoras.length; i++) {
        const condicao = combinacoesVencedoras[i];
        
        // Desestruturação para pegar os 3 índices
        let a = estadoJogo[condicao[0]];
        let b = estadoJogo[condicao[1]];
        let c = estadoJogo[condicao[2]];

        // Se alguma das células estiver vazia, pule a checagem
        if (a === '' || b === '' || c === '') {
            continue;
        }
        
        // Se as três forem iguais, temos um vencedor!
        if (a === b && b === c) {
            venceu = true;
            break;
        }
    }

    if (venceu) {
        statusDisplay.innerHTML = mensagemVitoria(jogadorAtual);
        jogoAtivo = false; // Finaliza o jogo
        return;
    }

    // 2. Checar por empate (se não venceu e não há células vazias)
    let deuEmpate = !estadoJogo.includes('');
    if (deuEmpate) {
        statusDisplay.innerHTML = mensagemEmpate();
        jogoAtivo = false;
        return;
    }

    // 3. Se não houver vitória nem empate, troca o jogador
    trocarJogador();
}

/**
 * Alterna a vez de 'X' para 'O' e vice-versa.
 */
function trocarJogador() {
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = mensagemTurno(jogadorAtual);
}

/**
 * Função principal chamada ao clicar em uma célula.
 * @param {Event} event - O evento de clique.
 */
function handleCelulaClicada(event) {
    const celulaClicada = event.target;
    const indiceClicado = parseInt(celulaClicada.getAttribute('data-index'));

    // Verifica se a jogada é válida (se o jogo está ativo e a célula está vazia)
    if (estadoJogo[indiceClicado] !== '' || !jogoAtivo) {
        return;
    }

    // Executa a jogada e checa o resultado
    handleJogada(celulaClicada, indiceClicado);
    checarResultado();
}

/**
 * Reinicia todas as variáveis de estado e o tabuleiro.
 */
function handleReiniciarJogo() {
    jogoAtivo = true;
    jogadorAtual = 'X';
    estadoJogo = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = mensagemTurno(jogadorAtual);
    
    // Limpa o conteúdo e as classes de todas as células
    celulas.forEach(celula => {
        celula.innerHTML = '';
        celula.classList.remove('X', 'O');
    });
}


// -----------------------------------------------------
// LISTENERS DE EVENTOS
// -----------------------------------------------------

// Adiciona o listener de clique para cada célula
celulas.forEach(celula => {
    celula.addEventListener('click', handleCelulaClicada);
});

// Adiciona o listener para o botão de reiniciar
reiniciarBtn.addEventListener('click', handleReiniciarJogo);