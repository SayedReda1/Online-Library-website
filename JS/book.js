// Selecting all elements
const bookImage = document.querySelector("#book-image");
const zoomContainer = document.querySelector(".zoom-container");
const zoomedImage = document.querySelector("#zoomed-image");
const bookTitle = document.querySelector(".book-title > h1");
const bookAuthor = document.querySelector(".book-title > p");
const categoryField = document.querySelector("#category-field");
const dateField = document.querySelector("#date-field");
const statusBanner = document.querySelector("#status-banner");
const statusIco = document.querySelector("#status-icon");
const statusBlock = document.querySelector("#status-block");
const descriptionBox = document.querySelector(".description > p");
const userId = parseInt(window.sessionStorage.getItem("user_id")); // NaN means that current user didn't login
let id = -1;


// -------- Fetching page info based on book id
function checkId(id) {
    let books = JSON.parse(window.localStorage.getItem("books"));
    if (books && id < books.length && id >= 0) {
        return true;
    } else {
        return false;
    }
}

function showMessage(msg) {
    let msgBox = document.querySelector('.msg-box');
    msgBox.innerHTML = msg;

    // Show
    msgBox.classList.toggle('active');

    // Go
    setTimeout(() => {
        msgBox.classList.remove('active');
    }, 3000);
}

function checkVisitor() {
    // Checks the type of user to display and un-display stuff
    let userId = parseInt(window.sessionStorage.getItem("user_id"));
    if (userId !== NaN) {
        let userObj = JSON.parse(window.localStorage.getItem("users"))[userId];
        if (userObj.isAdmin) {
            // Search for the book in his list of added books
            for (let bookId of userObj.books) {
                if (bookId == id) {
                    // Adding remove and edit buttons
                    let parser = new DOMParser();
                    document.querySelector(".image-side").appendChild(
                        parser.parseFromString(
                            '<div class="admin-btns"><button id="edit-btn"><span class="material-symbols-rounded">edit</span>Edit</button><button id="remove-btn"><span class="material-symbols-rounded">delete</span>Remove</button></div>',
                            'text/html'
                        )
                    );

                    // Adding functionality
                    document.getElementById('edit-btn').addEventListener("click", () => {
                        window.location.href = `edit_book.html?id=${id}`;
                    });
                    document.getElementById('remove-btn').addEventListener("click", removeCurrentBook);
                }
            }
        }
    }
}

function removeCurrentBook() {
    // Showing a warning message

    // ----- Removing from all books
    let books = JSON.parse(window.localStorage.getItem("books"));
    books.splice(id, 1);

    // Returning back to JSON;
    window.localStorage.setItem("books", JSON.stringify(books));

    // ----- Remove from admin books
    let admin = JSON.parse(window.localStorage.getItem("users"))[userId];
    for (let i = 0; i < admin.books.length; ++i) {
        if (admin.books[i] == id) {
            admin.books.splice(i, 1);
        }
    }

    // Showing the message
    showMessage(`${bookTitle.innerHTML} has been deleted successfully`);
}

function fetchData(id) {
    let books = JSON.parse(window.localStorage.getItem("books"));
    let currentBook = books[id];
    // Updating page details
    bookImage.src = currentBook.imageURL;
    zoomedImage.src = currentBook.imageURL;
    bookTitle.innerHTML = currentBook.title;
    bookAuthor.innerHTML = currentBook.author;
    categoryField.innerHTML = currentBook.category;
    dateField.innerHTML = currentBook.publishDate;
    descriptionBox.innerHTML = currentBook.description;

    if (currentBook.availability) {
        statusBanner.innerHTML = "available";
        statusBlock.innerHTML =
            '<span class="material-symbols-rounded" id="status-icon">mood</span>available';
        statusBanner.style.backgroundColor = "#56cb5b";
        statusBlock.style.backgroundColor = "#56cb5b";
    } else {
        statusBanner.innerHTML = "unavailable";
        statusBlock.innerHTML =
            '<span class="material-symbols-rounded" id="status-icon">sentiment_dissatisfied</span>unavailable';
        statusBanner.style.backgroundColor = "#dd4034";
        statusBlock.style.backgroundColor = "#dd4034";
    }
}

function fetchID() {
    let psearch = new URLSearchParams(window.location.search);
    return parseInt(psearch.get("id"));
}

// Adding the zooming event to book image in-case of wide screen
if (screen.width > 768 && checkId(id)) {
    bookImage.addEventListener("mousemove", (e) => {
        // Showing the container
        zoomContainer.style.display = "block";

        // Extracting the current width and height
        let width = parseFloat(window.getComputedStyle(bookImage).width);
        let height = parseFloat(window.getComputedStyle(bookImage).height);

        // Extracting the current mouse position portion
        let x = e.offsetX / width;
        let y = e.offsetY / height;

        // Preserving x & y in the container
        if (x >= 0.95) {
            x = 0.95;
        }
        if (y >= 0.935) {
            y = 0.935;
        }

        // Zooming the current part
        zoomedImage.style.transform = `translate(-${x * 100 * 0.6}%, -${
            y * 100 * 0.8
        }%)`;
    });

    bookImage.addEventListener("mouseleave", (e) => {
        zoomContainer.style.display = "none";
    });
}

// -------------------- Main ---------------------
if (checkId(id)) {
    // check the type of visitor
    checkVisitor();

    // fetching the data
    fetchData(id);
}