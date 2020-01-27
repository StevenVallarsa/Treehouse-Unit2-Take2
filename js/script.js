/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/* * *
 * Global Variables
 * * */

const list = document.querySelectorAll(".student-item");
const itemPerPage = 10;
let pageNumber = 1; // starting page number

/* * *
 * Function to set display property to show or no show on each list item
 * * */

const showPage = (list, page) => {
  let startIndex = page * itemPerPage - itemPerPage;
  let endIndex = page * itemPerPage;

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

  const numberOfPages = Math.ceil(list.length / itemPerPage);
  console.log(numberOfPages);
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

  div.appendChild(ul);
  page.appendChild(div);
  let pageClick = document.querySelector(".pagination");

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

// create search button
const search = document.querySelector(".page-header");

const searchDiv = document.createElement("div");
searchDiv.className = "student-search";
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search for students...";
const searchButton = document.createElement("button");
searchButton.textContent = "Search";
searchButton.className = "submit";
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
search.appendChild(searchDiv);

const searchButtonClick = document.querySelector(".submit");
const h3 = document.querySelectorAll("h3");

//search button listener
searchButtonClick.addEventListener("click", e => {
  e.preventDefault();
  let newList = [];
  let searchTerm = searchInput.value;
  console.log(searchTerm);
  for (let i = 0; i < list.length; i++) {
    if (
      searchInput.value.length !== 0 &&
      h3[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      list[i].style.display = "";
      newList.push(list[i]);
    } else {
      list[i].style.display = "none";
    }
  }
  searchInput.value = "";
  deletePaginationLinks();
  appendPageLinks(newList);
});

// function searchFunction() {
//    let count = 0;
//    for (let i = 0; i < list.length; i++) {
//       list[i].className = "none";
//       if (
//          searchInput.value.length !== 0 &&
//          list[i].textContent.toLowerCase.includes(searchInput.value.toLowerCase())
//          ) {
//             list[i].className = "";
//             count++;
//          }
//       }
//       if (count === 0) {
//       }
//    }

// Runs script on first load.
// Other iterations will be done through the appendPageLink function.

showPage(list, pageNumber);
appendPageLinks(list);
