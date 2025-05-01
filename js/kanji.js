/* kanji.js ─ quiz Kanji
   ➜  Change JSON file when user selects level (N5-N1)
   Folder structure (relative to this script):
        ../asset/data/kanji/lvl1.json   ← N5
        ../asset/data/kanji/lvl2.json   ← N4
        ../asset/data/kanji/lvl3.json   ← N3
        ../asset/data/kanji/lvl4.json   ← N2
        ../asset/data/kanji/lvl5.json   ← N1
   JSON shape:
        { "question": "山", "options": [...], "answer": "Mountain (yama)" }
*/

const PATH_BASE = "../asset/data/kanji/";

/* DOM ---------------------------------------------------------------- */
const levelSel = document.getElementById("level-select");
const qBox     = document.getElementById("question");
const fbBox    = document.getElementById("feedback");
const buttons  = [...document.querySelectorAll(".option")];
const nextBtn  = document.querySelector(".next-btn");
const scoGood  = document.getElementById("sc-correct");
const scoTry   = document.getElementById("sc-attempt");
const scoPct   = document.getElementById("sc-percent");

/* Map niveau → fichier JSON ------------------------------------------ */
const FILE_MAP = { N5: "lvl1.json", N4: "lvl2.json", N3: "lvl3.json",
                   N2: "lvl4.json", N1: "lvl5.json" };

/* État ---------------------------------------------------------------- */
let questions = [];   // questions du niveau courant
let idx = 0, good = 0, tried = 0;

/* Initialisation ------------------------------------------------------ */
loadLevel(levelSel.value);
levelSel.addEventListener("change", () => loadLevel(levelSel.value));

/* Charge fichier, réinitialise score, affiche 1re question */
function loadLevel(lvl) {
  fetch(PATH_BASE + FILE_MAP[lvl])
    .then(r => r.json())
    .then(json => {
      questions = shuffle(json.slice());
      idx = good = tried = 0;
      updateScore();
      nextBtn.style.visibility  = "visible";
      buttons.forEach(b => (b.style.visibility = "visible"));
      showQuestion();
    })
    .catch(() => qBox.textContent = "⚠ error loading " + FILE_MAP[lvl]);
}

/* Affiche la question courante --------------------------------------- */
function showQuestion() {
  if (idx >= questions.length) {
    qBox.textContent = `Finished! Score ${good}/${tried}`;
    fbBox.textContent = "";
    buttons.forEach(b => (b.style.visibility = "hidden"));
    nextBtn.style.visibility = "hidden";
    return;
  }

  const q = questions[idx];
  qBox.textContent = q.question;

  const opts = shuffle(q.options.slice());
  buttons.forEach((btn, i) => {
    btn.textContent     = opts[i];
    btn.dataset.correct = (opts[i] === q.answer);
    btn.disabled = false;
    btn.classList.remove("good", "bad");
  });

  fbBox.textContent = "";
  nextBtn.disabled = true;
}

/* Clic sur une option ------------------------------------------------- */
buttons.forEach(btn => btn.addEventListener("click", e => {
  const correct = e.target.dataset.correct === "true";
  tried++; if (correct) good++;
  updateScore();

  if (correct) {
    fbBox.textContent = "✅ Correct!";
  } else {
    const right = buttons.find(b => b.dataset.correct === "true");
    fbBox.textContent = `❌ Wrong! Answer: ${right.textContent}`;
    right.classList.add("good");
    e.target.classList.add("bad");
  }

  buttons.forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.classList.add("good");
  });

  nextBtn.disabled = false;
}));

/* Bouton Next --------------------------------------------------------- */
nextBtn.addEventListener("click", () => { idx++; showQuestion(); });

/* Mise à jour ligne score -------------------------------------------- */
function updateScore() {
  scoGood.textContent = good;
  scoTry.textContent  = tried;
  scoPct.textContent  = tried ? Math.round((100 * good) / tried) + "%" : "0%";
}

/* Shuffle util -------------------------------------------------------- */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


/* Burger menu --------------------------------------------------------- */
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", ()=>{
    burger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", ()=>{
      burger.classList.remove("active");
      navLinks.classList.remove("open");
    })
  );
