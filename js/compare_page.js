document.addEventListener("DOMContentLoaded", async () => {
  const bookDetailsContainer = document.querySelector(".book-details");
  const buyNowSection = document.querySelector(".buy-now-grid");

  // Function to get query parameters from the URL
  const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const bookTitle = getQueryParams("title");

  if (!bookTitle) {
    alert("No book selected. Please go back and select a book.");
    return;
  }

  // Function to fetch book and comparison details based on book title
  const fetchBookDetails = async (title) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/compare?title=${encodeURIComponent(title)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const book = data.results.book[0];
      const comparisons = data.results.comparison;

      // Format the publication date
      const publicationDate = new Date(book.publication_date);
      const formattedDate = publicationDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Display book details
      const bookInfoHTML = `
          <div class="book-cover">
            <img src="${comparisons[0].image_urls}" alt="Book Cover">
          </div>
          <div class="book-info">
            <h1>${book.title}</h1>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Publication Date:</strong> ${formattedDate}</p>
            <p class="description"><strong>Description:</strong> ${book.description}</p>
          </div>
        `;

      bookDetailsContainer.innerHTML = bookInfoHTML;

      // Display buy now section
      comparisons.forEach((comparison) => {
        const retailerDiv = document.createElement("div");
        retailerDiv.classList.add("retailer");

        const retailerInfoHTML = `
            <img src="${comparison.image_urls}" alt="Book Cover">
            <div class="retailer-info">
              <h3>${book.title}</h3>
              <p><strong>Retailer:</strong> ${comparison.retailer}</p>
              <p><strong>Price:</strong> $${comparison.price}</p>
              <button class="buy-now-btn" onclick="window.location.href='${comparison.urls}'">BUY NOW</button>
            </div>
          `;

        retailerDiv.innerHTML = retailerInfoHTML;
        buyNowSection.appendChild(retailerDiv);
      });
    } catch (error) {
      console.error("Error fetching book details:", error);
      alert("Failed to fetch book details. Please try again.");
    }
  };

  // Fetch and display book details
  fetchBookDetails(bookTitle);
});
