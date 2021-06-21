const countEl = document.getElementById("count")

const countTotalVisit = () => {
    fetch("https://api.countapi.xyz/update/class-routine/tanaf?amount=1")
    .then(res => res.json())
    .then(res => {
        countEl.innerHTML = res.value
    })
}

countTotalVisit()