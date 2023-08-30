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

const myLibrary = [];
const form = document.querySelector('form');

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead

    this.toggleRead = function () {
        console.log("toggleRead")
    }
}

function addBookToLibrary(event) {
    // collect all the data from the form
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked ? true : false;

    console.log(`title: ${title} author: ${author} pages ${pages} isread ${isRead}`)
    const newBook = new Book(title, author, pages, isRead);

    //add to my library
    myLibrary.push(newBook);

    //update the table
    updateTable();
}

function updateTable() {
    //update table based on mylibrary content
    const library = document.querySelector(".library-body");
    console.log(library);
    library.innerHTML = '';
    
    let toInsert = '';

    //generate table rows for each item in myLibrary
    myLibrary.forEach((element) => {
        let isRead = element.isRead ? 'already read' : 'not read yet'; 
        console.log(isRead);
        const remove = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

        toInsert +=
            `<tr>
            <td>${element.title}</td>
            <td>${element.author}</td>
            <td>${element.pages}</td>
            <td>${isRead}</td>
            <td><button class="toggle-read">Toggle read</td>
            <td class="remove">${remove}</td>
            </tr>`
    });

    console.log(toInsert);

    library.innerHTML = toInsert;

    //add listeners to newly created items    
    const removeButtons = document.querySelectorAll(".remove");
    console.log(removeButtons);
    
    removeButtons.forEach(item => {
            item.addEventListener("click", event => {
            alert('remove');
        })
    })
    
}

function removeRow(number){
    //how to remove row?
}

form.addEventListener("submit", addBookToLibrary);

window.addEventListener("load", () => {
    const newBook = new Book("Graveyard Book", "Neil Gaiman", 320, true)
    myLibrary.push(newBook);
    updateTable();
});
