// DOM elements
const resultEl = document.getElementById("result")
const lengthEL = document.getElementById("length")
const uppercaseEl = document.getElementById("uppercase")
const lowercaseEl = document.getElementById("lowercase")
const numbersEl = document.getElementById("numbers")
const symbolsEl = document.getElementById("symbols")
const generateEl = document.getElementById("generate")
const clipboardEl = document.getElementById("clipboard")


const randomFunction = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Generate event listener
generateEl.addEventListener("click", () => {
    const length = +lengthEL.value //convert string to number

    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length)
})

// Generate password function
function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = ""

    const typesCount = upper + lower + number + symbol
    const typesArr = [ {upper}, {lower}, {number}, {symbol} ].filter(item => Object.values(item)[0])  // filtered out unchecked object

    if(typesCount === 0) {
        alert("Please check at least one box")
        return ""
    }

    for(let i = 0; i <  length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunction[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}

// Copy password to clipboard
clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea")
    const pwd = result.innerText

    if(!pwd){
        return
    }

    textarea.value = pwd
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
    alert(`${pwd} copied to clipboard`)
})

// Generator Functions - https://net-comber.com/charset.html
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = `!@#$%^&*()[]{}=<>/`
    return symbols[Math.floor(Math.random() * symbols.length)]
}