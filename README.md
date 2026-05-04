# 🚀 Aviator VIP WebSocket Client (Betou)

Projeto educacional focado em automação de autenticação e conexão com WebSocket em tempo real do jogo **Aviator VIP** na Betou.

O script realiza login, captura o `sid` do launcher Banana Provider, autentica no backend do jogo e se conecta via **Socket.io** para monitoramento em tempo real.

---

## 📸 Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/82581a78-9f9a-4d96-b70f-6c2c14ab687b" width="250"/>
  <img src="https://github.com/user-attachments/assets/b2b5f5f9-6cbf-403d-abdb-6e0b057c8a0b" width="500"/>
</p>

---

## 🚀 Funcionalidades

- 🔐 **Login Automatizado**  
  Autenticação via API da Betou utilizando Token JWT.

- 🧠 **Extração do SID**  
  Captura dinâmica do identificador de sessão diretamente do launcher.

- 🔗 **Handshake com Gamelogic**  
  Geração e captura de cookies de sessão (`aviatorvip_session`).

- ⚡ **WebSocket em Tempo Real**  
  Conexão via Socket.io (modo websocket) para leitura de eventos do jogo.

---

## 📡 Eventos Monitorados

- `roundHistory` → Histórico das rodadas  
- `roundChange` → Status em tempo real (crash, andamento, etc)  
- `roundBet` → Informações de apostas  

---

## 🛠️ Tecnologias

- Node.js  
- Axios  
- Socket.io-client  

---

## ⚙️ Como Usar

```bash
# Clone o projeto
git clone https://github.com/joaovxbr/AviatorVIP.git

# Instale as dependências
npm install

# Execute
node index.js

⚠️ Aviso Legal

Este projeto possui finalidade estritamente educacional, voltado ao estudo de APIs e WebSockets.

Não possui vínculo com plataformas externas
Não garante resultados ou ganhos
Uso sob total responsabilidade do usuário
💡 Observação

Use com consciência. Este projeto não deve ser utilizado para violar termos de serviço de terceiros.
