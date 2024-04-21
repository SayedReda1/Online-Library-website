// Header for all pages

let header = `
        <link rel="shortcut icon" type="x-icon" href="../img/ICON.png">
        <header class="website-header">
            <div class="logo">
                <a href="Home.html">
                    <img src="../img/ICON.png" alt="ICON eror path" width="70"/>
                </a>
                <a href="Home.html"> <h1>OnlineLibrary</h1> </a>
            </div>

            <nav class="nav-links">
                <ul>
                    <li><a href="Home.html">Home</a></li>
                    <li><a href="all_books.html">Books</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Categories</a></li>
                </ul>
            </nav>
            
            <div class="profile">
                <a class="profile-icon" href="../HTML/profile.html"><img src="../img/profile-icon.png" alt="profile"></a>
                <button class="login-btn" onclick="location.href='../HTML/Login.html'">Log In</button>
                <button class="signUp-btn" onclick="location.href='../HTML/SignUp.html'">Sign Up</button>
            </div>
        </header>

        <div class="scroll-up" id="scroll-up">
            <img src="../img/arrow-up.svg" alt="">
        </div>
    `;

document.write(header);

// scroll up button
let scroll_up = document.getElementById("scroll-up");
window.onscroll = function () {
    if (this.scrollY >= 600) scroll_up.classList.add("show");
    else scroll_up.classList.remove("show");
};

scroll_up.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

let loginButton = document.querySelector(".login-btn");
let signUpButton = document.querySelector(".signUp-btn");
let profileIcon = document.querySelector(".profile-icon");

let userId = JSON.parse(window.sessionStorage.getItem("user_id"));

if (userId == null) {
    profileIcon.style.display = "none";
} else {
    loginButton.style.display = "none";
    signUpButton.style.display = "none";
}
