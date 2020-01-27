/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/* * *
 * Global Variables
 * * */

const list = document.querySelectorAll(".student-item");
const itemsPerPage = 10;
let pageNumber = 1; // starting page number

/* * *
 * Function to set display property to show or no show on each list item
 * * */

const showPage = (list, page) => {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i++) {
    if (i + 1 > startIndex && i < endIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

/* * *
 * Function to add pagination to bottom of list
 * Includes click handler function to make non-active page buttons clickable
 * * */

const appendPageLinks = list => {
  const page = document.querySelector(".page");
  const numberOfPages = Math.ceil(list.length / itemsPerPage);
  const div = document.createElement("div");
  div.setAttribute("class", "pagination");
  const ul = document.createElement("ul");

  for (let i = 1; i <= numberOfPages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = i;
    if (i !== pageNumber) {
      // does not set href attribute to active page so as not to make it clickable
      a.setAttribute("href", "#");
    } else {
      a.className = "active";
    }
    li.appendChild(a);
    ul.appendChild(li);
  }

  if (list.length === 0) {
    ul.textContent = "Sorry, no matches. Please try again.";
  }

  div.appendChild(ul);
  page.appendChild(div);

  const pageClick = document.querySelector(".pagination");

  pageClick.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      pageNumber = parseInt(e.target.innerHTML);
      showPage(list, pageNumber);

      deletePaginationLinks();
      appendPageLinks(list);
    }
  });
};

function deletePaginationLinks() {
  const deletePagination = document.querySelector(".page");
  const ulChild = deletePagination.lastChild;
  deletePagination.removeChild(ulChild);
}

/* * *
 * Create search / reset buttons
 * * */

const searchFunction = () => {
  const search = document.querySelector(".page-header");

  const searchDiv = document.createElement("div");
  searchDiv.className = "student-search";
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search for students...";
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchButton.className = "submit";
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.className = "reset";
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
  searchDiv.appendChild(resetButton);
  search.appendChild(searchDiv);

  const searchButtonClick = document.querySelector(".submit");
  const resetButtonClick = document.querySelector(".reset");
  const h3 = document.querySelectorAll("h3");

  // search button listener
  searchButtonClick.addEventListener("click", e => {
    e.preventDefault();
    const newList = [];
    let searchTerm = searchInput.value;
    for (let i = 0; i < list.length; i++) {
      if (
        searchInput.value.length !== 0 &&
        h3[i].textContent
          .toLowerCase()
          .includes(searchInput.value.toLowerCase())
      ) {
        list[i].style.display = "";
        newList.push(list[i]);
      } else {
        list[i].style.display = "none";
      }
    }

    // reset button listener
    resetButtonClick.addEventListener("click", () => {
      pageNumber = 1;
      showPage(list, 1);
      deletePaginationLinks();
      appendPageLinks(list);
    });

    searchInput.value = "";
    pageNumber = 1;
    showPage(newList, 1);
    deletePaginationLinks();
    appendPageLinks(newList);
  });
};

// Runs scripts on load.
// Other iterations will be done through the appendPageLink function.
showPage(list, pageNumber);
searchFunction();
appendPageLinks(list);
