const fileInput = document.getElementById("file-input");
const messageDisplay = document.getElementById("message");
const textField = document.getElementById("card-text");
const flashCard = document.getElementsByClassName("content-card")[0];
const counterDisplay = document.getElementsByClassName("counter-display")[0];
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");
const shuffleButton = document.getElementById("shuffle-button");

// index of term currently displayed.
let counter = 0;
let termsArray = [];
let shuffledTermsArray = [];
let termSideDisplayed = true;

fileInput.addEventListener("change", handleFileSelection);
flashCard.addEventListener("click", handleCardClick);
nextButton.addEventListener("click", displayNextCard);
previousButton.addEventListener("click", displayPreviousCard);
shuffleButton.addEventListener("click", shuffleDeck);

function resetValues() {
  messageDisplay.textContent = "";
  termsArray = [];
  counter = 0;
  termSideDisplayed = true;
}

// Map text to key/value pairs and display first term.
function mapText(content) {
    // break text into lines
    const lines = content.split(/\r\n|\n|\r/); 

    lines.forEach((line, index) => {
        // break lines into key/value pairs
        const terms = line.split(/:/);
        pair = new Map ();
        if (terms.length == 2) {
            let term = terms[0].trim();
            let def = terms[1].trim();
            pair.set(term, def);
            termsArray.push(pair);
        };
    });
    displayCard();
};

function handleFileSelection(event) {
  const file = event.target.files[0];
  resetValues();

  // Validate file type
  if (!file.type.startsWith("text")) {
    messageDisplay.textContent = "Unsupported file type. Please select a text file.";
    messageDisplay.style.color =  "red";
    return;
  };

  // Read the file
  const reader = new FileReader();
  reader.onload = () => {
    mapText(reader.result);
  };
  reader.onerror = () => {
    showMessage("Error reading the file. Please try again.", "error");
  };
  reader.readAsText(file);
}

// Switch between term and definition being displayed.
function handleCardClick() {
  if (termsArray.length > 0) {
    if (termSideDisplayed == true) {
      termSideDisplayed = false;
    } else {
      termSideDisplayed = true;
    };
    displayCard();
  };
};

function displayNextCard() {
  if (counter < termsArray.length -1) {
    counter = counter + 1;
    termSideDisplayed = true;
    displayCard();
  };
};

function displayPreviousCard() {
  if (counter > 0) {
    counter = counter - 1;
    termSideDisplayed = true;
    displayCard()
  };
};

function displayCard() {
    const iterator = termsArray[counter].entries();
    currentPair = iterator.next().value;
    currentTerm = currentPair[0];
    currentDefinition = currentPair[1];

    if (termSideDisplayed == true) {
      textField.textContent = currentTerm;
    } else {
      textField.textContent = currentDefinition;
    };
    displayCounter();
};

function shuffleDeck() {
  shuffledTermsArray = shuffle(termsArray);
  counter = 0;
  termSideDisplayed = true;
  displayCard();
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
};

function displayCounter() {
  counterDisplay.textContent = `${counter + 1} / ${termsArray.length}`
};