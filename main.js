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

function Book(title, author, pages, isRead){
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead

        this.toggleRead = function(){
            console.log("toggleRead")
        }
}
 
function addBookToLibrary(event) {
    // do stuff here
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked ? true : false;
    
    console.log(`title: ${title} author: ${author} pages ${pages} isread ${isRead}`)

    const newBook = new Book(title,author,pages,isRead);
    myLibrary.push(newBook);
}

form.addEventListener("submit", addBookToLibrary);
