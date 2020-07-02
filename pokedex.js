//https://pokeapi.co/api/v2/evolution-chain/1 id = 1

const getPokemon = () => {
    let pokeName = document.getElementById("input").value;
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

const showRandomPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon-species/")
        .then(response => response.json())
        .then(data => {
            let id = data.count;
            return id;
        })
        .then(id => {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${Math.floor(Math.random() * id)}`)
                .then(response => response.json())
                .then(data => {
                    alert(data.name)
                })
        })
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
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


document.getElementById("search").addEventListener("click", getPokemon);
document.getElementById("random").addEventListener("click", showRandomPokemon);
document.getElementById("previous").addEventListener("click", showPrevious);
document.getElementById("next").addEventListener("click", showNext)
document.getElementById("evolution").addEventListener("click", evolutions)



