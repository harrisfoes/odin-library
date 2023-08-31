/*
- write a function that loops through the array and displays each book on the page
- display them as a table or each on their own card
- add a NEW BOOK button that brings up a form allowing users to input the details for the new book:
 - author, title, number of pages, whether it's been read
 - you may want to explore the dialog tag
- add a button on each book's display to remove the book from the library
    - use data attribute which corresponds to the index of the library array
- add a button on each book's display to change its read status
*/

let myLibrary = [];
const form = document.querySelector('form');

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead

    this.toggleRead = function () {
        console.log("toggleRead")
        this.isRead = !isRead;
    }
}

function addBookToLibrary(event) {
    // collect all the data from the form
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked ? true : false;

    //console.log(`title: ${title} author: ${author} pages ${pages} isread ${isRead}`)
    const newBook = new Book(title, author, pages, isRead);

    //add to my library
    myLibrary.push(newBook);

    //update the table
    updateTable();
}

function updateTable() {
    //update table based on mylibrary content
    const library = document.querySelector(".library-body");
    //console.log(library);
    library.innerHTML = '';
    
    let toInsert = '';
    let index = 0;

    //generate table rows for each item in myLibrary
    myLibrary.forEach((element) => {
        let isRead = element.isRead ? 'already read' : 'not read yet'; 
        //console.log(isRead);
        const remove = 
            `<div data-action="remove" class="div-remove">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
            </div>`;

        toInsert +=
            `<tr data-attr=${index}>
            <td>${element.title}</td>
            <td>${element.author}</td>
            <td>${element.pages}</td>
            <td>${isRead}</td>
            <td><div data-action="toggle" class="div-toggle"><button class="toggle-read">Toggle</button></div></td>
            <td class="remove" >${remove}</td>
            </tr>`;

        index++;
    });

    //console.log(toInsert);
    library.innerHTML = toInsert;

    //adding listeners to dynamically created stuff
    library.addEventListener("click", function(event){

        //relevant divs have data attributes named action
        const action = event.target.closest("div").dataset.action;
        console.log(action);

        //VERY IMPORTANT, stop bubbling immediately, or else the function will call again
        event.stopImmediatePropagation();

        if(action == "remove"){
            console.log("removetriggered")
            removeRow(event);
        }
    });
}

function removeRow(event){
    //how to remove row?
    //console.log(remove);
    console.log(event.target.closest("tr").dataset.attr)
    const indexOfRowtoRemove = event.target.closest("tr").dataset.attr;

    //slice + concat is used to remove an item in the array safely
    const removeUpTo = myLibrary.slice(0,indexOfRowtoRemove);
    const afterRemoved = myLibrary.slice(indexOfRowtoRemove + 1)
    const newMyLibrary = removeUpTo.concat(afterRemoved);
    console.log(`index of removed: ${indexOfRowtoRemove} removeUpTo: ${removeUpTo} afterRemoved: ${afterRemoved}`)
    console.log(newMyLibrary);
    myLibrary = newMyLibrary;

    updateTable();
}

form.addEventListener("submit", addBookToLibrary);

window.addEventListener("load", () => {
    const newBook = new Book("Graveyard Book", "Neil Gaiman", 320, true)
    myLibrary.push(newBook);
    updateTable();
});
