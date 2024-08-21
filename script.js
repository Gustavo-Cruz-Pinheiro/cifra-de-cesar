const selecione = document.querySelector(".select");
const incremento = document.querySelector(".chave-container");
const btn = document.querySelector("button");
const radiobtn = document.querySelector(".radio-button");
const codificar = document.querySelector("#codificar");
const decodificar = document.querySelector("#decodificar");
const resultado = document.querySelector("#resultado");
const resultadoBruteForce = document.querySelector("#resultado-bruteforce");

// Mostrar ou esconder o campo de incremento para a Cifra de César
selecione.addEventListener("click", function () {
  if (selecione.value == "cifra") {
    incremento.style.display = "block";
  } else {
    incremento.style.display = "none";
  }
});

// Função para codificar e decodificar usando a Cifra de César
function cifraCesar() {
  let msg = document.querySelector("#mensagem").value;
  let chave = parseInt(document.querySelector("#rangenumber").value);
  let saida = '';

  if (codificar.checked) {
    for (let i = 0; i < msg.length; i++) {
      let char = msg[i];
      if (char.match(/[a-z]/)) {
        saida += String.fromCharCode((msg.charCodeAt(i) + chave - 97) % 26 + 97);
      } else if (char.match(/[A-Z]/)) {
        saida += String.fromCharCode((msg.charCodeAt(i) + chave - 65) % 26 + 65);
      } else {
        saida += char;  // Mantém símbolos e números inalterados
      }
    }
    return saida;

  } else if (decodificar.checked) {
    for (let i = 0; i < msg.length; i++) {
      let char = msg[i];
      if (char.match(/[a-z]/)) {
        saida += String.fromCharCode((msg.charCodeAt(i) - 97 - chave + 26) % 26 + 97);
      } else if (char.match(/[A-Z]/)) {
        saida += String.fromCharCode((msg.charCodeAt(i) - 65 - chave + 26) % 26 + 65);
      } else {
        saida += char;  // Mantém símbolos e números inalterados
      }
    }
    return saida;
  }
}

// Função para realizar brute force na Cifra de César
function bruteForceCifraCesar(mensagem) {
  const possibilidades = [];

  for (let chave = 1; chave < 26; chave++) {
    let saida = '';

    for (let i = 0; i < mensagem.length; i++) {
      let char = mensagem[i];

      if (char.match(/[a-z]/)) {
        saida += String.fromCharCode((char.charCodeAt(0) - 97 - chave + 26) % 26 + 97);
      } else if (char.match(/[A-Z]/)) {
        saida += String.fromCharCode((char.charCodeAt(0) - 65 - chave + 26) % 26 + 65);
      } else {
        saida += char;  // Mantém símbolos e números inalterados
      }
    }

    possibilidades.push(`Chave ${chave}: ${saida}`);
  }

  return possibilidades.join("\n");
}

// Atualiza o texto do botão ao selecionar codificar ou decodificar
radiobtn.addEventListener("click", function () {
  if (codificar.checked) {
    btn.innerHTML = "Codificar Mensagem!";
  } else if (decodificar.checked) {
    btn.innerHTML = "Decodificar Mensagem!";
  }
});

// Ação do botão
btn.addEventListener("click", function (event) {
  event.preventDefault();
  if (selecione.value === "cifra") {
    const cifrado = cifraCesar();
    resultado.innerText = cifrado;
    if (codificar.checked) {
      resultadoBruteForce.innerText = bruteForceCifraCesar(cifrado);
    } else {
      resultadoBruteForce.innerText = '';
    }
  }
});
