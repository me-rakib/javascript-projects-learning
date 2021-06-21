const bg = document.getElementById("bg")
const pass = document.getElementById("pass")

pass.addEventListener("input", (e) => {
    const value = e.target.value
    const length = value.length
    const blurValue = 20 - length*2

    bg.style.filter = `blur(${blurValue}px)`
})