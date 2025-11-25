// Select elements from DOM
const bookForm = document.querySelector("#inputSection form");
const bookList = document.querySelector("#searchResults tbody");

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
      bookList.innerHTML = '<table></table>'
      addBook(bookData);
    } else {
      throw "Something went wrong with your search.";
    }
  } catch (e) {
    console.log(e);
  }
}

// Define function that creates an item in the results list with the name of the first book found by the API.
// For future reference if we want to start placing the list into a table instead of a list
// function addBook(book) {
//   for (let i = 1; i < 15; i++) {
//     const li = document.createElement("li");
//     const liAuthor = document.createElement("li");
//     li.textContent = book.docs[i].title;
//     bookList.appendChild(li);
//     liAuthor.textContent = book.docs[i].author_name;
//     bookList.appendChild(liAuthor);
//   }
// }

function addBook(book) {
  for (let i = 1; i < 15; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = book.docs[i].title;
    const cell2 = document.createElement("td");
    cell2.textContent = book.docs[i].author_name;
    const cell3 = document.createElement("td");
    cell3.textContent = book.docs[i].first_publish_year;
    const cell4 = document.createElement("td");
    cell4.textContent = book.docs[i].edition_count;
    const cell5 = document.createElement("td");
    cell5.textContent = book.docs[i].has_fulltext;
    //+ book.docs[i].first_publish_year + book.docs[i].title + book.docs[i].has_fulltext;
    bookList.appendChild(row);
    row.appendChild(cell);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
  }
}
