function templatePokemonCard (pokeID, name, type1, type2) {
    return `
        <li class="pokemon-card">
                <img role="button"
                    style="background: linear-gradient(to right top, var(--${type1}) 0 40%, var(--${type2}) 60% 100%)"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png" 
                    alt="${name}">
                <h2>${name}</h2>
                <div id="#Types${pokeID}">
                </div>
            </li>`
}

function templatePokemonTypes(type) {
    return `
        <span style="background-color: var(--${type})">
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