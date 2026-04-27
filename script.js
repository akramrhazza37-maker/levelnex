const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector(".form_close"),
loginBtn = document.querySelector("#login"),
signupBtn = document.querySelector("#signup"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"))
formCloseBtn.addEventListener("click", () => home.classList.remove("show"))

pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input")
    if(getPwInput.type === "password"){
        getPwInput.type = "text";
        icon.classList.replace("uil-eye-slash", "uil-eye");
    }else{
        getPwInput.type = "password";
        icon.classList.replace("uil-eye", "uil-eye-slash");
    }
    })
})

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});
const API_URL = "http://localhost:3000";


// 🟢 SIGNUP FUNCTION
async function signup() {
    const email = document.querySelector("#signup_email").value;
    const password = document.querySelector("#signup_create_password").value;
    const confirm = document.querySelector("#signup_confirm_password").value;

    if (!email || !password || !confirm) {
        alert("Fill all fields");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match");
        return;
    }

    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);
}


// 🟢 LOGIN FUNCTION
async function login() {
    const email = document.querySelector("#login_email").value;
    const password = document.querySelector("#login_password").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.message === "Login successful") {
        // optional redirect
        // window.location.href = "home.html";
    }
}