# Aviator VIP WebSocket Client (Betou)

Este projeto realiza a automação do fluxo de autenticação e conexão com o WebSocket em tempo real do jogo Aviator VIP na Betou. O script realiza o login na plataforma, extrai o identificador de sessão (`sid`) do launcher da Banana Provider, autentica-se no backend do jogo e conecta-se via Socket.io para monitorar os eventos do jogo.

## 🚀 Funcionalidades

- **Login Automatizado**: Autenticação na API da Betou para obtenção de Token JWT.
- **Extração do SID**: Captura dinâmica do identificador de sessão (`sid`) a partir do launcher da Banana Provider.
- **Autenticação no Gamelogic**: Faz a requisição de handshake inicial para gerar e capturar os cookies de sessão (`aviatorvip_session`).
- **Leitura em Tempo Real**: Conexão WebSocket via Socket.io no modo nativo (`websocket`) para capturar os principais eventos do jogo.

## 📋 Eventos Capturados

O script está configurado para ouvir e imprimir os seguintes eventos em tempo real:
- `roundHistory`: Histórico das últimas rodadas concluídas.
- `roundChange`: Status da rodada atual em tempo real (Mudanças de estado, Crash, etc).
- `roundBet`: Informações de apostas da rodada.

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Axios**: Para requisições HTTP e obtenção do SID.
- **Socket.io-client**: Para conexão e escuta do WebSocket em tempo real.

## 🔧 Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/rodrigoaviator3.git

2.Instale as dependências:
   ```bash
   npm install

3.Execute o script principal:
   ```bash
   node index.js

- Aviso: Este projeto tem fins estritamente educacionais e de estudo sobre integrações via API e WebSockets.
   

