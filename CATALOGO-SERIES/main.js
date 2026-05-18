const form = document.querySelector("#formBusca");
const resultado = document.querySelector("#resultado");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const serie = document.querySelector("#serie").value.trim();

  resultado.innerHTML = "";

  if (serie === "") {
    resultado.textContent = "Digite o nome de uma série.";
    return;
  }

  resultado.textContent = "Carregando...";

  try {

    const resposta = await fetch(
      `https://api.tvmaze.com/search/shows?q=${serie}`
    );

    if (!resposta.ok) {
      throw new Error("Erro na requisição");
    }

    const dados = await resposta.json();

    mostrarSeries(dados);

  } catch (erro) {
    console.error(erro);
    resultado.textContent = "Erro ao buscar séries.";
  }

});


function mostrarSeries(lista) {

  resultado.innerHTML = "";

  if (lista.length === 0) {
    resultado.textContent = "Nenhuma série encontrada.";
    return;
  }

  lista.forEach(item => {

    const serie = item.show;

    const card = document.createElement("div");
    card.classList.add("card");

    if (serie.image) {
      const imagem = document.createElement("img");
      imagem.src = serie.image.medium;
      imagem.alt = serie.name;

      card.appendChild(imagem);

    } else {

      const semImagem = document.createElement("div");
      semImagem.classList.add("sem-imagem");
      semImagem.textContent = "Sem imagem";

      card.appendChild(semImagem);
    }

    const titulo = document.createElement("h2");
    titulo.textContent = serie.name;

    const score = document.createElement("p");
    score.textContent = `Score: ${item.score}`;

    card.appendChild(titulo);
    card.appendChild(score);

    resultado.appendChild(card);

  });

}