const textInput = document.getElementById("text-input");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");
const paraCount = document.getElementById("para-count");
const countButton = document.getElementById("count-button");
const clearButton = document.getElementById("clear-button");
const charLimitInput = document.getElementById("char-limit");
const highlightButton = document.getElementById("highlight-button");
const highlightWordInput = document.getElementById("highlight-word");

countButton.addEventListener("click", countWords);

clearButton.addEventListener("click", clearText);

highlightButton.addEventListener("click", highlightWords);

charLimitInput.addEventListener("input", checkCharacterLimit);

function saveData() {
  localStorage.setItem("text", textInput.value);
  localStorage.setItem("words", wordCount.textContent);
  localStorage.setItem("chars", charCount.textContent);
  localStorage.setItem("paras", paraCount.textContent);
}

function loadData() {
  textInput.value = localStorage.getItem("text") || "";
  wordCount.textContent = localStorage.getItem("words") || "Words: 0";
  charCount.textContent = localStorage.getItem("chars") || "Characters: 0";
  paraCount.textContent = localStorage.getItem("paras") || "Paragraphs: 0";
}

// For count words, characters, and paragraphs
function countWords() {
  const text = textInput.value;
  const words = text.split(/\s+/).filter((word) => word !== "");
  const characters = text.length;
  const paragraphs = text
    .split("\n")
    .filter((para) => para.trim() !== "").length;

  wordCount.textContent = `Words: ${words.length}`;
  charCount.textContent = `Characters: ${characters}`;
  paraCount.textContent = `Paragraphs: ${paragraphs}`;

  saveData();
}

// Function for clear the textarea and counts
function clearText() {
  textInput.value = "";
  wordCount.textContent = "Words: 0";
  charCount.textContent = "Characters: 0";
  paraCount.textContent = "Paragraphs: 0";

  saveData();
}

function highlightWords() {
  const text = textInput.value;
  const wordToHighlight = highlightWordInput.value;
  const highlightedText = text.replace(
    new RegExp(wordToHighlight, "g"),
    '<span class="highlighted">$&</span>'
  );

  textInput.innerHTML = highlightedText;

  saveData();
}

function checkCharacterLimit() {
  const charLimit = parseInt(charLimitInput.value);
  const text = textInput.value;
  const characters = text.length;

  if (charLimit && characters > charLimit) {
    charCount.style.color = "red";
    charCount.textContent = `Characters: ${characters} (Exceeding limit)`;
  } else {
    charCount.style.color = "black";
    charCount.textContent = `Characters: ${characters}`;
  }

  saveData();
}

window.addEventListener("load", loadData);