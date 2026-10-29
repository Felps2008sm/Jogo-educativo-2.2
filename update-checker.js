/**
 * 🔄 SISTEMA DE VERIFICAÇÃO DE UPDATES
 * Detecta nova versão e mostra popup elegante para atualizar
 */

class UpdateChecker {
  constructor() {
    this.currentVersion = this.getVersionFromHTML();
    this.updateChecked = false;
    this.updateAvailable = false;
  }

  /**
   * Extrai versão do query parameter dos scripts
   */
  getVersionFromHTML() {
    const script = document.querySelector('script[src*="script.js"]');
    if (!script) return "1.0.0";
    
    const match = script.src.match(/v=(\d+)/);
    return match ? match[1] : "1.0.0";
  }

  /**
   * Verifica se há nova versão disponível
   */
  async checkForUpdates() {
    if (this.updateChecked) return;
    
    this.updateChecked = true;

    try {
      // Busca a versão atual do index.html (sem cache)
      const response = await fetch("./index.html?nocache=" + Date.now(), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      });

      if (!response.ok) {
        console.warn("⚠️ Não foi possível verificar updates");
        return;
      }

      const html = await response.text();
      const newVersion = this.extractVersionFromHTML(html);

      console.log(`📦 Versão atual: ${this.currentVersion}`);
      console.log(`📦 Versão disponível: ${newVersion}`);

      if (newVersion > this.currentVersion) {
        console.log("✅ Nova versão disponível!");
        this.updateAvailable = true;
        this.showUpdatePopup(newVersion);
      } else {
        console.log("✅ Você está na versão mais recente!");
      }

    } catch (error) {
      console.warn("❌ Erro ao verificar updates:", error);
    }
  }

  /**
   * Extrai versão do HTML
   */
  extractVersionFromHTML(html) {
    const match = html.match(/v=(\d+)/);
    return match ? match[1] : "0";
  }

  /**
   * Mostra popup bonito de update
   */
  showUpdatePopup(newVersion) {
    // Remove popup anterior se existir
    const existingPopup = document.getElementById("updatePopup");
    if (existingPopup) {
      existingPopup.remove();
    }

    // Cria popup
    const popup = document.createElement("div");
    popup.id = "updatePopup";
    popup.className = "update-popup";
    popup.innerHTML = `
      <div class="update-popup-content">
        <div class="update-popup-header">
          <h2>🚀 Nova Versão Disponível!</h2>
          <button class="update-close-btn" onclick="document.getElementById('updatePopup')?.remove()">✕</button>
        </div>
        
        <div class="update-popup-body">
          <p class="update-current">Versão atual: <strong>${this.currentVersion}</strong></p>
          <p class="update-new">Nova versão: <strong>${newVersion}</strong></p>
          <p class="update-message">Clique em "Atualizar" para obter os novos recursos e melhorias!</p>
        </div>

        <div class="update-popup-footer">
          <button class="btn-update-cancel" onclick="document.getElementById('updatePopup')?.remove()">
            Depois
          </button>
          <button class="btn-update-now" onclick="window.updateNow()">
            🔄 Atualizar Agora
          </button>
        </div>

        <div class="update-progress-bar" id="updateProgressBar"></div>
      </div>
    `;

    document.body.appendChild(popup);

    // Trigger animação de entrada
    setTimeout(() => {
      popup.classList.add("active");
    }, 100);
  }

  /**
   * Atualiza a página com cache busting
   */
  updateNow() {
    const progressBar = document.getElementById("updateProgressBar");
    
    if (progressBar) {
      progressBar.style.animation = "none";
      progressBar.offsetHeight; // Trigger reflow
      progressBar.style.animation = "update-progress 2s ease-in-out forwards";
    }

    // Aguarda um pouco antes de recarregar
    setTimeout(() => {
      // Force reload com cache busting
      window.location.href = window.location.href.split("?")[0] + "?nocache=" + Date.now();
    }, 500);
  }
}

// =============================
// 🚀 INICIALIZAR
// =============================
window.updateNow = function() {
  const popup = document.getElementById("updatePopup");
  if (popup) {
    popup.querySelector(".update-progress-bar").style.animation = 
      "update-progress 2s ease-in-out forwards";
  }
  
  setTimeout(() => {
    window.location.href = window.location.href.split("?")[0] + "?nocache=" + Date.now();
  }, 500);
};

// Inicializar quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const checker = new UpdateChecker();
  checker.checkForUpdates();
});

// Também verificar ao carregar scripts
window.addEventListener("load", () => {
  if (!window.updateCheckerRan) {
    window.updateCheckerRan = true;
    const checker = new UpdateChecker();
    checker.checkForUpdates();
  }
});
