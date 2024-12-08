// Hiragana dictionaries
const simpleHiragana = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo", "ん": "n"
};

const dakuten = {
    "が": "ga", "ぎ": "gi", "ぐ": "gu", "げ": "ge", "ご": "go",
    "ざ": "za", "じ": "ji", "ず": "zu", "ぜ": "ze", "ぞ": "zo",
    "だ": "da", "ぢ": "ji", "づ": "zu", "で": "de", "ど": "do",
    "ば": "ba", "び": "bi", "ぶ": "bu", "べ": "be", "ぼ": "bo"
};

const handakuten = {
    "ぱ": "pa", "ぴ": "pi", "ぷ": "pu", "ぺ": "pe", "ぽ": "po"
};

const smallHiragana = {
    "きゃ": "kya", "きゅ": "kyu", "きょ": "kyo",
    "しゃ": "sha", "しゅ": "shu", "しょ": "sho",
    "ちゃ": "cha", "ちゅ": "chu", "ちょ": "cho",
    "にゃ": "nya", "にゅ": "nyu", "にょ": "nyo",
    "ひゃ": "hya", "ひゅ": "hyu", "ひょ": "hyo",
    "みゃ": "mya", "みゅ": "myu", "みょ": "myo",
    "りゃ": "rya", "りゅ": "ryu", "りょ": "ryo",
    "ぎゃ": "gya", "ぎゅ": "gyu", "ぎょ": "gyo",
    "じゃ": "ja", "じゅ": "ju", "じょ": "jo",
    "びゃ": "bya", "びゅ": "byu", "びょ": "byo",
    "ぴゃ": "pya", "ぴゅ": "pyu", "ぴょ": "pyo"
};



// Active dictionary for testing
let currentDict = { ...simpleHiragana }; // Default to Simple Hiragana

// Initialize variables
let score = 0;
let attempts = 0;
let currentHiragana = "";
let correctAnswers = 0; // Track correct answers for percentage

// Get references to DOM elements
const hiraganaChar = document.getElementById("hiragana-char");
const userInput = document.getElementById("user-input");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const percentDisplay = document.getElementById("percentage"); // New element for percentage
const submitBtn = document.getElementById("submit-btn");
const simpleCheckbox = document.getElementById("cb4-9");
const dakutenCheckbox = document.getElementById("dakuten");
const handakutenCheckbox = document.getElementById("handakuten");
const smallCheckbox = document.getElementById("small");

// Function to set the active dictionary based on selected checkboxes
function setCategory() {
    currentDict = {};
    if (simpleCheckbox.checked) {
        currentDict = { ...currentDict, ...simpleHiragana };
    }
    if (dakutenCheckbox.checked) {
        currentDict = { ...currentDict, ...dakuten };
    }
    if (handakutenCheckbox.checked) {
        currentDict = { ...currentDict, ...handakuten };
    }
    if (smallCheckbox.checked) {
        currentDict = { ...currentDict, ...smallHiragana };
    }
    if (Object.keys(currentDict).length === 0) {
        // Default to Simple Hiragana if no checkbox is selected
        currentDict = { ...simpleHiragana };
    }
    pickRandomHiragana(); // Refresh with a new hiragana
}

// Function to pick a random hiragana
function pickRandomHiragana() {
    const keys = Object.keys(currentDict);
    currentHiragana = keys[Math.floor(Math.random() * keys.length)];
    hiraganaChar.textContent = currentHiragana;
}

// Function to check the user's guess
function checkGuess() {
    const userGuess = userInput.value.trim().toLowerCase();
    attempts++;
    attemptsDisplay.textContent = attempts;

    if (userGuess === currentDict[currentHiragana]) {
        score++;
        correctAnswers++; // Increment correct answers
        scoreDisplay.textContent = score;
        feedback.textContent = "Correct! Great job!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Incorrect. The correct answer is '${currentDict[currentHiragana]}'.`;
        feedback.style.color = "#ff4d4d"; // Bright red
    }

    userInput.value = ""; // Clear input
    pickRandomHiragana(); // Pick a new character

    updatePercentage(); // Update percentage after each attempt
}

// Function to update the percentage score
function updatePercentage() {
    const percentage = attempts > 0 ? Math.floor((correctAnswers / attempts) * 100) : 0;
    percentDisplay.textContent = ` ${percentage}%`; // Display percentage as a whole number
}


// Event listeners
submitBtn.addEventListener("click", checkGuess);
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});
simpleCheckbox.addEventListener("change", setCategory);
dakutenCheckbox.addEventListener("change", setCategory);
handakutenCheckbox.addEventListener("change", setCategory);
smallCheckbox.addEventListener("change", setCategory);

// Initialize the game
setCategory();
