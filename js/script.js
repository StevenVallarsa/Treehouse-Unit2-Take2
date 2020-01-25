/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

/* * *
 * Global Variables
 * * */

const list = document.querySelectorAll(".student-item");
const itemPerPage = 10;
const pageNumber = 1; // starting page number
/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

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

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = list => {
  const page = document.querySelector(".page");

  const div = document.createElement("div");
  div.setAttribute("class", "pagintion");

  const ul = document.createElement("ul");

  for (let i = 1; i < list.length / 10; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = i;
    if (i !== pageNumber) {
      // don't make active page clickable
      a.setAttribute("href", "#");
    } else {
      a.className = "active";
    }
    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);
  console.log(div);
};

// Remember to delete the comments that came with this file, and replace them with your own code comments.

showPage(list, 2);
appendPageLinks(list);
