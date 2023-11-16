const loading = document.getElementById("loading");
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

function showLoading() {
  loading.style.display = "block";
}

function hideLoading() {
  loading.style.display = "none";
}

showLoading();

function loadPokemon(offset, limit) {
  function applyPokemonColors(types) {
    const root = document.documentElement;
    const primaryColor = `--${types[0]}-primary`;
    const secondaryColor = `--${types[1]}-primary`;

    root.style.setProperty("--primary-color", `var(${primaryColor})`);

    if (types[1]) {
      root.style.setProperty("--secondary-color", `var(${secondaryColor})`);
      return `linear-gradient(to bottom right, var(${primaryColor}), var(${secondaryColor}))`;
    } else {
      root.style.removeProperty("--secondary-color");
      return `linear-gradient(to bottom right, var(${primaryColor}), var(--${types[0]}-secondary)`;
    }
  }

  function formatPokemonId(id) {
    return String(id).padStart(4, "0");
  }

  function convertPokemonToLi(pokemon) {
    const type = pokemon.types;
    const formattedId = formatPokemonId(pokemon.id);
    const capitalizedFirstLetter =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const capitalizedFirstType =
      type[0].charAt(0).toUpperCase() + type[0].slice(1);
    const capitalizedSecondType = type[1]
      ? type[1].charAt(0).toUpperCase() + type[1].slice(1)
      : "";
    const typeColor = type[1] ? type.join(" ") : type[0];
    const backgroundStyle = applyPokemonColors(type);

    return `
    <li id="${
      pokemon.id
    }" class="pokemon ${typeColor}" style="background: ${backgroundStyle}">
      <span class="number">#${formattedId}</span>
      <span class="name">${capitalizedFirstLetter}</span>
  
      <div class="detail">
        <ol class="types">
          <li class="type ${type[0]}">
            <img src="../assets/images/types/${type[0]}.svg" />
            ${capitalizedFirstType}
          </li>
          ${
            type.length > 1
              ? `<li class="type ${type[1]}">
                <img src="../assets/images/types/${type[1]}.svg" />
                ${capitalizedSecondType}
              </li>`
              : ""
          }
        </ol>
  
        <img
          src="${pokemon.image}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
    `;
  }

  pokeApi.getPokemons(offset, limit).then((allPokemons = []) => {
    const randomTime = Math.random() * (2000 - 1000) + 1000;
    const newHtml = allPokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newHtml;
    setTimeout(hideLoading, randomTime);
  });
}

loadPokemon(offset, limit);
