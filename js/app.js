// make navbar sticky

let nav = document.querySelector("nav");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

// document.addEventListener("DOMContentLoaded", async () => {
//   // ...

//   const handleViewPricesClick = (bookId) => {
//     window.location.href = `compare_page.html?id=${bookId}`;
//   };

//   // Example event listener for a button click
//   document.querySelectorAll(".view-prices-btn").forEach((button) => {
//     button.addEventListener("click", () => {
//       const bookId = button.getAttribute("data-id");
//       handleViewPricesClick(bookId);
//     });
//   });

//   // ...
// });

// //search results & pagination
// let thisPage = 1;
// let limit = 6;
// let list = document.querySelectorAll(".book-results .book");

// function loadItem() {
//   let beginGet = limit * (thisPage - 1);
//   let endGet = limit * thisPage - 1;
//   list.forEach((item, key) => {
//     if (key >= beginGet && key <= endGet) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";
//     }
//   });
//   listPage();
// }
// loadItem();
// function listPage() {
//   let count = Math.ceil(list.length / limit);
//   document.querySelector(".listPage").innerHTML = "";

//   if (thisPage != 1) {
//     let prev = document.createElement("li");
//     prev.innerText = "PREV";
//     prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
//     document.querySelector(".listPage").appendChild(prev);
//   }

//   for (i = 1; i <= count; i++) {
//     let newPage = document.createElement("li");
//     newPage.innerText = i;
//     if (i == thisPage) {
//       newPage.classList.add("active");
//     }
//     newPage.setAttribute("onclick", "changePage(" + i + ")");
//     document.querySelector(".listPage").appendChild(newPage);
//   }

//   if (thisPage != count) {
//     let next = document.createElement("li");
//     next.innerText = "NEXT";
//     next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
//     document.querySelector(".listPage").appendChild(next);
//   }
// }
// function changePage(i) {
//   thisPage = i;
//   loadItem();
// }
// //  display number of search results
// document.addEventListener("DOMContentLoaded", () => {
//   const books = document.querySelectorAll(".book");
//   const resultsCount = document.getElementById("results-count");
//   resultsCount.textContent = `Search Results: ${books.length}`;
// });
