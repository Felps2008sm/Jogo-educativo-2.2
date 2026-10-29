// =============================
// 🔥 IMPORTAR FIREBASE
// =============================
import {
    salvarProgressoOnline,
    salvarPerfilOnline,
    mostrarRankingGlobal
} from './firebase.js';

// =============================
// 🧠 PALAVRAS POR NÍVEL
// =============================
const banco = {
    pre: [
        { w: 'GATO', en: 'CAT', img: '🐱' },
        { w: 'BOLA', en: 'BALL', img: '⚽' },
        { w: 'CASA', en: 'HOUSE', img: '🏠' },
        { w: 'SOL', en: 'SUN', img: '☀️' },
        { w: 'LUA', en: 'MOON', img: '🌙' },
        { w: 'SAPO', en: 'FROG', img: '🐸' },
        { w: 'PATO', en: 'DUCK', img: '🦆' },
        { w: 'RATO', en: 'MOUSE', img: '🐭' },
        { w: 'MÃO', en: 'HAND', img: '✋' },
        { w: 'PÉ', en: 'FOOT', img: '🦶' },
        { w: 'OVO', en: 'EGG', img: '🥚' },
        { w: 'UVA', en: 'GRAPE', img: '🍇' },
        { w: 'REI', en: 'KING', img: '🤴' },
        { w: 'RUA', en: 'STREET', img: '🛣️' },
        { w: 'MAR', en: 'SEA', img: '🌊' },
        { w: 'CÃO', en: 'DOG', img: '🐶' },
        { w: 'BOI', en: 'OX', img: '🐂' },
        { w: 'PÃO', en: 'BREAD', img: '🍞' },
        { w: 'DOCE', en: 'CANDY', img: '🍬' },
        { w: 'LEÃO', en: 'LION', img: '🦁' },
        { w: 'PEIXE', en: 'FISH', img: '🐟' },
        { w: 'FLOR', en: 'FLOWER', img: '🌸' },
        { w: 'MALA', en: 'BAG', img: '🧳' },
        { w: 'DADO', en: 'DICE', img: '🎲' },
        { w: 'FOGO', en: 'FIRE', img: '🔥' },
        { w: 'ÁGUA', en: 'WATER', img: '💧' },
        { w: 'NAVE', en: 'SHIP', img: '🚀' },
        { w: 'SAPATO', en: 'SHOE', img: '👟' },
        { w: 'PIPA', en: 'KITE', img: '🪁' },
        { w: 'TREM', en: 'TRAIN', img: '🚆' }
    ],
    facil: [
        { w: 'PATO', en: 'DUCK', img: '🦆' },
        { w: 'PEIXE', en: 'FISH', img: '🐟' },
        { w: 'FLOR', en: 'FLOWER', img: '🌸' },
        { w: 'CARRO', en: 'CAR', img: '🚗' },
        { w: 'LIVRO', en: 'BOOK', img: '📘' },
        { w: 'MAÇÃ', en: 'APPLE', img: '🍎' },
        { w: 'MESA', en: 'TABLE', img: '🪑' },
        { w: 'PORTA', en: 'DOOR', img: '🚪' },
        { w: 'CHAVE', en: 'KEY', img: '🔑' },
        { w: 'BONECA', en: 'DOLL', img: '🧸' },
        { w: 'COELHO', en: 'RABBIT', img: '🐰' },
        { w: 'QUEIJO', en: 'CHEESE', img: '🧀' },
        { w: 'BANANA', en: 'BANANA', img: '🍌' },
        { w: 'JANELA', en: 'WINDOW', img: '🪟' },
        { w: 'ESCOVA', en: 'BRUSH', img: '🪥' },
        { w: 'BICICLETA', en: 'BICYCLE', img: '🚲' },
        { w: 'SORVETE', en: 'ICE CREAM', img: '🍦' },
        { w: 'CADERNO', en: 'NOTEBOOK', img: '📓' },
        { w: 'MOCHILA', en: 'BACKPACK', img: '🎒' },
        { w: 'ESTRELA', en: 'STAR', img: '⭐' },
        { w: 'PINCEL', en: 'BRUSH', img: '🖌️' },
        { w: 'GIRAFA', en: 'GIRAFFE', img: '🦒' },
        { w: 'JACARÉ', en: 'ALLIGATOR', img: '🐊' },
        { w: 'FAMÍLIA', en: 'FAMILY', img: '👨‍👩‍👧' },
        { w: 'CIDADE', en: 'CITY', img: '🏙️' },
        { w: 'AMIGO', en: 'FRIEND', img: '🤝' },
        { w: 'PRAIA', en: 'BEACH', img: '🏖️' },
        { w: 'VIOLÃO', en: 'GUITAR', img: '🎸' },
        { w: 'RELÓGIO', en: 'CLOCK', img: '⏰' },
        { w: 'TIGRE', en: 'TIGER', img: '🐯' }
    ],
    medio: [
        { w: 'MACACO', en: 'MONKEY', img: '🐵' },
        { w: 'CAVALO', en: 'HORSE', img: '🐴' },
        { w: 'ESCOLA', en: 'SCHOOL', img: '🏫' },
        { w: 'JANELA', en: 'WINDOW', img: '🪟' },
        { w: 'AMIGO', en: 'FRIEND', img: '🤝' },
        { w: 'CADERNO', en: 'NOTEBOOK', img: '📓' },
        { w: 'FOGUETE', en: 'ROCKET', img: '🚀' },
        { w: 'PLANETA', en: 'PLANET', img: '🪐' },
        { w: 'DINHEIRO', en: 'MONEY', img: '💰' },
        { w: 'COZINHA', en: 'KITCHEN', img: '🍳' },
        { w: 'MONTANHA', en: 'MOUNTAIN', img: '⛰️' },
        { w: 'FLORESTA', en: 'FOREST', img: '🌳' },
        { w: 'HOSPITAL', en: 'HOSPITAL', img: '🏥' },
        { w: 'MERCADO', en: 'MARKET', img: '🛒' },
        { w: 'VIAGEM', en: 'TRIP', img: '✈️' },
        { w: 'ESPELHO', en: 'MIRROR', img: '🪞' },
        { w: 'TESOURA', en: 'SCISSORS', img: '✂️' },
        { w: 'PRESENTE', en: 'GIFT', img: '🎁' },
        { w: 'ABACAXI', en: 'PINEAPPLE', img: '🍍' },
        { w: 'MORANGO', en: 'STRAWBERRY', img: '🍓' },
        { w: 'CACHORRO', en: 'DOG', img: '🐶' },
        { w: 'PASSARINHO', en: 'BIRD', img: '🐦' },
        { w: 'CAMINHÃO', en: 'TRUCK', img: '🚚' },
        { w: 'BOMBEIRO', en: 'FIREFIGHTER', img: '🚒' },
        { w: 'DENTISTA', en: 'DENTIST', img: '🦷' },
        { w: 'PIRÂMIDE', en: 'PYRAMID', img: '🔺' },
        { w: 'CASTELO', en: 'CASTLE', img: '🏰' },
        { w: 'ROBÓTICA', en: 'ROBOTICS', img: '🤖' },
        { w: 'TECLADO', en: 'KEYBOARD', img: '⌨️' },
        { w: 'DESENHO', en: 'DRAWING', img: '🎨' }
    ],
    dificil: [
        { w: 'ELEFANTE', en: 'ELEPHANT', img: '🐘' },
        { w: 'COMPUTADOR', en: 'COMPUTER', img: '💻' },
        { w: 'TARTARUGA', en: 'TURTLE', img: '🐢' },
        { w: 'PROFESSOR', en: 'TEACHER', img: '👨‍🏫' },
        { w: 'BORBOLETA', en: 'BUTTERFLY', img: '🦋' },
        { w: 'BIBLIOTECA', en: 'LIBRARY', img: '📚' },
        { w: 'HELICÓPTERO', en: 'HELICOPTER', img: '🚁' },
        { w: 'ASTRONAUTA', en: 'ASTRONAUT', img: '🧑‍🚀' },
        { w: 'DINOSSAURO', en: 'DINOSAUR', img: '🦖' },
        { w: 'LABORATÓRIO', en: 'LABORATORY', img: '🧪' },
        { w: 'ARQUITETO', en: 'ARCHITECT', img: '📐' },
        { w: 'ENGENHEIRO', en: 'ENGINEER', img: '👷' },
        { w: 'PROGRAMADOR', en: 'PROGRAMMER', img: '🧑‍💻' },
        { w: 'TECNOLOGIA', en: 'TECHNOLOGY', img: '💡' },
        { w: 'MATEMÁTICA', en: 'MATHEMATICS', img: '➗' },
        { w: 'EXPERIMENTO', en: 'EXPERIMENT', img: '🔬' },
        { w: 'UNIVERSO', en: 'UNIVERSE', img: '🌌' },
        { w: 'CONHECIMENTO', en: 'KNOWLEDGE', img: '🧠' },
        { w: 'AVENTURA', en: 'ADVENTURE', img: '🧭' },
        { w: 'CRIATIVIDADE', en: 'CREATIVITY', img: '✨' },
        { w: 'RESPONSÁVEL', en: 'RESPONSIBLE', img: '✅' },
        { w: 'DISCIPLINA', en: 'DISCIPLINE', img: '📋' },
        { w: 'INTELIGENTE', en: 'INTELLIGENT', img: '🤓' },
        { w: 'DESENVOLVER', en: 'DEVELOP', img: '🛠️' },
        { w: 'QUALIFICAÇÃO', en: 'QUALIFICATION', img: '🎓' },
        { w: 'APRENDIZAGEM', en: 'LEARNING', img: '📖' },
        { w: 'COMUNICAÇÃO', en: 'COMMUNICATION', img: '💬' },
        { w: 'ORGANIZAÇÃO', en: 'ORGANIZATION', img: '🗂️' },
        { w: 'CONCENTRAÇÃO', en: 'CONCENTRATION', img: '🎯' },
        { w: 'PERSISTÊNCIA', en: 'PERSISTENCE', img: '🏁' }
    ]
};

// =============================
// 🛒 CATÁLOGO DA LOJA
// =============================
const catalogo = [
    { id: 'base_astronauta', tipo: 'base', nome: 'Astronauta', emoji: '🧑‍🚀', custo: 0, raridade: 'inicial' },
    { id: 'base_heroi', tipo: 'base', nome: 'Herói', emoji: '🦸', custo: 4, raridade: 'raro' },
    { id: 'base_mago', tipo: 'base', nome: 'Mago', emoji: '🧙', custo: 5, raridade: 'raro' },
    { id: 'base_robo', tipo: 'base', nome: 'Robô', emoji: '🤖', custo: 6, raridade: 'epico' },
    { id: 'base_ninja', tipo: 'base', nome: 'Ninja', emoji: '🥷', custo: 8, raridade: 'epico' },
    { id: 'base_dragao', tipo: 'base', nome: 'Dragão', emoji: '🐉', custo: 15, raridade: 'lendario' },

    { id: 'pele_1', tipo: 'pele', nome: 'Pele 1', emoji: '🙂', custo: 0, raridade: 'inicial' },
    { id: 'pele_2', tipo: 'pele', nome: 'Pele 2', emoji: '😊', custo: 1, raridade: 'comum' },
    { id: 'pele_3', tipo: 'pele', nome: 'Pele 3', emoji: '😄', custo: 1, raridade: 'comum' },
    { id: 'pele_4', tipo: 'pele', nome: 'Pele 4', emoji: '😎', custo: 2, raridade: 'comum' },

    { id: 'cabelo_curto', tipo: 'cabelo', nome: 'Curto', emoji: '💇', custo: 0, raridade: 'inicial' },
    { id: 'cabelo_cacheado', tipo: 'cabelo', nome: 'Cacheado', emoji: '🌀', custo: 2, raridade: 'comum' },
    { id: 'cabelo_colorido', tipo: 'cabelo', nome: 'Colorido', emoji: '🌈', custo: 4, raridade: 'raro' },
    { id: 'cabelo_coroa', tipo: 'cabelo', nome: 'Coroado', emoji: '👑', custo: 10, raridade: 'lendario' },

    { id: 'roupa_casual', tipo: 'roupa', nome: 'Casual', emoji: '👕', custo: 0, raridade: 'inicial' },
    { id: 'roupa_esporte', tipo: 'roupa', nome: 'Esportiva', emoji: '🏃', custo: 3, raridade: 'comum' },
    { id: 'roupa_escolar', tipo: 'roupa', nome: 'Escolar', emoji: '🎒', custo: 3, raridade: 'comum' },
    { id: 'roupa_espacial', tipo: 'roupa', nome: 'Espacial', emoji: '🚀', custo: 8, raridade: 'epico' },
    { id: 'roupa_dourada', tipo: 'roupa', nome: 'Dourada', emoji: '🏆', custo: 15, raridade: 'lendario' },

    { id: 'acessorio_nenhum', tipo: 'acessorio', nome: 'Sem acessório', emoji: '✅', custo: 0, raridade: 'inicial' },
    { id: 'acessorio_oculos', tipo: 'acessorio', nome: 'Óculos', emoji: '👓', custo: 2, raridade: 'comum' },
    { id: 'acessorio_bone', tipo: 'acessorio', nome: 'Boné', emoji: '🧢', custo: 3, raridade: 'comum' },
    { id: 'acessorio_fone', tipo: 'acessorio', nome: 'Fone Gamer', emoji: '🎧', custo: 5, raridade: 'raro' },
    { id: 'acessorio_coroa', tipo: 'acessorio', nome: 'Coroa', emoji: '👑', custo: 8, raridade: 'epico' },
    { id: 'acessorio_asas', tipo: 'acessorio', nome: 'Asas', emoji: '🪽', custo: 12, raridade: 'lendario' },

    { id: 'companheiro_nenhum', tipo: 'companheiro', nome: 'Sem pet', emoji: '✅', custo: 0, raridade: 'inicial' },
    { id: 'companheiro_gato', tipo: 'companheiro', nome: 'Gatinho', emoji: '🐱', custo: 4, raridade: 'comum' },
    { id: 'companheiro_robo', tipo: 'companheiro', nome: 'Robô Pet', emoji: '🤖', custo: 8, raridade: 'epico' },
    { id: 'companheiro_unicornio', tipo: 'companheiro', nome: 'Unicórnio', emoji: '🦄', custo: 15, raridade: 'lendario' },

    { id: 'tema_classico', tipo: 'tema', nome: 'Clássico', emoji: '💙', custo: 0, raridade: 'inicial', theme: 'classico' },
    { id: 'tema_floresta', tipo: 'tema', nome: 'Floresta', emoji: '🌳', custo: 5, raridade: 'raro', theme: 'floresta' },
    { id: 'tema_oceano', tipo: 'tema', nome: 'Oceano', emoji: '🌊', custo: 5, raridade: 'raro', theme: 'oceano' },
    { id: 'tema_galaxia', tipo: 'tema', nome: 'Galáxia', emoji: '🌌', custo: 8, raridade: 'epico', theme: 'galaxia' },
    { id: 'tema_neon', tipo: 'tema', nome: 'Neon', emoji: '⚡', custo: 10, raridade: 'lendario', theme: 'neon' },

    { id: 'poder_vida', tipo: 'poder', nome: '+1 Vida', emoji: '❤️', custo: 1, raridade: 'comum', consumivel: true },
    { id: 'poder_escudo', tipo: 'poder', nome: 'Escudo', emoji: '🛡️', custo: 3, raridade: 'raro', consumivel: true },
    { id: 'poder_xp2', tipo: 'poder', nome: 'Dobro de XP', emoji: '🔥', custo: 4, raridade: 'epico', consumivel: true }
];

const conquistasCatalogo = [
    { id: 'primeiro_acerto', nome: 'Primeiro Acerto', emoji: '🏅', regra: () => totalAcertos >= 1 },
    { id: 'dez_seguidas', nome: '10 Seguidas', emoji: '🔥', regra: () => melhorSequencia >= 10 },
    { id: 'nivel_5', nome: 'Nível 5', emoji: '⭐', regra: () => nivel >= 5 },
    { id: 'colecionador', nome: 'Colecionador', emoji: '🎒', regra: () => inventario.length >= 12 },
    { id: 'rico', nome: 'Rico do Jogo', emoji: '💰', regra: () => moedas >= 20 }
];

// =============================
// 🎮 VARIÁVEIS
// =============================
let nivelIdade = localStorage.getItem('nivelIdade') || 'pre';
let palavras = banco[nivelIdade] || banco.pre;
let atual;
let ultimaPalavra = '';
let palavraMontar = '';
let respostaUsuario = '';
let respostaSlots = [];
let letraArrastadaId = '';

let xp = 0;
let nivel = 1;
let vidas = 3;
let moedas = 0;
let sequenciaAcertos = 0;
let melhorSequencia = 0;
let totalAcertos = 0;
let totalErros = 0;
let escudos = 0;
let xpDobroRodadas = 0;

let nomeJogador = localStorage.getItem('nome') || '';
let avatarJogador = localStorage.getItem('avatarJogador') || '🧑‍🚀';

let inventario = ['base_astronauta', 'pele_1', 'cabelo_curto', 'roupa_casual', 'acessorio_nenhum', 'companheiro_nenhum', 'tema_classico'];
let conquistas = [];
let filtroLojaAtual = 'todos';

let avatar = {
    base: 'base_astronauta',
    pele: 'pele_1',
    cabelo: 'cabelo_curto',
    roupa: 'roupa_casual',
    acessorio: 'acessorio_nenhum',
    companheiro: 'companheiro_nenhum',
    tema: 'tema_classico'
};

// =============================
// 🔧 UTIL
// =============================
function normalizar(texto) {
    return String(texto || '')
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function itemPorId(id) {
    return catalogo.find(item => item.id === id);
}

function emojiItem(id) {
    return itemPorId(id)?.emoji || '';
}

function nomeItem(id) {
    return itemPorId(id)?.nome || '';
}

function toast(mensagem) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.innerText = mensagem;
    el.classList.add('mostrar');
    setTimeout(() => el.classList.remove('mostrar'), 2400);
}

function tocarSom(id) {
    const audio = document.getElementById(id);
    if (!audio) return;
    try {
        audio.currentTime = 0;
        const promessa = audio.play();
        if (promessa !== undefined) promessa.catch(() => {});
    } catch {}
}

function renderAvatar() {
    const partes = [
        emojiItem(avatar.base),
        emojiItem(avatar.cabelo),
        emojiItem(avatar.roupa),
        avatar.acessorio !== 'acessorio_nenhum' ? emojiItem(avatar.acessorio) : '',
        avatar.companheiro !== 'companheiro_nenhum' ? emojiItem(avatar.companheiro) : ''
    ].filter(Boolean);

    return partes.join(' ');
}

function descricaoAvatarTexto() {
    return `${nomeItem(avatar.base)} • ${nomeItem(avatar.cabelo)} • ${nomeItem(avatar.roupa)} • ${nomeItem(avatar.acessorio)} • ${nomeItem(avatar.companheiro)}`;
}

function aplicarTema() {
    const tema = itemPorId(avatar.tema)?.theme || 'classico';
    document.body.dataset.theme = tema;
}

// =============================
// 💾 PROGRESSO
// =============================
function salvarProgresso() {
    const dados = {
        nome: nomeJogador,
        avatarEmoji: avatarJogador,
        avatar,
        inventario,
        conquistas,
        xp,
        nivel,
        vidas,
        moedas,
        sequenciaAcertos,
        melhorSequencia,
        totalAcertos,
        totalErros,
        escudos,
        xpDobroRodadas,
        nivelIdade
    };

    localStorage.setItem('progresso', JSON.stringify(dados));
    localStorage.setItem('avatarJogador', avatarJogador);
}

function carregarProgresso() {
    try {
        const dados = JSON.parse(localStorage.getItem('progresso'));
        if (!dados) return;

        nomeJogador = dados.nome || localStorage.getItem('nome') || '';
        avatar = { ...avatar, ...(dados.avatar || {}) };
        inventario = Array.isArray(dados.inventario) ? dados.inventario : inventario;
        conquistas = Array.isArray(dados.conquistas) ? dados.conquistas : [];
        xp = dados.xp || 0;
        nivel = dados.nivel || 1;
        vidas = dados.vidas || 3;
        moedas = dados.moedas || 0;
        sequenciaAcertos = dados.sequenciaAcertos || 0;
        melhorSequencia = dados.melhorSequencia || 0;
        totalAcertos = dados.totalAcertos || 0;
        totalErros = dados.totalErros || 0;
        escudos = dados.escudos || 0;
        xpDobroRodadas = dados.xpDobroRodadas || 0;
        nivelIdade = dados.nivelIdade || 'pre';
        palavras = banco[nivelIdade] || banco.pre;
        avatarJogador = renderAvatar();
    } catch (erro) {
        console.warn('Erro ao carregar progresso:', erro);
    }
}

// =============================
// 🎯 NÍVEL E PALAVRAS
// =============================
function selecionarNivel(nivelSelecionado) {
    nivelIdade = nivelSelecionado;
    palavras = banco[nivelSelecionado] || banco.pre;
    localStorage.setItem('nivelIdade', nivelSelecionado);

    const nivelAtual = document.getElementById('nivelAtual');
    if (nivelAtual) nivelAtual.innerText = `Nível atual: ${nivelSelecionado}`;

    novaPalavra();
    novaPalavraMontar();
    salvarProgresso();
    atualizarUI();
    toast(`Nível alterado para ${nivelSelecionado}.`);
}

function sortearPalavra() {
    if (!palavras || palavras.length === 0) palavras = banco.pre;
    let item = palavras[Math.floor(Math.random() * palavras.length)];

    if (palavras.length > 1) {
        let tentativas = 0;
        while (item.w === ultimaPalavra && tentativas < 8) {
            item = palavras[Math.floor(Math.random() * palavras.length)];
            tentativas++;
        }
    }

    ultimaPalavra = item.w;
    return item;
}

function novaPalavra() {
    atual = sortearPalavra();

    const emoji = document.getElementById('emoji');
    const emojiEN = document.getElementById('emojiEN');
    const palavraEN = document.getElementById('palavraEN');
    const resposta = document.getElementById('resposta');
    const respostaEN = document.getElementById('respostaEN');

    if (emoji) emoji.innerText = atual.img;
    if (emojiEN) emojiEN.innerText = atual.img;
    if (palavraEN) palavraEN.innerText = atual.en;
    if (resposta) resposta.value = '';
    if (respostaEN) respostaEN.value = '';
}

// =============================
// ✅ ACERTO / ERRO
// =============================
async function acerto(id) {
    tocarSom('somAcerto');

    const ganhoXp = xpDobroRodadas > 0 ? 20 : 10;
    xp += ganhoXp;
    if (xpDobroRodadas > 0) xpDobroRodadas--;

    sequenciaAcertos++;
    totalAcertos++;
    melhorSequencia = Math.max(melhorSequencia, sequenciaAcertos);

    // Efeitos visuais de vitória
    confeteExplosao(35);
    criarXPPop(window.innerWidth / 2, window.innerHeight / 3, ganhoXp);
    pulseElemento('xp');
    pulseElemento('nivel');

    if (sequenciaAcertos > 0 && sequenciaAcertos % 10 === 0) {
        moedas += 1;
        criarMoedaCaindo(window.innerWidth * 0.8, 80);
        toast('🔥 10 acertos seguidos! Você ganhou 1 moeda.');
    }

    if (xp >= nivel * 100) {
        nivel++;
        moedas += 2;
        vidas = Math.min(vidas + 1, 5);
        confeteExplosao(50);
        toast('⭐ SUBIU DE NÍVEL! +2 moedas e +1 vida.');
    }

    verificarConquistas();
    verificarMissoes();
    mostrarAcerto(id, ganhoXp);
    salvarRanking();
    salvarProgresso();
    atualizarUI();

    try {
        await salvarProgressoOnline(xp, nivel);
    } catch (erro) {
        console.warn('Não foi possível salvar online:', erro);
    }

    setTimeout(() => {
        const aba = document.querySelector('.aba.ativa');
        if (!aba) return;
        if (aba.id === 'montar') novaPalavraMontar();
        if (aba.id === 'ingles' || aba.id === 'portugues') novaPalavra();
    }, 700);
}

function erro(id, correta) {
    tocarSom('somErro');

    vibracao(id);

    if (escudos > 0) {
        escudos--;
        toast('🛡️ O escudo protegeu você de perder uma vida.');
    } else {
        vidas--;
        criarMoedaCaindo(window.innerWidth * 0.2, 80);
    }

    sequenciaAcertos = 0;
    totalErros++;

    if (vidas <= 0) {
        vidas = 3;
        sequenciaAcertos = 0;
        toast('❤️ Suas vidas foram recarregadas. Continue tentando!');
    }

    mostrarErro(id, correta);
    salvarProgresso();
    atualizarUI();
}

function mostrarAcerto(id, ganhoXp = 10) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `😊 ✅ Muito bem! +${ganhoXp} XP`;
    el.className = 'feedback sucesso';
}

function mostrarErro(id, correta) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `😢 ❌ Era: <b>${correta}</b>`;
    el.className = 'feedback erro-msg';
}

// =============================
// 🇧🇷 / 🌎 VERIFICAÇÕES
// =============================
function verificarPT() {
    if (!atual) novaPalavra();
    const resposta = document.getElementById('resposta');
    const r = normalizar(resposta?.value);
    const c = normalizar(atual.w);
    r === c ? acerto('feedback') : erro('feedback', atual.w);
}

function verificarEN() {
    if (!atual) novaPalavra();
    const respostaEN = document.getElementById('respostaEN');
    const r = normalizar(respostaEN?.value);
    const c = normalizar(atual.en);
    r === c ? acerto('feedbackEN') : erro('feedbackEN', atual.en);
}

// =============================
// ✍️ MONTAR PALAVRA
// =============================
function novaPalavraMontar() {
    const item = sortearPalavra();
    palavraMontar = item.w;
    const emojiMontar = document.getElementById('emojiMontar');
    if (emojiMontar) emojiMontar.innerText = item.img;
    limpar(true);
    gerarEspacosResposta(palavraMontar);
    gerarLetras(palavraMontar);
}

function embaralharLetras(palavra) {
    const letras = palavra.split('');
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    if (letras.join('') === palavra && letras.length > 1) {
        [letras[0], letras[1]] = [letras[1], letras[0]];
    }
    return letras;
}

function gerarEspacosResposta(palavra) {
    const respostaMontada = document.getElementById('respostaMontada');
    if (!respostaMontada) return;

    respostaSlots = Array(palavra.length).fill(null);
    respostaUsuario = '';
    respostaMontada.innerHTML = '';
    respostaMontada.classList.remove('drop-ativo');
    respostaMontada.setAttribute('aria-label', 'Espaços para montar a palavra');

    palavra.split('').forEach((_, index) => {
        const slot = document.createElement('button');
        slot.type = 'button';
        slot.className = 'slot-letra';
        slot.dataset.index = String(index);
        slot.setAttribute('aria-label', `Espaço ${index + 1} da palavra`);
        slot.innerText = '';

        slot.addEventListener('dragover', dragoverArea);
        slot.addEventListener('dragleave', dragleaveArea);
        slot.addEventListener('drop', dropLetra);
        slot.addEventListener('click', () => removerLetraDoEspaco(index));

        respostaMontada.appendChild(slot);
    });
}

function gerarLetras(palavra) {
    const container = document.getElementById('letras');
    if (!container) return;
    container.innerHTML = '';

    embaralharLetras(palavra).forEach((letra, index) => {
        const btn = document.createElement('button');
        btn.innerText = letra;
        btn.className = 'letra';
        btn.type = 'button';
        btn.draggable = true;
        btn.dataset.letra = letra;
        btn.dataset.id = `letra-${Date.now()}-${index}`;
        btn.setAttribute('aria-label', `Arrastar letra ${letra}`);

        btn.addEventListener('click', () => adicionarLetraNoProximoEspaco(btn));

        btn.addEventListener('dragstart', (event) => {
            if (btn.disabled) return;
            letraArrastadaId = btn.dataset.id;
            event.dataTransfer.setData('text/plain', btn.dataset.id);
            event.dataTransfer.effectAllowed = 'move';
            btn.classList.add('arrastando');
        });

        btn.addEventListener('dragend', () => {
            btn.classList.remove('arrastando');
        });

        container.appendChild(btn);
    });
}

function atualizarRespostaMontada() {
    respostaUsuario = respostaSlots.map(item => item?.letra || '').join('');
    document.querySelectorAll('.slot-letra').forEach(slot => {
        const index = Number(slot.dataset.index);
        const item = respostaSlots[index];
        slot.innerText = item?.letra || '';
        slot.classList.toggle('preenchido', Boolean(item));
    });
}

function primeiroEspacoLivre() {
    return respostaSlots.findIndex(item => !item);
}

function adicionarLetraNoProximoEspaco(btn) {
    const index = primeiroEspacoLivre();
    if (index === -1) {
        toast('A palavra já está completa. Toque em um espaço para remover uma letra.');
        return;
    }
    adicionarLetraNoEspaco(btn, index);
}

function adicionarLetraNoEspaco(btn, index) {
    if (!btn || btn.disabled || index < 0 || index >= respostaSlots.length) return;

    if (respostaSlots[index]) {
        removerLetraDoEspaco(index);
    }

    respostaSlots[index] = {
        letra: btn.dataset.letra || btn.innerText,
        id: btn.dataset.id
    };

    btn.disabled = true;
    btn.classList.remove('arrastando');
    atualizarRespostaMontada();
}

function dragoverArea(event) {
    event.preventDefault();
    const slot = event.currentTarget?.classList?.contains('slot-letra')
        ? event.currentTarget
        : event.target?.closest?.('.slot-letra');
    const respostaMontada = document.getElementById('respostaMontada');
    if (respostaMontada) respostaMontada.classList.add('drop-ativo');
    if (slot) slot.classList.add('slot-ativo');
}

function dragleaveArea(event) {
    event.preventDefault();
    const slot = event.currentTarget?.classList?.contains('slot-letra')
        ? event.currentTarget
        : event.target?.closest?.('.slot-letra');
    const respostaMontada = document.getElementById('respostaMontada');
    if (respostaMontada) respostaMontada.classList.remove('drop-ativo');
    if (slot) slot.classList.remove('slot-ativo');
}

function dropLetra(event) {
    event.preventDefault();
    const respostaMontada = document.getElementById('respostaMontada');
    if (respostaMontada) respostaMontada.classList.remove('drop-ativo');

    const slot = event.currentTarget?.classList?.contains('slot-letra')
        ? event.currentTarget
        : event.target?.closest?.('.slot-letra');

    document.querySelectorAll('.slot-letra').forEach(item => item.classList.remove('slot-ativo'));

    if (!slot) return;
    const index = Number(slot.dataset.index);
    const id = event.dataTransfer.getData('text/plain') || letraArrastadaId;
    const btn = document.querySelector(`[data-id="${id}"]`);
    adicionarLetraNoEspaco(btn, index);
}

function removerLetraDoEspaco(index) {
    const item = respostaSlots[index];
    if (!item) return;

    const btn = document.querySelector(`[data-id="${item.id}"]`);
    if (btn) btn.disabled = false;

    respostaSlots[index] = null;
    atualizarRespostaMontada();
}

function desfazerLetra() {
    for (let i = respostaSlots.length - 1; i >= 0; i--) {
        if (respostaSlots[i]) {
            removerLetraDoEspaco(i);
            return;
        }
    }
}

function limpar(apenasMontagem = false) {
    respostaUsuario = '';
    respostaSlots = Array(palavraMontar.length || 0).fill(null);
    const respostaMontada = document.getElementById('respostaMontada');
    const feedbackMontar = document.getElementById('feedbackMontar');

    if (respostaMontada) {
        respostaMontada.classList.remove('drop-ativo');
        if (!apenasMontagem && respostaMontada.querySelector('.slot-letra')) {
            respostaMontada.querySelectorAll('.slot-letra').forEach(slot => {
                slot.innerText = '';
                slot.classList.remove('preenchido', 'slot-ativo');
            });
        } else if (!respostaMontada.querySelector('.slot-letra')) {
            respostaMontada.innerHTML = '';
        }
    }

    if (feedbackMontar) feedbackMontar.innerHTML = '';
    document.querySelectorAll('.letra').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('arrastando');
    });
    atualizarRespostaMontada();
}

function verificarMontagem() {
    if (respostaSlots.some(item => !item)) {
        erro('feedbackMontar', palavraMontar);
        toast('Arraste todas as letras para os espaços antes de verificar.');
        return;
    }

    respostaUsuario = respostaSlots.map(item => item?.letra || '').join('');
    respostaUsuario === palavraMontar ? acerto('feedbackMontar') : erro('feedbackMontar', palavraMontar);
}

// =============================
// 🛒 LOJA / INVENTÁRIO
// =============================
function filtrarLoja(tipo) {
    filtroLojaAtual = tipo;
    renderLoja();
}

function comprarItem(id) {
    const item = itemPorId(id);
    if (!item) return;

    if (item.id === 'poder_vida') {
        if (moedas < item.custo) return toast('🪙 Moedas insuficientes.');
        moedas -= item.custo;
        vidas = Math.min(vidas + 1, 5);
        toast('❤️ Vida comprada!');
        salvarProgresso();
        atualizarUI();
        return;
    }

    if (item.id === 'poder_escudo') {
        if (moedas < item.custo) return toast('🪙 Moedas insuficientes.');
        moedas -= item.custo;
        escudos++;
        toast('🛡️ Escudo comprado!');
        salvarProgresso();
        atualizarUI();
        return;
    }

    if (item.id === 'poder_xp2') {
        if (moedas < item.custo) return toast('🪙 Moedas insuficientes.');
        moedas -= item.custo;
        xpDobroRodadas += 5;
        toast('🔥 Dobro de XP ativo por 5 acertos!');
        salvarProgresso();
        atualizarUI();
        return;
    }

    if (inventario.includes(id)) {
        equiparItem(id);
        return;
    }

    if (moedas < item.custo) return toast(`🪙 Você precisa de ${item.custo} moedas.`);

    moedas -= item.custo;
    inventario.push(id);
    equiparItem(id, false);
    verificarConquistas();
    salvarProgresso();
    atualizarUI();
    toast(`🎉 ${item.nome} comprado e equipado!`);
}

function equiparItem(id, mostrar = true) {
    const item = itemPorId(id);
    if (!item) return;
    if (!inventario.includes(id) && !item.consumivel) return toast('🔒 Item bloqueado. Compre na loja.');

    if (['base', 'pele', 'cabelo', 'roupa', 'acessorio', 'companheiro', 'tema'].includes(item.tipo)) {
        avatar[item.tipo] = id;
    }

    avatarJogador = renderAvatar();
    aplicarTema();
    salvarProgresso();
    atualizarUI();
    renderAvatarEditor();
    renderLoja();
    if (mostrar) toast(`✅ ${item.nome} equipado!`);
}

function renderLoja() {
    const lista = document.getElementById('listaLoja');
    if (!lista) return;

    const itens = catalogo.filter(item => filtroLojaAtual === 'todos' || item.tipo === filtroLojaAtual);
    lista.innerHTML = '';

    itens.forEach(item => {
        const comprado = inventario.includes(item.id);
        const equipado = avatar[item.tipo] === item.id;
        const card = document.createElement('div');
        card.className = `item-loja raridade-${item.raridade}`;

        let textoBotao = 'Comprar';
        if (item.consumivel) textoBotao = 'Usar';
        if (comprado && !item.consumivel) textoBotao = equipado ? 'Equipado' : 'Equipar';

        card.innerHTML = `
            <div class="item-emoji">${item.emoji}</div>
            <strong>${item.nome}</strong>
            <small>${item.tipo} • ${item.raridade}</small>
            <p>🪙 ${item.custo}</p>
            <button type="button" ${equipado ? 'disabled' : ''} onclick="comprarItem('${item.id}')">${textoBotao}</button>
        `;
        lista.appendChild(card);
    });
}

// =============================
// 👤 AVATAR EDITOR
// =============================
function renderAvatarEditor() {
    const grupos = {
        base: 'opcoesBase',
        pele: 'opcoesPele',
        cabelo: 'opcoesCabelo',
        roupa: 'opcoesRoupa',
        acessorio: 'opcoesAcessorio',
        companheiro: 'opcoesCompanheiro',
        tema: 'opcoesTema'
    };

    Object.entries(grupos).forEach(([tipo, containerId]) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        catalogo.filter(item => item.tipo === tipo).forEach(item => {
            const bloqueado = !inventario.includes(item.id);
            const ativo = avatar[tipo] === item.id;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = ativo ? 'ativo' : '';
            btn.innerHTML = `${bloqueado ? '🔒' : item.emoji} <span>${item.nome}</span>`;
            btn.onclick = () => bloqueado ? trocarAba('loja') : equiparItem(item.id);
            container.appendChild(btn);
        });
    });

    const avatarCriado = document.getElementById('avatarCriado');
    const descricaoAvatar = document.getElementById('descricaoAvatar');
    if (avatarCriado) avatarCriado.innerText = renderAvatar();
    if (descricaoAvatar) descricaoAvatar.innerText = descricaoAvatarTexto();
}

function salvarVisualAvatar() {
    avatarJogador = renderAvatar();
    localStorage.setItem('avatarJogador', avatarJogador);
    salvarProgresso();
    atualizarUI();
    toast('💾 Visual salvo com sucesso!');
}

// Compatibilidade com versão antiga
function selecionarAvatar(emoji) {
    avatarJogador = emoji;
    localStorage.setItem('avatarJogador', avatarJogador);
    salvarProgresso();
    atualizarUI();
}

// =============================
// 🎯 MISSÕES E CONQUISTAS
// =============================
function missoesDoDia() {
    return [
        { id: 'm_acertos_5', texto: 'Acerte 5 palavras', progresso: Math.min(totalAcertos, 5), alvo: 5, recompensa: 1 },
        { id: 'm_sequencia_10', texto: 'Faça 10 acertos seguidos', progresso: Math.min(melhorSequencia, 10), alvo: 10, recompensa: 2 },
        { id: 'm_nivel_2', texto: 'Chegue ao nível 2', progresso: Math.min(nivel, 2), alvo: 2, recompensa: 1 }
    ];
}

function missoesRecebidas() {
    try { return JSON.parse(localStorage.getItem('missoesRecebidas')) || []; }
    catch { return []; }
}

function salvarMissoesRecebidas(lista) {
    localStorage.setItem('missoesRecebidas', JSON.stringify(lista));
}

function verificarMissoes() {
    const recebidas = missoesRecebidas();
    let mudou = false;

    missoesDoDia().forEach(m => {
        if (m.progresso >= m.alvo && !recebidas.includes(m.id)) {
            moedas += m.recompensa;
            recebidas.push(m.id);
            mudou = true;
            toast(`🎯 Missão concluída! +${m.recompensa} moeda(s).`);
        }
    });

    if (mudou) salvarMissoesRecebidas(recebidas);
}

function renderMissoes() {
    const lista = document.getElementById('listaMissoes');
    if (!lista) return;
    const recebidas = missoesRecebidas();
    lista.innerHTML = '';

    missoesDoDia().forEach(m => {
        const concluida = recebidas.includes(m.id);
        const div = document.createElement('div');
        div.className = 'missao-card';
        div.innerHTML = `
            <div>
                <strong>${concluida ? '✅' : '⬜'} ${m.texto}</strong>
                <small>${m.progresso}/${m.alvo}</small>
            </div>
            <span>🪙 ${m.recompensa}</span>
        `;
        lista.appendChild(div);
    });
}

function verificarConquistas() {
    conquistasCatalogo.forEach(c => {
        if (!conquistas.includes(c.id) && c.regra()) {
            conquistas.push(c.id);
            moedas += 1;
            toast(`🏅 Conquista: ${c.nome}! +1 moeda.`);
        }
    });
}

function renderConquistas() {
    const lista = document.getElementById('listaConquistas');
    if (!lista) return;
    lista.innerHTML = '';

    conquistasCatalogo.forEach(c => {
        const aberta = conquistas.includes(c.id);
        const span = document.createElement('span');
        span.className = aberta ? 'conquista aberta' : 'conquista bloqueada';
        span.title = c.nome;
        span.innerText = aberta ? `${c.emoji} ${c.nome}` : `🔒 ${c.nome}`;
        lista.appendChild(span);
    });
}

// =============================
// 📑 ABAS
// =============================
async function trocarAba(id) {
    document.querySelectorAll('.aba').forEach(aba => aba.classList.remove('ativa'));
    const abaSelecionada = document.getElementById(id);
    if (!abaSelecionada) return console.error('Aba não encontrada:', id);
    abaSelecionada.classList.add('ativa');

    document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('ativo'));
    document.querySelectorAll('.bottom-nav button').forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(`'${id}'`)) btn.classList.add('ativo');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id === 'ranking') {
        try { await mostrarRankingGlobal(); } catch { mostrarRankingLocal(); }
    }
    if (id === 'montar') novaPalavraMontar();
    if (id === 'portugues' || id === 'ingles') novaPalavra();
    if (id === 'perfil') carregarPerfilVisual();
    if (id === 'loja') renderLoja();
    if (id === 'avatar') renderAvatarEditor();
    if (id === 'missoes') renderMissoes();
}

// =============================
// 🎯 UI
// =============================
function setText(id, valor) {
    const el = document.getElementById(id);
    if (el) el.innerText = valor;
}

function atualizarUI() {
    avatarJogador = renderAvatar();
    aplicarTema();

    const xpProximo = nivel * 100;
    const percentualXp = Math.min((xp / xpProximo) * 100, 100);

    setText('xp', xp);
    setText('xpProximo', xpProximo);
    setText('nivel', nivel);
    setText('moedas', moedas);
    setText('vidas', vidas);
    setText('miniAvatar', emojiItem(avatar.base));
    setText('avatarHome', avatarJogador);
    setText('moedasLoja', moedas);
    setText('vidasLoja', vidas);

    ['vidasJogoEN', 'vidasJogoPT', 'vidasJogoMontar', 'statVidas'].forEach(id => setText(id, vidas));
    ['sequenciaEN', 'sequenciaPT', 'sequenciaMontar'].forEach(id => setText(id, sequenciaAcertos));

    setText('statNivel', nivel);
    setText('statXp', xp);
    setText('statMoedas', moedas);
    setText('statSequencia', sequenciaAcertos);
    setText('statRecorde', melhorSequencia);
    setText('statAcertos', totalAcertos);
    setText('statErros', totalErros);

    const barraXp = document.getElementById('barraXp');
    if (barraXp) barraXp.style.width = `${percentualXp}%`;

    const resumoInventario = document.getElementById('resumoInventario');
    if (resumoInventario) {
        resumoInventario.innerHTML = `
            <span>🎒 ${inventario.length} itens</span>
            <span>🛡️ ${escudos} escudo(s)</span>
            <span>🔥 ${xpDobroRodadas} rodada(s) XP duplo</span>
        `;
    }

    renderConquistas();
    renderAvatarEditor();
}

// =============================
// 👤 PERFIL
// =============================
async function salvarPerfil() {
    const campoNome = document.getElementById('nomeJogador');
    const nomeSalvo = document.getElementById('nomeSalvo');
    const perfilResumo = document.getElementById('perfilResumo');

    nomeJogador = campoNome?.value.trim() || 'Jogador';
    avatarJogador = renderAvatar();

    localStorage.setItem('nome', nomeJogador);
    localStorage.setItem('avatarJogador', avatarJogador);

    salvarProgresso();
    salvarRanking();
    atualizarUI();

    if (perfilResumo) perfilResumo.innerText = `${avatarJogador} ${nomeJogador}`;
    if (nomeSalvo) nomeSalvo.innerText = `Perfil salvo: ${avatarJogador} ${nomeJogador}`;

    if (window.salvarPerfilOnline) {
        try { await window.salvarPerfilOnline(nomeJogador, avatarJogador); }
        catch (erro) { console.warn('Não foi possível salvar perfil online:', erro); }
    }
}

function carregarPerfilVisual() {
    const campoNome = document.getElementById('nomeJogador');
    const avatarSelecionado = document.getElementById('avatarSelecionado');
    const perfilResumo = document.getElementById('perfilResumo');

    if (campoNome) campoNome.value = nomeJogador;
    if (avatarSelecionado) avatarSelecionado.innerText = renderAvatar();
    if (perfilResumo) perfilResumo.innerText = `${renderAvatar()} ${nomeJogador || 'Jogador'}`;

    atualizarUI();
}

// =============================
// 🏆 RANKING LOCAL
// =============================
function salvarRanking() {
    if (!nomeJogador) return;
    let ranking = [];
    try { ranking = JSON.parse(localStorage.getItem('ranking')) || []; } catch { ranking = []; }

    const jogador = ranking.find(j => j.nome === nomeJogador);
    if (jogador) {
        jogador.xp = xp;
        jogador.nivel = nivel;
        jogador.avatar = renderAvatar();
    } else {
        ranking.push({ nome: nomeJogador, avatar: renderAvatar(), xp, nivel });
    }

    ranking.sort((a, b) => b.xp - a.xp);
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

function mostrarRankingLocal() {
    const lista = document.getElementById('listaRanking');
    if (!lista) return;
    lista.innerHTML = '';

    let ranking = [];
    try { ranking = JSON.parse(localStorage.getItem('ranking')) || []; } catch { ranking = []; }

    if (ranking.length === 0) {
        lista.innerHTML = '<li>Nenhum jogador no ranking ainda.</li>';
        return;
    }

    ranking.forEach((jogador, index) => {
        const li = document.createElement('li');
        const medalha = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`;
        li.innerHTML = `${medalha} ${jogador.avatar || '🧑‍🚀'} ${jogador.nome} — Nível ${jogador.nivel || 1} • ${jogador.xp} XP`;
        lista.appendChild(li);
    });
}

// =============================
// 🔄 RESET
// =============================
function resetarProgresso() {
    if (!confirm('Tem certeza que deseja resetar seu progresso?')) return;

    localStorage.removeItem('progresso');
    localStorage.removeItem('ranking');
    localStorage.removeItem('nome');
    localStorage.removeItem('avatarJogador');
    localStorage.removeItem('nivelIdade');
    localStorage.removeItem('missoesRecebidas');

    xp = 0;
    nivel = 1;
    vidas = 3;
    moedas = 0;
    sequenciaAcertos = 0;
    melhorSequencia = 0;
    totalAcertos = 0;
    totalErros = 0;
    escudos = 0;
    xpDobroRodadas = 0;
    nomeJogador = '';
    nivelIdade = 'pre';
    palavras = banco.pre;
    inventario = ['base_astronauta', 'pele_1', 'cabelo_curto', 'roupa_casual', 'acessorio_nenhum', 'companheiro_nenhum', 'tema_classico'];
    conquistas = [];
    avatar = {
        base: 'base_astronauta',
        pele: 'pele_1',
        cabelo: 'cabelo_curto',
        roupa: 'roupa_casual',
        acessorio: 'acessorio_nenhum',
        companheiro: 'companheiro_nenhum',
        tema: 'tema_classico'
    };

    salvarProgresso();
    atualizarUI();
    novaPalavra();
    novaPalavraMontar();

    const campoNome = document.getElementById('nomeJogador');
    const nomeSalvo = document.getElementById('nomeSalvo');
    const nivelAtual = document.getElementById('nivelAtual');
    if (campoNome) campoNome.value = '';
    if (nomeSalvo) nomeSalvo.innerText = '';
    if (nivelAtual) nivelAtual.innerText = 'Nível atual: pre';

    trocarAba('inicio');
}

// =============================
// 👥 MULTIPLAYER 2 JOGADORES
// =============================

let modoMultiplayer = false;
let mpJogadorAtual = 1;
let mpScore = { 1: 0, 2: 0 };
let mpPalavraAtual = '';

function iniciarMultiplayer(modo) {
    trocarAba('multiplayer');
}

function iniciarDueloMultiplayer() {
    const nome1 = document.getElementById('nomeJogador1')?.value || 'Jogador 1';
    const nome2 = document.getElementById('nomeJogador2')?.value || 'Jogador 2';

    modoMultiplayer = true;
    mpJogadorAtual = 1;
    mpScore = { 1: 0, 2: 0 };

    document.getElementById('mp1Nome').innerText = nome1;
    document.getElementById('mp2Nome').innerText = nome2;
    document.getElementById('mpResposta').value = '';
    document.getElementById('mpFeedback').innerText = '';

    const setup = document.getElementById('multiplayerSetup');
    const game = document.getElementById('multiplayerGame');
    
    if (setup) setup.style.display = 'none';
    if (game) game.style.display = 'block';

    proximaPalavraMultiplayer();
    atualizarPlaycarMultiplayer();
    toast(`🎮 Duelo iniciado! ${nome1} começa!`);
}

function proximaPalavraMultiplayer() {
    const item = sortearPalavra();
    mpPalavraAtual = item.w;
    
    const emoji = document.getElementById('mpEmoji');
    const turno = document.getElementById('mpTurno');
    const resposta = document.getElementById('mpResposta');

    if (emoji) emoji.innerText = item.img;
    if (turno) turno.innerText = `Turno do Jogador ${mpJogadorAtual}`;
    if (resposta) resposta.value = '';

    document.getElementById('mpFeedback').innerHTML = '';
    document.getElementById('mpFeedback').className = 'feedback';
}

function verificarMultiplayer() {
    const resposta = document.getElementById('mpResposta');
    const r = normalizar(resposta?.value);
    const c = normalizar(mpPalavraAtual);

    const feedbackEl = document.getElementById('mpFeedback');

    if (r === c) {
        mpScore[mpJogadorAtual]++;
        confeteExplosao(20);
        criarXPPop(window.innerWidth / 2, window.innerHeight / 3, 10);
        feedbackEl.innerHTML = '😊 ✅ Correto!';
        feedbackEl.className = 'feedback sucesso';
        tocarSom('somAcerto');
        
        atualizarPlaycarMultiplayer();

        setTimeout(() => {
            mpJogadorAtual = mpJogadorAtual === 1 ? 2 : 1;
            proximaPalavraMultiplayer();
        }, 800);
    } else {
        feedbackEl.innerHTML = `😢 ❌ Era: <b>${mpPalavraAtual}</b>`;
        feedbackEl.className = 'feedback erro-msg';
        vibracao('mpResposta');
        tocarSom('somErro');

        setTimeout(() => {
            mpJogadorAtual = mpJogadorAtual === 1 ? 2 : 1;
            proximaPalavraMultiplayer();
        }, 800);
    }
}

function atualizarPlaycarMultiplayer() {
    const score1 = document.getElementById('mp1Score');
    const score2 = document.getElementById('mp2Score');

    if (score1) score1.innerText = mpScore[1];
    if (score2) score2.innerText = mpScore[2];

    pulseElemento('mp' + mpJogadorAtual + 'Score');
}

function finalizarMultiplayer() {
    modoMultiplayer = false;

    const vencedor = mpScore[1] > mpScore[2] ? 1 : mpScore[2] > mpScore[1] ? 2 : 0;
    
    if (vencedor === 1) {
        confeteExplosao(50);
        toast('👑 Jogador 1 venceu!');
    } else if (vencedor === 2) {
        confeteExplosao(50);
        toast('👑 Jogador 2 venceu!');
    } else {
        toast('🤝 Empate! Muito bom!');
    }

    const setup = document.getElementById('multiplayerSetup');
    const game = document.getElementById('multiplayerGame');
    
    if (setup) setup.style.display = 'flex';
    if (game) game.style.display = 'none';

    trocarAba('jogar');
}

// =============================
// 🎉 EFEITOS VISUAIS ATRAENTES
// =============================

function criarConfete(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const confeteDiv = document.createElement('div');
    confeteDiv.style.position = 'fixed';
    confeteDiv.style.left = x + 'px';
    confeteDiv.style.top = y + 'px';
    confeteDiv.style.width = '10px';
    confeteDiv.style.height = '10px';
    confeteDiv.style.borderRadius = '50%';
    confeteDiv.style.pointerEvents = 'none';
    confeteDiv.style.zIndex = '9999';
    
    const cores = ['#FFD600', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    confeteDiv.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const velocity = 5 + Math.random() * 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 5;
    
    document.body.appendChild(confeteDiv);
    
    let posX = x, posY = y;
    const interval = setInterval(() => {
        posX += vx;
        posY += vy + 0.5;
        confeteDiv.style.left = posX + 'px';
        confeteDiv.style.top = posY + 'px';
        confeteDiv.style.opacity = Math.max(0, 1 - (posY - y) / 100);
        
        if (posY > window.innerHeight) {
            clearInterval(interval);
            confeteDiv.remove();
        }
    }, 20);
}

function confeteExplosao(quantidade = 30) {
    for (let i = 0; i < quantidade; i++) {
        setTimeout(() => {
            criarConfete(window.innerWidth / 2, window.innerHeight / 2.5);
        }, i * 20);
    }
}

function criarMoedaCaindo(x, y) {
    const moedaDiv = document.createElement('div');
    moedaDiv.innerHTML = '🪙';
    moedaDiv.style.position = 'fixed';
    moedaDiv.style.left = x + 'px';
    moedaDiv.style.top = y + 'px';
    moedaDiv.style.fontSize = '2rem';
    moedaDiv.style.pointerEvents = 'none';
    moedaDiv.style.zIndex = '9998';
    
    document.body.appendChild(moedaDiv);
    
    moedaDiv.animate([
        { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' },
        { opacity: 0, transform: 'translateY(100px) scale(0.3) rotate(360deg)' }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    setTimeout(() => moedaDiv.remove(), 1000);
}

function criarXPPop(x, y, valor) {
    const popDiv = document.createElement('div');
    popDiv.innerHTML = `+${valor} XP`;
    popDiv.style.position = 'fixed';
    popDiv.style.left = x + 'px';
    popDiv.style.top = y + 'px';
    popDiv.style.color = '#FFD600';
    popDiv.style.fontWeight = '900';
    popDiv.style.fontSize = '1.2rem';
    popDiv.style.pointerEvents = 'none';
    popDiv.style.zIndex = '9999';
    popDiv.style.textShadow = '0 2px 10px rgba(0,0,0,0.3)';
    
    document.body.appendChild(popDiv);
    
    popDiv.animate([
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: 'translateY(-60px) scale(1.5)' }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
    
    setTimeout(() => popDiv.remove(), 800);
}

function pulseElemento(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.style.animation = 'none';
    setTimeout(() => {
        el.style.animation = 'pulse 0.4s ease-out';
    }, 10);
}

function vibracao(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.add('erro-vibra');
    setTimeout(() => el.classList.remove('erro-vibra'), 300);
}

function efetoVitoria() {
    confeteExplosao(40);
    toast('🎉 Parabéns! Acertou!');
}

function efetoDerrota() {
    vibracao('feedback');
    toast('❌ Errou desta vez. Tente novamente!');
}

// =============================
// 🌍 FUNÇÕES GLOBAIS PARA O HTML
// =============================
window.trocarAba = trocarAba;
window.dragoverArea = dragoverArea;
window.dragleaveArea = dragleaveArea;
window.dropLetra = dropLetra;
window.adicionarLetraNoProximoEspaco = adicionarLetraNoProximoEspaco;
window.desfazerLetra = desfazerLetra;
window.verificarPT = verificarPT;
window.verificarEN = verificarEN;
window.verificarMontagem = verificarMontagem;
window.limpar = limpar;
window.selecionarNivel = selecionarNivel;
window.resetarProgresso = resetarProgresso;
window.selecionarAvatar = selecionarAvatar;
window.salvarPerfil = salvarPerfil;
window.filtrarLoja = filtrarLoja;
window.comprarItem = comprarItem;
window.equiparItem = equiparItem;
window.salvarVisualAvatar = salvarVisualAvatar;
window.iniciarMultiplayer = iniciarMultiplayer;
window.iniciarDueloMultiplayer = iniciarDueloMultiplayer;
window.verificarMultiplayer = verificarMultiplayer;
window.finalizarMultiplayer = finalizarMultiplayer;

// =============================
// 🚀 INICIAR
// =============================
document.addEventListener('DOMContentLoaded', () => {
    carregarProgresso();
    atualizarUI();
    novaPalavra();
    novaPalavraMontar();
    renderLoja();
    renderAvatarEditor();
    renderMissoes();

    const nivelAtual = document.getElementById('nivelAtual');
    if (nivelAtual) nivelAtual.innerText = `Nível atual: ${nivelIdade}`;

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const aba = document.querySelector('.aba.ativa');
        if (aba?.id === 'portugues') verificarPT();
        if (aba?.id === 'ingles') verificarEN();
    });

    trocarAba('inicio');
});
