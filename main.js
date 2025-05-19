const diario = JSON.parse(localStorage.getItem("diario")) || {};
let dataAtual = null;

let perfil = JSON.parse(localStorage.getItem("perfil")) || {
  nome: "Usuário",
  foto: "assets/perfil.png"
};

document.getElementById("nomePerfil").textContent = perfil.nome;
document.getElementById("fotoPerfil").src = perfil.foto;

document.getElementById("abrirLivro").addEventListener("click", () => {
  const data = document.getElementById("dataSelecionada").value;
  if (!data) return alert("Selecione uma data.");
  dataAtual = data;
  document.getElementById("editor").classList.remove("hidden");
  atualizarPagina();
});

document.getElementById("textoPagina").addEventListener("input", () => {
  diario[dataAtual] = document.getElementById("textoPagina").value;
  localStorage.setItem("diario", JSON.stringify(diario));
});

function atualizarPagina() {
  document.getElementById("dataAtual").textContent = dataAtual;
  document.getElementById("textoPagina").value = diario[dataAtual] || "";
}

function mudarData(dias) {
  if (!dataAtual) return;
  let novaData = new Date(dataAtual);
  novaData.setDate(novaData.getDate() + dias);
  dataAtual = novaData.toISOString().split("T")[0];
  atualizarPagina();
}

document.getElementById("paginaAnterior").addEventListener("click", () => mudarData(-1));
document.getElementById("paginaSeguinte").addEventListener("click", () => mudarData(1));

document.getElementById("primeiraPagina").addEventListener("click", () => {
  const chaves = Object.keys(diario).sort();
  if (chaves.length === 0) return;
  dataAtual = chaves[0];
  atualizarPagina();
});

document.getElementById("ultimaPagina").addEventListener("click", () => {
  const chaves = Object.keys(diario).sort().reverse();
  if (chaves.length === 0) return;
  dataAtual = chaves[0];
  atualizarPagina();
});

document.getElementById("fecharLivro").addEventListener("click", () => {
  document.getElementById("editor").classList.add("hidden");
});

document.getElementById("perfilBtn").addEventListener("click", () => {
  document.getElementById("inputNome").value = perfil.nome;
  document.getElementById("inputFoto").value = perfil.foto;
  document.getElementById("modalPerfil").classList.remove("hidden");
});

document.getElementById("salvarPerfil").addEventListener("click", () => {
  perfil.nome = document.getElementById("inputNome").value || "Usuário";
  perfil.foto = document.getElementById("inputFoto").value || "assets/perfil.png";
  localStorage.setItem("perfil", JSON.stringify(perfil));
  document.getElementById("nomePerfil").textContent = perfil.nome;
  document.getElementById("fotoPerfil").src = perfil.foto;
  document.getElementById("modalPerfil").classList.add("hidden");
});

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

// Personalizador de cores
function atualizarCores() {
  document.documentElement.style.setProperty('--cor-primaria', document.getElementById('corPrimaria').value);
  document.documentElement.style.setProperty('--cor-secundaria', document.getElementById('corSecundaria').value);
  document.documentElement.style.setProperty('--cor-fonte', document.getElementById('corFonte').value);
}

document.getElementById("corPrimaria").addEventListener("input", atualizarCores);
document.getElementById("corSecundaria").addEventListener("input", atualizarCores);
document.getElementById("corFonte").addEventListener("input", atualizarCores);
