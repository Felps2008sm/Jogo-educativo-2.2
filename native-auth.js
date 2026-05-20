window.loginGoogleNativo = async function () {
  try {
    if (!window.Capacitor) {
      throw new Error("Capacitor não carregou no app.");
    }

    const FirebaseAuthentication =
      window.Capacitor.Plugins?.FirebaseAuthentication ||
      window.Capacitor.registerPlugin?.("FirebaseAuthentication");

    if (!FirebaseAuthentication) {
      console.log("Capacitor:", window.Capacitor);
      console.log("Plugins:", window.Capacitor.Plugins);
      throw new Error("Plugin FirebaseAuthentication não foi encontrado no Android.");
    }

    // Importante: skipNativeAuth=true porque o app usa o Firebase JavaScript SDK.
    // Assim o plugin abre o Google no Android, devolve o token, e o firebase.js conclui o login.
    const result = await FirebaseAuthentication.signInWithGoogle({
      skipNativeAuth: true,
      useCredentialManager: false
    });

    console.log("Login Google nativo retornou:", result);
    return result;

  } catch (error) {
    console.error("Erro no login nativo:", error);

    const mensagem =
      error?.message ||
      error?.errorMessage ||
      error?.code ||
      JSON.stringify(error);

    if (
      String(mensagem).includes("Cancelled") ||
      String(mensagem).includes("cancelled") ||
      String(mensagem).includes("canceled") ||
      String(mensagem).includes("16")
    ) {
      console.warn("Login cancelado pelo usuário ou pelo Android.");
      return null;
    }

    if (String(mensagem).includes("10") || String(mensagem).includes("DEVELOPER_ERROR")) {
      alert(
        "Erro no login Google: configuração SHA-1/SHA-256 do Firebase não confere com este APK.\n\n" +
        "Abra o arquivo LEIA_LOGIN_GOOGLE_FIREBASE.txt do projeto e cadastre a chave no Firebase Console."
      );
      throw error;
    }

    alert("Erro no login nativo: " + mensagem);
    throw error;
  }
};

window.logoutGoogleNativo = async function () {
  try {
    if (!window.Capacitor) {
      console.warn("Capacitor não carregou no app.");
      return;
    }

    const FirebaseAuthentication =
      window.Capacitor.Plugins?.FirebaseAuthentication ||
      window.Capacitor.registerPlugin?.("FirebaseAuthentication");

    if (!FirebaseAuthentication) {
      console.warn("Plugin FirebaseAuthentication não encontrado para logout.");
      return;
    }

    const result = await FirebaseAuthentication.signOut();
    console.log("Logout Google realizado:", result);
    return result;

  } catch (error) {
    console.error("Erro no logout nativo:", error);
    const mensagem = error?.message || error?.errorMessage || error?.code || JSON.stringify(error);
    alert("Erro ao sair da conta: " + mensagem);
    throw error;
  }
};
