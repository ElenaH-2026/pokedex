function templatePokemonCard (pokeID, name) {
    return `
        <li class="pokemon-card">
            <div id="#Image${pokeID}" onclick="showDialog(${pokeID})"></div>
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
            Load
        </button>
        <input id="#LoadingAmount" class="input-loading-amount" 
            type="number" name="loading amount" 
            value=${loadingAmount} required
            onkeyup="pressEnter(event, 'loadMore')">
        <button onclick="loadMorePokemon()"
            class="btn-load-more">
            more
        </button>`
}

function templateShowAllLoadedPokemonButton() {
    return `
        <button onclick="showAllLoadedPokemon()"
            class="btn-load-more">
            Show all loaded Pokémon
        </button>`
}

function templatePokemonOverlay(pokeID, name, type1, type2, height, weight, hp, attack, defense) {
    return `
        <header class="overlay-header">
            <span>#${pokeID}</span>
            <button onclick="closeDialog()"
                class="btn-icon">
                <img src="./assets/icons/close.svg" 
                alt="close overlay">
            </button>
        </header>
        <img id="#LoadingSpinnerOverlay"
            class="d-none"
            src="./assets/icons/pokeball-green.svg" 
            alt="Poké Ball"> 
        <section>
            <h3 class="border-big">${name}</h3>
            <div class="pokemon-details-container-parent">
                <div class="hide-mobile pokemon-details-container-child">
                    <p class="border-big">height:<br><b>${height}</b></p>
                    <div id="#TypesOverlay${pokeID}"></div>
                    <p class="border-big">weight:<br><b>${weight}</b></p>
                </div>
                <div class="pokemon-details-container-child-img">
                    <img style="filter: drop-shadow(-12px 12px 12px var(--${type1})) drop-shadow(12px -12px 12px var(--${type2}))"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png" 
                        alt="${name}">
                    <div class="show-mobile" id="#TypesOverlayMobile${pokeID}"></div>
                </div>
                <div class="hide-mobile pokemon-details-container-child">
                    <p class="border-big">hp:<br><b>${hp}</b></p>
                    <p class="border-big">attack:<br><b>${attack}</b></p>
                    <p class="border-big">defense:<br><b>${defense}</b></p>
                </div>
                <div class="show-mobile pokemon-details-container-child border-big">
                    <p>height:<br><b>${height}</b></p>
                    <p>weight:<br><b>${weight}</b></p>
                    <p>hp:<br><b>${hp}</b></p>
                    <p>attack:<br><b>${attack}</b></p>
                    <p>defense:<br><b>${defense}</b></p>                   
                </div>
            </div>
            
            <div class="overlay-arrow-container">
                <button onclick="renderPreviousOrNextPokemonOverlay(${pokeID}, 'previous')"
                    id="#ButtonPreviousPokemon"
                    class="btn-icon btn-reverse">
                    <img src="./assets/icons/arrow-back.svg" 
                    alt="previous Pokémon">
                </button>
                <div>
                    <h4 class="border-big">Evolution Chain</h4>
                </div>
                    <button onclick="renderPreviousOrNextPokemonOverlay(${pokeID}, 'next')"
                    id="#ButtonNextPokemon"
                    class="btn-icon">
                    <img src="./assets/icons/arrow-forward.svg" 
                    alt="next Pokémon">
                </button>
            </div>
            <div>
                <ul id="#EvolutionChain${pokeID}"
                    class="evolution-chain">
                </ul>
            </div>
        </section>`
}

function templateEvolutionChain(chainPokeID, name, type1, type2) {
    return `
        <li>
            <h4>${name}</h4>
            <img onclick="showDialog(${chainPokeID})"
                role="button"
                style="filter: drop-shadow(-4px 4px 4px var(--${type1})) drop-shadow(4px -4px 4px var(--${type2}))"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chainPokeID}.png" 
                alt="${name}">
        </li>`
}