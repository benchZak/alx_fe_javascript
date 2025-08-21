// Initial quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// ✅ Required: showRandomQuote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
}

// ✅ Required: addQuote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();   // ✅ Persist to localStorage

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Update DOM immediately
  quoteDisplay.innerHTML = `"${text}" — <em>${category}</em>`;
}

// ✅ Required: createAddQuoteForm
function createAddQuoteForm() {
  const container = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.id = "newQuoteText";
  inputText.type = "text";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.id = "newQuoteCategory";
  inputCategory.type = "text";
  inputCategory.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);

  container.appendChild(inputText);
  container.appendChild(inputCategory);
  container.appendChild(addBtn);

  document.body.appendChild(container);

  // ✅ Add export/import buttons dynamically in createAddQuoteForm:
  
  const exportBtn = document.createElement("button");
exportBtn.textContent = "Export Quotes";
exportBtn.addEventListener("click", exportToJsonFile);

const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = ".json";
importInput.addEventListener("change", importFromJsonFile);

container.appendChild(exportBtn);
container.appendChild(importInput);

}

// ✅ Event listener for Show New Quote button
newQuoteBtn.addEventListener("click", showRandomQuote);

// ✅ Call createAddQuoteForm so the form is added dynamically
createAddQuoteForm();
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) quotes = JSON.parse(stored);
}

// Load saved quotes at startup
loadQuotes();

