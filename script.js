const temas = {
  animais: [
    "LEAO",
    "TIGRE",
    "ELEFANTE",
    "GIRAFAS",
    "ZEBRA",
    "URSO",
    "CANGURU",
    "PANDA",
    "LOBO",
    "RAPOSA",
    "AGUIA",
    "TUBARAO",
    "GOLFINHO",
    "CAVALO",
    "COELHO",
    "SAPO",
    "COBRA",
    "GATO",
    "CACHORRO",
    "PATO",
  ],
  frutas: [
    "BANANA",
    "LARANJA",
    "MORANGO",
    "ABACAXI",
    "UVA",
    "MELANCIA",
    "MELAO",
    "KIWI",
    "PESSEGO",
    "AMORA",
    "FRAMBOESA",
    "GOIABA",
    "MANGA",
    "PERA",
  ],
  objetos: [
    "CADEIRA",
    "MESA",
    "LAMPADA",
    "TELEVISAO",
    "CELULAR",
    "COMPUTADOR",
    "LIVRO",
    "CANETA",
    "CADERNO",
    "RELOGIO",
    "OCULOS",
    "GARRAFA",
    "PRATO",
    "TALHER",
    "VENTILADOR",
  ],
  adjetivos: [
    "ALEGRE",
    "TRISTE",
    "RAPIDO",
    "LENTO",
    "INTELIGENTE",
    "BONITO",
    "FEIO",
    "FORTE",
    "FRACO",
    "GRANDE",
    "PEQUENO",
    "CLARO",
    "ESCURO",
    "LEVE",
    "PESADO",
  ],
};

const acerto = document.querySelector(".acerto");
const acertoTexto = document.createElement("p");
let palavraEscolhida = "";
let letrasTentadas = [];
let erros = 0;
const maxErros = 6;

// Redireciona para a página de adivinhação com o tema escolhido
function irParaAdivinhacao(tema) {
  window.location.href = `adivinhacao.html?tema=${tema}`;
}

// Voltar para a paginar de escolher tema
function voltar() {
  window.location.href = "index.html";
}

function recomecar() {
  window.location.reload();
}

function verificarPalavraCompleta() {
  const letrasExibidas = document.querySelectorAll(".letra");
  for (let i = 0; i < palavraEscolhida.length; i++) {
    if (letrasExibidas[i].textContent !== palavraEscolhida[i]) {
      return false;
    }
  }
  return true;
}

// Escolhe uma palavra aleatoria de acordo com o tema escolhido
function escolherPalavraAleatoria(tema) {
  const palavras = temas[tema];
  const indiceAleatorio = Math.floor(Math.random() * palavras.length);
  return palavras[indiceAleatorio];
}

// Ao entrar na pagina adivinhacao.html chama a função para escolher palavra
if (window.location.pathname.includes("adivinhacao.html")) {
  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search); // Pega o parametro na url enviado pelo index.hmtl
    const temaEscolhido = urlParams.get("tema");
    palavraEscolhida = escolherPalavraAleatoria(temaEscolhido);

    // Atualizar cabeçalho
    document.getElementById("tema").textContent = `Tema: ${
      temaEscolhido.charAt(0).toUpperCase() + temaEscolhido.slice(1)
    }`;

    //Criar campo de advinhação
    const palavraDiv = document.querySelector(".palavra");
    palavraDiv.innerHTML = "";
    for (let letra of palavraEscolhida) {
      const letraElement = document.createElement("p");
      letraElement.textContent = "\u00A0"; // Adicona um espaço vazio para renderizar a tag p
      letraElement.className = "letra";
      palavraDiv.appendChild(letraElement);
    }

    // Configurando teclado virtual
    const teclas = document.querySelectorAll(".teclado_letra");
    teclas.forEach((tecla) => {
      tecla.addEventListener("click", () => {
        const letraTentada = tecla.textContent;

        // Verificar se é uma letra repetida
        if (letrasTentadas.includes(letraTentada)) {
          alert("Você já tentou essa letra!");
          return;
        }
        letrasTentadas.push(letraTentada);

        // Validar tentativa
        if (palavraEscolhida.includes(letraTentada)) {
          for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] == letraTentada) {
              const spans = document.querySelectorAll(".letra");
              spans[i].textContent = letraTentada;
            }
          }
          if (verificarPalavraCompleta()) {
            acertoTexto.textContent =
              `Parabéns você acertou! A palavra era: ` + palavraEscolhida;
            acerto.appendChild(acertoTexto);
            document.querySelector(".btnRecomecar").style.display = "inline";
            document.querySelector(".btnVoltar").style.display = "inline";
            document.querySelector(".card").style.display = "flex";
          }
        } else {
          erros++;
          document.getElementById("listaErros").textContent +=
            letraTentada + " ";
          document.querySelector(".imagem").src =
            "frontend/images/erro" + erros + ".png";
        }

        // Verifica quantidade de erros
        if (erros >= maxErros) {
          acertoTexto.textContent =
            "Que pena você errou! a palavra era: " + palavraEscolhida;
          acerto.appendChild(acertoTexto);
          document.querySelector(".btnRecomecar").style.display = "inline";
          document.querySelector(".btnVoltar").style.display = "inline";
          document.querySelector(".card").style.display = "flex";
        }
      });
    });
  };
}

document.querySelector(".btnVoltar").addEventListener("click", voltar);
document.querySelector(".btnRecomecar").addEventListener("click", recomecar);
