// =========================================
// 🔥 IMPORTAÇÕES DO FIREBASE VIA CDN
// =========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// =========================================
// 🔥 CONFIGURAÇÃO DO FIREBASE
// =========================================
const firebaseConfig = {
  apiKey: "AIzaSyDXru8QHHye-BKOx30JlAOCeyjqU8XFqZ4",
  authDomain: "jogo-educativo-2-0-408bb.firebaseapp.com",
  projectId: "jogo-educativo-2-0-408bb",
  storageBucket: "jogo-educativo-2-0-408bb.firebasestorage.app",
  messagingSenderId: "659021251421",
  appId: "1:659021251421:android:d0fdf067c21b19c7261eb4"
};

// =========================================
// 🚀 INICIALIZAÇÃO
// =========================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// =========================================
// 📱 DETECTAR SE ESTÁ NO APP ANDROID
// =========================================
function estaNoAppAndroid() {
  return !!(
    window.Capacitor &&
    window.Capacitor.getPlatform &&
    window.Capacitor.getPlatform() === "android"
  );
}

// =========================================
// 👤 LOGIN COM GOOGLE
// =========================================
export async function loginGoogle() {
  try {
    console.log("Tentando login com Google...");

    let user;

    // APP ANDROID: usa native-auth.js
    if (estaNoAppAndroid()) {
      console.log("Login Android via native-auth.js");

      if (!window.loginGoogleNativo) {
        throw new Error("Função loginGoogleNativo não carregou no app.");
      }

      const result = await window.loginGoogleNativo();

      if (!result) {
        console.warn("Login Google cancelado ou sem retorno.");
        return;
      }

      console.log("Resultado login nativo:", result);

      const idToken =
        result?.credential?.idToken ||
        result?.credential?.id_token ||
        result?.idToken ||
        result?.id_token ||
        result?.user?.idToken;

      const accessToken =
        result?.credential?.accessToken ||
        result?.credential?.access_token ||
        result?.accessToken ||
        result?.access_token;

      if (!idToken && !accessToken) {
        console.log("Resultado sem token:", result);
        throw new Error("Login Google abriu, mas não retornou token. Verifique SHA-1/SHA-256 e google-services.json.");
      }

      const credential = GoogleAuthProvider.credential(idToken || null, accessToken || null);
      const loginWeb = await signInWithCredential(auth, credential);

      user = loginWeb.user;
    }

    // SITE WEB: usa popup normal
    else {
      console.log("Login Web com popup");

      const result = await signInWithPopup(auth, provider);
      user = result.user;
    }

    console.log("Usuário logado:", user);

    await salvarUsuario(user);

    alert(`Bem-vindo, ${user.displayName || "Jogador"}!`);

  } catch (error) {
    console.error("Erro no login:", error);

    if (error.code === "auth/popup-closed-by-user") {
      alert("Login cancelado. Tente novamente e conclua o login na janela do Google.");
      return;
    }

    if (
      String(error?.message || "").includes("DEVELOPER_ERROR") ||
      String(error?.message || "").includes("10:") ||
      String(error?.code || "").includes("auth/invalid-credential")
    ) {
      alert(
        "Erro no login Google. Provável configuração do Firebase/SHA-1.

" +
        "Abra o arquivo LEIA_LOGIN_GOOGLE_FIREBASE.txt e confira o passo a passo."
      );
      return;
    }

    // Tratamento específico para erro de configuração do Firebase
    if (error.code === "auth/operation-not-allowed" || error.message?.includes("identity provider configuration is not found")) {
      console.error("❌ ERRO DE CONFIGURAÇÃO DO FIREBASE");
      console.error("O provedor Google não está habilitado no Firebase Console.");
      console.error("SOLUÇÃO:");
      console.error("1. Acesse: https://console.firebase.google.com/");
      console.error("2. Selecione o projeto: jogo-educativo-2-0");
      console.error("3. Vá para Authentication > Sign-in method");
      console.error("4. Clique em 'Google' e ative-o");
      console.error("5. Recarregue esta página");
      
      alert(
        "⚠️ Erro de Configuração do Firebase\n\n" +
        "O provedor Google não está habilitado.\n\n" +
        "Solução:\n" +
        "1. Acesse: https://console.firebase.google.com/\n" +
        "2. Projeto: jogo-educativo-2-0\n" +
        "3. Authentication > Sign-in method\n" +
        "4. Ative o Google\n" +
        "5. Recarregue a página"
      );
      return;
    }

    alert("Erro no login: " + (error.message || error));
  }
}

// =========================================
// 🚪 LOGOUT
// =========================================
export async function logout() {
  try {
    if (estaNoAppAndroid()) {
      if (window.logoutGoogleNativo) {
        try {
          await window.logoutGoogleNativo();
        } catch (erro) {
          console.warn("Erro ao sair do login nativo:", erro);
        }
      }
    }

    await signOut(auth);

  } catch (error) {
    console.error("Erro ao sair:", error);
    alert("Erro ao sair: " + (error.message || error));
  }
}

// =========================================
// 💾 SALVAR USUÁRIO
// =========================================
async function salvarUsuario(user) {
  if (!user) return;

  try {
    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        nome: user.displayName || "Jogador",
        email: user.email || "",
        foto: user.photoURL || "",
        xp: 0,
        nivel: 1,
        criadoEm: serverTimestamp()
      });
    } else {
      await setDoc(ref, {
        nome: user.displayName || "Jogador",
        email: user.email || "",
        foto: user.photoURL || "",
        atualizadoEm: serverTimestamp()
      }, { merge: true });
    }

  } catch (error) {
    console.warn("Erro ao salvar usuário:", error);
  }
}

// =========================================
// 🎮 SALVAR PROGRESSO ONLINE
// =========================================
export async function salvarProgressoOnline(xp, nivel) {
  const user = auth.currentUser;

  if (!user) {
    console.warn("Usuário não logado. Progresso online não salvo.");
    return;
  }

  try {
    await setDoc(doc(db, "usuarios", user.uid), {
      xp,
      nivel,
      atualizadoEm: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn("Erro ao salvar progresso online:", error);
  }
}

// =========================================
// 🧑‍🎨 SALVAR PERFIL ONLINE
// =========================================
export async function salvarPerfilOnline(nome, avatar) {
  const user = auth.currentUser;

  if (!user) {
    console.warn("Usuário não logado. Perfil online não salvo.");
    return;
  }

  try {
    await setDoc(doc(db, "usuarios", user.uid), {
      nome: nome || user.displayName || "Jogador",
      avatar: avatar || "🧑‍🚀",
      atualizadoEm: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn("Erro ao salvar perfil online:", error);
  }
}

// =========================================
// 🏆 RANKING GLOBAL
// =========================================
export async function carregarRankingGlobal() {
  try {
    const rankingRef = collection(db, "usuarios");
    const q = query(rankingRef, orderBy("xp", "desc"), limit(10));

    const snapshot = await getDocs(q);
    const ranking = [];

    snapshot.forEach((doc) => {
      ranking.push(doc.data());
    });

    return ranking;

  } catch (error) {
    console.warn("Erro ao carregar ranking global:", error);
    return [];
  }
}

// =========================================
// 📋 MOSTRAR RANKING
// =========================================
export async function mostrarRankingGlobal() {
  const lista = document.getElementById("listaRanking");

  if (!lista) return;

  lista.innerHTML = "";

  const ranking = await carregarRankingGlobal();

  if (ranking.length === 0) {
    lista.innerHTML = "<li>Nenhum jogador no ranking ainda.</li>";
    return;
  }

  ranking.forEach((jogador, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${index + 1}º ${jogador.avatar || "🏅"} ${jogador.nome || "Jogador"} - ${jogador.xp || 0} XP`;
    lista.appendChild(li);
  });
}

// =========================================
// 🔄 MONITORAR LOGIN
// =========================================
onAuthStateChanged(auth, async (user) => {
  const areaLogin = document.getElementById("areaLogin");

  if (!areaLogin) {
    console.error("Elemento #areaLogin não encontrado no HTML.");
    return;
  }

  if (user) {
    await salvarUsuario(user);

    areaLogin.innerHTML = `
      <img src="${user.photoURL || ""}" width="40" style="border-radius:50%;vertical-align:middle;">
      <span style="margin: 0 10px;">Olá, ${user.displayName || "Jogador"}</span>
      <button type="button" onclick="logout()">Sair</button>
    `;

    await mostrarRankingGlobal();

  } else {
    areaLogin.innerHTML = `
      <button type="button" onclick="loginGoogle()">Entrar com Google</button>
    `;
  }
});

// =========================================
// 🌐 LIBERAR FUNÇÕES PARA O HTML
// =========================================
window.loginGoogle = loginGoogle;
window.logout = logout;
window.mostrarRankingGlobal = mostrarRankingGlobal;
window.salvarProgressoOnline = salvarProgressoOnline;
window.salvarPerfilOnline = salvarPerfilOnline;