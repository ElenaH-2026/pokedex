function templatePokemonCard (pokeID, name, type1, type2) {
    return `
        <li class="pokemon-card">
            <div id="#Image${pokeID}" onclick="showDialog(${pokeID}, '${name}', '${type1}', '${type2}')"></div>
            <h2>${name}</h2>
            <div id="#Types${pokeID}"></div>
        </li>`
}

function templatePokemonTypes(type) {
    return `
        <span class="span-type" style="background-color: var(--${type})">
            ${type}
        </span>`
}

function templateLoadMoreButton(loadingAmount) {
    return `
        <button onclick="loadMorePokemon()"
            class="btn-load-more">
            Load ${loadingAmount} more
        </button>`
}

function templatePokemonOverlay(pokeID, name, type1, type2) {
    return `
        <header class="overlay-header">
            <span>#${pokeID}</span>
            <button onclick="closeDialog()"
                class="btn-icon">
                <img src="./assets/icons/close.svg" 
                alt="close overlay">
            </button>
        </header>
        <section>
            <h3 class="border-big">${name}</h3>
            <img style="filter: drop-shadow(-12px 12px 12px var(--${type1})) drop-shadow(12px -12px 12px var(--${type2}))"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png" 
                alt="${name}">
            <div>
                <button onclick="renderPreviousPokemonOverlay(${pokeID}, '${name}', '${type1}', '${type2}')"
                    class="btn-icon btn-reverse">
                    <img src="./assets/icons/arrow-back.svg" 
                    alt="previous Pokémon">
                </button>
                <div id="#TypesOverlay${pokeID}"></div>
                <button onclick="renderNextPokemonOverlay(${pokeID}, '${name}', '${type1}', '${type2}')"
                    class="btn-icon">
                    <img src="./assets/icons/arrow-forward.svg" 
                    alt="next Pokémon">
                </button>
            </div>
        </section>`
}