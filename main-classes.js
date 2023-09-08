class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleRead = () => {
        this.isRead = !this.isRead;
    };
}

class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary(title,author,pages,isRead) {
        const book = new Book(title,author,pages,isRead)
        this.library.push(book);
    }

    getLibrary () {
        return this.library;
    }

    removeBook(bookIndex) {
        this.library = this.library.filter((books) => books != this.library[bookIndex])
    }
}


class ScreenController{
    constructor(){
        this.myLibrary = new Library();
        this.libraryDiv = document.querySelector(".library-body");
        this.form = document.querySelector("form");
    }

    updateTable() {

        this.libraryDiv.innerHTML = "";

        console.log(this.myLibrary.getLibrary());

        let toInsert = "";

        this.myLibrary.getLibrary().forEach((element, index) => {
            console.log(`library element: ${element}`)
            const isRead = element.isRead ? 'Already read' : 'Not read yet';

            const remove = 
            `<div data-action="remove" class="div-remove">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
            </div>`;

            toInsert =
                `<tr data-attr=${index}>
                <td>${element.title}</td>
                <td>${element.author}</td>
                <td>${element.pages}</td>
                <td>${isRead}</td>
                <td><div data-action="toggle" class="div-toggle"><button class="toggle-read">Toggle</button></div></td>
                <td class="remove" >${remove}</td>
                </tr>`;
        });
        
        this.libraryDiv.innerHTML = toInsert;

    }

    addBook(title,author,pages,isRead){
        this.myLibrary.addBookToLibrary(title,author,pages,isRead);
        console.log(this.myLibrary);
        this.updateTable();
    }

}

const screen = new ScreenController();
screen.addBook("JungleBook","Rudyard Kipling","123",true);