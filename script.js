// =============================
// 🔥 FIREBASE CONFIG
// =============================
// Substitua com suas credenciais do Firebase Console
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

let firebaseInitialized = false;

try {
    if (typeof firebase !== "undefined") {
        firebase.initializeApp(firebaseConfig);
        firebaseInitialized = true;
    }
} catch (e) {
    console.warn("Firebase nao inicializado:", e.message);
}

// =============================
// 🔑 LOGIN GOOGLE
// =============================
function loginGoogle() {
    if (!firebaseInitialized) {
        mostrarErroLogin(
            "Firebase não configurado. " +
            "Abra o arquivo LEIA_LOGIN_GOOGLE_FIREBASE.txt " +
            "e siga as instruções para configurar."
        );
        return;
    }

    if (firebaseConfig.apiKey === "SUA_API_KEY") {
        mostrarErroLogin(
            "Configure suas credenciais do Firebase em script.js. " +
            "Veja o arquivo LEIA_LOGIN_GOOGLE_FIREBASE.txt para instruções."
        );
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            nomeJogador = user.displayName || "Jogador";
            document.getElementById("nomeJogador").value = nomeJogador;
            localStorage.setItem("nome", nomeJogador);
            salvarProgresso();

            document.getElementById("btnGoogle").style.display = "none";
            document.getElementById("userInfo").textContent =
                "Olá, " + user.displayName + "!";
        })
        .catch((error) => {
            let msg = "";
            switch (error.code) {
                case "auth/popup-closed-by-user":
                    msg = "Login cancelado.";
                    break;
                case "auth/unauthorized-domain":
                    msg = "Domínio não autorizado no Firebase. " +
                          "Adicione este domínio em Authentication > Settings.";
                    break;
                case "auth/operation-not-allowed":
                    msg = "Login com Google não está habilitado. " +
                          "Ative em Firebase Console > Authentication > Sign-in method.";
                    break;
                default:
                    if (error.message && error.message.indexOf("SHA") !== -1) {
                        msg = "Erro no login Google: configuração SHA-1/SHA-256 do Firebase " +
                              "não confere com este APK.\n\n" +
                              "Abra o arquivo LEIA_LOGIN_GOOGLE_FIREBASE.txt do projeto " +
                              "e cadastre a chave no Firebase Console.";
                    } else {
                        msg = "Erro no login: " + error.message;
                    }
            }
            mostrarErroLogin(msg);
        });
}

function mostrarErroLogin(mensagem) {
    const overlay = document.createElement("div");
    overlay.style.cssText =
        "position:fixed;top:0;left:0;right:0;bottom:0;" +
        "background:rgba(0,0,0,0.7);display:flex;" +
        "align-items:center;justify-content:center;z-index:9999;padding:20px;";

    const box = document.createElement("div");
    box.style.cssText =
        "background:#2a2a3a;padding:25px;border-radius:15px;" +
        "max-width:350px;width:100%;text-align:left;color:white;" +
        "font-size:14px;line-height:1.6;";
    box.textContent = mensagem;

    const btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    btnOk.style.cssText =
        "display:block;margin:15px auto 0;padding:10px 30px;" +
        "background:#00c6ff;color:white;border:none;border-radius:10px;" +
        "cursor:pointer;font-size:14px;";
    btnOk.onclick = () => document.body.removeChild(overlay);

    box.appendChild(btnOk);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

// =============================
// 🧠 PALAVRAS POR NÍVEL
// =============================
const banco = {
    pre: [
        { w: "GATO", en: "CAT", img: "🐱" },
        { w: "BOLA", en: "BALL", img: "⚽" },
        { w: "CASA", en: "HOUSE", img: "🏠" }
    ],
    facil: [
        { w: "PATO", en: "DUCK", img: "🦆" },
        { w: "PEIXE", en: "FISH", img: "🐟" },
        { w: "FLOR", en: "FLOWER", img: "🌸" }
    ],
    medio: [
        { w: "MACACO", en: "MONKEY", img: "🐵" },
        { w: "CAVALO", en: "HORSE", img: "🐴" },
        { w: "ESCOLA", en: "SCHOOL", img: "🏫" }
    ],
    dificil: [
        { w: "ELEFANTE", en: "ELEPHANT", img: "🐘" },
        { w: "COMPUTADOR", en: "COMPUTER", img: "💻" },
        { w: "TARTARUGA", en: "TURTLE", img: "🐢" }
    ]
};

let nivelIdade = localStorage.getItem("nivelIdade") || "pre";
let palavras = banco[nivelIdade];

// =============================
// 🎮 VARIÁVEIS
// =============================
let atual;
let xp = 0;
let nivel = 1;
let vidas = 3;

let nomeJogador = localStorage.getItem("nome") || "";

// =============================
// 💾 PROGRESSO
// =============================
function salvarProgresso() {
    const dados = {
        nome: nomeJogador,
        xp,
        nivel,
        vidas,
        nivelIdade
    };
    localStorage.setItem("progresso", JSON.stringify(dados));
}

function carregarProgresso() {
    const dados = JSON.parse(localStorage.getItem("progresso"));

    if (dados) {
        nomeJogador = dados.nome || "";
        xp = dados.xp || 0;
        nivel = dados.nivel || 1;
        vidas = dados.vidas || 3;
        nivelIdade = dados.nivelIdade || "pre";
        palavras = banco[nivelIdade];
    }
}

// =============================
// 🎯 TROCAR NÍVEL
// =============================
function mudarDificuldade(n) {
    nivelIdade = n;
    palavras = banco[n];

    localStorage.setItem("nivelIdade", n);

    alert("Nível selecionado: " + n);

    novaPalavra();
    novaPalavraMontar();
}

// =============================
// 🔄 RESETAR
// =============================
function resetarProgresso() {
    if (!confirm("Tem certeza que deseja resetar todo o progresso?")) return;
    xp = 0;
    nivel = 1;
    vidas = 3;
    nomeJogador = "";
    nivelIdade = "pre";
    palavras = banco["pre"];
    localStorage.clear();
    salvarProgresso();
    atualizarUI();
    alert("Progresso resetado!");
}

// =============================
// 🔧 UTIL
// =============================
function normalizar(t) {
    return t.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// =============================
// 🔄 NOVA PALAVRA
// =============================
function novaPalavra() {
    atual = palavras[Math.floor(Math.random() * palavras.length)];

    document.getElementById("emoji").innerText = atual.img;
    document.getElementById("emojiEN").innerText = atual.img;
    document.getElementById("palavraEN").innerText = atual.en;

    document.getElementById("resposta").value = "";
    document.getElementById("respostaEN").value = "";
}

// =============================
// 🇧🇷 PORTUGUÊS
// =============================
function verificarPT() {
    const r = normalizar(document.getElementById("resposta").value);
    const c = normalizar(atual.w);

    r === c ? acerto("feedback") : erro("feedback", atual.w);
}

// =============================
// 🌎 INGLÊS
// =============================
function verificarEN() {
    const r = normalizar(document.getElementById("respostaEN").value);
    const c = normalizar(atual.w);

    r === c ? acerto("feedbackEN") : erro("feedbackEN", atual.w);
}

// =============================
// ✅ ACERTO
// =============================
function acerto(id) {
    document.getElementById("somAcerto").play();

    xp += 10;

    if (xp >= nivel * 100) {
        nivel++;
        alert("⭐ Subiu de nível!");
    }

    mostrarAcerto(id);
    salvarRanking();
    salvarProgresso();
    atualizarUI();

    setTimeout(() => {
        const aba = document.querySelector(".aba.ativa")?.id;

        if (aba === "montar") {
            novaPalavraMontar();
        } else {
            novaPalavra();
        }
    }, 800);
}

// =============================
// ❌ ERRO
// =============================
function erro(id, correta) {
    document.getElementById("somErro").play();

    vidas--;

    if (vidas <= 0) {
        alert("💀 Game Over");
        xp = 0;
        nivel = 1;
        vidas = 3;
    }

    mostrarErro(id, correta);
    salvarProgresso();
    atualizarUI();
}

// =============================
// 🎯 UI
// =============================
function atualizarUI() {
    document.getElementById("xp").innerText = xp;
    document.getElementById("nivel").innerText = nivel;
    document.getElementById("vidas").innerText = vidas;
}

// =============================
// 📑 ABAS
// =============================
function trocarAba(id) {
    document.querySelectorAll(".aba").forEach(a => a.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");

    if (id === "ranking") mostrarRanking();
    if (id === "montar") novaPalavraMontar();
    if (id === "portugues" || id === "ingles") novaPalavra();
}

// =============================
// 💬 FEEDBACK
// =============================
function mostrarAcerto(id) {
    const el = document.getElementById(id);
    el.innerHTML = "😊 ✅ Muito bem!";
    el.style.color = "#00ff88";
    animarCard(true);
}

function mostrarErro(id, correta) {
    const el = document.getElementById(id);
    el.innerHTML = `😢 ❌ Era: <b>${correta}</b>`;
    el.style.color = "#ff4d4d";
    animarCard(false);
}

// =============================
// ✨ ANIMAÇÃO
// =============================
function animarCard(acerto) {
    const card = document.querySelector(".card");
    if (!card) return;

    card.classList.remove("acerto", "erro");
    void card.offsetWidth;
    card.classList.add(acerto ? "acerto" : "erro");
}

// =============================
// ✍️ MONTAR PALAVRA
// =============================
let palavraMontar = "";
let respostaUsuario = "";

function novaPalavraMontar() {
    const item = palavras[Math.floor(Math.random() * palavras.length)];
    palavraMontar = item.w;

    document.getElementById("emojiMontar").innerText = item.img;

    gerarLetras(palavraMontar);
    limpar();
}

function gerarLetras(palavra) {
    const container = document.getElementById("letras");
    container.innerHTML = "";

    let letras = palavra.split("");

    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }

    letras.forEach(letra => {
        const btn = document.createElement("button");
        btn.innerText = letra;
        btn.className = "letra";
        btn.onclick = () => selecionarLetra(letra);
        container.appendChild(btn);
    });
}

function selecionarLetra(letra) {
    respostaUsuario += letra;
    document.getElementById("respostaMontada").innerText = respostaUsuario;
}

function limpar() {
    respostaUsuario = "";
    document.getElementById("respostaMontada").innerText = "";
}

function verificarMontagem() {
    if (respostaUsuario === palavraMontar) {
        mostrarAcerto("feedbackMontar");
        salvarProgresso();
        setTimeout(novaPalavraMontar, 800);
    } else {
        mostrarErro("feedbackMontar", palavraMontar);
    }
}

// =============================
// 🏆 RANKING
// =============================
function salvarNome() {
    nomeJogador = document.getElementById("nomeJogador").value;
    localStorage.setItem("nome", nomeJogador);
    salvarProgresso();
}

function salvarRanking() {
    if (!nomeJogador) return;

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    const jogador = ranking.find(j => j.nome === nomeJogador);

    if (jogador) jogador.xp = xp;
    else ranking.push({ nome: nomeJogador, xp });

    ranking.sort((a, b) => b.xp - a.xp);

    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function mostrarRanking() {
    const lista = document.getElementById("listaRanking");
    lista.innerHTML = "";

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.forEach(j => {
        const li = document.createElement("li");
        li.innerText = `${j.nome} - ${j.xp} XP`;
        lista.appendChild(li);
    });
}

// =============================
// 🚀 INICIAR
// =============================
window.onload = () => {
    carregarProgresso();
    atualizarUI();
    novaPalavra();
};
