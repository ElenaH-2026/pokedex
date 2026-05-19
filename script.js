const BASE_URL = "https://pokeapi.co/api/v2";
const MAX_AMOUNT = 1025;
let loadingAmount = 5;
let allNamesLoaded = false;
const pokemonDataFetched = {};
const pokemonImageCache = {};
const renderedPokemon = [];

async function init() {
    document.getElementById('#LoadingSpinner').classList.add("loading-spinner");
    await getPokemonsData("id", start=1, end=loadingAmount);
    await getPokemonsData("name", start=1, end=loadingAmount);
    await getPokemonsData("type", start=1, end=loadingAmount);
    await renderPokemonCards(Object.keys(pokemonDataFetched).map(pokeID => Number(pokeID)));
    document.getElementById('#PokemonList').classList.add("d-flex");
    await renderLoadMoreButton(loadingAmount);
    document.getElementById('#LoadingSpinner').classList.remove("loading-spinner");
    await getPokemonsData("id", start=(loadingAmount+1), end=(MAX_AMOUNT-loadingAmount));
    await getPokemonsData("name", start=(loadingAmount+1), end=(MAX_AMOUNT-loadingAmount));
}

// init functions:

async function getPokemonsData(data, start, end) {
    for (let pokeID = start; (pokeID < (start + end)) && (pokeID <= MAX_AMOUNT); pokeID++) {
        if (data == "id") {
            await getOnePokemonId(pokeID);}
        if (data == "name") {
            if (checkPokemonDataIsLoaded(data, pokeID) == false) {
                await getOnePokemonName(pokeID);}
            }
        if (data == "type") {
            if (checkPokemonDataIsLoaded(data, pokeID) == false) {
                await getOnePokemonType(pokeID);}
            }
    }
}

async function getOnePokemonId(pokeID) {
    pokemonDataFetched[pokeID] = await {};
}

async function getOnePokemonName(pokeID) {
    const response = await fetch(`${BASE_URL}/pokemon/${pokeID}`);
    const responseToJson = await response.json();
    pokemonDataFetched[pokeID].responsePokemon = responseToJson;
    pokemonDataFetched[pokeID].name = responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1);
}

async function getOnePokemonType(pokeID) {  
    const types = [];
    for (let indexType = 0; indexType < pokemonDataFetched[pokeID].responsePokemon.types.length; indexType++) {
        types.push(pokemonDataFetched[pokeID].responsePokemon.types[indexType].type.name);
    }
    pokemonDataFetched[pokeID].types = types;
}

function pushPokemonImageToCache(pokeID, name, type1, type2) {
    return new Promise((resolve, reject) => {
        if (pokemonImageCache[pokeID]) {
            resolve(pokemonImageCache[pokeID]);
            return;
        }
        const img = new Image();
        img.role = `button`;
        img.style = `background: linear-gradient(to right top, var(--${type1}) 0 40%, var(--${type2}) 60% 100%)`;
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`;
        img.alt = `${name}`;
        img.onload = () => {
            pokemonImageCache[pokeID] = img;
            resolve(img);
        };
        img.onerror = reject;
    });
}

async function renderPokemonCards(currentArray) {
    for (let index = 0; index < currentArray.length; index++) {
        const pokeID = currentArray[index];
        await renderOnePokemonCard(pokeID);}
}

async function renderOnePokemonCard(pokeID) {
    const name = pokemonDataFetched[pokeID].name;
    const types = pokemonDataFetched[pokeID].types;
    const type1 = types[0];
    let type2 = (types.length == 2) ? types[1] : type1;
    const pokeImage = await pushPokemonImageToCache(pokeID, name, type1, type2);
    document.getElementById('#PokemonList').innerHTML += await templatePokemonCard(pokeID, name);
    document.getElementById(`#Image${pokeID}`).appendChild(pokeImage);
    await renderPokemonTypes(pokeID, types, '#Types');

    if (!renderedPokemon.includes(pokeID)) {
        await renderedPokemon.push(pokeID);}
}

function renderPokemonTypes(pokeID, types, typesID) {
    for (let indexType = 0; indexType < types.length; indexType++) {
        document.getElementById(`${typesID}${pokeID}`).innerHTML += templatePokemonTypes(types[indexType]);}
}

// helping functions:

function clearPokemonList() {
    document.getElementById('#PokemonList').innerHTML = "";
}

function sortRenderedPokemon() {
    renderedPokemon.sort((a, b) => a-b);
}

function checkPokemonDataIsLoaded(data, pokeID) {
    return pokemonDataFetched[pokeID].hasOwnProperty(data) ? true : false;
}

// async function checkPokemonRendered(pokeID) {
//     if (!renderedPokemon.includes(pokeID)) {
//         await getAndRenderOnePokemonCard(pokeID);}
// }

async function getAndRenderOnePokemonCard(pokeID) {
    await getOnePokemonName(pokeID);
    await getOnePokemonType(pokeID);
    await renderOnePokemonCard(pokeID);
}

function checkForLoadMoreButton() {
    (renderedPokemon.length < MAX_AMOUNT) ? renderLoadMoreButton(loadingAmount) : renderMessageMaxAmount();
}

function pressEnter(event, task) {
    let key = event.key;
    if (key == "Enter") {
        if (task == "search") {
            checkSearchInput()
        }
        if (task == "loadMore") {
            loadMorePokemon()
        }
    }
}

// search functions:

async function checkSearchInput() {
    document.getElementById('#LoadingSpinner').classList.add("loading-spinner");
    const searchInput = document.getElementById('#Search').value.trim().split(" ").join("").toLowerCase();
    await clearPokemonList();
    if (searchInput.length >= 3) {
        await searchForPokemon(searchInput);
    } else {
        await renderMessageMinLetters();
    }
    await renderShowAllLoadedPokemonButton();
    document.getElementById('#Search').value = "";
    document.getElementById('#LoadingSpinner').classList.remove("loading-spinner");
}

async function searchForPokemon(searchInput) {
    const searchArrayIDs = [];
    await removeLoadMoreShowAllButton();
    await clearMessageMinLetters();
    await checkAllPokemonsNameLoaded();
    for (let pokeID = 1; pokeID <= MAX_AMOUNT; pokeID++) {
        if (pokemonDataFetched[pokeID].name.toLowerCase().includes(searchInput)) {
            await searchArrayIDs.push(pokeID);
            if (!pokemonDataFetched[pokeID].hasOwnProperty("types")) {
                await getOnePokemonType(pokeID);}
        }
    };
    (searchArrayIDs.length > 0) ? await renderPokemonCards(searchArrayIDs) : await renderMassageNoPokemonsFound(searchInput);
}

async function checkAllPokemonsNameLoaded() {
    if (!allNamesLoaded) {
        await loadAllPokemonsName();}
}

function renderMassageNoPokemonsFound(searchInput) {
    document.getElementById('#NoPokemonsFound').innerHTML = `Sorry, there are no Pokémon with "${searchInput}"!`;
}

function renderMessageMinLetters() {
    document.getElementById('#NoPokemonsFound').innerHTML = `Please enter at least 3 letters for search.`;
}

function clearMessageMinLetters() {
    document.getElementById('#NoPokemonsFound').innerHTML = ``;
}

async function loadAllPokemonsName() {
    for (let pokeID = 1; pokeID <= MAX_AMOUNT; pokeID++) {
        if (!pokemonDataFetched[pokeID].hasOwnProperty("name")) {
            await getOnePokemonName(pokeID);}
    };
    allNamesLoaded = true;
}

async function showAllLoadedPokemon() {
    document.getElementById('#LoadingSpinner').classList.add("loading-spinner");
    await removeLoadMoreShowAllButton();
    await clearPokemonList();
    await clearMessageMinLetters();
    await sortRenderedPokemon();
    await renderPokemonCards(renderedPokemon);
    await checkForLoadMoreButton();
    document.getElementById('#LoadingSpinner').classList.remove("loading-spinner");
}

// load more functions:

async function loadMorePokemon() {
    document.getElementById('#LoadingSpinner').classList.add("loading-spinner");
    loadingAmount = parseInt(document.getElementById('#LoadingAmount').value);
    const missingAmount = MAX_AMOUNT - renderedPokemon.length;
    const loading = (loadingAmount < missingAmount) ? loadingAmount : missingAmount;
    await removeLoadMoreShowAllButton();
    await checkForLoadingGap(loading);
    await checkForLoadMoreButton();
    document.getElementById('#LoadingSpinner').classList.remove("loading-spinner");   
}

async function checkForLoadingGap(loading) {
    await sortRenderedPokemon();
    if (renderedPokemon[renderedPokemon.length-1] == renderedPokemon.length) {
        const start = renderedPokemon.length+1;
        await renderLoadingRequest(start, loading);
        return;
    }
    for (let index = 1; index < renderedPokemon.length; index++) {
        const gap = renderedPokemon[index] - renderedPokemon[index-1];
        if (gap == 1) {
            continue;}
        if (gap > 1 && gap > loading) {
            const start = renderedPokemon[index-1]+1;
            await renderLoadingRequest(start, loading);
            return;}
        if (gap > 1 && gap < loading) {
            const start = renderedPokemon[index-1]+1;
            const missingLoading = loading - (gap-1);
            await renderLoadingRequest(start, gap-1)
            checkForLoadingGap(missingLoading);
            return;}
    }
}

async function renderLoadingRequest(start, loading) {
    const toRender = [];
    for (let i = 0; i < loading; i++) {
        await toRender.push(start + i);}
    await getPokemonsData("type", start, loading);
    await renderPokemonCards(toRender);
}

// load more button functions:

function removeLoadMoreShowAllButton() {
    document.getElementById('#LoadMoreButton').innerHTML = "";
}

function renderShowAllLoadedPokemonButton() {
    document.getElementById('#LoadMoreButton').innerHTML = 
        templateShowAllLoadedPokemonButton();
}

function renderLoadMoreButton(loadingAmount) {
    document.getElementById('#LoadMoreButton').innerHTML = 
        templateLoadMoreButton(loadingAmount);
}

function renderMessageMaxAmount() {
    document.getElementById('#LoadMoreButton').innerHTML = 
        `You have already loaded all ${MAX_AMOUNT} Pokémon.`;
}

// overlay functions:

function showDialog(pokeID) {
    document.getElementById('#Dialog').showModal();
    renderPokemonOverlay(pokeID, '#TypesOverlay');
}

function hideButtonPreviousNextPokemon() {
    document.getElementById('#ButtonPreviousPokemon').classList.add("d-none");
    document.getElementById('#ButtonNextPokemon').classList.add("d-none");
}

async function renderPokemonOverlay(pokeID) {
    const name = pokemonDataFetched[pokeID].name;
    const types = pokemonDataFetched[pokeID].types;
    const type1 = types[0];
    let type2 = (types.length == 2) ? types[1] : type1;
    document.getElementById('#PokemonOverlay').innerHTML = await templatePokemonOverlay(pokeID, name, type1, type2);
    document.getElementById('#LoadingSpinnerOverlay').classList.add("loading-spinner");
    await renderPokemonTypes(pokeID, types, '#TypesOverlay');
    await renderEvolutionChain(pokeID);
    document.getElementById('#LoadingSpinnerOverlay').classList.remove("loading-spinner");
}

async function renderPreviousOrNextPokemonOverlay(pokeID, direction) {
    document.getElementById('#LoadingSpinnerOverlay').classList.add("loading-spinner");
    await hideButtonPreviousNextPokemon();
    if (pokeID == 1 && direction == 'previous') {
        // await checkPokemonRendered(MAX_AMOUNT);
        await renderPokemonOverlay(MAX_AMOUNT);
        return;
    };
    if (pokeID == MAX_AMOUNT && direction == 'next') {
        await renderPokemonOverlay(1);
        return;
    }
    const newPokeID = (direction == 'next') ? pokeID + 1 : pokeID - 1;
    // await checkPokemonRendered(newPokeID);
    await renderPokemonOverlay(newPokeID);
    document.getElementById('#LoadingSpinnerOverlay').classList.remove("loading-spinner");
}

function closeDialog() {
    document.getElementById('#Dialog').close();
}

// evolution chain functions

async function renderEvolutionChain(pokeID) {
    await checkEvolutionChainLoaded(pokeID);
    if (pokemonDataFetched[pokeID].evolutionChain.length == 1) {
        document.getElementById(`#EvolutionChain${pokeID}`).innerHTML = 'This Pokémon has no evolution chain.';
    } else {
        for (let i = 0; i < pokemonDataFetched[pokeID].evolutionChain.length; i++) {
            const chainPokeID = pokemonDataFetched[pokeID].evolutionChain[i];
            if (checkPokemonDataIsLoaded("name", chainPokeID) == false) {
                await getOnePokemonName(chainPokeID);}
            if (checkPokemonDataIsLoaded("type", chainPokeID) == false) {
                await getOnePokemonType(chainPokeID);}
            const name = pokemonDataFetched[chainPokeID].name;
            const types = pokemonDataFetched[chainPokeID].types;
            const type1 = types[0];
            let type2 = (types.length == 2) ? types[1] : type1;
            document.getElementById(`#EvolutionChain${pokeID}`).innerHTML += templateEvolutionChain(chainPokeID, name, type1, type2);
        }
    }
}

async function checkEvolutionChainLoaded(pokeID) {
    if (!pokemonDataFetched[pokeID].hasOwnProperty("evolutionChain")) {
        await getEvolutionChain(pokeID);}
}

async function getEvolutionChain(pokeID) {
    const response = await fetch(`${BASE_URL}/pokemon-species/${pokeID}`);
    const responseToJson = await response.json();  
    const evolutionResponse = await fetch(responseToJson.evolution_chain.url)
    const evolutionToJson = await evolutionResponse.json();  
    await addEvolutionDataToPokemonData(pokeID, evolutionToJson);
}

async function addEvolutionDataToPokemonData(pokeID, evolutionToJson) {
    const evolutionChain = [];
    const base = parseInt(evolutionToJson.chain.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
    await evolutionChain.push(base);

    if (evolutionToJson.chain.evolves_to.length > 0) {
        const stage1 = parseInt(evolutionToJson.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
        await evolutionChain.push(stage1);
    
        if (evolutionToJson.chain.evolves_to[0].evolves_to.length > 0) {
            const stage2 = parseInt(evolutionToJson.chain.evolves_to[0].evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
            await evolutionChain.push(stage2);
        }
    }
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
    pokemonDataFetched[pokeID].evolutionChain = evolutionChain;
}