//https://pokeapi.co/api/v2/evolution-chain/1 id = 1
const fetchPoke = pokeName => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.sprites)
            showSprite(data.sprites.front_default)
        })
}
const showSprite = (sprite) => {

    document.getElementsByClassName("hide")[0].style.display = "block";
    document.getElementsByClassName("screen__image")[0].children[0].src = sprite;
    document.getElementsByClassName("screen__image")[0].children[1].src = sprite.replace("pokemon", "pokemon/back")
}

const showSearch = () => {
    document.getElementById("hidden").style.display = "block";
}

const getPokemon = () => {
    let input = document.getElementById("input");
    if(input.value.length === 0) return;
    let pokeName = input.value.toLowerCase();
    input.value = "";

    document.getElementById("hidden").style.display = "none";
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //let sprite = data.sprites.front_default;
            //let screen = document.getElementsByClassName("main-section__black")[0];
            showSprite(data.sprites.front_default)
            /*
            screen.style.background = `url(${sprite})`;
            screen.style.backgroundRepeat = "no-repeat";
            screen.style.backgroundPosition = "center";
            */
        })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

const showRandomPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(response => response.json())
        .then(data => {
            let id = data.count;
            return id;
        })
        .then(id => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${Math.floor(Math.random() * id)}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.name)
                    fetchPoke(data.name)
                })
        })
}
const showPrevious = () => {
    console.log("prev")
}

const showNext = () => {
    console.log("next")
}

const evolutions = () => {
    fetch(`https://pokeapi.co/api/v2/evolution-chain/`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

document.getElementById("temp").addEventListener("click", getPokemon);
document.getElementById("search").addEventListener("click", showSearch);
document.getElementById("random").addEventListener("click", showRandomPokemon);
document.getElementById("previous").addEventListener("click", showPrevious);
document.getElementById("next").addEventListener("click", showNext);