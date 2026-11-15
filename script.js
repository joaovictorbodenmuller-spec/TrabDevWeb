var nomes = ["Teclado Logitech G316 X 98", "Cadeira Gamer DT3 Sports", 'Monitor Gamer ASUS ROG Swift OLED 27"', "Placa de Vídeo Gigabyte RTX 5060 8GB"];
var precos = [499.9, 1499.9, 4999.9, 2499.9];
var carrinho = [];
var percentual = 0;
var total = 0;

function dinheiro(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function adicionar(numero) {
  carrinho.push(numero);
  mostrar();
}

function remover(posicao) {
  carrinho.splice(posicao, 1);
  mostrar();
}

function mostrar() {
  var lista = "";
  var subtotal = 0;

  for (var i = 0; i < carrinho.length; i++) {
    var numero = carrinho[i];
    lista = lista + "<li>" + nomes[numero] + " - " + dinheiro(precos[numero]) + "<button onclick='remover(" + i + ")'>Remover</button></li>";
    subtotal = subtotal + precos[numero];
  }

  if (carrinho.length == 0) {
    lista = "<li>Seu carrinho está vazio.</li>";
  }

  var desconto = subtotal * percentual / 100;
  var frete = 29.9;

  if (subtotal - desconto >= 1000 || carrinho.length == 0) {
    frete = 0;
  }

  total = subtotal - desconto + frete;

  document.getElementById("lista-carrinho").innerHTML = lista;
  document.getElementById("subtotal").innerHTML = dinheiro(subtotal);
  document.getElementById("desconto").innerHTML = "- " + dinheiro(desconto);
  document.getElementById("frete").innerHTML = frete == 0 ? "Grátis" : dinheiro(frete);
  document.getElementById("total").innerHTML = dinheiro(total);
  document.getElementById("contador").innerHTML = carrinho.length;
}

function aplicarCupom() {
  var codigo = document.getElementById("campo-cupom").value.trim().toUpperCase();
  var msg = document.getElementById("msg-cupom");

  if (codigo == "BSB10") {
    percentual = 10;
    msg.innerHTML = "Cupom aplicado: 10% de desconto!";
  } else if (codigo == "GAMER15") {
    percentual = 15;
    msg.innerHTML = "Cupom aplicado: 15% de desconto!";
  } else {
    percentual = 0;
    msg.innerHTML = "Cupom inválido.";
  }

  mostrar();
}

function comprar() {
  var msg = document.getElementById("msg-compra");

  if (carrinho.length == 0) {
    msg.innerHTML = "Adicione produtos ao carrinho primeiro.";
    msg.style.color = "red";
  } else if (confirm("Confirmar compra de " + dinheiro(total) + "?")) {
    carrinho = [];
    percentual = 0;
    document.getElementById("campo-cupom").value = "";
    document.getElementById("msg-cupom").innerHTML = "";
    msg.innerHTML = "Compra realizada com sucesso! Obrigado por comprar na BSB Store.";
    msg.style.color = "#ff9f1c";
    mostrar();
  }
}

function enviar() {
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var mensagem = document.getElementById("mensagem").value;
  var msg = document.getElementById("msg-form");

  if (nome == "" || email == "" || mensagem == "") {
    msg.innerHTML = "Preencha todos os campos.";
    msg.style.color = "red";
  } else if (email.indexOf("@") == -1) {
    msg.innerHTML = "E-mail inválido.";
    msg.style.color = "red";
  } else {
    msg.innerHTML = "Obrigado, " + nome + "! Mensagem enviada.";
    msg.style.color = "#ff9f1c";
  }
}

mostrar();
