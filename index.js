// Select elements from DOM
const bookForm = document.querySelector("#inputSection form");
const bookList = document.querySelector("#searchResults ul");

// Add an event listener to submit button that fetches book data using API
bookForm.addEventListener("submit", extractBook);

// Define function that takes input and calls fetch function on that input.
function extractBook(e) {
  e.preventDefault();
  fetchBookData(e.target.bookInput.value);
  e.target.bookInput.value = "";
}

// Define asynchronous function that uses API to fetch data about the book the user searched for.
async function fetchBookData(book) {
  try {
    const respData = await fetch(
      `https://openlibrary.org/search.json?q=${book}`
    );
    if (respData.ok) {
      const bookData = await respData.json();
      addBook(bookData);
    } else {
      throw "Something went wrong with your search.";
    }
  } catch (e) {
    console.log(e);
  }
}

// Define function that creates an item in the results list with the name of the first book found by the API.

function addBook(book) {
  for (let i = 9; i < 15; i++) {
    const li = document.createElement("li");
    li.textContent = book.docs[i].title;
    bookList.appendChild(li);
  }
}
