const btn = document.getElementById("get-joke")
const showJokes = document.getElementById("jokes")

async function generateJoke() {
    const apiRes = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            'Accept': 'application/json'
        }
    })

    const jokes = await apiRes.json()
    console.log(jokes)
    showJokes.innerHTML = jokes.joke 
}

generateJoke()
btn.addEventListener('click', generateJoke)