let open_eye = document.getElementById("open-eye");
let close_eye = document.getElementById("close-eye");
let password = document.getElementById("password-input");

open_eye.onclick = close_eye.onclick = function()
{
    if(password.type == "password")
    {
        password.type = "text"
        open_eye.style.display = "flex";
        close_eye.style.display = "none";
        
    }
    else
    {
        password.type = "password";
        open_eye.style.display = "none";
        close_eye.style.display = "flex";
    }
}

let user = document.getElementById("user");
let admin = document.getElementById("admin");

user.onclick = function(){
    user.classList.add("type-active");
    admin.classList.remove("type-active");
}

admin.onclick = function(){
    admin.classList.add("type-active");
    user.classList.remove("type-active");
}


class User {
    constructor(
        userName,
        password,
        email,
        isAdmin,               
        firstName,
        lastName,
        imageURL,
        books,
        favorites
    ) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageURL = imageURL;
        this.books = books;
        this.favorites = favorites;
    }
}



function addNewUser(){
    let userType = false;
    if (admin.className === "admin type-active")
        userType = true;

    const newUser = new User(
        document.getElementById("user-input").value,
        document.getElementById("password-input").value,
        document.getElementById("email-input").value,
        userType,
        "",
        "",
        "",
        [],
        []
    );
    let usersJSON = window.localStorage.getItem("users");
    let updatedJSON, usersArr;

    if (usersJSON) {
        usersArr = JSON.parse(usersJSON);
        usersArr.push(newUser);
        updatedJSON = JSON.stringify(usersArr);
    } else {
        updatedJSON = JSON.stringify([newUser]);
    }
    window.localStorage.setItem("users", updatedJSON);
}


const myForm = document.querySelector(".signup-content");
myForm.addEventListener("submit", addNewUser);
