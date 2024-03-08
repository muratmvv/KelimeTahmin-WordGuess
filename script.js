const inputs = document.querySelector(".inputs"),
      resetBtn = document.querySelector(".reset-btn"),
      hint = document.querySelector(".hint span"),
      guessLeft = document.querySelector(".guess-left span"),
      wrongLetter = document.querySelector(".wrong-letter span"),
      answerInput = document.querySelector(".answer-input");



let words;
let incorrects = [];
let corrects = [];
let maxGuesses;


const randomWord = () => {
    let randObj = wordList[Math.floor(Math.random() * wordList.length)]
    // console.log(randObj);
    words = randObj.word;
    maxGuesses = 5;
    corrects = [];
    incorrects = [];


    hint.innerText = randObj.hint
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
    console.log(words);

    let html = "";

    for(let i = 0; i < words.length; i++) {
        html += `<input type="text" disabled>`
    }

    inputs.innerHTML = html

}

randomWord()


const initGame = e => {
    let key = e.target.value;
    // console.log(e);

    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(key) && !corrects.includes(key)) {
        // console.log(key);

        if(words.includes(key)) {
            // console.log("harf bulundu");

            for(let i = 0; i < words.length; i++) {
               if(words[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key
               }
            }
        }
        else{
            // console.log("harf bulunamadı");
            maxGuesses--;
            incorrects.push(` ${key} `)
            // console.log(incorrects);
        }
        
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects
    }

    answerInput.value = ""

    setTimeout(() => {
        if(corrects.length === words.length) {
            alert(`Tebrikler! Doğru cevabı buldunuz. Cevabınız: ${words.toUpperCase()}`)
            randomWord()
        }
        else if(maxGuesses < 1) {
            alert("Oyun bitti! Tahmin hakkınız kalmadı");
    
            for(let i = 0; i < words.length; i++) {
                inputs.querySelectorAll("input")[i].value = words[i]
            }
        }
    }, 200)
}

resetBtn.addEventListener("click", randomWord)
answerInput.addEventListener("input", initGame)
document.addEventListener("keydown", () => answerInput.focus())
