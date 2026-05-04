const axios = require("axios");
const { io } = require("socket.io-client");

// Credenciais da Betou enviadas por você
const loginPayload = {
    login: "login",
    email: "email@gmail.com",
    password: "senha",
    app_source: "web",
    captcha_token: ""
};

// Cabeçalhos exatos da Betou
const loginHeaders = {
    "language": "pt-br",
    "x-log-info": "1-1777873582605-deploy-7d5a76d9da76b51c54a659082f35899939fe6a7b-bcd9a4bbaa4ac04fee50",
    "tenant": "betou.bet.br",
    "origin-domain": "betou.bet.br",
    "version": "vz3b-deploy-7d5a76d9da76b51c54a659082f35899939fe6a7b-bcd9a4bbaa4ac04fee50",
    "Origin": "https://betou.bet.br",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Content-Type": "application/json"
};

async function logarEObterSid() {
    try {
        console.log("Iniciando Login na Betou...");
        const loginRes = await axios.post("https://betou.bet.br/api/auth/login", loginPayload, {
            headers: loginHeaders
        });

        if (!loginRes.data || !loginRes.data.access_token) {
            throw new Error("Não foi possível obter o access_token da Betou.");
        }

        const accessToken = loginRes.data.access_token;
        console.log("Autenticado com sucesso!");
        console.log("Access Token JWT obtido.");

        // Pulando a validação de perfil para prosseguir direto ao launcher

        // Agora precisamos pegar o SID.
        // Se você já tem a URL do redirect da banana provider, basta colocar aqui:
        const proxyUrl = "https://proxy.bananaprovider.com/launcher/launcherBananaGameCommonCase?casinoCode=562293ee-779f-4922-bced-678d64c7ecfe&walletReferenceId=betoubetbr-28823020-32db28eac80fd8bde76b229c21e363fa7a42c30c1da6ebf75f49661687dd0f6c&gameId=43&playerCasinoId=28823020&userName=Andre%20Vasconcelos%20Lima&currency=BRL&language=pt&playerWalletUrl=https%3A%2F%2Fbetou.bet.br%2Fuser%2Fwallet&lobbyUrl=https%3A%2F%2Fbetou.bet.br%2Fcasino%2Fproviders%2Fbanana&hash=b3672c6c5b863124d8c9f36c961a136d4c1edcb3bf4a8c735967e66504f89f88";

        console.log("Obtendo o novo SID pelo launcher...");
        const redirectRes = await axios.get(proxyUrl, {
            headers: {
                "User-Agent": loginHeaders["User-Agent"],
                "Origin": "https://betou.bet.br"
            },
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400
        });

        let sid = "";
        // Tentamos pegar o sid tanto se der redirect (302) quanto se retornar HTML
        if (redirectRes.headers.location) {
            const urlObj = new URL(redirectRes.headers.location);
            sid = urlObj.searchParams.get("sid");
        } else if (typeof redirectRes.data === "string") {
            const match = redirectRes.data.match(/sid=([a-zA-Z0-9-]+)/);
            if (match) sid = match[1];
        }

        if (!sid) {
            throw new Error("Não foi possível extrair o SID do launcher.");
        }

        console.log(`Novo SID extraído com sucesso: ${sid}`);
        await conectarWebSocket(sid);

    } catch (err) {
        console.error("Erro no processo de Autenticação:", err.response ? err.response.data : err.message);
    }
}

async function conectarWebSocket(sid) {
    try {
        console.log("Autenticando no gamelogic antes do WebSocket...");
        const authRes = await axios.post("https://gamelogic.aviator-vip.prod.o-br1.banana.games/game/auth", { sid: sid }, {
            headers: {
                "Origin": "https://aviator-vip-prod-o-br1.banana.games",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
                "Content-Type": "application/json"
            }
        });

        let cookies = "";
        const setCookieHeaders = authRes.headers["set-cookie"];
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            cookies = setCookieHeaders.map(c => c.split(";")[0]).join("; ");
        }

        console.log("Autenticação no gamelogic concluída com sucesso!");

        const url = "https://realtime.aviator-vip.prod.o-br1.banana.games";

        const options = {
            transports: ["websocket"],
            path: "/socket.io/",
            auth: {
                sessionId: sid
            },
            query: {
                lang: "pt",
                currency: "BRL",
                theme: "VIP"
            },
            extraHeaders: {
                "Origin": "https://aviator-vip-prod-o-br1.banana.games",
                "Referer": "https://aviator-vip-prod-o-br1.banana.games/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
                "Cookie": cookies
            }
        };

        console.log("Conectando ao WebSocket do Aviator VIP...");
        const socket = io(url, options);

        socket.on("connect", () => {
            console.log("Conectado com sucesso ao servidor do Aviator!");
        });

        socket.on("roundHistory", (data) => {
            console.log("[Evento Recebido]: roundHistory", data);
        });

        socket.on("roundChange", (data) => {
            console.log("[Evento Recebido]: roundChange", data);
        });

        socket.on("roundBet", (data) => {
            //console.log("[Evento Recebido]: roundBet", data);
        });

        socket.on("connect_error", (error) => {
            console.error("Erro na conexão do WS:", error.message);
        });

        socket.on("disconnect", (reason) => {
            console.log("Desconectado do servidor. Motivo:", reason);
        });

    } catch (err) {
        console.error("Erro na conexão com o WebSocket ou Auth:", err.response ? err.response.data : err.message);
    }
}

// Executa a função principal
logarEObterSid();
