const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const app = express();


// 🔌 CONNECT TO MYSQL
const db = mysql.createConnection({
    host: "localhost",
    user: "appuser",
    password: "AppUser123!",
    database: "appdb"
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
db.connect((err) => {
    if (err) {
        console.log("MySQL connection error:", err);
    } else {
        console.log("MySQL connected");
    }
});


// 🟢 SIGNUP ROUTE
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        (err) => {
            if (err) {
                return res.json({ message: "User already exists or error" });
            }
            res.json({ message: "Signup successful" });
        }
    );
});


// 🟢 LOGIN ROUTE
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Missing fields" });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                return res.json({ message: "Server error" });
            }

            if (results.length === 0) {
                return res.json({ message: "User not found" });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.json({ message: "Wrong password" });
            }

            res.json({ message: "Login successful" });
        }
    );
});


// ▶️ START SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
const API_URL = "http://localhost:3000";


// 🟢 SIGNUP
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



// 🟢 LOGIN
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
}