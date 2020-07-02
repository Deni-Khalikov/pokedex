//https://pokeapi.co/api/v2/evolution-chain/1 id = 1

const getPokemon = () => {
    let pokeName = document.getElementById("input").value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
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
            fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * id)}`)
                .then(response => response.json())
                .then(data => {
                    alert(data.name)
                })
        })
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
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



document.getElementById("search").addEventListener("click", getPokemon);
document.getElementById("random").addEventListener("click", showRandomPokemon);
document.getElementById("previous").addEventListener("click", showPrevious);
document.getElementById("next").addEventListener("click", showNext)




