# Jogo Educativo 2.2

Jogo educativo feito em HTML, CSS e JavaScript com Capacitor e Firebase. Aprenda palavras em portugues e ingles jogando!

## Funcionalidades

- Jogos de palavras em Portugues e Ingles
- Monte a palavra com letras embaralhadas (drag & drop)
- Modo Multiplayer (2 jogadores)
- Sistema de XP, niveis, moedas e vidas
- Loja para comprar personagens, roupas, acessorios, temas e poderes
- Editor de avatar completo
- Sistema de missoes e conquistas
- Ranking global via Firebase
- Login com Google (Firebase Auth + Capacitor)
- **Coruja Cosmica** - tela de abertura com animacao interativa Canvas

## Estrutura dos Arquivos

```
index.html                        - Tela de abertura (Coruja Cosmica)
jogo.html                         - Pagina principal do jogo
style.css                         - Estilos do jogo
script.js                         - Logica do jogo
firebase.js                       - Configuracao e funcoes do Firebase
native-auth.js                    - Login Google nativo (Android/Capacitor)
coruja.css                        - Estilos da tela de abertura
coruja.js                         - Animacao Canvas da coruja cosmica
capacitor.config.json             - Config do Capacitor (APK)
update-checker.js                 - Verificador de atualizacoes
icon.png                          - Icone do app
LEIA_LOGIN_GOOGLE_FIREBASE.txt    - Instrucoes para configurar login Google
LEIA_PRIMEIRO_APK_CORRIGIDO.txt   - Instrucoes para gerar APK
LEIA_PRIMEIRO_NOVA_VERSAO.txt     - Notas da nova versao
GERAR_APK_CORRIGIDO.bat           - Script para gerar APK
MOSTRAR_SHA1_FIREBASE.bat         - Script para mostrar SHA-1
```

## Como Usar

1. Abra `index.html` no navegador ou acesse via GitHub Pages
2. A coruja cosmica aparece como tela de abertura
3. Clique em "Entrar no Jogo" para jogar
4. Escolha seu modo de jogo e nivel de dificuldade

## GitHub Pages

1. Va em Settings > Pages
2. Selecione a branch `main` e pasta `/ (root)`
3. Salve e acesse pelo link gerado

## Para Mobile

1. Publique no GitHub Pages
2. Abra o link no navegador do celular Android
3. Toque nos 3 pontinhos > "Adicionar a tela inicial"

Para gerar APK nativo, veja `LEIA_PRIMEIRO_APK_CORRIGIDO.txt`.

## Autor

**Felipe Souza de Melo**
