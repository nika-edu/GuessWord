// Variabler som är kopplade till synliga element
// Dessa initieras i funktionen init() nedan.
let correctLettersContainer; // De synliga bokstäverna i det hemliga ordet
let usedLettersContainer; // De använda (felaktiga) bokstäverna
let inputField; // Inmatningsfältet
let guessButton; // Gissa-knappen
let counterContainer; // Visningsfältet för antalet kvarvarande gissningar
let newGameButton; // Nytt Spel-knappen

// Variabler som görs tillgängliga för att
let inputLetter; // Den gissade bokstaven
let secretWord; // Det hemliga ordet

const MAXANTALGISSNINGAR = 10;

// När fönstret laddas så går programmet till funktionen
// init.
window.addEventListener("load", function () {
  init();
});

function init() {
  secretWord = getSecretWord(); // Hämta det hemliga ordet
  console.log(secretWord.split("")); // Enbart debugging
  // Initiera översta raden och knapparna
  correctLettersContainer = document.getElementsByClassName("correct-letters");
  guessButton = document.getElementsByClassName("button")[0];
  newGameButton = document.getElementsByClassName("button")[1];

  usedLettersContainer = document.getElementsByClassName("used-letters")[0];
  counterContainer = document.getElementsByClassName("counter-container")[0];
  counterContainer.textContent = MAXANTALGISSNINGAR;

  // Initiera inmatningsfältet, sätt fokus på detta
  // och ge möjlighet till inmatning med Enter
  inputField = document.getElementsByClassName("form")[0];
  inputField.focus();
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      e.preventDefault();
      evalGuess();
    }
  });

  // Anropar funktionerna som ska köras då "gissa-knappen"
  // respektive "Nytt-spel"-knappen trycks ned.
  guessButton.addEventListener("click", function () {
    evalGuess();
  });
  newGameButton.addEventListener("click", clear);

  usedLettersContainer = document.getElementsByClassName("used-letters")[0];
  usedLettersContainer.textContent = "";

  // Några demonstrationer hur utmatning och utseende av appen
  // kan ställas in med JavaScript-kod.
  // correctLettersContainer[0].textContent = "A";
  // correctLettersContainer[1].textContent = "B";
  // usedLettersContainer.style.background = "green";
  // usedLettersContainer.style.color = "yellow";
  // usedLettersContainer.style.fontSize = "28px";
}

function clear() {
  usedLettersContainer.textContent = "";
  inputField.focus();
}

function getSecretWord() {
  // Här ska det hemliga ordet slumpas fram
  return "hemlig";
}

// Nedanstående funktion körs i samband med att en
// gissning har gjorts. I nuläget så testas enbart
// att ett enda tecken matas in (och inte tomma
// strängen eller flera tecken). Detta tecken kommer
// att läggas till i rutan usedLettersContainer
// (enbart som demo hur utmatningen av tecken
// fungerar). Det behöver läggas till logik för att
// testa om tecknet ingår i det hemliga ordet och i så
// fall på vilken / vilka plats(er). Om det ingår ska
// den eller de positioner på den översta raden
// ersättas med detta tecken, annars ska tecknet in
// i variabeln usedLetters och visas i rutan
// usedLettersContainer.
function evalGuess() {
  console.log("Nu gjordes en gissning!");
  inputLetter = inputField.value.toUpperCase();

  // Om ett enda tecken matats in i formuläret så ska...
  if (inputLetter.length === 1) {
    // ...formuläret tömmas,...
    document.getElementsByClassName("form")[0].value = "";

    // ...tecknet läggas till i usedLetters (detta måste justeras så
    // att det enbart är de tecken som inte ingår i det hemliga ordet
    // som läggs till här, tecken som ingår i ordet ska ju in på rätt
    // plats i correctLetters)
    // usedLetters.push(` ` + inputLetter);
    // usedLettersContainer.textContent = usedLetters;
    usedLettersContainer.textContent += ` ` + inputLetter;

    // Om det inte är exakt ett tecken som formuläret tagit emot så...
  } else {
    // ...töms formuläret...
    document.getElementsByClassName("form")[0].value = "";

    // ...och en informationsruta visas.
    alert("Du ska ange precis EN bokstav i gissningen!");
  }
  inputField.focus();
}
