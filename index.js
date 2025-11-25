// Select elements from DOM
const bookForm = document.querySelector("#inputSection form");
const bookList = document.querySelector("#bookSection ul");

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
