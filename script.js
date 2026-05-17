const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const MAX_AMOUNT = 1025;
let loadingAmount = 5;
const pokemonDataFetched = {};
const pokemonImageCache = {};
const renderedPokemon = [];

async function init() {
    await document.getElementById('#LoadingSpinner').classList.add("loading-spinner");
    await getPokemonsId(start=1, end=loadingAmount);
    await getPokemonsName(start=1, end=loadingAmount);
    await getPokemonsType(start=1, end=loadingAmount);
    await renderPokemonCards(Object.keys(pokemonDataFetched).map(pokeID => Number(pokeID)));
    await renderLoadMoreButton(loadingAmount);
    await document.getElementById('#LoadingSpinner').classList.remove("loading-spinner");
    await getPokemonsId(start=(loadingAmount+1), end=(MAX_AMOUNT-loadingAmount));
}

function getPokemonsId(start, end) {
    for (let pokeID = start; (pokeID < (start + end)) && (pokeID <= MAX_AMOUNT); pokeID++) {
        getOnePokemonId(pokeID);
    };
}

function getOnePokemonId(pokeID) {
    pokemonDataFetched[pokeID] = {};
}

function getPokemonsName(start, end) {
    for (let pokeID = start; (pokeID < (start + end)) && (pokeID <= MAX_AMOUNT); pokeID++) {
        getOnePokemonName(pokeID);
    };
}

async function getOnePokemonName(pokeID) {
    const response = await fetch(`${BASE_URL}/${pokeID}`);
    const responseToJson = await response.json();       
    pokemonDataFetched[pokeID].name = responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1);
}

async function getPokemonsType(start, end) {
    for (let pokeID = start; (pokeID < (start + end)) && (pokeID <= MAX_AMOUNT); pokeID++) {
        await getOnePokemonType(pokeID);
    };
}

async function getOnePokemonType(pokeID) {
    const response = await fetch(`${BASE_URL}/${pokeID}`);
    const responseToJson = await response.json();       
    const types = [];

    for (let indexType = 0; indexType < responseToJson.types.length; indexType++) {
        types.push(responseToJson.types[indexType].type.name);
    }
    pokemonDataFetched[pokeID].types = types;
}

async function getAndRenderOnePokemonCard(pokeID) {
    await getOnePokemonName(pokeID);
    await getOnePokemonType(pokeID);
    await renderOnePokemonCard(pokeID);
}

async function renderPokemonCards(currentArray) {
    for (let index = 0; index < currentArray.length; index++) {
        const pokeID = currentArray[index];
        await renderOnePokemonCard(pokeID);
    };
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
        await renderedPokemon.push(pokeID);
    }
}

function renderPokemonTypes(pokeID, types, typesID) {
    for (let indexType = 0; indexType < types.length; indexType++) {
        document.getElementById(`${typesID}${pokeID}`).innerHTML += templatePokemonTypes(types[indexType]);
    };
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

let allNamesLoaded = false;

async function checkAllPokemonNamesLoaded() {
    for (let pokeID = 1; pokeID <= MAX_AMOUNT; pokeID++) {
        if (!pokemonDataFetched[pokeID].hasOwnProperty("name")) {
            await getOnePokemonName(pokeID);
        };
    };
    allNamesLoaded = true;
}

async function searchForPokemon() {
    await removeLoadMoreButton();
    await document.getElementById('#LoadingSpinner').classList.add("loading-spinner");
    if (!allNamesLoaded) {
        await checkAllPokemonNamesLoaded()
    };
    const searchArrayIDs = [];
    const searchArrayNames = [];
    for (let pokeID = 1; pokeID <= MAX_AMOUNT; pokeID++) {
        if (pokemonDataFetched[pokeID].name.toLowerCase().includes("rat")) {
            await searchArrayIDs.push(pokeID);
            // await searchArrayNames.push(pokemonDataFetched[pokeID].name);
            if (!pokemonDataFetched[pokeID].hasOwnProperty("types")) {
                await getOnePokemonType(pokeID);
            }
        }      
    }
    // await console.log(searchArrayIDs);
    // await console.log(searchArrayNames);
    document.getElementById('#PokemonList').innerHTML = "";
    await renderPokemonCards(searchArrayIDs); 
    await document.getElementById('#LoadingSpinner').classList.remove("loading-spinner");
}


async function loadMorePokemon() {
    await removeLoadMoreButton();
    await document.getElementById('#LoadingSpinner').classList.add("loading-spinner");
    const missingAmount = MAX_AMOUNT - renderedPokemon.length;
    const loading = (loadingAmount < missingAmount) ? loadingAmount : missingAmount;
    await checkForLoadingGap(loading);
    await document.getElementById('#LoadingSpinner').classList.remove("loading-spinner");
    await checkForLoadMoreButton();
}

async function checkForLoadingGap(loading) {
    await renderedPokemon.sort((a, b) => a-b);
    if (renderedPokemon[renderedPokemon.length-1] == renderedPokemon.length) {
        const start = renderedPokemon.length+1;
        await renderLoadingRequest(start, loading);
        return;
    };
    for (let index = 1; index < renderedPokemon.length; index++) {
        const gap = renderedPokemon[index] - renderedPokemon[index-1];
        if (gap == 1) {
            continue;
        };
        if (gap > 1 && gap > loading) {
            const start = renderedPokemon[index-1]+1;
            await renderLoadingRequest(start, loading);
            return;
        };
        if (gap > 1 && gap < loading) {
            const start = renderedPokemon[index-1]+1;
            const missingLoading = loading - (gap-1);
            await renderLoadingRequest(start, gap-1)
            checkForLoadingGap(missingLoading);
            return;
        };
    };
}

async function renderLoadingRequest(start, loading) {
    const toRender = [];
    for (let i = 0; i < loading; i++) {
        await toRender.push(start + i);        
    }
    await getPokemonsName(start, loading);
    await getPokemonsType(start, loading);
    await renderPokemonCards(toRender);
}

function checkForLoadMoreButton() {
    (renderedPokemon.length < MAX_AMOUNT) ? renderLoadMoreButton(loadingAmount) : renderMessageMaxAmount();
}

function renderLoadMoreButton(loadingAmount) {
    document.getElementById('#LoadMoreButton').innerHTML = 
        templateLoadMoreButton(loadingAmount);
}

function removeLoadMoreButton() {
    document.getElementById('#LoadMoreButton').innerHTML = "";
}

function renderMessageMaxAmount() {
    document.getElementById('#LoadMoreButton').innerHTML = 
        `You have already loaded all ${MAX_AMOUNT} Pokémon.`;
}

function changeLoadingAmount() {
    loadingAmount = parseInt(document.getElementById('#LoadingAmount').value);
    checkForLoadMoreButton();
}

function pressKeyEnter(event) {
    let key = event.key;
    if (key == "Enter") {
        changeLoadingAmount();
        loadMorePokemon();
    };
}

function showDialog(pokeID) {
    document.getElementById('#Dialog').showModal();
    renderPokemonOverlay(pokeID, '#TypesOverlay');
}

async function renderPokemonOverlay(pokeID) {
    const name = pokemonDataFetched[pokeID].name;
    const types = pokemonDataFetched[pokeID].types;
    const type1 = types[0];
    let type2 = (types.length == 2) ? types[1] : type1;

    document.getElementById('#PokemonOverlay').innerHTML = await templatePokemonOverlay(pokeID, name, type1, type2);
    await renderPokemonTypes(pokeID, types, '#TypesOverlay');
}

function hideButtonPreviousNextPokemon() {
    document.getElementById('#ButtonPreviousPokemon').classList.add("d-none");
    document.getElementById('#ButtonNextPokemon').classList.add("d-none");
}

async function renderPreviousPokemonOverlay(pokeID) {
    await hideButtonPreviousNextPokemon();
    await document.getElementById('#LoadingSpinnerOverlay').classList.add("loading-spinner");
    if (pokeID == 1) {
        if (!renderedPokemon.includes(MAX_AMOUNT)) {
            await getAndRenderOnePokemonCard(MAX_AMOUNT);
        };
        await renderPokemonOverlay(MAX_AMOUNT);
        return;
    };
    const previousPokeID = pokeID - 1;
    if (!renderedPokemon.includes(previousPokeID)) {
        await getAndRenderOnePokemonCard(previousPokeID);
    };
    await renderPokemonOverlay(previousPokeID);
    await document.getElementById('#LoadingSpinnerOverlay').classList.remove("loading-spinner");
}

async function renderNextPokemonOverlay(pokeID) {
    await hideButtonPreviousNextPokemon();
    await document.getElementById('#LoadingSpinnerOverlay').classList.add("loading-spinner");
    if (pokeID == MAX_AMOUNT) {
        await renderPokemonOverlay(1);
        return;
    };
    const nextPokeID = pokeID + 1;
    if (!renderedPokemon.includes(nextPokeID)) {
        await getAndRenderOnePokemonCard(nextPokeID);
    };
    await renderPokemonOverlay(nextPokeID);
    await document.getElementById('#LoadingSpinnerOverlay').classList.remove("loading-spinner");
}

function closeDialog() {
    document.getElementById('#Dialog').close();
}

