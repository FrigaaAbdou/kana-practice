

// Hiragana dictionaries
const simpleHiragana = {
    "ア": "a", "イ": "i", "ウ": "u", "エ": "e", "オ": "o",
    "カ": "ka", "キ": "ki", "ク": "ku", "ケ": "ke", "コ": "ko",
    "サ": "sa", "シ": "shi", "ス": "su", "セ": "se", "ソ": "so",
    "タ": "ta", "チ": "chi", "ツ": "tsu", "テ": "te", "ト": "to",
    "ナ": "na", "ニ": "ni", "ヌ": "nu", "ネ": "ne", "ノ": "no",
    "ハ": "ha", "ヒ": "hi", "フ": "fu", "ヘ": "he", "ホ": "ho",
    "マ": "ma", "ミ": "mi", "ム": "mu", "メ": "me", "モ": "mo",
    "ヤ": "ya", "ユ": "yu", "ヨ": "yo",
    "ラ": "ra", "リ": "ri", "ル": "ru", "レ": "re", "ロ": "ro",
    "ワ": "wa", "ヲ": "wo", "ン": "n"
};

const dakuten = {
    "ガ": "ga", "ギ": "gi", "グ": "gu", "ゲ": "ge", "ゴ": "go",
    "ザ": "za", "ジ": "ji", "ズ": "zu", "ゼ": "ze", "ゾ": "zo",
    "ダ": "da", "ヂ": "ji", "ヅ": "zu", "デ": "de", "ド": "do",
    "バ": "ba", "ビ": "bi", "ブ": "bu", "ベ": "be", "ボ": "bo",
    "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po"
};

const handakuten = {
    "パ": "pa", "ピ": "pi", "プ": "pu", "ペ": "pe", "ポ": "po"
};

const smallHiragana = {
    "キャ": "kya", "キュ": "kyu", "キョ": "kyo",
    "シャ": "sha", "シュ": "shu", "ショ": "sho",
    "チャ": "cha", "チュ": "chu", "チョ": "cho",
    "ニャ": "nya", "ニュ": "nyu", "ニョ": "nyo",
    "ヒャ": "hya", "ヒュ": "hyu", "ヒョ": "hyo",
    "ミャ": "mya", "ミュ": "myu", "ミョ": "myo",
    "リャ": "rya", "リュ": "ryu", "リョ": "ryo",
    "ギャ": "gya", "ギュ": "gyu", "ギョ": "gyo",
    "ジャ": "ja", "ジュ": "ju", "ジョ": "jo",
    "ビャ": "bya", "ビュ": "byu", "ビョ": "byo",
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
