// document.addEventListener("DOMContentLoaded", async () => {
//   const searchForm = document.getElementById("searchForm");
//   const searchInput = document.getElementById("searchInput");
//   const popularBooksContainer = document.getElementById("popular-books");

//   // Function to fetch and display popular books
//   const fetchPopularBooks = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/all-books");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       let books = data.results;

//       // Shuffle the books array
//       books = books.sort(() => Math.random() - 0.5);

//       // Get the first 4 books from the shuffled array
//       const popularBooks = books.slice(0, 4);

//       popularBooksContainer.innerHTML = ""; // Clear any existing content

//       popularBooks.forEach((book) => {
//         const bookDiv = document.createElement("div");
//         bookDiv.classList.add("book");

//         const bookImg = document.createElement("img");
//         bookImg.src = book.image_urls; // Assuming your API response structure
//         bookDiv.appendChild(bookImg);

//         const bookInfoDiv = document.createElement("div");
//         bookInfoDiv.classList.add("book-info");
//         bookDiv.appendChild(bookInfoDiv);

//         const bookTitle = document.createElement("h4");
//         bookTitle.classList.add("book-title");
//         bookTitle.textContent = book.title;
//         bookInfoDiv.appendChild(bookTitle);

//         const bookAuthor = document.createElement("p");
//         bookAuthor.classList.add("author");
//         bookAuthor.textContent = book.author;
//         bookInfoDiv.appendChild(bookAuthor);

//         const viewPricesBtn = document.createElement("button");
//         viewPricesBtn.classList.add("view-prices-btn");
//         viewPricesBtn.textContent = "View Prices";
//         viewPricesBtn.addEventListener("click", () => {
//           handleViewPricesClick(book.id);
//         });
//         bookInfoDiv.appendChild(viewPricesBtn);

//         popularBooksContainer.appendChild(bookDiv);
//       });
//     } catch (error) {
//       console.error("Error fetching popular books:", error);
//     }
//   };

//   // Fetch and display popular books on page load
//   fetchPopularBooks();

//   // Function to handle "View Prices" button click
//   const handleViewPricesClick = (bookId) => {
//     window.location.href = `compare_page.html?id=${bookId}`;
//   };

//   // Search form submission event listener
//   searchForm.addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent form submission

//     const searchTerm = searchInput.value.trim();
//     if (searchTerm === "") {
//       alert("Please enter a search term.");
//       return;
//     }

//     // Redirect to the search results page with the search term as a query parameter
//     window.location.href = `search_results_page.html?q=${encodeURIComponent(
//       searchTerm
//     )}`;
//   });
// });

document.addEventListener("DOMContentLoaded", async () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const popularBooksContainer = document.getElementById("popular-books");

  // Function to fetch and display popular books
  const fetchPopularBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/all-books");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let books = data.results;

      // Shuffle the books array
      books = books.sort(() => Math.random() - 0.5);

      // Get the first 4 books from the shuffled array
      const popularBooks = books.slice(0, 4);

      popularBooksContainer.innerHTML = ""; // Clear any existing content

      popularBooks.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        const bookImg = document.createElement("img");
        bookImg.src = book.image_urls; // Assuming your API response structure
        bookDiv.appendChild(bookImg);

        const bookInfoDiv = document.createElement("div");
        bookInfoDiv.classList.add("book-info");
        bookDiv.appendChild(bookInfoDiv);

        const bookTitle = document.createElement("h4");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = book.title;
        bookInfoDiv.appendChild(bookTitle);

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("author");
        bookAuthor.textContent = book.author;
        bookInfoDiv.appendChild(bookAuthor);

        const viewPricesBtn = document.createElement("button");
        viewPricesBtn.classList.add("view-prices-btn");
        viewPricesBtn.textContent = "View Prices";
        viewPricesBtn.addEventListener("click", () => {
          handleViewPricesClick(book.title);
        });
        bookInfoDiv.appendChild(viewPricesBtn);

        popularBooksContainer.appendChild(bookDiv);
      });
    } catch (error) {
      console.error("Error fetching popular books:", error);
    }
  };

  // Fetch and display popular books on page load
  fetchPopularBooks();

  // Function to handle "View Prices" button click
  const handleViewPricesClick = (bookTitle) => {
    window.location.href = `compare_page.html?title=${encodeURIComponent(
      bookTitle
    )}`;
  };

  // Search form submission event listener
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") {
      alert("Please enter a search term.");
      return;
    }

    // Redirect to the search results page with the search term as a query parameter
    window.location.href = `search_results_page.html?q=${encodeURIComponent(
      searchTerm
    )}`;
  });
});
