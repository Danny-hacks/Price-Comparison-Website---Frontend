document.addEventListener("DOMContentLoaded", async () => {
  const bookResults = document.getElementById("bookResults");
  const resultsCount = document.getElementById("results-count");
  const currentPageElement = document.getElementById("currentPage");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");

  let currentPage = 1;
  const pageSize = 8; // Number of items per page

  // Function to get query parameters from the URL
  const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const searchTerm = getQueryParams("q");

  if (!searchTerm) {
    alert("No search term provided. Please go back and enter a search term.");
    return;
  }

  // Function to fetch search results based on searchTerm and page number
  const fetchSearchResults = async (searchTerm, page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?q=${encodeURIComponent(
          searchTerm
        )}&offset=${(page - 1) * pageSize}&numitems=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { count, data: books } = data.results;

      // Clear previous results
      bookResults.innerHTML = "";

      // Update results count
      resultsCount.textContent = `(${count} results found for ${searchTerm})`;

      // Filter books to remove duplicates based on the title
      const uniqueBooks = books.reduce((acc, book) => {
        if (!acc.some((b) => b.title === book.title)) {
          acc.push(book);
        }
        return acc;
      }, []);

      // Iterate over each unique book and create HTML elements
      uniqueBooks.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        bookElement.innerHTML = `
          <img src="${book.image_urls}">
          <div class="book-info">
            <h4 class="book-title">${book.title}</h4>
            <p class="author">${book.author}</p>
            <button class="view-prices-btn" data-title="${book.title}">View Prices</button>
          </div>
        `;

        bookResults.appendChild(bookElement);
      });

      // Add event listeners to each "View Prices" button
      document.querySelectorAll(".view-prices-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const bookTitle = button.getAttribute("data-title");
          window.location.href = `compare_page.html?title=${encodeURIComponent(
            bookTitle
          )}`; // Navigate to compare_page.html with bookTitle
        });
      });

      // Update current page display
      currentPageElement.textContent = `Page ${page}`;
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");
    }
  };

  // Fetch initial search results
  fetchSearchResults(searchTerm, currentPage);

  // Pagination event listeners
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchSearchResults(searchTerm, currentPage);
    }
  });

  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(
      parseInt(resultsCount.textContent.match(/\d+/)[0], 10) / pageSize
    );
    if (currentPage < totalPages) {
      currentPage++;
      fetchSearchResults(searchTerm, currentPage);
    }
  });
});
