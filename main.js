// constantes de load pro localstore
const diario = JSON.parse(localStorage.getItem("diario")) || {};
let dataAtual = null;

// variavel pra pegar os valores do usuario
let perfil = JSON.parse(localStorage.getItem("perfil")) || {
  nome: "Usuário",
  foto: "assets/perfil.png"
};

// atualizador de informações
document.getElementById("nomePerfil").textContent = perfil.nome;
document.getElementById("fotoPerfil").src = perfil.foto;

// abrir livro sla
document.getElementById("abrirLivro").addEventListener("click", () => {
  const data = document.getElementById("dataSelecionada").value;
  if (!data) return alert("Selecione uma data.");
  dataAtual = data;
  document.getElementById("editor").classList.remove("hidden");
  atualizarPagina();
});

// content saver button
document.getElementById("textoPagina").addEventListener("input", () => {
  diario[dataAtual] = document.getElementById("textoPagina").value;
  localStorage.setItem("diario", JSON.stringify(diario));
});

// filtro pra abrir a data certa
function atualizarPagina() {
  document.getElementById("dataAtual").textContent = dataAtual;
  document.getElementById("textoPagina").value = diario[dataAtual] || "";
}

// função pra arrumar as data
function mudarData(dias) {
  if (!dataAtual) return;
  let novaData = new Date(dataAtual);
  novaData.setDate(novaData.getDate() + dias);
  dataAtual = novaData.toISOString().split("T")[0];
  atualizarPagina();
}

// relação dos botões de navegação
document.getElementById("paginaAnterior").addEventListener("click", () => mudarData(-1));
document.getElementById("paginaSeguinte").addEventListener("click", () => mudarData(1));

// primeira
document.getElementById("primeiraPagina").addEventListener("click", () => {
  const chaves = Object.keys(diario).sort();
  if (chaves.length === 0) return;
  dataAtual = chaves[0];
  atualizarPagina();
});

// última
document.getElementById("ultimaPagina").addEventListener("click", () => {
  const chaves = Object.keys(diario).sort().reverse();
  if (chaves.length === 0) return;
  dataAtual = chaves[0];
  atualizarPagina();
});

// Fechar o livro
document.getElementById("fecharLivro").addEventListener("click", () => {
  document.getElementById("editor").classList.add("hidden");
});

// modal 1
document.getElementById("perfilBtn").addEventListener("click", () => {
  document.getElementById("inputNome").value = perfil.nome;
  document.getElementById("inputFoto").value = perfil.foto;
  document.getElementById("modalPerfil").classList.remove("hidden");
});

// Save content do perfil
document.getElementById("salvarPerfil").addEventListener("click", () => {
  perfil.nome = document.getElementById("inputNome").value || "Usuário";
  perfil.foto = document.getElementById("inputFoto").value || "assets/perfil.png";
  localStorage.setItem("perfil", JSON.stringify(perfil));
  document.getElementById("nomePerfil").textContent = perfil.nome;
  document.getElementById("fotoPerfil").src = perfil.foto;
  document.getElementById("modalPerfil").classList.add("hidden");
});

// alteração de foto de perfil ao clicar e selcionar uma imagem
document.getElementById("inputFotoFile").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result;
      perfil.foto = dataUrl;
      localStorage.setItem("perfil", JSON.stringify(perfil));
      document.getElementById("fotoPerfil").src = dataUrl;
    };
    reader.readAsDataURL(file);
  }
});

// personalizador de cores
function atualizarCores() {
  document.documentElement.style.setProperty('--cor-primaria', document.getElementById('corPrimaria').value);
  document.documentElement.style.setProperty('--cor-secundaria', document.getElementById('corSecundaria').value);
  document.documentElement.style.setProperty('--cor-fonte', document.getElementById('corFonte').value);
}

// atualizador de cores sla
document.getElementById("corPrimaria").addEventListener("input", atualizarCores);
document.getElementById("corSecundaria").addEventListener("input", atualizarCores);
document.getElementById("corFonte").addEventListener("input", atualizarCores);
