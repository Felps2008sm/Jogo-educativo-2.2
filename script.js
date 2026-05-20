// =============================
// FIREBASE CONFIG
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
// GOOGLE LOGIN
// =============================
function loginGoogle() {
    if (!firebaseInitialized) {
        mostrarErroLogin(
            "Firebase nao configurado. " +
            "Abra o arquivo LEIA_LOGIN_GOOGLE_FIREBASE.txt " +
            "e siga as instrucoes para configurar."
        );
        return;
    }

    if (firebaseConfig.apiKey === "SUA_API_KEY") {
        mostrarErroLogin(
            "Configure suas credenciais do Firebase em script.js. " +
            "Veja o arquivo LEIA_LOGIN_GOOGLE_FIREBASE.txt para instrucoes."
        );
        return;
    }

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            var user = result.user;
            nomeJogador = user.displayName || "Jogador";
            document.getElementById("nomeJogador").value = nomeJogador;
            salvarNome();

            document.getElementById("btnGoogle").style.display = "none";
            document.getElementById("userInfo").textContent =
                "Ola, " + user.displayName + "!";
        })
        .catch(function(error) {
            var msg = "";
            switch (error.code) {
                case "auth/popup-closed-by-user":
                    msg = "Login cancelado.";
                    break;
                case "auth/unauthorized-domain":
                    msg = "Dominio nao autorizado no Firebase. " +
                          "Adicione este dominio em Authentication > Settings.";
                    break;
                case "auth/operation-not-allowed":
                    msg = "Login com Google nao esta habilitado. " +
                          "Ative em Firebase Console > Authentication > Sign-in method.";
                    break;
                default:
                    if (error.message &&
                        error.message.indexOf("SHA") !== -1) {
                        msg = "Erro no login Google: " +
                              "configuracao SHA-1/SHA-256 do Firebase " +
                              "nao confere com este APK.\n\n" +
                              "Abra o arquivo " +
                              "LEIA_LOGIN_GOOGLE_FIREBASE.txt do projeto " +
                              "e cadastre a chave no Firebase Console.";
                    } else {
                        msg = "Erro no login: " + error.message;
                    }
            }
            mostrarErroLogin(msg);
        });
}

function mostrarErroLogin(mensagem) {
    var overlay = document.createElement("div");
    overlay.style.cssText =
        "position:fixed;top:0;left:0;right:0;bottom:0;" +
        "background:rgba(0,0,0,0.7);display:flex;" +
        "align-items:center;justify-content:center;z-index:9999;padding:20px;";

    var box = document.createElement("div");
    box.style.cssText =
        "background:#2a2a3a;padding:25px;border-radius:15px;" +
        "max-width:350px;width:100%;text-align:left;color:white;" +
        "font-size:14px;line-height:1.6;";
    box.textContent = mensagem;

    var btnOk = document.createElement("button");
    btnOk.textContent = "OK";
    btnOk.style.cssText =
        "display:block;margin:15px auto 0;padding:10px 30px;" +
        "background:#00c6ff;color:white;border:none;border-radius:10px;" +
        "cursor:pointer;font-size:14px;";
    btnOk.onclick = function() { document.body.removeChild(overlay); };

    box.appendChild(btnOk);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

// =============================
// PALAVRAS POR NIVEL
// =============================
var banco = {
    pre: [
        { w: "GATO", en: "CAT", img: "\u{1F431}" },
        { w: "BOLA", en: "BALL", img: "\u26BD" },
        { w: "CASA", en: "HOUSE", img: "\u{1F3E0}" },
        { w: "SOL", en: "SUN", img: "\u2600\uFE0F" },
        { w: "LUA", en: "MOON", img: "\u{1F319}" }
    ],
    facil: [
        { w: "PATO", en: "DUCK", img: "\u{1F986}" },
        { w: "PEIXE", en: "FISH", img: "\u{1F41F}" },
        { w: "FLOR", en: "FLOWER", img: "\u{1F338}" },
        { w: "RATO", en: "MOUSE", img: "\u{1F401}" },
        { w: "LEAO", en: "LION", img: "\u{1F981}" }
    ],
    medio: [
        { w: "MACACO", en: "MONKEY", img: "\u{1F435}" },
        { w: "CAVALO", en: "HORSE", img: "\u{1F434}" },
        { w: "ESCOLA", en: "SCHOOL", img: "\u{1F3EB}" },
        { w: "MUSICA", en: "MUSIC", img: "\u{1F3B5}" },
        { w: "LIVRO", en: "BOOK", img: "\u{1F4D6}" }
    ],
    dificil: [
        { w: "ELEFANTE", en: "ELEPHANT", img: "\u{1F418}" },
        { w: "COMPUTADOR", en: "COMPUTER", img: "\u{1F4BB}" },
        { w: "TARTARUGA", en: "TURTLE", img: "\u{1F422}" },
        { w: "BORBOLETA", en: "BUTTERFLY", img: "\u{1F98B}" },
        { w: "DINOSSAURO", en: "DINOSAUR", img: "\u{1F995}" }
    ]
};

var nivelIdade = localStorage.getItem("nivelIdade") || "pre";
var palavras = banco[nivelIdade];

// =============================
// VARIAVEIS
// =============================
var atual;
var xp = parseInt(localStorage.getItem("xp")) || 0;
var nivel = parseInt(localStorage.getItem("nivel")) || 1;
var vidas = parseInt(localStorage.getItem("vidas")) || 3;
var moedas = parseInt(localStorage.getItem("moedas")) || 0;
var nomeJogador = localStorage.getItem("nome") || "";
var avatarAtual = localStorage.getItem("avatar") || "\u{1F9D1}";
var itensComprados = JSON.parse(localStorage.getItem("itensComprados") || "[]");

// =============================
// LOJA
// =============================
var itensLoja = [
    { id: "vida_extra", nome: "Vida Extra", emoji: "\u2764\uFE0F", preco: 50, tipo: "consumivel" },
    { id: "escudo", nome: "Escudo", emoji: "\u{1F6E1}\uFE0F", preco: 80, tipo: "consumivel" },
    { id: "dica", nome: "Dica", emoji: "\u{1F4A1}", preco: 30, tipo: "consumivel" },
    { id: "tema_neon", nome: "Tema Neon", emoji: "\u{1F308}", preco: 100, tipo: "cosmetico" },
    { id: "coroa", nome: "Coroa", emoji: "\u{1F451}", preco: 150, tipo: "cosmetico" },
    { id: "estrela", nome: "Estrela VIP", emoji: "\u{1F31F}", preco: 200, tipo: "cosmetico" }
];

// AVATARES
var listaAvatares = [
    "\u{1F9D1}", "\u{1F466}", "\u{1F467}", "\u{1F468}", "\u{1F469}",
    "\u{1F474}", "\u{1F475}", "\u{1F477}", "\u{1F478}", "\u{1F9D9}",
    "\u{1F9DA}", "\u{1F9DB}", "\u{1F9DC}", "\u{1F9DD}", "\u{1F916}",
    "\u{1F47D}"
];

// =============================
// PROGRESSO
// =============================
function salvarProgresso() {
    localStorage.setItem("xp", xp);
    localStorage.setItem("nivel", nivel);
    localStorage.setItem("vidas", vidas);
    localStorage.setItem("moedas", moedas);
    localStorage.setItem("nivelIdade", nivelIdade);
    localStorage.setItem("avatar", avatarAtual);
    localStorage.setItem("itensComprados", JSON.stringify(itensComprados));
}

function resetarProgresso() {
    if (!confirm("Tem certeza que deseja resetar todo o progresso?")) return;
    xp = 0;
    nivel = 1;
    vidas = 3;
    moedas = 0;
    itensComprados = [];
    avatarAtual = "\u{1F9D1}";
    localStorage.clear();
    salvarProgresso();
    atualizarUI();
    alert("Progresso resetado!");
}

// =============================
// TROCAR NIVEL
// =============================
function mudarDificuldade(n) {
    nivelIdade = n;
    palavras = banco[n];
    localStorage.setItem("nivelIdade", n);
    atualizarBotoesNivel();
    novaPalavra();
    novaPalavraMontar();
}

function atualizarBotoesNivel() {
    var btns = document.querySelectorAll(".nivel-btn");
    var niveis = ["pre", "facil", "medio", "dificil"];
    btns.forEach(function(btn, i) {
        btn.classList.toggle("ativo", niveis[i] === nivelIdade);
    });
    var nomes = { pre: "Pre", facil: "Facil", medio: "Medio", dificil: "Dificil" };
    document.getElementById("nivelAtual").textContent =
        "Nivel atual: " + (nomes[nivelIdade] || nivelIdade);
}

// =============================
// UTIL
// =============================
function normalizar(t) {
    return t.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// =============================
// NOVA PALAVRA
// =============================
function novaPalavra() {
    atual = palavras[Math.floor(Math.random() * palavras.length)];
    document.getElementById("emoji").textContent = atual.img;
    document.getElementById("emojiEN").textContent = atual.img;
    document.getElementById("palavraEN").textContent = atual.en;
    document.getElementById("resposta").value = "";
    document.getElementById("respostaEN").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedbackEN").textContent = "";
}

// =============================
// PORTUGUES
// =============================
function verificarPT() {
    var r = normalizar(document.getElementById("resposta").value.trim());
    var c = normalizar(atual.w);
    if (!r) return;
    r === c ? acerto("feedback") : erro("feedback", atual.w);
}

// =============================
// INGLES
// =============================
function verificarEN() {
    var r = normalizar(document.getElementById("respostaEN").value.trim());
    var c = normalizar(atual.w);
    if (!r) return;
    r === c ? acerto("feedbackEN") : erro("feedbackEN", atual.w);
}

// =============================
// ACERTO
// =============================
function acerto(id) {
    try { document.getElementById("somAcerto").play(); } catch (e) { /* ignore */ }
    xp += 10;
    moedas += 5;

    if (xp >= nivel * 100) {
        nivel++;
        moedas += 20;
        setTimeout(function() { alert("Subiu de nivel! Bonus de 20 moedas!"); }, 100);
    }

    mostrarAcerto(id);
    salvarRanking();
    salvarProgresso();
    atualizarUI();

    setTimeout(function() {
        var aba = document.querySelector(".aba.ativa");
        if (aba && aba.id === "montar") {
            novaPalavraMontar();
        } else {
            novaPalavra();
        }
    }, 800);
}

// =============================
// ERRO
// =============================
function erro(id, correta) {
    try { document.getElementById("somErro").play(); } catch (e) { /* ignore */ }
    vidas--;

    if (vidas <= 0) {
        setTimeout(function() { alert("Game Over! Suas vidas foram restauradas."); }, 100);
        xp = Math.max(0, xp - 20);
        vidas = 3;
    }

    mostrarErro(id, correta);
    salvarProgresso();
    atualizarUI();
}

// =============================
// UI
// =============================
function atualizarUI() {
    document.getElementById("xp").textContent = xp;
    document.getElementById("vidas").textContent = vidas;
    document.getElementById("moedas").textContent = moedas;

    var perfilXP = document.getElementById("perfilXP");
    if (perfilXP) perfilXP.textContent = xp;
    var perfilNivel = document.getElementById("perfilNivel");
    if (perfilNivel) perfilNivel.textContent = nivel;
    var perfilMoedas = document.getElementById("perfilMoedas");
    if (perfilMoedas) perfilMoedas.textContent = moedas;
}

// =============================
// ABAS
// =============================
function trocarAba(id) {
    document.querySelectorAll(".aba").forEach(function(a) {
        a.classList.remove("ativa");
    });
    document.getElementById(id).classList.add("ativa");

    document.querySelectorAll(".bottom-nav button").forEach(function(btn) {
        btn.classList.remove("nav-active");
        if (btn.getAttribute("data-tab") === id) {
            btn.classList.add("nav-active");
        }
    });

    if (id === "perfil") mostrarRanking();
    if (id === "montar") novaPalavraMontar();
    if (id === "portugues" || id === "ingles") novaPalavra();
    if (id === "loja") renderizarLoja();
    if (id === "avatar") renderizarAvatares();
}

// =============================
// FEEDBACK
// =============================
function mostrarAcerto(id) {
    var el = document.getElementById(id);
    el.textContent = "Muito bem! +10 XP +5 moedas";
    el.style.color = "#00ff88";
    animarCard(true);
}

function mostrarErro(id, correta) {
    var el = document.getElementById(id);
    el.textContent = "Errado! Era: " + correta;
    el.style.color = "#ff4d4d";
    animarCard(false);
}

// =============================
// ANIMACAO
// =============================
function animarCard(isAcerto) {
    var card = document.querySelector(".aba.ativa .card");
    if (!card) return;
    card.classList.remove("anim-acerto", "anim-erro");
    void card.offsetWidth;
    card.classList.add(isAcerto ? "anim-acerto" : "anim-erro");
}

// =============================
// MONTAR PALAVRA
// =============================
var palavraMontar = "";
var respostaUsuario = "";

function novaPalavraMontar() {
    var item = palavras[Math.floor(Math.random() * palavras.length)];
    palavraMontar = item.w;
    document.getElementById("emojiMontar").textContent = item.img;
    gerarLetras(palavraMontar);
    limpar();
}

function gerarLetras(palavra) {
    var container = document.getElementById("letras");
    container.innerHTML = "";
    var letras = palavra.split("");

    for (var i = letras.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = letras[i];
        letras[i] = letras[j];
        letras[j] = temp;
    }

    letras.forEach(function(letra, idx) {
        var btn = document.createElement("button");
        btn.textContent = letra;
        btn.className = "letra";
        btn.setAttribute("data-idx", idx);
        btn.onclick = function() {
            selecionarLetra(letra, btn);
        };
        container.appendChild(btn);
    });
}

function selecionarLetra(letra, btn) {
    respostaUsuario += letra;
    document.getElementById("respostaMontada").textContent = respostaUsuario;
    btn.classList.add("usada");
}

function limpar() {
    respostaUsuario = "";
    document.getElementById("respostaMontada").textContent = "";
    document.getElementById("feedbackMontar").textContent = "";
    document.querySelectorAll(".letra").forEach(function(btn) {
        btn.classList.remove("usada");
    });
}

function verificarMontagem() {
    if (!respostaUsuario) return;
    if (respostaUsuario === palavraMontar) {
        acerto("feedbackMontar");
    } else {
        erro("feedbackMontar", palavraMontar);
    }
}

// =============================
// LOJA
// =============================
function renderizarLoja() {
    var container = document.getElementById("itensLoja");
    container.innerHTML = "";

    itensLoja.forEach(function(item) {
        var div = document.createElement("div");
        var jaComprou = itensComprados.indexOf(item.id) !== -1;
        div.className = "item-loja" + (jaComprou ? " comprado" : "");

        div.innerHTML =
            '<div class="item-emoji">' + item.emoji + '</div>' +
            '<div class="item-nome">' + item.nome + '</div>' +
            '<div class="item-preco">' +
            (jaComprou ? "Comprado" : item.preco + " moedas") +
            '</div>';

        if (!jaComprou) {
            div.onclick = function() { comprarItem(item); };
        }
        container.appendChild(div);
    });
}

function comprarItem(item) {
    if (moedas < item.preco) {
        alert("Moedas insuficientes! Voce precisa de " + item.preco + " moedas.");
        return;
    }
    if (!confirm("Comprar " + item.nome + " por " + item.preco + " moedas?")) return;

    moedas -= item.preco;

    if (item.tipo === "consumivel") {
        switch (item.id) {
            case "vida_extra":
                vidas += 1;
                alert("Voce ganhou +1 vida!");
                break;
            case "escudo":
                alert("Escudo ativado! Protege de 1 erro.");
                break;
            case "dica":
                if (atual) {
                    alert("Dica: A palavra comeca com " + atual.w.charAt(0));
                }
                break;
        }
    } else {
        itensComprados.push(item.id);
    }

    salvarProgresso();
    atualizarUI();
    renderizarLoja();
}

// =============================
// AVATAR
// =============================
function renderizarAvatares() {
    var container = document.getElementById("avatarOptions");
    container.innerHTML = "";
    document.getElementById("avatarPreview").textContent = avatarAtual;

    listaAvatares.forEach(function(av) {
        var div = document.createElement("div");
        div.className = "avatar-option" + (av === avatarAtual ? " selecionado" : "");
        div.textContent = av;
        div.onclick = function() {
            avatarAtual = av;
            salvarProgresso();
            renderizarAvatares();
        };
        container.appendChild(div);
    });
}

// =============================
// RANKING
// =============================
function salvarNome() {
    nomeJogador = document.getElementById("nomeJogador").value.trim();
    if (!nomeJogador) return;
    localStorage.setItem("nome", nomeJogador);
    document.getElementById("nomeSalvo").textContent =
        "Nome salvo: " + nomeJogador;
    salvarProgresso();
    salvarRanking();
}

function salvarRanking() {
    if (!nomeJogador) return;
    var ranking = JSON.parse(localStorage.getItem("ranking") || "[]");
    var jogador = null;
    for (var i = 0; i < ranking.length; i++) {
        if (ranking[i].nome === nomeJogador) {
            jogador = ranking[i];
            break;
        }
    }
    if (jogador) {
        jogador.xp = xp;
    } else {
        ranking.push({ nome: nomeJogador, xp: xp });
    }
    ranking.sort(function(a, b) { return b.xp - a.xp; });
    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function mostrarRanking() {
    var lista = document.getElementById("listaRanking");
    lista.innerHTML = "";
    var ranking = JSON.parse(localStorage.getItem("ranking") || "[]");
    ranking.forEach(function(j, i) {
        var li = document.createElement("li");
        var medalha = i === 0 ? "\u{1F947}" : i === 1 ? "\u{1F948}" : i === 2 ? "\u{1F949}" : (i + 1) + ".";
        li.innerHTML =
            "<span>" + medalha + " " + j.nome + "</span>" +
            "<span>" + j.xp + " XP</span>";
        lista.appendChild(li);
    });
}

// =============================
// ENTER KEY
// =============================
document.addEventListener("keydown", function(e) {
    if (e.key !== "Enter") return;
    var aba = document.querySelector(".aba.ativa");
    if (!aba) return;
    switch (aba.id) {
        case "portugues": verificarPT(); break;
        case "ingles": verificarEN(); break;
        case "montar": verificarMontagem(); break;
    }
});

// =============================
// INICIAR
// =============================
window.onload = function() {
    atualizarUI();
    atualizarBotoesNivel();
    novaPalavra();

    if (nomeJogador) {
        document.getElementById("nomeJogador").value = nomeJogador;
        document.getElementById("nomeSalvo").textContent =
            "Nome salvo: " + nomeJogador;
    }
};
